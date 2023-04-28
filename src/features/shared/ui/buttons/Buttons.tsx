import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Article, User } from 'src/common/models';
import { useGetQueryData } from 'src/hooks';
import appApi from '../../data-access/app.api';
import FavoriteButton from './favorite-button/FavoriteButton';
import FollowButton from './follow-button/FollowButton';

const Buttons = memo(({ article }: { article: Article }) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const username = useGetQueryData<User>(['user'])?.username;

  const { mutate, isLoading } = useMutation({
    mutationFn: (slug: string) => appApi.deleteArticle(slug)
  });

  const onDeleteArticle = (slug: string) => {
    mutate(slug, {
      onSuccess: () => {
        client.setQueryData(['article'], null);
        navigate('/');
      }
    });
  };

  return (
    <>
      {username === article.author.username ? (
        <>
          <Link className="btn btn-outline-secondary btn-sm" to={`/editor/${article.slug}`}>
            <i className="ion-edit"></i>
            &nbsp;Edit Article
          </Link>
          <button
            style={{ marginLeft: '0.5rem' }}
            className="btn btn-outline-danger btn-sm"
            disabled={isLoading}
            onClick={() => onDeleteArticle(article.slug)}
          >
            <i className="ion-trash-a"></i>
            &nbsp;Delete Article
          </button>
        </>
      ) : (
        <>
          <FollowButton following={article.author.following} username={article.author.username} />
          &nbsp;&nbsp;
          <FavoriteButton article={article}>
            <>
              &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post &nbsp;
              <span className="counter">({article.favoritesCount})</span>
            </>
          </FavoriteButton>
        </>
      )}
    </>
  );
});

export default Buttons;
