import Image from 'next/image';
import { RadarArcs } from '@/components/primitives/RadarArcs';
import { RadarMark } from '@/components/primitives/RadarMark';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import {
  instagramSampleCaption,
  outreachEmail,
  posterConcept,
  telegramSamplePost,
} from '@/lib/content/campaign';
import styles from './AssetSamples.module.css';

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
          <p className="type-caption">Poster concept · A3 print size</p>
          <div className={styles.posterFrame}>
            <div className={styles.posterArcs} aria-hidden="true">
              <RadarArcs className={styles.posterArcsSvg} />
            </div>
            <div className={styles.posterContent}>
              <RadarMark withWordmark />
              <div className={styles.posterCopy}>
                <p className={`type-h1 ${styles.posterHeadline}`}>{posterConcept.headline}</p>
                <p className={`type-body ${styles.posterBody}`}>{posterConcept.body}</p>
              </div>
              <div className={styles.posterQr}>
                <div className={styles.posterQrTile}>
                  <Image
                    src="/waitlist-qr.svg"
                    alt="QR code linking to the Radar pilot waitlist page"
                    width={240}
                    height={240}
                    className={styles.posterQrImage}
                    unoptimized
                  />
                </div>
                <p className={`type-label ${styles.posterQrCta}`}>{posterConcept.qrCta}</p>
                <p className={`type-caption ${styles.posterQrUrl}`}>{posterConcept.qrUrl}</p>
              </div>
              <p className={`type-caption ${styles.posterFooter}`}>{posterConcept.footer}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
