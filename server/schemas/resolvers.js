const { Profile } = require('../models');
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
    }
  }
};

module.exports = resolvers;
