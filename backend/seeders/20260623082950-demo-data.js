'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      { name: 'Romance', slug: 'romance', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Drama', slug: 'drama', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Comedy', slug: 'comedy', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Thriller', slug: 'thriller', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Action', slug: 'action', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fantasy', slug: 'fantasy', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mystery', slug: 'mystery', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Family', slug: 'family', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Categories', categories);

    const seriesData = [];
    for (let i = 1; i <= 50; i++) {
      seriesData.push({
        title: faker.lorem.words({ min: 2, max: 5 }),
        description: faker.lorem.paragraph(),
        poster: `https://picsum.photos/540/960?random=${i}`,
        banner: `https://picsum.photos/1280/720?random=${i + 100}`,
        rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
        views: faker.number.int({ min: 1000, max: 1000000 }),
        genre: faker.helpers.arrayElement(categories).name,
        language: 'English',
        release_year: faker.number.int({ min: 2020, max: 2026 }),
        total_episodes: 20,
        featured: i <= 5, // Make first 5 featured
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Series', seriesData);

    // Get the inserted series to get their IDs
    const seriesRecords = await queryInterface.sequelize.query(
      'SELECT id FROM Series;'
    );
    const seriesRows = seriesRecords[0];

    const episodesData = [];
    let episodeIdCounter = 1;

    for (const series of seriesRows) {
      for (let j = 1; j <= 20; j++) {
        episodesData.push({
          series_id: series.id,
          episode_number: j,
          title: `Episode ${j}: ${faker.lorem.words({ min: 2, max: 4 })}`,
          description: faker.lorem.sentences(2),
          video_url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
          thumbnail: `https://picsum.photos/320/180?random=${episodeIdCounter}`,
          duration: faker.number.int({ min: 60, max: 180 }), // 1 to 3 mins
          is_premium: j > 5, // Episodes 6-20 are premium
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        episodeIdCounter++;
      }
    }

    // Chunk the episode inserts to avoid MySQL max allowed packet issues
    const chunkSize = 500;
    for (let i = 0; i < episodesData.length; i += chunkSize) {
      const chunk = episodesData.slice(i, i + chunkSize);
      await queryInterface.bulkInsert('Episodes', chunk);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Episodes', null, {});
    await queryInterface.bulkDelete('Series', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
