'use strict';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const transaction = [];
    const schedules = [];
    // add transaction
    for (let id = 1; id < 10; id++) {
      transaction.push({
        id,
        start_date: new Date(),
        amount: (id * Math.random() * 100),
        status: 1,
        sign: true,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 1,
        transaction_category_id: getRandomArbitrary(1, 5),
        transaction_situation_id: getRandomArbitrary(1, 4),
      });
    }
    // add scheduled transaction
    for (let id = 1; id < 5; id++) {
      schedules.push({
        id,
        transaction_id: id,
        repetition: 1,
        times: 15,
        end_time: id % 2 == 0 ? new Date() : null,
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    await queryInterface.bulkInsert('transactions', transaction, {});
    await queryInterface.bulkInsert('transaction_schedules', schedules, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('transaction_schedules', null, {});
  }
};
