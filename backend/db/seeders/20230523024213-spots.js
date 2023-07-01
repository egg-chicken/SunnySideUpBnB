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
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
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
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        ownerId: 3,
        address: '9723 NW Engleman St',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'A lovely City Home',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 4,
        ownerId: 1,
        address: '12345 Test Ave',
        city: 'Bend',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'Perfect Family Home to Rent',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 5,
        ownerId: 1,
        address: '12345 Test Ave',
        city: 'Cannon Beach',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'Perfect Family Home to Rent',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 6,
        ownerId: 1,
        address: '12345 Test Ave',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'Perfect Family Home to Rent',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 7,
        ownerId: 1,
        address: '12345 Test Ave',
        city: 'Eugene',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'Perfect Family Home to Rent',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 8,
        ownerId: 1,
        address: '12345 Test Ave',
        city: 'Newport',
        state: 'Oregon',
        country: 'United States',
        lat: 123.456,
        lng: 78.910,
        name: 'Perfect Family Home to Rent',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatem esse deserunt dolor atque ducimus nesciunt veritatis dolore. Delectus at repellendus voluptate illum eius voluptas ipsa fugit harum nostrum dolore!Sit cupiditate ipsam esse, quibusdam iusto, modi asperiores temporibus corrupti minus vel aperiam. Repudiandae earum similique amet cumque, cum iure quam eaque facere vel optio dignissimos qui repellat accusamus harum!',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize){
     await queryInterface.bulkDelete(options, null, {})
  }

};
