'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
options.tableName = 'Reviews';

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
backend/db/models/review.js     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
await queryInterface.bulkInsert(options, [{
        id: 1,
        userId: 1,
        spotId: 1,
        review: 'gorgeous house',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        spotId: 2,
        review: 'beautiful area',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 3,
        spotId: 3,
        review: 'not the best',
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
], {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
