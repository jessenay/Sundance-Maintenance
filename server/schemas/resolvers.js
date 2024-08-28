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
const SpringTask = require('../models/SpringTask');
const SummerTask = require('../models/SummerTask');
const FallTask = require('../models/FallTask');
const { signToken, isAdmin } = require('../utils/auth');
const { Types: { ObjectId } } = require('mongoose');
const { AuthenticationError } = require('apollo-server');

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
      return await Lift.find({}).populate({
        path: 'components',
        populate: [
          { path: 'services' },
          { path: 'annualServices' }
        ]
      }).populate({
        path: 'towers',
        populate: { path: 'services' }
      });
    },
    lift: async (_, { _id }) => {
      return await Lift.findById(_id).populate({
        path: 'components',
        populate: [
          { path: 'services' },
          { path: 'annualServices' } // Ensure that this path is populated
        ]
      }).populate({
        path: 'towers',
        populate: { path: 'services' }
      });
    },
    components: async () => {
      return await Component.find({});
    },
    component: async (_, { _id }) => {
      const component = await Component.findById(_id).populate('services').populate('procedures').populate('annualServices');
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
      const filter = { component: new ObjectId(componentId) };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await AnnualService.find(filter).sort({ dateCompleted: -1 });
    },
    towerServices: async (_, { towerId, month, year }) => {
      const filter = { tower: new ObjectId(towerId) };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await TowerService.find(filter).sort({ dateCompleted: -1 });
    },
    services: async (_, { componentId, month, year }) => {
      const filter = { component: new ObjectId(componentId) };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await Service.find(filter).sort({ dateCompleted: -1 });
    },
    workOrders: async (_, { liftId, month, year }) => {
      const filter = { lift: new ObjectId(liftId) };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await WorkOrder.find(filter).sort({ dateCompleted: -1 });
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
    summerTasks: async () => {
      return await SummerTask.find({});
    },
    fallTasks: async () => {
      return await FallTask.find({});
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
      await Component.findByIdAndUpdate(componentId, { $push: { annualServices: newAnnualService._id } }); // Add to annualServices instead of services
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
    addWorkOrder: async (_, { job, personnel, toolsRequired, partsUsed, timeWorked, dateCompleted, lift }) => {
      const newWorkOrder = new WorkOrder({
        job,
        personnel,
        toolsRequired,
        partsUsed,
        timeWorked,
        dateCompleted: new Date(dateCompleted),
        lift
      });
      await newWorkOrder.save();
      return newWorkOrder.populate('lift');
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
    addProcedure: async (_, { name, description, componentId }) => {
      const newProcedure = new Procedure({ name, description, component: new ObjectId(componentId) });
      await newProcedure.save();
      await Component.findByIdAndUpdate(componentId, { $push: { procedures: newProcedure._id } });
      return newProcedure;
    },
    addWinterTask: async (_, { name }) => {
      const newTask = new WinterTask({ name, completed: false });
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
    uncheckAllWinterTasks: async () => {
      await WinterTask.updateMany({ completed: true }, { completed: false, initials: null, dateCompleted: null });
      return WinterTask.find({});
    },
    deleteWinterTask: async (_, { _id }) => {
      return WinterTask.findByIdAndDelete(_id);
    },
    addSpringTask: async (_, { name }) => {
      const newTask = new SpringTask({ name, completed: false });
      await newTask.save();
      return newTask;
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
    uncheckAllSpringTasks: async () => {
      await SpringTask.updateMany({ completed: true }, { completed: false, initials: null, dateCompleted: null });
      return SpringTask.find({});
    },
    deleteSpringTask: async (_, { _id }) => {
      return SpringTask.findByIdAndDelete(_id);
    },
    addSummerTask: async (_, { name }) => {
      const newTask = new SummerTask({ name, completed: false });
      await newTask.save();
      return newTask;
    },
    toggleSummerTask: async (_, { _id, initials, dateCompleted }) => {
      const task = await SummerTask.findById(_id);
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
    uncheckAllSummerTasks: async () => {
      await SummerTask.updateMany({ completed: true }, { completed: false, initials: null, dateCompleted: null });
      return SummerTask.find({});
    },
    deleteSummerTask: async (_, { _id }) => {
      return SummerTask.findByIdAndDelete(_id);
    },
    addFallTask: async (_, { name }) => {
      const newTask = new FallTask({ name, completed: false });
      await newTask.save();
      return newTask;
    },
    toggleFallTask: async (_, { _id, initials, dateCompleted }) => {
      const task = await FallTask.findById(_id);
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
    uncheckAllFallTasks: async () => {
      await FallTask.updateMany({ completed: true }, { completed: false, initials: null, dateCompleted: null });
      return FallTask.find({});
    },
    deleteFallTask: async (_, { _id }) => {
      return FallTask.findByIdAndDelete(_id);
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
      return await Component.find({ _id: { $in: lift.components } }).populate([
        { path: 'services' },
        { path: 'annualServices' }
      ]);
    },
    towers: async (lift) => {
      return await Tower.find({ _id: { $in: lift.towers } });
    },
    workOrders: async (lift, { month, year }) => {
      const filter = { lift: lift._id };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await WorkOrder.find(filter);
    }
  },
  Component: {
    services: async (component, { month, year }) => {
      const filter = { component: component._id };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await Service.find(filter).sort({ dateCompleted: -1 });
    },
    annualServices: async (component, { month, year }) => {
      const filter = { component: component._id };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await AnnualService.find(filter).sort({ dateCompleted: -1 });
    },
    procedures: async (component) => {
      return await Procedure.find({ component: component._id });
    }
  },
  Tower: {
    services: async (tower, { month, year }) => {
      const filter = { tower: tower._id };
      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);
        filter.dateCompleted = { $gte: start, $lt: end };
      }
      return await TowerService.find(filter).sort({ dateCompleted: -1 });
    }
  }
};

module.exports = resolvers;