'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Bookings';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(options, [
      {
        //id: 1,
        spotId: 1,
        userId: 1,
        startDate: '2023-05-20',
        endDate: '2023-05-25',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        spotId: 2,
        userId: 2,
        startDate: '2023-06-01',
        endDate: '2023-06-05',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        spotId: 3,
        userId: 3,
        startDate: '2023-06-01',
        endDate: '2023-06-05',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     *
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
