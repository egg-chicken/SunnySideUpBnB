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
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021129/airbnb-proj/spot1/spot1-review.webp',//real pic
        preview: true,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021201/airbnb-proj/spot1/ea353652c2b0863624d51901bfa79eea-cc_ft_768_fpb3fa.webp',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021181/airbnb-proj/spot1/590bb374ace2057cccc12afdc48a59f9-cc_ft_768_z5jys5.webp',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021154/airbnb-proj/spot1/9eaee51201d9a2665c8808085612ce1e-cc_ft_768_mzf1bu.webp',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021244/airbnb-proj/spot1/334f322b2b69306444da7210fcc5ad6c-cc_ft_768_zbx09n.webp',
        preview: false,
        imageableId: 1,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236686/airbnb-proj/spot2/preview-spot2.webp',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236705/airbnb-proj/spot2/coast_view.webp',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236721/airbnb-proj/spot2/living_room.webp',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236742/airbnb-proj/spot2/kitchen.webp',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 2,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236763/airbnb-proj/spot2/bathroom_oceanview.webp',
        preview: false,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236906/airbnb-proj/spot3/preview-spot3.webp',
        preview: true,
        imageableId: 3,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236924/airbnb-proj/spot3/spot3_kitchen.webp',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236938/airbnb-proj/spot3/spot3_outdoor_dining.webp',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236961/airbnb-proj/spot3/spot3_bedroom.webp',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237092/airbnb-proj/spot3/spot3_fun_area.webp',
        preview: false,
        imageableId: 3,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237804/airbnb-proj/spot4/outdoor-cabin.webp',
        preview: true,
        imageableId: 4,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237834/airbnb-proj/spot4/spot4_family_area.webp',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237856/airbnb-proj/spot4/spot4_bedroom.webp',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237904/airbnb-proj/spot4/spot4_kitchen.webp',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237950/airbnb-proj/spot4/spot4_land_overview.webp',
        preview: false,
        imageableId: 4,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 5,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240550/airbnb-proj/spot5/spot5_preview2.webp',
        preview: true,
        imageableId: 5,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 5,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240579/airbnb-proj/spot5/spot5_cozy_living.webp',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 5,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240607/airbnb-proj/spot5/spot5_bedroom_stay.webp',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 5,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240632/airbnb-proj/spot5/spot5_patio.webp',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 5,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240654/airbnb-proj/spot5/spot5_patio_overview.webp',
        preview: false,
        imageableId: 5,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 6,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240735/airbnb-proj/spot6/spot6_front_home_night.webp',
        preview: true,
        imageableId: 6,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 6,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240753/airbnb-proj/spot6/spot6_pool_backyard.webp',
        preview: false,
        imageableId: 6,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 6,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240791/airbnb-proj/spot6/spot6_home_gym.webp',
        preview: false,
        imageableId: 6,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 6,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240810/airbnb-proj/spot6/spot6_bedroom.webp',
        preview: false,
        imageableId: 6,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 6,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240836/airbnb-proj/spot6/spot6_bar_hangout.webp',
        preview: false,
        imageableId: 6,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 7,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241072/airbnb-proj/spot7/home-garden-preview.webp',
        preview: true,
        imageableId: 7,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 7,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241100/airbnb-proj/spot7/spot7_kitchen.webp',
        preview: false,
        imageableId: 7,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 7,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241116/airbnb-proj/spot7/spot7_bedroom.webp',
        preview: false,
        imageableId: 7,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 7,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241141/airbnb-proj/spot7/spot7_pool.webp',
        preview: false,
        imageableId: 7,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 7,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241165/airbnb-proj/spot7/spot7_kids_bedroom.webp',
        preview: false,
        imageableId: 7,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 8,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241658/airbnb-proj/spot8/cube-preview.webp',
        preview: true,
        imageableId: 8,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 8,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241681/airbnb-proj/spot8/spot8_hangout_bonfire.webp',
        preview: false,
        imageableId: 8,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 8,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241720/airbnb-proj/spot8/spot8_lookout.webp',
        preview: false,
        imageableId: 8,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 8,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241736/airbnb-proj/spot8/spot8_living.webp',
        preview: false,
        imageableId: 8,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 8,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241772/airbnb-proj/spot8/spot8_bedroom.webp',
        preview: false,
        imageableId: 8,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
