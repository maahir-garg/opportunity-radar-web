import styles from './ProductStory.module.css';

export type ProductStoryProps = {
  paragraphs: string[];
};

/** Two to three short paragraphs telling the "why we are building this" story. */
export function ProductStory({ paragraphs }: ProductStoryProps) {
  return (
    <div className={styles.story}>
      {paragraphs.map((paragraph, index) => (
        <p className={`type-body ${styles.paragraph}`} key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
