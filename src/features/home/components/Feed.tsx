import { memo } from 'react';
import { HomeArticlesType, User } from 'src/common/models';

const Feed = memo(
  ({
    user,
    articlesType,
    tag,
    onSelectArticlesType
  }: {
    user: User | null;
    articlesType: HomeArticlesType;
    tag: string;
    onSelectArticlesType: Function;
  }) => {
    console.log('feed re render');
    return (
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {user && (
            <li className="nav-item" onClick={() => onSelectArticlesType('feed')}>
              <a className={`nav-link ${articlesType === 'feed' && !tag && 'active'}`}>Your Feed</a>
            </li>
          )}
          <li className="nav-item" onClick={() => onSelectArticlesType('global')}>
            <a className={`nav-link ${articlesType === 'global' && !tag && 'active'}`}>
              Global Feed
            </a>
          </li>
          {tag && (
            <li className="nav-item">
              <a className="nav-link active">#{tag}</a>
            </li>
          )}
        </ul>
      </div>
    );
  }
);

export default Feed;
