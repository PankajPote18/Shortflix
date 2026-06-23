'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      poster: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      views: {
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      release_year: {
        type: Sequelize.INTEGER
      },
      total_episodes: {
        type: Sequelize.INTEGER
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Series');
  }
};