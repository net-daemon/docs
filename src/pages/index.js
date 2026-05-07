import React, { useEffect } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const codePreview = `using NetDaemon.HassModel;

public class OfficeMotion : EntityBase
{
    [Entity]
    private BinarySensor OfficeMotion { get; set; }

    [Entity]
    private Light Office { get; set; }

    protected override void Init()
    {
        OfficeMotion.StateChanged()
            .Where(state => state.New?.IsOn() == true)
            .Throttle(TimeSpan.FromSeconds(1))
            .Subscribe(_ => Office.TurnOn());
    }
}`;

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

const stats = [
  { value: '2.1k', label: 'Stars' },
  { value: '240', label: 'Forks' },
  { value: '320+', label: 'Contributors' },
];

const uses = ['Home Automation', 'Smart Buildings', 'Integrations', 'Prototyping', 'Open Source'];

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
        <code>{codePreview}</code>
      </pre>
      <div className={styles.homeAssistantBadge}>
        <img src={useBaseUrl('img/hass.png')} alt="Home Assistant" />
      </div>
    </div>
  );
}

export default function Home() {
  const logoUrl = useBaseUrl('img/favicon.png');

  useEffect(() => {
    document.body.classList.add('homepage-dark-navbar');

    return () => {
      document.body.classList.remove('homepage-dark-navbar');
    };
  }, []);

  return (
    <Layout
      title="NetDaemon"
      description="C# automation platform for Home Assistant">
      <main className={styles.pageShell}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroNavBrand}>
            <img src={logoUrl} alt="" />
            <span>NetDaemon</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>Open source</span>
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
            <div className={styles.githubMark}>GH</div>
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
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
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
