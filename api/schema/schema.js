const graphql = require("graphql");
const User = require("../models/User");
const Property = require("../models/Property");
const Event = require("../models/Event");
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
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    propertyCode: { type: GraphQLString },
    isOwner: { type: GraphQLBoolean },
  }),
});

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    toBeCompleted: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    ownerId: { type: GraphQLID },
    isExpired: { type: GraphQLBoolean },
  }),
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    propertyCode: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    province: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    numOfRooms: { type: GraphQLInt },
    description: { type: GraphQLString },
    note: { type: GraphQLString },
    rules: { type: new GraphQLList(GraphQLString) },
    residentIds: { type: new GraphQLList(GraphQLString) },
    eventIds: { type: new GraphQLList(GraphQLString) },
    ownerId: { type: GraphQLID },
    residents: {
      type: new GraphQLList(UserType),
      async resolve(parent, _args, req) {
        if (req) {
          let tenants = [];
          for (const tenant of parent.residentIds) {
            tenants.push(await User.findById(tenant));
          }
          return tenants;
        }

        throw new Error("Non authenticated user");
      },
    },
    events: {
      type: new GraphQLList(EventType),
      async resolve(parent, _args, req) {
        if (req) {
          let events = [];
          for (const event of parent.eventIds) {
            events.push(await Event.findById(event));
          }
          return events;
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
          let property = await Property.findOne({ propertyCode: args.id });
          if (!property) property = await Property.findOne({ id: args.id });

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
        const alreadyRegistered = await User.findOne({ email: args.email });

        if (alreadyRegistered) {
          return true;
        }

        return false;
      },
    },
    checkPhoneNumber: {
      type: GraphQLBoolean,
      args: { phoneNumber: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, args) {
        const alreadyRegisted = await User.findOne({
          phoneNumber: args.phoneNumber,
        });

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
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        propertyCode: { type: GraphQLString },
        isOwner: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(_parent, args) {
        const alreadyRegisted = await User.findOne({ email: args.email });

        if (alreadyRegisted) {
          throw new Error("User already registered with this email");
        }

        const user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: await bcrypt.hash(args.password, 10),
          phoneNumber: args.phoneNumber,
          propertyCode: args.propertyCode,
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
        address1: { type: new GraphQLNonNull(GraphQLString) },
        address2: { type: GraphQLString },
        city: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        postalCode: { type: new GraphQLNonNull(GraphQLString) },
        numOfRooms: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLString },
        note: { type: GraphQLString },
        rules: { type: new GraphQLList(GraphQLString) },
        residentIds: { type: new GraphQLList(GraphQLString) },
        eventIds: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const generateCode = () => {
              return ((Math.random() + 3 * Number.MIN_VALUE) / Math.PI)
                .toString(36)
                .slice(-7);
            };

            let propertyCode;
            let unique = false;

            while (!unique) {
              propertyCode = generateCode();
              const found = await Property.findOne({
                propertyCode: propertyCode,
              });

              if (!found) {
                unique = true;
              }
            }

            const property = new Property({
              propertyCode: propertyCode,
              address1: args.address1,
              address2: args.address2,
              city: args.city,
              province: args.province,
              postalCode: args.postalCode,
              numOfRooms: args.numOfRooms,
              description: args.description,
              note: args.note,
              rules: args.rules,
              residentIds: args.residentIds,
              eventIds: args.eventIds,
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
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        city: { type: GraphQLString },
        province: { type: GraphQLString },
        postalCode: { type: GraphQLString },
        numOfRooms: { type: GraphQLInt },
        description: { type: GraphQLString },
        note: { type: GraphQLString },
        rules: { type: new GraphQLList(GraphQLString) },
        residentIds: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const property = await Property.findById(args.id);
            if (req.user.id == property.ownerId) {
              if (args.residentIds) {
                args.residentIds = property.residentIds.concat(
                  args.residentIds
                );
              }

              return Property.findByIdAndUpdate(
                args.id,
                {
                  address1: args.address1,
                  address2: args.address2,
                  city: args.city,
                  province: args.province,
                  postalCode: args.postalCode,
                  numOfRooms: args.numOfRooms,
                  description: args.description,
                  note: args.note,
                  rules: args.rules,
                  residentIds: args.residentIds,
                  ownerId: req.user.id,
                },
                { new: true }
              );
            }

            throw new Error("Not the owner of this property");
          } else {
            const property = await Property.findOne({ propertyCode: args.id });
            if (property) {
              if (!property.residentIds.includes(req.user.id))
                property.residentIds.push(req.user.id);

              return property.save();
            }

            throw new Error("Incorrect Error Code");
          }
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
              for (const tenantId of property.residentIds) {
                await User.findByIdAndUpdate(tenantId, { propertyCode: null });
              }
              return Property.findByIdAndDelete(args.id);
            }

            throw new Error("Not the owner of this property");
          }

          throw new Error("Not an owner");
        }

        throw new Error("Non authenticated user");
      },
    },
    updateUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        propertyCode: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (args.password) {
            return User.findByIdAndUpdate(
              req.user.id,
              {
                firstName: args.firstName,
                lastName: args.lastName,
                phoneNumber: args.phoneNumber,
                propertyCode: args.propertyCode,
                password: await bcrypt.hash(args.password, 10),
              },
              { new: true }
            );
          }
          return User.findByIdAndUpdate(
            req.user.id,
            {
              firstName: args.firstName,
              lastName: args.lastName,
              phoneNumber: args.phoneNumber,
              propertyCode: args.propertyCode,
            },
            { new: true }
          );
        }

        throw new Error("Non authenticated user");
      },
    },
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        toBeCompleted: { type: new GraphQLNonNull(GraphQLString) },
        assignedTo: { type: GraphQLID },
        isRepeatable: { type: new GraphQLNonNull(GraphQLBoolean) },
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            let property = await Property.findById(args.propertyId);
            if (req.user.id == property.ownerId) {
              const event = new Event({
                name: args.name,
                description: args.description,
                toBeCompleted: new Date(args.toBeCompleted),
                isRepeatable: args.isRepeatable,
                isExpired: false,
                assignedTo: args.assignedTo,
                ownerId: req.user.id,
              });

              const saved_event = await event.save();
              let newIds = property.eventIds;
              newIds.push(saved_event.id);

              await Property.findByIdAndUpdate(property.id, {
                eventIds: newIds,
              });

              return saved_event;
            }
            throw new Error("Not the owner of this property");
          }

          throw new Error("Not an owner");
        }

        throw new Error("Non Authenticated User");
      },
    },
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
