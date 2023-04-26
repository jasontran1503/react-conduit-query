import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HomeArticlesType, User } from 'src/common/models';
import appApi from '../shared/data-access/app.api';
import Articles from '../shared/ui/articles/Articles';
import Feed from './components/Feed';
import Tags from './components/Tags';

const Home = ({ user }: { user: User | null }) => {
  const [articlesType, setArticlesType] = useState<HomeArticlesType>('global');
  const [tag, setTag] = useState<string>('');

  const onSelectArticlesType = (type: HomeArticlesType) => {
    setArticlesType(type);
    setTag('');
  };

  const onSelectTag = (tag: string) => {
    setArticlesType(tag as HomeArticlesType);
    setTag(tag);
  };

  const { data: articles, status } = useQuery({
    queryKey: ['articles', { articlesType }],
    queryFn: () => {
      switch (articlesType) {
        case 'feed':
          return appApi.getYourFeed();
        case 'global':
          return appApi.getGlobalFeed();
        default:
          return appApi.getArticlesByTag(tag);
      }
    },
    initialData: []
  });

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Feed
              user={user}
              articlesType={articlesType}
              tag={tag}
              onSelectArticlesType={onSelectArticlesType}
            />

            <Articles status={status} articles={articles} articlesType={articlesType} />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags onSelectTag={onSelectTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
