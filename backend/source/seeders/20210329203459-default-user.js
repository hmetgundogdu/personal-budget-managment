'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'ahmet', // SHA256
      password: require('crypto')
        .createHash('sha256')
        .update("1234") // pw
        .digest('hex'),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
