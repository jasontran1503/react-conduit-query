import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Comment from '../comment/Comment';
import appApi from '../shared/data-access/app.api';
import ArticleMeta from '../shared/ui/article-meta/ArticleMeta';
import Buttons from '../shared/ui/buttons/Buttons';

const Article = () => {
  const slug = useParams<{ slug: string }>().slug;

  const { data: article } = useQuery({
    queryKey: ['article'],
    queryFn: () => {
      if (slug) {
        return appApi.getArticleBySlug(slug);
      }
      return null;
    },
    initialData: null
  });

  return (
    <>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>

              <ArticleMeta article={article}>
                <Buttons article={article} />
              </ArticleMeta>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.body}</p>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <ArticleMeta article={article}>
                <Buttons article={article} />
              </ArticleMeta>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {slug && <Comment slug={slug} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
