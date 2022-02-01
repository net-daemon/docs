module.exports = {
  title: 'NetDaemon',
  tagline: 'Application platform written in c# for Home Assistant',
  url: 'https://netdaemon.xyz',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['csharp'],
    },
    navbar: {
      title: 'NetDaemon',
      logo: {
        alt: 'NetDaemon Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          to: 'docs/v2',
          activeBasePath: 'docs',
          label: 'Docs V2',
          position: 'left',
        },
        {
          to: '/docs/v3',
          activeBasePath: 'docs/v3',
          label: 'Docs V3',
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
              to: 'docs/get_started_index',
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
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};
