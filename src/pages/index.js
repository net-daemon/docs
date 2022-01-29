import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>For the C# developer</>,
    imageUrl: 'img/C_Sharp_logo.svg',
    description: (
      <>
        With NetDaemon you can write your home automations in C# for Home Assistant using modern .NET design. NetDaemon is open source and will always be free!
      </>
    ),
  },
  {
    title: <>Integrated with Home Assistant</>,
    imageUrl: 'img/hass.png',
    description: (
      <>
        Integrated with Home Assistant using websockets for maximum performance. Has advanced scheduling and a easy to use API.
      </>
    ),
  },
  {
    title: <>For the end-user</>,
    imageUrl: 'img/hacs.png',
    description: (
      <>
        NetDaemon apps can be provided to end-users through the HACS ecosystem.
      </>
    ),
  },

];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Home automations in c# for Home Assistant">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/get_started_index')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
