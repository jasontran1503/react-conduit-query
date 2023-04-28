import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ApiStatus, Article, ArticlesType } from 'src/common/models';
import ArticleMeta from '../article-meta/ArticleMeta';
import FavoriteButton from '../buttons/favorite-button/FavoriteButton';

const Articles = memo(
  ({
    status,
    articles,
    articlesType
  }: {
    status: ApiStatus;
    articles: Article[];
    articlesType: ArticlesType;
  }) => {
    return (
      <>
        {articles.length > 0 && (
          <>
            {articles.map((article) => (
              <div key={article.slug} className="article-preview">
                <ArticleMeta article={article}>
                  <FavoriteButton
                    className="pull-xs-right"
                    article={article}
                    articlesType={articlesType}
                  >
                    <>{article.favoritesCount}</>
                  </FavoriteButton>
                </ArticleMeta>
                <Link className="preview-link" to={`/article/${article.slug}`}>
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    {article.tagList.map((tag, index) => (
                      <li key={index} className="tag-default tag-pill tag-outline">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
              </div>
            ))}
          </>
        )}

        {status === 'loading' && <div className="article-preview">Loading articles...</div>}
        {status === 'success' && articles.length === 0 && (
          <div className="article-preview">No articles are here...yet</div>
        )}
      </>
    );
  }
);

export default Articles;
