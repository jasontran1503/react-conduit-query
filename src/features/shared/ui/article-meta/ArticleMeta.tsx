import { Link } from 'react-router-dom';
import { Article } from 'src/common/models';

const ArticleMeta = ({ article, children }: { article: Article; children: JSX.Element }) => {
  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt="" />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        {/* <span className="date">{article.createdAt}</span> */}
      </div>
      {children}
    </div>
  );
};

export default ArticleMeta;
