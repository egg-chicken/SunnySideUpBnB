'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Images';

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
        id: 1,
        url: 'image1 url',
        preview: true,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        url: 'image2 url',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        url: 'image3 url',
        preview: true,
        imageableId: 3,
        imageableType: 'Spot',
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
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
