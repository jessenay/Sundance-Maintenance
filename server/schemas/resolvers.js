const { Profile } = require('../models');
const Component = require('../models/Component');
const Lift = require('../models/Lift');
const Service = require('../models/Service');
const Tower = require('../models/Tower');
const TowerService = require('../models/TowerService');
const AnnualService = require('../models/AnnualService');
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
    lift: async (_, { _id }) => {
      return await Lift.findById(_id).populate('components').populate({
        path: 'towers',
        populate: { path: 'services' }
      });
    },
    components: async () => {
      return await Component.find({});
    },
    component: async (_, { _id }) => {
      console.log(`Fetching component with ID: ${_id}`);
      const component = await Component.findById(_id).populate('services');
      console.log('Component Data:', component);
      if (!component) {
        console.log(`No component found with this ID: ${_id}`);
        return null;
      }
      return component;
    },
    tower: async (_, { _id }) => {
      return await Tower.findById(_id).populate('services');
    },
    towers: async () => {
      return await Tower.find({});
    },
    annualServices: async (_, { componentId }, context) => {
      try {
        // Fetch the component by its ID
        const component = await Component.findById(componentId);

        // If the component exists, find its associated annual services
        if (component) {
          const annualServices = await AnnualService.find({ component: componentId });
          return annualServices;
        } else {
          // If the component doesn't exist, return an empty array
          return [];
        }
      } catch (error) {
        console.error('Error fetching annual services:', error);
        throw new Error(error);
      }
    },
    services: async (_, { componentId }) => {
      const component = await Component.findById(componentId).populate('services');
      if (!component) {
        throw new Error('Component not found');
      }
      return component.services;
    },
  },
  Mutation: {
    // Correctly nested all mutation resolvers
    createAccount: async (_, { username, password }) => {
      const user = await Profile.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { username, password }) => {
      const user = await Profile.findOne({ username });
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
        component: componentId,
        dateCompleted,
        reason,
        workDescription,
        partsUsed,
        completedBy,
      });
      await newService.save();
      await Component.findByIdAndUpdate(componentId, { $push: { services: newService._id } });
      return newService;
    },
    addAnnualService: async (_, { componentId, task, dateCompleted, completedBy, testValues, notes, procedureLocations }) => {
      const newAnnualService = new AnnualService({
        component: componentId,
        task,
        dateCompleted,
        completedBy,
        testValues,
        notes,
        procedureLocations
      });
      await newAnnualService.save();
      await Component.findByIdAndUpdate(componentId, { $push: { services: newAnnualService._id } });
      return newAnnualService;
    },
    addLift: async (_, { name }) => {
      const newLift = new Lift({ name });
      await newLift.save();
      return newLift;
    },
    addComponent: async (_, { name, liftId }) => {
      const newComponent = new Component({ name, lift: liftId });
      await newComponent.save();
      await Lift.findByIdAndUpdate(liftId, { $push: { components: newComponent._id } });
      return newComponent;
    },
    addComponentsToLift: async (_, { liftId, components }) => {
      const lift = await Lift.findById(liftId);
      if (!lift) {
        throw new Error('Lift not found');
      }
    
      const componentDocuments = components.map(name => new Component({ name }));
      const savedComponents = await Promise.all(componentDocuments.map(component => component.save()));
    
      lift.components = lift.components.concat(savedComponents.map(component => component._id));
    
      await lift.save();
      return lift.populate('components');
    },
    addTower: async (_, { name, liftId }) => {
      const newTower = new Tower({ name });
      await newTower.save();
      await Lift.findByIdAndUpdate(liftId, { $push: { towers: newTower._id } });
      return newTower;
    },
    addTowersToLift: async (_, { liftId, towerNames }) => {
      const lift = await Lift.findById(liftId);
      if (!lift) {
        throw new Error('Lift not found');
      }

      const towers = await Promise.all(towerNames.map(name => {
        const tower = new Tower({ name });
        return tower.save();
      }));

      lift.towers = lift.towers.concat(towers.map(tower => tower._id));
      await lift.save();
      return lift.populate('towers');
    },
    addTowerService: async (_, { towerId, dateCompleted, uphillOrDownhill, workDescription, partsUsed, completedBy }) => {
      const newTowerService = new TowerService({
        dateCompleted,
        uphillOrDownhill,
        workDescription,
        partsUsed,
        completedBy
      });
      const savedService = await newTowerService.save();

      await Tower.findByIdAndUpdate(
        towerId,
        { $push: { services: savedService._id } },
        { new: true, upsert: true }
      );

      return savedService;
    }
  },
  Lift: {
    components: async (lift) => {
      return await Component.find({ _id: { $in: lift.components } });
    },
    towers: async (lift) => {
      return await Tower.find({ _id: { $in: lift.towers } });
    }
  },
  Component: {
    services: async (component) => {
      return await Service.find({ _id: { $in: component.services } });
    }
  }
};

module.exports = resolvers;