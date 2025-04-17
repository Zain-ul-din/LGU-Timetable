/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lgutimetable.vercel.app',
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const result = [];

    result.push({
      loc: '/index.amp.html',
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date().toISOString(),
      // acts only on '/additional-page-2'
      alternateRefs: [
        {
          href: 'https://lgutimetable.vercel.app',
          hreflang: 'en'
        }
      ]
    });

    return result;
  }
};
