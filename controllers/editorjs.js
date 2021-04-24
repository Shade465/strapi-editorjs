const ogs = require('open-graph-scraper');

module.exports = {
  index: async (ctx) => {
    ctx.send({
      message: 'ok',
    });
  },
  fetchUrl: async (ctx) => {
    const options = { url: ctx.query.url };

    const result = await new Promise((resolve) => {
      ogs(options, (error, results, response) => {
        resolve({
          success: 1,
          meta: {
            title: results.ogTitle,
            description: results.ogDescription,
            image: {
              url: results.ogImage.url,
            },
          },
        });
      });
    });

    return result;
  },
};
