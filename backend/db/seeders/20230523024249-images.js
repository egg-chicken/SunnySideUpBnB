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
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236686/airbnb-proj/spot2/a24da633f031c7df91327f827c7145bc-cc_ft_960_xryur9.webp',
        preview: true,
        imageableId: 2,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 3,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688236906/airbnb-proj/spot3/2beb143557e1c44cb58b125e0b7348dc-cc_ft_960_lksyf2.webp',
        preview: true,
        imageableId: 3,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688237804/airbnb-proj/spot4/6efb1b04e3b6554583eefe156ee8ac57-cc_ft_960_ssxsj2.webp',
        preview: true,
        imageableId: 4,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 5,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240550/airbnb-proj/spot5/114a1cc7ef9f08cce4ba5785977bec5c-cc_ft_960_tlcolh.webp',
        preview: true,
        imageableId: 5,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 6,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688240735/airbnb-proj/spot6/114d81583719f117e368bd17242c7a30-cc_ft_384_cqe1zd.webp',
        preview: true,
        imageableId: 6,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 7,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241072/airbnb-proj/spot7/a0e20848fedd8d3c52936acc28c9f6ac-cc_ft_960_sywd8a.webp',
        preview: true,
        imageableId: 7,
        imageableType: 'Spot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 8,
        url: 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688241658/airbnb-proj/spot8/f591e0991e6bcd0453a0409082abe386-cc_ft_960_viqppm.webp',
        preview: true,
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
