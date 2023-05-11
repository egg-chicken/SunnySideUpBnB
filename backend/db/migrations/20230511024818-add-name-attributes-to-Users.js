'use strict';

let options = {}
options.tableName = "Users"
options.schema = airbnb

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(options, 'firstName', {
      type: Sequelize.STRING,

    });
    await queryInterface.addColumn(options, 'lastName', {
      type: Sequelize.STRING,

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn(options, 'firstName');
    await queryInterface.addColumn(options, 'lastName');
  }
};
