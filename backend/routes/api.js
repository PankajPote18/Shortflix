const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Category, Series, Episode } = require('../models');

// GET /api/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/home
router.get('/home', async (req, res) => {
  try {
    const featured = await Series.findAll({ where: { featured: true }, limit: 5 });
    const trending = await Series.findAll({ order: [['views', 'DESC']], limit: 10 });
    const new_releases = await Series.findAll({ order: [['release_year', 'DESC'], ['createdAt', 'DESC']], limit: 10 });
    const most_watched = await Series.findAll({ order: [['views', 'DESC']], limit: 10, offset: 10 });
    
    // Get some categories for rows
    const categories = await Category.findAll({ limit: 5 });
    const categorized = {};
    for (const cat of categories) {
      categorized[cat.name] = await Series.findAll({ where: { genre: cat.name }, limit: 10 });
    }

    res.json({
      featured,
      trending,
      new_releases,
      most_watched,
      categories: categorized
    });
  } catch (error) {
    console.error('Home API Error:', error);
    res.status(500).json({ error: error.toString(), stack: error.stack });
  }
});

// GET /api/series
router.get('/series', async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const query = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    };

    if (search) {
      query.where = {
        title: {
          [Op.like]: `%${search}%`
        }
      };
    }

    const series = await Series.findAndCountAll(query);
    res.json({
      data: series.rows,
      total: series.count,
      page: parseInt(page),
      totalPages: Math.ceil(series.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/series/:id
router.get('/series/:id', async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) return res.status(404).json({ error: 'Series not found' });
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/series/:id/episodes
router.get('/series/:id/episodes', async (req, res) => {
  try {
    const episodes = await Episode.findAll({
      where: { series_id: req.params.id },
      order: [['episode_number', 'ASC']]
    });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/episodes/:id
router.get('/episodes/:id', async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) return res.status(404).json({ error: 'Episode not found' });
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
