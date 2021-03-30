'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const situationNames = ["Tanımlanmamış", "Tamamlandı", "Beklemede", "İptal"]
    const situations = situationNames
      .map((name, index) => ({ id: index + 1, name }));

    await queryInterface.bulkInsert('transaction_situations', situations, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transaction_situations', null, {});
  }
};
