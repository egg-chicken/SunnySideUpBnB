'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
options.tableName = 'Spots';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
        // id: 1,
        ownerId: 1,
        address: '12345 test street',
        city: 'test01',
        state: 'Oregon',
        country: 'Country',
        lat: 123.456,
        lng: 78.910,
        name: 'Spot 1',
        description: 'This is Spot 1',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2,
        ownerId: 2,
        address: '2 test street',
        city: 'test02',
        state: 'Oregon',
        country: 'Country',
        lat: 123.456,
        lng: 78.910,
        name: 'Spot 2',
        description: 'This is Spot 2',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        ownerId: 3,
        address: '3 test street',
        city: 'test02',
        state: 'Oregon',
        country: 'Country',
        lat: 123.456,
        lng: 78.910,
        name: 'Spot 2',
        description: 'This is Spot 3',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize){
     await queryInterface.bulkDelete(options, null, {})
  }

};
