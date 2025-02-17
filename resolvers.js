const { AuthenticationError } = require('apollo-server-express');
const { User, Employee } = require('./models');
const { signToken } = require('./utils/auth');
const { validateEmployee } = require('./utils/validators');

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.comparePassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      // const token = signToken(user);
      return user;
    },

    employees: async (_, __, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }
      return Employee.find();
    },

    employee: async (_, { id }, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }
      return Employee.findById(id);
    },

    employeesByFilter: async (_, { designation, department }, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }

      // const filter = {};
      // if (designation) filter.designation = designation;
      // if (department) filter.department = department;

      // return await Employee.find(filter);

      if (designation){
        return await Employee.find({ designation });
      } else if (department){
        return await Employee.find({ department });
      }

      return [];
      
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const user = new User({
        username,
        email,
        password
      });
      const newUser = await user.save();
      // const token = signToken(user);
      return newUser;
    },

    addEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }

      // validateEmployee(args);

      const employee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo
      });

      const newEmployee = await employee.save();

      return newEmployee;
    },

    updateEmployee: async (_, { id, ...args }, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }

      // validateEmployee(args, true);
      return await Employee.findByIdAndUpdate(
        id,
        { $set: args },
        { new: true, runValidators: true }
      );
    },

    deleteEmployee: async (_, { id }, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }

      const result = await Employee.findByIdAndDelete(id);
      return !!result;
    }
  }
};

module.exports = resolvers;