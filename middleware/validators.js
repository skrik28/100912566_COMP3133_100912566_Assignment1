const validator = require('validator');

module.exports = {
  validateEmployee: (data, isUpdate = false) => {
    const errors = [];

    if (!isUpdate || data.email) {
      if (!validator.isEmail(data.email)) {
        errors.push('Invalid email address');
      }
    }

    if (!isUpdate || data.salary) {
      if (data.salary < 1000) {
        errors.push('Salary must be at least 1000');
      }
    }

    if (!isUpdate || data.gender) {
      if (!['Male', 'Female', 'Other'].includes(data.gender)) {
        errors.push('Invalid gender');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }
};