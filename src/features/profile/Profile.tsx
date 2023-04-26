import { useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProfileArticlesType, User } from 'src/common/models';
import appApi from '../shared/data-access/app.api';
import Articles from '../shared/ui/articles/Articles';
import FollowButton from '../shared/ui/buttons/follow-button/FollowButton';

const Profile = ({ user }: { user: User | null }) => {
  const username = useParams<{ username: string }>().username;
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [articlesType, setArticlesType] = useState<ProfileArticlesType>('author');

  const [{ data: profile }, { data: articles, status }] = useQueries({
    queries: [
      {
        queryKey: ['profile', { username }],
        queryFn: () => {
          if (username) {
            setIsOwner(user?.username === username);
            return appApi.getProfile(username);
          }
        }
      },
      {
        queryKey: ['articles', { articlesType }],
        queryFn: () => {
          if (username) {
            return appApi.getProfileArticles(articlesType, username);
          }
        },
        initialData: []
      }
    ]
  });

  useEffect(() => setArticlesType('author'), [username]);

  return (
    <>
      <div className="profile-page">
        {profile && (
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profile.image} className="user-img" alt="" />
                  <h4>{profile.username}</h4>
                  <p>{profile.bio}</p>
                  {isOwner ? (
                    <Link to="/settings">
                      <button className="btn btn-sm btn-outline-secondary action-btn">
                        <i className="ion-gear-a"></i>
                        &nbsp; Edit profile settings
                      </button>
                    </Link>
                  ) : (
                    <FollowButton following={profile.following} username={profile.username} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item" onClick={() => setArticlesType('author')}>
                    <a className={`nav-link ${articlesType === 'author' && 'active'}`}>
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setArticlesType('favorited')}>
                    <a className={`nav-link ${articlesType === 'favorited' && 'active'}`}>
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
              {articles && (
                <Articles status={status} articles={articles} articlesType={articlesType} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
