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
        //id: 1,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021129/airbnb-proj/spot1/d4ce648e8d26d05a403bee6d0c8fa356-cc_ft_1536_p9piom.webp',//real pic
        preview: true,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1,
        url: 'Image1 url',
        preview: true,
        imageableId: 1,
        imageableType: 'Review',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        url: 'Image2 url',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'Image3 url',
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
