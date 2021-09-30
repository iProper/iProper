const graphql = require("graphql");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const accountSid = "process.env.TWILIO_ACCOUNT_SID";
const authToken = "process.env.TWILIO_AUTH_TOKEN";
const client = require('twilio')(accountSid, authToken);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  // GraphQLInt,
  // GraphQLList,
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    current: {
      type: UserType,
      async resolve(_parent, _args, req) {
        if (req) {
          return User.findById(req.user.id);
        }

        throw new Error("Non authenticated User");
      },
    },

    requestSMS: {
      type: GraphQLString,
      async resolve(_parent, _args, req) {
        let pin = (Math.floor(Math.random() * 99999)).toString();
        client.messages.create({ body: `iProper Verification PIN: ${pin}`, from: 'twilioPhoneNumber', to: req.user.phoneNumber }).then(message => console.log(message.sid)).catch((e) => { throw new Error("Error in sending verification message") });
        return pin;
      }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
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

        return jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET);
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
