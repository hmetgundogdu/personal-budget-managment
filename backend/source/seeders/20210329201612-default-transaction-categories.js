'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    let defaultCategoryNames = ["Ev", "İş", "Araba", "Okul", "Eğlence"]
    let defaultCategories = defaultCategoryNames
      .map((name, index) => ({
        id: index + 1,
        name
      }));

    await queryInterface.bulkInsert('transaction_categories', defaultCategories, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transaction_categories', null, {});
  }
  
};
