const { Profile } = require('../models');
const Component = require('../models/Component');
const Lift = require('../models/Lift');
const Service = require('../models/Service');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Fetch all profiles
    profiles: async () => {
      return await Profile.find({});
    },
    // Fetch a single profile by the logged-in user's ID
    profile: async (_, __, context) => {
      if (context.user) {
        return await Profile.findById(context.user._id);
      }
      throw new AuthenticationError('You must be logged in to view your profile.');
    },
    lifts: async () => {
      return await Lift.find({});
    },
    lift: async (_, { id }) => {
      return await Lift.findById(id);
    },
    component: async (_, { id }) => {
      return await Component.findById(id);
    }
  },
  Mutation: {
    // Mutation to create an account and return a JWT token
    createAccount: async (_, { username, email, password }) => {
      const user = await Profile.create({
        username,
        email,
        password
      });
      const token = signToken(user);
      return { token, user };
    },
    // Mutation for user login
    login: async (_, { email, password }) => {
      const user = await Profile.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) {
        throw new AuthenticationError('Invalid password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addService: async (_, { componentId, dateCompleted, reason, workDescription, partsUsed, completedBy }) => {
      const newService = new Service({
        dateCompleted,
        reason,
        workDescription,
        partsUsed,
        completedBy,
        component: componentId
      });
      await newService.save();
      await Component.findByIdAndUpdate(componentId, { $push: { services: newService._id } });
      return newService;
    },
    addLift: async (_, { name }) => {
      const newLift = new Lift({ name });
      await newLift.save();
      return newLift;
    },
    addComponent: async (_, { name, liftId }) => {
      const newComponent = new Component({ name, lift: liftId });
      await newComponent.save();

      // Optionally add this component to the lift's components array
      await Lift.findByIdAndUpdate(liftId, { $push: { components: newComponent._id } });

      return newComponent;
    }
  },
  Lift: {
    components: async (lift) => {
      // Assuming 'components' is populated or an array of IDs
      return await Component.find({ _id: { $in: lift.components } });
    }
  },
  Component: {
    services: async (component) => {
      // Assuming 'services' is populated or an array of IDs
      return await Service.find({ _id: { $in: component.services } });
    }
  }

};

module.exports = resolvers;
