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
        address: '12345 Test Ave',
        city: 'Corvallis',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'Perfect Family Home to Rent',
        description: 'This is Spot 1',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2,
        ownerId: 2,
        address: '2 Testing Ave',
        city: 'Pacific City',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'A Beautiful Coastal Home',
        description: 'This is Spot 2',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        ownerId: 3,
        address: '3 Test St SE',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'A lively City Home',
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
