'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Episode.init({
    series_id: DataTypes.INTEGER,
    episode_number: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    video_url: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    is_premium: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Episode',
  });
  return Episode;
};