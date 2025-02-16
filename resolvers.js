const { AuthenticationError } = require('apollo-server-express');
const { User, Employee } = require('./models');
const { signToken } = require('./utils/auth');
const { validateEmployee } = require('./utils/validators');

const resolvers = {
  Query: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.comparePassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    employees: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return Employee.find();
    },

    employee: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return Employee.findById(id);
    },

    employeesByFilter: async (parent, { designation, department }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;

      return Employee.find(filter);
    }
  },

  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addEmployee: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      validateEmployee(args);
      return Employee.create(args);
    },

    updateEmployee: async (parent, { id, ...args }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      validateEmployee(args, true);
      return Employee.findByIdAndUpdate(
        id,
        { $set: args },
        { new: true, runValidators: true }
      );
    },

    deleteEmployee: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const result = await Employee.findByIdAndDelete(id);
      return !!result;
    }
  }
};

module.exports = resolvers;