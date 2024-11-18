import { Author, Tag } from "../../../hooks/useArticles";

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
        <ul className="tags">
          {tags.map(({ value }) => {
            return <li>{value}</li>;
          })}
        </ul>
      )}
      <div className="autor-and-date">
        <div>{author.name}</div>
        <div>{publishedOn}</div>
      </div>
      <div className="description">{description}</div>
    </>
  );
};
