import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Mermaid from "@theme/Mermaid";
import ThemedImage from "@theme/ThemedImage"; // ← Add this
import useBaseUrl from "@docusaurus/useBaseUrl";

const FeatureList = [
  {
    title: "Graphical Interface",
    imageDark: require("@site/static/img/dashboard.png").default,
    imageLight: require("@site/static/img/dashboard-light.png").default,
    description: (
      <>
        Preroll Plus offers an easy-to-use web-based graphical interface that's mobile-friendly and lets you build
        complex preroll sequences visually.
      </>
    ),
  },
  {
    title: "Hybrid Random + Sequential",
    image: null, // No image here – using Mermaid instead
    description: (
      <>
        <div style={{ marginBottom: "1rem" }}>
          Preroll Plus overcomes Plex's limitations of choosing either a sequential list of prerolls to play or a random
          preroll from a list of prerolls.
          <br />
          See the <a href="/docs/Introduction">Introduction</a> for details on how this works.
        </div>
        <br />
        <Mermaid
          value={`flowchart LR
          bucket1[(**Bucket 1**<br><br>Christmas Preroll 1<br>Christmas Preroll 2<br>Christmas Preroll 3)] --> bucket2[(**Bucket 2**<br><br>Plex Logo 1<br>Plex Logo 2<br>Plex Logo 3)]
        `}
        />
      </>
    ),
  },
  {
    title: "Scheduled & Holiday-Aware",
    imageDark: require("@site/static/img/calendar-schedule.png").default,
    imageLight: require("@site/static/img/calendar-light.png").default,
    description: (
      <>
        Create sequences that automatically rotate daily/weekly or switch based on holidays using built-in calendar
        integration.
      </>
    ),
  },
];

function Feature({ imageLight, imageDark, title, description }) {
  const lightSrc = useBaseUrl(imageLight);
  const darkSrc = useBaseUrl(imageDark);

  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {imageLight && imageDark ? (
          <ThemedImage
            alt={`${title} screenshot`}
            sources={{
              light: lightSrc,
              dark: darkSrc,
            }}
            className={styles.featureImage}
            width={300}
            height={200}
          />
        ) : (
          // Mermaid or placeholder
          <div className={styles.featurePlaceholder} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
