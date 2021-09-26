const graphql = require("graphql");
const User = require("../models/User");

const bcrypt = require('bcryptjs');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
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
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_parent, args) {
        return User.findById(args.id);
      },
    },
    //   users: {
    //     type: new GraphQLList(UserType),
    //     resolve(_parent, _args) {
    //       return User.find({});
    //     },
    //   },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    type: UserType,
    addUser: {
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        isOwner: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {

        let hashedPassword = '';
        
        bcrypt.hash(args.password, 10).then(hash => {
          hashedPassword = hash;
        })

        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: hashedPassword,
          phoneNumber: args.phoneNumber,
          isOwner: args.isOwner,
        });
        return user.save();
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
