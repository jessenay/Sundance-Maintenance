const { Profile } = require('../models');
const Component = require('../models/Component');
const Lift = require('../models/Lift');
const Service = require('../models/Service');
const Tower = require('../models/Tower');
const TowerService = require('../models/TowerService');
const AnnualService = require('../models/AnnualService');
const WorkOrder = require('../models/WorkOrder');
const Procedure = require('../models/Procedure');
const Todo = require('../models/ToDo');
const WinterTask = require('../models/WinterTask');
const { signToken, isAdmin } = require('../utils/auth');
const { Types: { ObjectId } } = require('mongoose');
const { AuthenticationError } = require('apollo-server');
const SpringTask = require('../models/SpringTask');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find({});
    },
    profile: async (_, __, context) => {
      if (context.user) {
        return Profile.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    todos: async () => {
      return await Todo.find({});
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
      const component = await Component.findById(_id).populate('services').populate('procedures');
      if (!component) {
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
    annualServices: async (_, { componentId, month, year }) => {
      try {
        const filter = { component: new ObjectId(componentId) };

        if (month && year) {
          const start = new Date(year, month - 1, 1);
          const end = new Date(year, month, 0);
          filter.dateCompleted = { $gte: start, $lt: end };
        } else if (year) {
          const start = new Date(year, 0, 1);
          const end = new Date(year, 11, 31);
          filter.dateCompleted = { $gte: start, $lt: end };
        }

        return await AnnualService.find(filter).sort({ dateCompleted: -1 });
      } catch (error) {
        console.error('Error fetching annual services:', error);
        throw new Error(error);
      }
    },
    towerServices: async (_, { towerId, month, year }) => {
      const filter = { tower: new ObjectId(towerId) };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start.toISOString(), $lt: end.toISOString() };
      } else if (year) {
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        filter.dateCompleted = { $gte: start.toISOString(), $lt: end.toISOString() };
      }
      return TowerService.find(filter).sort({ dateCompleted: -1 });
    },
    services: async (_, { componentId, month, year }) => {
      try {
        const filter = { component: new ObjectId(componentId) };

        if (month && year) {
          const start = new Date(year, month - 1, 1);
          const end = new Date(year, month, 0);
          filter.dateCompleted = { $gte: start.toISOString(), $lt: end.toISOString() };
        } else if (year) {
          const start = new Date(year, 0, 1);
          const end = new Date(year, 11, 31);
          filter.dateCompleted = { $gte: start.toISOString(), $lt: end.toISOString() };
        }

        console.log('Filter:', filter);

        const services = await Service.find(filter).sort({ dateCompleted: -1 });
        console.log('Services:', services);

        return services;
      } catch (error) {
        console.error('Error fetching services:', error);
        throw new Error(error);
      }
    },
    workOrders: async () => {
      return await WorkOrder.find({});
    },
    procedures: async (_, { componentId }) => {
      return await Procedure.find({ component: new ObjectId(componentId) });
    },
    winterTasks: async () => {
      return await WinterTask.find({});
    },
    springTasks: async () => {
      return await SpringTask.find({});
    },
  },
  Mutation: {
    createAccount: async (_, { username, password, role }, context) => {
      const existingUser = await Profile.findOne({ username });
      if (existingUser) {
        throw new Error('User with this username already exists');
      }

      const user = await Profile.create({ username, password, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { username, password }) => {
      const user = await Profile.findOne({ username });
      if (!user) {
        throw new AuthenticationError('No user found with this username');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addService: async (_, { componentId, dateCompleted, reason, workDescription, partsUsed, completedBy }) => {
      const newService = new Service({
        component: new ObjectId(componentId),
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
        component: new ObjectId(componentId),
        task,
        dateCompleted: new Date(dateCompleted),
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
      const newComponent = new Component({ name, lift: new ObjectId(liftId) });
      await newComponent.save();
      await Lift.findByIdAndUpdate(liftId, { $push: { components: newComponent._id } });
      return newComponent;
    },
    addComponentsToLift: async (_, { liftId, components }) => {
      const lift = await Lift.findById(new ObjectId(liftId));
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
      const lift = await Lift.findById(new ObjectId(liftId));
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
      const newTowerService = new TowerService({ dateCompleted, uphillOrDownhill, workDescription, partsUsed, completedBy });
      const savedService = await newTowerService.save();
      await Tower.findByIdAndUpdate(towerId, { $push: { services: savedService._id } });
      return savedService;
    },
    deleteTowerService: async (_, { _id }) => {
      return TowerService.findByIdAndDelete(_id);
    },
    addWorkOrder: async (_, { job, personnel, toolsRequired, partsUsed, timeWorked }) => {
      const newWorkOrder = new WorkOrder({
        job,
        personnel,
        toolsRequired,
        partsUsed,
        timeWorked
      });
      await newWorkOrder.save();
      return newWorkOrder;
    },
    addTodo: async (_, { job }) => {
      const newTodo = new Todo({
        job,
      });
      await newTodo.save();
      return newTodo;
    },
    removeTodo: async (_, { _id }) => {
      return await Todo.findByIdAndDelete(_id);
    },
    addProcedure: async (_, { description, componentId }) => {
      const newProcedure = new Procedure({ description, component: new ObjectId(componentId) });
      await newProcedure.save();
      await Component.findByIdAndUpdate(componentId, { $push: { procedures: newProcedure._id } });
      return newProcedure;
    },
    addWinterTask: async (_, { name }) => {
      const newTask = new WinterTask({ name, completed: false });
      await newTask.save();
      return newTask;
    },
    addSpringTask: async (_, { name }) => {
      const newTask = new SpringTask({ name, completed: false });
      await newTask.save();
      return newTask;
    },
    toggleWinterTask: async (_, { _id, initials, dateCompleted }) => {
      const task = await WinterTask.findById(_id);
      if (!task) {
        throw new Error('Task not found');
      }
      if (!task.completed) {
        task.completed = true;
        task.initials = initials;
        task.dateCompleted = dateCompleted;
      } else {
        task.completed = false;
        task.initials = null;
        task.dateCompleted = null;
      }
      await task.save();
      return task;
    },
    toggleSpringTask: async (_, { _id, initials, dateCompleted }) => {
      const task = await SpringTask.findById(_id);
      if (!task) {
        throw new Error('Task not found');
      }
      if (!task.completed) {
        task.completed = true;
        task.initials = initials;
        task.dateCompleted = dateCompleted;
      } else {
        task.completed = false;
        task.initials = null;
        task.dateCompleted = null;
      }
      await task.save();
      return task;
    },
    uncheckAllWinterTasks: async () => {
      await WinterTask.updateMany({ completed: true }, { completed: false, initials: null, dateCompleted: null });
      return WinterTask.find({});
    },
    uncheckAllSpringTasks: async () => {
      await SpringTask.updateMany({ completed: true }, { completed: false, initials: null, dateCompleted: null });
      return SpringTask.find({});
    },
    deleteWinterTask: async (_, { _id }) => {
      return WinterTask.findByIdAndDelete(_id);
    },
    deleteSpringTask: async (_, { _id }) => {
      return SpringTask.findByIdAndDelete(_id);
    },
    deleteAnnualService: async (parent, { _id }, context) => {
      if (context.user.role !== 'admin') {
        throw new AuthenticationError('You do not have permission to perform this action.');
      }

      return await AnnualService.findByIdAndDelete(_id);
    },
    deleteService: async (parent, { _id }) => {
      try {
        const service = await Service.findByIdAndDelete(_id);
        return service;
      } catch (err) {
        console.error(err);
        throw new Error('Error deleting service');
      }
    },
    deleteWorkOrder: async (parent, { _id }) => {
      try {
        const workOrder = await WorkOrder.findByIdAndDelete(_id);
        return workOrder;
      } catch (err) {
        console.error(err);
        throw new Error('Error deleting work order');
      }
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
    },
    procedures: async (component) => {
      return await Procedure.find({ component: component._id });
    }
  }
};

module.exports = resolvers;
