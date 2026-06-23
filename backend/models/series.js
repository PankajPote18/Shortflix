'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Series.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    poster: DataTypes.STRING,
    banner: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    views: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    language: DataTypes.STRING,
    release_year: DataTypes.INTEGER,
    total_episodes: DataTypes.INTEGER,
    featured: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Series',
  });
  return Series;
};