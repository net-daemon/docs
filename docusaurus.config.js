module.exports = {
  title: 'NetDaemon',
  tagline: 'Application platform written in c# for Home Assistant',
  url: 'https://netdaemon.xyz',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'net-daemon', // Usually your GitHub org/user name.
  projectName: 'netdaemon', // Usually your repo name.
  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: 'R7R11YZ1OU',

      // Public API key: it is safe to commit it
      apiKey: 'a68a1e966bf0fa56c6d41baec05a8f2d',

      indexName: 'NetDaemon',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //replaceSearchResultPathname: {
      //  from: '/docs/', // or as RegExp: /\/docs\//
      //  to: '/',
      //},

      // Optional: Algolia search parameters
      //searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      //... other Algolia params
    }, 
    prism: {
      additionalLanguages: ['csharp', 'powershell'],
    },
    navbar: {
      title: 'NetDaemon',
      logo: {
        alt: 'NetDaemon Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          to: '/docs/v3',
          activeBasePath: 'docs/v3',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/developer',
          activeBasePath: 'docs',
          label: 'Developer',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/net-daemon/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting started',
              to: 'docs/get_started',
            },
            // {
            //   label: 'Second Doc',
            //   to: 'docs/doc2',
            // },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/K3xwfcX',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/net-daemon/netdaemon/issues',
            },
            {
              label: 'NetDaemon',
              href: 'https://github.com/net-daemon/netdaemon',
            },
          ],
        },
        {
          title: 'Attribution',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'Logo - chris 論',
              href: 'https://commons.wikimedia.org/wiki/User:Chrkl',
            },
            {
              label: 'HACS - ludeeus',
              href: 'https://github.com/ludeeus',
            },
            {
              label: 'Home Assistant devs',
              href: 'https://www.home-assistant.io/developers/credits/#contributors',
            },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
      ],
      copyright: `<a href='https://www.netlify.com/'>This site is powered by Netlify</a>`,

      // image: 'https://www.netlify.com/img/global/badges/netlify-color-accent.svg',
      //image: 'img/favicon.png',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/net-daemon/docs/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {},
      },
    ],
  ],
  plugins: [

  ],
};
