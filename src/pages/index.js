import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const codePreview = [
  [
    { token: 'keyword', text: 'using' },
    { text: ' ' },
    { token: 'namespace', text: 'System' },
    { text: ';' },
  ],
  [
    { token: 'keyword', text: 'using' },
    { text: ' ' },
    { token: 'namespace', text: 'System.Reactive.Linq' },
    { text: ';' },
  ],
  [
    { token: 'keyword', text: 'using' },
    { text: ' ' },
    { token: 'namespace', text: 'NetDaemon.AppModel' },
    { text: ';' },
  ],
  [
    { token: 'keyword', text: 'using' },
    { text: ' ' },
    { token: 'namespace', text: 'NetDaemon.HassModel' },
    { text: ';' },
  ],
  [
    { token: 'keyword', text: 'using' },
    { text: ' ' },
    { token: 'namespace', text: 'HomeAssistantGenerated' },
    { text: ';' },
  ],
  [],
  [
    { text: '[' },
    { token: 'attribute', text: 'NetDaemonApp' },
    { text: ']' },
  ],
  [
    { token: 'keyword', text: 'public' },
    { text: ' ' },
    { token: 'keyword', text: 'class' },
    { text: ' ' },
    { token: 'type', text: 'ExampleAppHaContext' },
  ],
  [{ text: '{' }],
  [
    { text: '    ' },
    { token: 'keyword', text: 'public' },
    { text: ' ' },
    { token: 'type', text: 'ExampleAppHaContext' },
    { text: '(' },
    { token: 'type', text: 'IHaContext' },
    { text: ' ha)' },
  ],
  [{ text: '    {' }],
  [
    { text: '        ' },
    { token: 'keyword', text: 'var' },
    { text: ' entities = ' },
    { token: 'keyword', text: 'new' },
    { text: ' ' },
    { token: 'type', text: 'Entities' },
    { text: '(ha);' },
  ],
  [],
  [
    { text: '        entities.' },
    { token: 'property', text: 'BinarySensor' },
    { text: '.' },
    { token: 'property', text: 'OfficeMotion' },
  ],
  [
    { text: '            .' },
    { token: 'method', text: 'StateChanges' },
    { text: '()' },
  ],
  [
    { text: '            .' },
    { token: 'method', text: 'Where' },
    { text: '(e => e.' },
    { token: 'property', text: 'New' },
    { text: '.' },
    { token: 'method', text: 'IsOn' },
    { text: '())' },
  ],
  [
    { text: '            .' },
    { token: 'method', text: 'Subscribe' },
    { text: '(_ => entities.' },
    { token: 'property', text: 'Light' },
    { text: '.' },
    { token: 'property', text: 'Office' },
    { text: '.' },
    { token: 'method', text: 'TurnOn' },
    { text: '());' },
  ],
  [{ text: '    }' }],
  [{ text: '}' }],
];

const features = [
  {
    icon: '</>',
    title: 'Built for C# developers',
    description:
      'Write automations in C# with a rich API, modern .NET patterns, and tooling that feels familiar from the first project.',
  },
  {
    image: 'img/hass.png',
    title: 'Deep Home Assistant integration',
    description:
      'Use real-time events, entities, services, and state through fast websocket integration.',
  },
  {
    icon: '=>',
    title: 'Developer experience first',
    description:
      'Strong typing, IntelliSense, templates, and rapid local iteration help keep automations easy to maintain.',
  },
];

const fallbackStats = [
  { key: 'stars', value: 299, label: 'Stars' },
  { key: 'forks', value: 80, label: 'Forks' },
  { key: 'contributors', value: 48, label: 'Contributors' },
];

const githubRepositoryUrl = 'https://api.github.com/repos/net-daemon/netdaemon';
const githubContributorsUrl = `${githubRepositoryUrl}/contributors?per_page=1&anon=true`;

const uses = ['Home Automation', 'Smart Buildings', 'Integrations', 'Prototyping', 'Open Source'];

function formatStatValue(value) {
  if (!Number.isFinite(value)) {
    return value;
  }

  return new Intl.NumberFormat('en-US', {
    notation: value >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value);
}

function getContributorCount(linkHeader) {
  const lastPageMatch = linkHeader?.match(/[?&]page=(\d+)>;\s*rel="last"/);

  if (!lastPageMatch) {
    return null;
  }

  return Number.parseInt(lastPageMatch[1], 10);
}

async function fetchGithubStats(signal) {
  const [repositoryResponse, contributorsResponse] = await Promise.all([
    fetch(githubRepositoryUrl, { signal }),
    fetch(githubContributorsUrl, { signal }),
  ]);

  if (!repositoryResponse.ok || !contributorsResponse.ok) {
    throw new Error('Unable to load GitHub stats');
  }

  const repository = await repositoryResponse.json();
  const contributorCount = getContributorCount(contributorsResponse.headers.get('Link'));

  if (
    !Number.isFinite(repository.stargazers_count) ||
    !Number.isFinite(repository.forks_count) ||
    !Number.isFinite(contributorCount)
  ) {
    throw new Error('GitHub stats response was incomplete');
  }

  return [
    { key: 'stars', value: repository.stargazers_count, label: 'Stars' },
    { key: 'forks', value: repository.forks_count, label: 'Forks' },
    { key: 'contributors', value: contributorCount, label: 'Contributors' },
  ];
}

function FeatureCard({ icon, image, title, description }) {
  const imageUrl = image ? useBaseUrl(image) : null;

  return (
    <article className={styles.featureCard}>
      <div className={styles.featureIcon}>
        {imageUrl ? <img src={imageUrl} alt="" /> : <span>{icon}</span>}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

function CodePanel() {
  return (
    <div className={styles.codeWrap} aria-label="NetDaemon C# automation example">
      <div className={styles.languagePill}>C#</div>
      <pre className={styles.codePanel}>
        <code>
          {codePreview.map((line, lineIndex) => (
            <span className={styles.codeLine} key={lineIndex}>
              {line.map((part, partIndex) => (
                <span className={part.token ? styles[part.token] : undefined} key={partIndex}>
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
      <div className={styles.homeAssistantBadge}>
        <img src={useBaseUrl('img/hass.png')} alt="Home Assistant" />
      </div>
    </div>
  );
}

function DiscordLogo() {
  return (
    <svg viewBox="0 0 245 240" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.3-5 10.2-11.1 0-6.1-4.5-11.1-10.2-11.1Zm36.5 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.3-5 10.2-11.1 0-6.1-4.5-11.1-10.2-11.1Z"
      />
      <path
        fill="currentColor"
        d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2L210 220V40.6c0-11.4-9.2-20.6-20.5-20.6Zm-38.6 130s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.4-14.5 4.2-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.2-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.7 15.2Z"
      />
    </svg>
  );
}

export default function Home() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    document.body.classList.add('homepage-dark-navbar');

    return () => {
      document.body.classList.remove('homepage-dark-navbar');
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchGithubStats(controller.signal)
      .then(setStats)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setStats(fallbackStats);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Layout
      title="NetDaemon"
      description="C# automation platform for Home Assistant">
      <main className={styles.pageShell}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1>
                Automate Home Assistant with <span>C#</span>
              </h1>
              <p className={styles.lede}>
                NetDaemon is a modern C# automation platform for Home Assistant.
                Powerful. Developer-friendly. Open source.
              </p>
              <div className={styles.heroActions}>
                <Link className={classnames(styles.button, styles.primaryButton)} to="/docs/user/started/get_started/">
                  Get Started <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link className={classnames(styles.button, styles.secondaryButton)} to="/docs/user/">
                  View Documentation <span aria-hidden="true">[]</span>
                </Link>
              </div>
            </div>
            <CodePanel />
          </div>
        </section>

        <section className={styles.features} aria-label="NetDaemon benefits">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </section>

        <section className={styles.githubPanel} aria-label="GitHub community">
          <div className={styles.githubIntro}>
            <div className={styles.githubMark}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 0.3C5.4 0.3 0 5.7 0 12.4c0 5.3 3.4 9.8 8.2 11.4 0.6 0.1 0.8-0.3 0.8-0.6v-2.1c-3.3 0.7-4-1.4-4-1.4-0.5-1.4-1.3-1.8-1.3-1.8-1.1-0.7 0.1-0.7 0.1-0.7 1.2 0.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 0.1-0.8 0.4-1.3 0.7-1.6-2.7-0.3-5.5-1.3-5.5-5.9 0-1.3 0.5-2.4 1.2-3.2-0.1-0.3-0.5-1.6 0.1-3.2 0 0 1-0.3 3.3 1.2 1-0.3 2-0.4 3.1-0.4s2.1 0.1 3.1 0.4c2.3-1.6 3.3-1.2 3.3-1.2 0.6 1.6 0.2 2.9 0.1 3.2 0.8 0.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9 0.4 0.4 0.8 1.1 0.8 2.3v3.4c0 0.3 0.2 0.7 0.8 0.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.7 18.6 0.3 12 0.3Z"
                />
              </svg>
            </div>
            <div>
              <h2>Open source on GitHub</h2>
              <p>Join the community, contribute, and help make NetDaemon even better.</p>
              <Link className={styles.githubButton} to="https://github.com/net-daemon/netdaemon">
                View on GitHub
              </Link>
            </div>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <strong>{formatStatValue(stat.value)}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.discordPanel} aria-label="Discord community">
          <div className={styles.discordIntro}>
            <div className={styles.discordMark}>
              <DiscordLogo />
            </div>
            <div>
              <h2>Join the NetDaemon Discord</h2>
              <p>Get help, share automations, discuss ideas, and follow what the community is building.</p>
            </div>
          </div>
          <Link className={styles.discordButton} to="https://discord.gg/K3xwfcX">
            Join Discord <span aria-hidden="true">-&gt;</span>
          </Link>
        </section>

        <section className={styles.useCases} aria-label="Common use cases">
          <p>Trusted by Home Assistant enthusiasts and professionals</p>
          <div>
            {uses.map((use) => (
              <span key={use}>{use}</span>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
