/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.colorcraft.dev', // Replace with your actual domain
    generateRobotsTxt: true, // Optional: generates a robots.txt file
    // Define static and dynamic paths
    async additionalPaths() {
      const navLinks = [
        { href: "/Tools/CodeConvertor", label: "Code Convertor" },
        { href: "/Tools/ColorList", label: "Color Lists" },
        { href: "/Tools/ImageToColors", label: "Image to Color" },
        { href: "/Tools", label: "All tools" },
      ];
  
      const Resources = {
        "/Resources/ColorList": "Colors",
        "/Resources/GradientList": "Gradients",
        "/Resources/PaletteList": "Palettes",
      };
  
      // Convert navLinks to sitemap entries
      const navLinkPaths = navLinks.map((link) => ({
        loc: link.href,
        lastmod: new Date().toISOString().split('T')[0], // Today’s date
        changefreq: 'weekly',
        priority: '0.8',
      }));
  
      // Convert Resources to sitemap entries
      const resourcePaths = Object.keys(Resources).map((path) => ({
        loc: path,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      }));
  
      // Combine all paths (add homepage too if needed)
      return [
        {
          loc: '/',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'daily',
          priority: '1.0',
        },
        ...navLinkPaths,
        ...resourcePaths,
      ];
    },
  };