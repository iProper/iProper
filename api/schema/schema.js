const graphql = require('graphql');
const User = require('../models/User');
const Property = require('../models/Property');
const Event = require('../models/Event');
const Chat = require('../models/Chat');
const ChatRoom = require('../models/ChatRoom');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { startOfWeek, nextMonday, startOfToday, add } = require('date-fns');

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLScalarType,
  Kind,
} = graphql;

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return new Date(value);
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
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
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    toBeCompleted: { type: dateScalar },
    assignedTo: { type: GraphQLString },
    ownerId: { type: GraphQLID },
    isRepeatable: { type: GraphQLBoolean },
    isCompleted: { type: GraphQLBoolean },
    preMade: { type: GraphQLBoolean },
    report: { type: GraphQLString },
  }),
});

const ChatType = new GraphQLObjectType({
  name: 'Chat',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    message: { type: GraphQLString },
    createdAt: { type: dateScalar },
    chatRoomId: { type: GraphQLID },
  }),
});

const ChatRoomType = new GraphQLObjectType({
  name: 'ChatRoom',
  fields: () => ({
    id: { type: GraphQLID },
    users: { type: new GraphQLList(GraphQLID) },
    createdAt: { type: dateScalar },
    chats: {
      type: new GraphQLList(ChatType),
      async resolve(parent, _args, req) {
        if (req) {
          return Chat.find({ chatRoomId: parent.id });
        }
        throw new Error('Non Authenticated User');
      },
    },
  }),
});

const PropertyType = new GraphQLObjectType({
  name: 'Property',
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
    issues: { type: new GraphQLList(GraphQLString) },
    residentIds: { type: new GraphQLList(GraphQLString) },
    eventIds: { type: new GraphQLList(GraphQLString) },
    chatRoomIds: { type: new GraphQLList(GraphQLString) },
    ownerId: { type: GraphQLID },
    residents: {
      type: new GraphQLList(UserType),
      async resolve(parent, _args, req) {
        if (req) {
          let tenants = [];
          for (const tenantId of parent.residentIds) {
            tenants.push(await User.findById(tenantId));
          }
          return tenants;
        }

        throw new Error('Non authenticated user');
      },
    },
    events: {
      args: {
        viewAll: { type: GraphQLBoolean },
      },
      type: new GraphQLList(EventType),
      async resolve(parent, args, req) {
        if (req) {
          let events = [];
          let allEvents = [];
          for (const eventId of parent.eventIds) {
            const event = await Event.findById(eventId);

            const firstDay = startOfWeek(startOfToday(), {
              weekStartsOn: 1,
            });
            const lastDay = nextMonday(startOfToday());

            if (args.viewAll == null) {
              if (
                event.toBeCompleted >= firstDay &&
                event.toBeCompleted < lastDay
              ) {
                if (event.isRepeatable && !event.preMade) {
                  const property = await Property.findById(parent.id);
                  if (
                    req.user.id == property.ownerId ||
                    property.residentIds.includes(req.user.id)
                  ) {
                    const nextEvent = new Event({
                      name: event.name,
                      description: event.description,
                      toBeCompleted: add(event.toBeCompleted, { days: 7 }),
                      isRepeatable: event.isRepeatable,
                      preMade: false,
                      isCompleted: false,
                      assignedTo: property.residentIds[0],
                      ownerId: req.user.id,
                    });
                    property.residentIds.push(property.residentIds.shift());

                    const saved_event = await nextEvent.save();
                    property.eventIds.push(saved_event.id);

                    await property.save();
                    event.preMade = true;
                    await event.save();
                  }
                }
                events.push(event);
              } else {
                allEvents.push(event);
              }
            }
          }
          if (args.viewAll == null) return events;
          return allEvents;
        }

        throw new Error('Non authenticated user');
      },
    },
    chatRooms: {
      type: new GraphQLList(ChatRoomType),
      async resolve(parent, _args, req) {
        if (req) {
          let chatRooms = [];
          for (const roomId of parent.chatRoomIds) {
            const chatRoom = await ChatRoom.findById(roomId);
            if (
              !chatRoom.loadUsers.includes(req.user.id) &&
              chatRoom.users.includes(req.user.id)
            )
              chatRooms.push(chatRoom);
          }
          return chatRooms;
        }

        throw new Error('Non authenticated user');
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: UserType,
      async resolve(_parent, _args, req) {
        if (req) {
          return User.findById(req.user.id);
        }

        throw new Error('Non authenticated User');
      },
    },
    getProperty: {
      type: PropertyType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, args, req) {
        if (req) {
          let property = await Property.findOne({
            propertyCode: args.id,
          });
          if (!property) property = await Property.findOne({ id: args.id });

          if (req.user.isOwner) {
            if (property.ownerId == req.user.id) return property;
            throw new Error('Not the owner of this property');
          }

          if (property.residentIds.includes(req.user.id)) return property;

          throw new Error('Not a resident of this property');
        }

        throw new Error('Non authenticated user');
      },
    },
    getProperties: {
      type: new GraphQLList(PropertyType),
      resolve(_parent, _args, req) {
        if (req) {
          if (req.user.isOwner) {
            return Property.find({ ownerId: req.user.id });
          }

          throw new Error('Not an owner of a registered property');
        }

        throw new Error('Non authenticated user');
      },
    },
    getOwner: {
      type: UserType,
      args: {
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          const property = await Property.findById(args.propertyId);
          if (property.residentIds.includes(req.user.id)) {
            return User.findById(property.ownerId);
          }
          throw new Error('Not a resident of this property');
        }
        throw new Error('Non Authenticated User');
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    checkEmail: {
      type: GraphQLBoolean,
      args: { email: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_parent, args) {
        const alreadyRegistered = await User.findOne({
          email: args.email,
        });

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
        const alreadyRegisted = await User.findOne({
          email: args.email,
        });

        if (alreadyRegisted) {
          throw new Error('User already registered with this email');
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

        throw new Error('Error signing up');
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
          throw new Error('There is no account associated with this email');
        }

        const valid = await bcrypt.compare(args.password, user.password);

        if (!valid) {
          throw new Error('Password is incorrect');
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
            throw new Error('Error in sending verification message');
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
        issues: { type: new GraphQLList(GraphQLString) },
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
              issues: args.issues,
              residentIds: args.residentIds,
              eventIds: args.eventIds,
              ownerId: req.user.id,
            });

            return property.save();
          }

          throw new Error('Not an owner');
        }

        throw new Error('Non authenticated user');
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
        issues: { type: new GraphQLList(GraphQLString) },
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
                  issues: args.issues,
                  residentIds: args.residentIds,
                  ownerId: req.user.id,
                },
                { new: true }
              );
            }

            throw new Error('Not the owner of this property');
          } else {
            const property = await Property.findOne({
              propertyCode: args.id,
            });
            if (property) {
              if (!property.residentIds.includes(req.user.id))
                property.residentIds.push(req.user.id);

              return property.save();
            }

            throw new Error('Incorrect Error Code');
          }
        }

        throw new Error('Non authenticated user');
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
                await User.findByIdAndUpdate(tenantId, {
                  propertyCode: null,
                });
              }
              return Property.findByIdAndDelete(args.id);
            }

            throw new Error('Not the owner of this property');
          }

          throw new Error('Not an owner');
        }

        throw new Error('Non authenticated user');
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

        throw new Error('Non authenticated user');
      },
    },
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        toBeCompleted: { type: new GraphQLNonNull(dateScalar) },
        assignedTo: { type: GraphQLID },
        isRepeatable: { type: new GraphQLNonNull(GraphQLBoolean) },
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const property = await Property.findById(args.propertyId);
            if (req.user.id == property.ownerId) {
              let assignedTenant;
              if (args.isRepeatable && args.assignedTo == null) {
                assignedTenant = property.residentIds[0];
                property.residentIds.push(property.residentIds.shift());
              } else {
                assignedTenant = args.assignedTo;
              }

              const event = new Event({
                name: args.name,
                description: args.description,
                toBeCompleted: args.toBeCompleted,
                isRepeatable: args.isRepeatable,
                preMade: false,
                isCompleted: false,
                report: '',
                assignedTo: assignedTenant,
                ownerId: req.user.id,
              });

              const saved_event = await event.save();
              property.eventIds.push(saved_event.id);

              await property.save();
              return saved_event;
            }
            throw new Error('Not the owner of this property');
          }

          throw new Error('Not an owner');
        }

        throw new Error('Non Authenticated User');
      },
    },
    updateEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        toBeCompleted: { type: dateScalar },
        assignedTo: { type: GraphQLID },
        isRepeatable: { type: GraphQLBoolean },
        isCompleted: { type: GraphQLBoolean },
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
        report: { type: GraphQLString },
      },
      async resolve(_parent, args, req) {
        if (req) {
          if (req.user.isOwner) {
            const property = await Property.findById(args.propertyId);
            if (req.user.id == property.ownerId) {
              // TODO: When editing a repeatable event it should edit the preMade one as well if it exists
              return Event.findByIdAndUpdate(
                args.id,
                {
                  name: args.name,
                  description: args.description,
                  toBeCompleted: args.toBeCompleted,
                  isRepeatable: args.isRepeatable,
                  isCompleted: args.isCompleted,
                  assignedTo: args.assignedTo,
                  ownerId: req.user.id,
                  report: args.report,
                },
                { new: true }
              );
            }
            throw new Error('Not the owner of this property');
          } else {
            const property = await Property.findById(args.propertyId);
            if (property) {
              if (property.residentIds.includes(req.user.id)) {
                return Event.findByIdAndUpdate(
                  args.id,
                  {
                    name: args.name,
                    description: args.description,
                    toBeCompleted: args.toBeCompleted,
                    isRepeatable: args.isRepeatable,
                    isCompleted: args.isCompleted,
                    assignedTo: args.assignedTo,
                    ownerId: req.user.id,
                    report: args.report,
                  },
                  { new: true }
                );
              }
              throw new Error('Not a tenant of this property');
            }
          }

          throw new Error('Not an owner');
        }

        throw new Error('Non Authenticated User');
      },
    },
    processPayment: {
      type: GraphQLString,
      args: {
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          const property = await Property.findById(args.propertyId);
          if (property.residentIds.includes(req.user.id)) {
            const customer = await stripe.customers.create();
            const ephemeralKey = await stripe.ephemeralKeys.create(
              { customer: customer.id },
              { apiVersion: '2020-08-27' }
            );
            const paymentIntent = await stripe.paymentIntents.create({
              amount: args.amount,
              currency: 'cad',
              customer: customer.id,
              automatic_payment_methods: {
                enabled: true,
              },
            });

            let response = {
              paymentIntent: paymentIntent.client_secret,
              ephemeralKey: ephemeralKey.secret,
              customer: customer.id,
              publishableKey:
                'pk_test_51Jz02YBBGZIXxNTYgM2yMzFA7NQXIlamEw3CFR1QyUqoNQvOhN8ZnoPsvuMYG9zaGu3dxbATq293z9sMixx6MsH400qpYrH56L',
            };

            return JSON.stringify(response);
          }
          throw new Error('Not a resident of this property');
        }
        throw new Error('Non Authenticated User');
      },
    },
    addChatRoom: {
      type: ChatRoomType,
      args: {
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
        users: { type: new GraphQLList(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          const property = await Property.findById(args.propertyId);
          if (property.residentIds.includes(req.user.id)) {
            let error = [];
            for (const resId of args.users) {
              if (!property.residentIds.includes(resId)) error.push(resId);
            }
            if (error.length != 0)
              throw new Error(
                'These users are not a part of this property',
                error
              );

            const chatRoom = new ChatRoom({
              users: args.users,
              loadUsers: [],
              createdAt: new Date(),
              createdBy: req.user.id,
            });

            const saved_room = await chatRoom.save();

            property.chatRoomIds.push(saved_room.id);
            await property.save();

            return saved_room;
          }
          throw new Error('Not a resident of this property');
        }
        throw new Error('Non Authenticated User');
      },
    },
    updateChatRoom: {
      type: ChatRoomType,
      args: {
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
        chatRoomId: { type: new GraphQLNonNull(GraphQLID) },
        users: { type: new GraphQLList(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          const property = await Property.findById(args.propertyId);
          if (property.residentIds.includes(req.user.id)) {
            const chatRoom = await ChatRoom.findById(args.chatRoomId);
            if (args.users) {
              args.users = chatRoom.users.concat(args.users);
            }
            return ChatRoom.findByIdAndUpdate(
              args.chatRoomId,
              {
                users: args.users,
              },
              { new: true }
            );
          }
          throw new Error('Not a resident of this property');
        }
        throw new Error('Non Authenticated User');
      },
    },
    deleteChatRoom: {
      type: ChatRoomType,
      args: {
        propertyId: { type: new GraphQLNonNull(GraphQLID) },
        chatRoomId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, req) {
        if (req) {
          const property = Property.findById(args.propertyId);
          if (property.residentIds.includes(req.user.id)) {
            const chatRoom = await ChatRoom.findById(args.chatRoomId);
            if (req.user.id != chatRoom.createdBy) {
              chatRoom.loadUsers = chatRoom.loadUsers.concat(req.user.id);
              return chatRoom.save();
            }

            property.chatRoomIds = property.chatRoomIds.filter((roomId) => {
              roomId != args.chatRoomId;
            });
            await property.save();

            return ChatRoom.findByIdAndDelete(args.chatRoomId);
          }
          throw new Error('Not a resident of this property');
        }
        throw new Error('Non Authenticated User');
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
