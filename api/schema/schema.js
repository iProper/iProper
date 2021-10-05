const graphql = require("graphql");
const User = require("../models/User");
const Property = require("../models/Property");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  // GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

//Not completed just basic for getting started
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    isOwner: { type: GraphQLString },
  }),
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    num: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    province: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    residentIds: { type: new GraphQLList(GraphQLString) },
    ownerId: { type: GraphQLID },
    residents: {
      type: new GraphQLList(UserType),
      async resolve(parent, _args, req) {
        if (req) {
          const property = await Property.find({ propertyId: parent.id });
          let tenants = [];
          const tenantIds = property.residentIds;
          for (const tenant of tenantIds) {
            tenants.push(await User.findById(tenant));
          }
          return tenants;
        }

        throw new Error("Non authenticated user");
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    currentUser: {
      type: UserType,
      async resolve(_parent, _args, req) {
        if (req) {
          return User.findById(req.user.id);
        }

        throw new Error("Non authenticated User");
      },
    },
    getProperty: {
      type: PropertyType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, args, req) {
        if (req) {
          const property = await Property.findById(args.id);
          if (req.user.isOwner) {
            if (property.ownerId == req.user.id) return property;
            throw new Error("Not the owner of this property");
          }

          if (property.residentIds.includes(req.user.id)) return property;

          throw new Error("Not a resident of this property");
        }

        throw new Error("Non authenticated user");
      },
    },
    getProperties: {
      type: new GraphQLList(PropertyType),
      resolve(_parent, _args, req) {
        if (req) {
          if (req.user.isOwner) {
            return Property.find({ ownerId: req.user.id });
          }

          throw new Error("Not an owner of a registered property");
        }

        throw new Error("Non authenticated user");
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    checkEmail: {
      type: GraphQLBoolean,
      args: { email: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, args) {
        const alreadyRegisted = await User.findOne({ email: args.email });

        if (alreadyRegisted) {
          return true;
        }

        return false;
      },
    },
    register: {
      type: GraphQLBoolean,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        isOwner: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(_parent, args) {
        const alreadyRegisted = await User.findOne({ email: args.email });

        if (alreadyRegisted) {
          throw new Error("User already registered with this email");
        }

        if (args.isOwner && args.phoneNumber == null) {
          throw new Error("Owner must register phone number");
        }

        const user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: await bcrypt.hash(args.password, 10),
          phoneNumber: args.phoneNumber,
          isOwner: args.isOwner,
        });

        const saved = await user.save();

        if (saved) return true;

        throw new Error("Error signing up");
      },
    },
    login: {
      type: GraphQLString,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, args) {
        const user = await User.findOne({ email: args.email });

        if (!user) {
          throw new Error("There is no account associated with this email");
        }

        const valid = await bcrypt.compare(args.password, user.password);

        if (!valid) {
          throw new Error("Password is incorrect");
        }

        return jsonwebtoken.sign(
          { id: user.id, isOwner: user.isOwner },
          process.env.JWT_SECRET
        );
      },
    },
    requestSMS: {
      type: GraphQLString,
      args: { phoneNumber: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, args) {
        let pin = Math.floor(Math.random() * 99999).toString();
        client.messages
          .create({
            body: `iProper Verification PIN: ${pin}`,
            from: `${process.env.TWILIO_NUMBER}`,
            to: args.phoneNumber,
          })
          .then((_) => {})
          .catch((_) => {
            throw new Error("Error in sending verification message");
          });
        return pin;
      },
    },
    addProperty: {
      type: PropertyType,
      args: {
        num: { type: new GraphQLNonNull(GraphQLString) },
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        postalCode: { type: new GraphQLNonNull(GraphQLString) },
        residentIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const property = new Property({
              num: args.num,
              street: args.street,
              city: args.city,
              province: args.province,
              postalCode: args.postalCode,
              residentIds: args.residentIds,
              ownerId: req.user.id,
            });

            return property.save();
          }

          throw new Error("Not an owner");
        }

        throw new Error("Non authenticated user");
      },
    },
    updateProperty: {
      type: PropertyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        num: { type: new GraphQLNonNull(GraphQLString) },
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        postalCode: { type: new GraphQLNonNull(GraphQLString) },
        residentIds: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const property = await Property.findById(args.id);
            if (req.user.id == property.ownerId) {
              return Property.findByIdAndUpdate(
                args.id,
                {
                  num: args.num,
                  street: args.street,
                  city: args.city,
                  province: args.province,
                  postalCode: args.postalCode,
                  residentIds: args.residentIds,
                  ownerId: req.user.id,
                },
                { new: true }
              );
            }

            throw new Error("Not the owner of this property");
          }

          throw new Error("Not an owner");
        }

        throw new Error("Non authenticated user");
      },
    },
    deleteProperty: {
      type: PropertyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const property = await Property.findById(args.id);
            if (req.user.id == property.ownerId) {
              return Property.findOneAndDelete({ id: args.id });
            }

            throw new Error("Not the owner of this property");
          }

          throw new Error("Not an owner");
        }

        throw new Error("Non authenticated user");
      },
    },
    // updateUser: {
    //   type: UserType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) },
    //     firstName: { type: new GraphQLNonNull(GraphQLString) },
    //     lastName: { type: new GraphQLNonNull(GraphQLString) },
    //     email: { type: new GraphQLNonNull(GraphQLString) },
    //     password: { type: new GraphQLNonNull(GraphQLString) },
    //     phoneNumber: { type: GraphQLString },
    //     isOwner: { type: new GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve(_parent, args) {
    //     return User.findByIdAndUpdate(
    //       args.id,
    //       {
    //         firstName: args.firstName,
    //         lastName: args.lastName,
    //         email: args.email,
    //         password: args.password,
    //         phoneNumber: args.phoneNumber,
    //         isOwner: args.isOwner,
    //       },
    //       { new: true }
    //     );
    // },
    // },
    // deleteUser: {
    //   type: UserType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve(_parent, args) {
    //     return User.findByIdAndDelete(args.id);
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
