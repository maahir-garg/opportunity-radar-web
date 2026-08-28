import { SectionHeader } from '@/components/primitives/SectionHeader';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import {
  instagramSampleCaption,
  outreachEmail,
  posterConcept,
  telegramSamplePost,
} from '@/lib/content/campaign';
import styles from './AssetSamples.module.css';

/** A QR placeholder drawn as a simple repeating square pattern, never a real QR image. */
function QrPlaceholder() {
  const cells = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1];
  return (
    <svg
      className={styles.qrSvg}
      viewBox="0 0 4 4"
      role="img"
      aria-label="QR placeholder square graphic, not a scannable code"
    >
      {cells.map((filled, index) => {
        const x = index % 4;
        const y = Math.floor(index / 4);
        return filled ? (
          <rect key={index} x={x} y={y} width="1" height="1" fill="currentColor" />
        ) : null;
      })}
    </svg>
  );
}

/** Written-out sample artefacts: Telegram post, Instagram caption, outreach email, poster. */
export function AssetSamples() {
  return (
    <div>
      <SectionHeader
        overline="Implementation: samples"
        title="Sample assets"
        lead="What each channel&rsquo;s first piece would actually say: short, plain, and written the way a student would send it."
      />
      <p className={`type-small ${styles.illustrative}`}>
        The listings named in these samples are illustrative placeholders. Real posts would only
        carry opportunities we have a source for.
      </p>
      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.telegram}`}>
          <p className="type-caption">Sample Telegram post</p>
          <div className={styles.telegramFrame}>
            <p className={`type-label ${styles.telegramChannel}`}>{telegramSamplePost.channelName}</p>
            <p className={`type-small ${styles.telegramBody}`}>{telegramSamplePost.body}</p>
          </div>
        </article>

        <article className={`${styles.card} ${styles.instagram}`}>
          <p className="type-caption">Sample Instagram caption</p>
          <div className={styles.instagramFrame}>
            <p className="type-label">{instagramSampleCaption.handle}</p>
            <p className="type-small">{instagramSampleCaption.caption}</p>
          </div>
        </article>

        <article className={`${styles.card} ${styles.email}`}>
          <p className="type-caption">Sample society outreach email</p>
          <div className={styles.emailFrame}>
            <p className="type-small">
              <span className={styles.emailLabel}>To: </span>
              {outreachEmail.to}
            </p>
            <p className="type-small">
              <span className={styles.emailLabel}>Subject: </span>
              {outreachEmail.subject}
            </p>
            <p className={`type-small ${styles.emailBody}`}>{outreachEmail.body}</p>
          </div>
        </article>

        <article className={`${styles.card} ${styles.poster}`}>
          <p className="type-caption">Poster concept</p>
          <div className={styles.posterFrame}>
            <p className={`type-h3 ${styles.posterHeadline}`}>{posterConcept.headline}</p>
            <p className={`type-small ${styles.posterBody}`}>{posterConcept.body}</p>
            <div className={styles.posterQr}>
              <QrPlaceholder />
              <span className="type-caption">{posterConcept.qrLabel}</span>
            </div>
            <p className={`type-caption ${styles.posterFooter}`}>{posterConcept.footer}</p>
          </div>
          <VisuallyHidden>Portrait poster mock-up, A3 print size</VisuallyHidden>
        </article>
      </div>
    </div>
  );
}
