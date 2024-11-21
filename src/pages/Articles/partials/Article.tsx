import { Author, Tag } from "../../../types";
import styles from "../../../styles/styles.module.css";

interface ArticleProps {
  tags: Tag[];
  author: Author;
  publishedOn: string;
  description: string;
}

export const Article = (props: ArticleProps) => {
  const { tags, author, publishedOn, description } = props;

  return (
    <>
      {tags && (
        <ul className={`${styles.unorderedList} ${styles.tags}`}>
          {tags.map(({ value }) => {
            return <li key={value}>{value}</li>;
          })}
        </ul>
      )}
      <div className={styles.autorAndDate}>
        <div>{author.name}</div>
        <div>{publishedOn}</div>
      </div>
      <div className={styles.description}>{description}</div>
    </>
  );
};
