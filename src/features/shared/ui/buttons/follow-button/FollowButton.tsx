import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Article } from 'src/common/models';
import appApi from 'src/features/shared/data-access/app.api';
import { useGetQueryData } from 'src/hooks';

const FollowButton = ({ following, username }: { following: boolean; username: string }) => {
  const client = useQueryClient();
  const article = useGetQueryData<Article>(['article']);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ following, username }: { following: boolean; username: string }) =>
      appApi.toggleFollow(following, username)
  });

  const onToggleFollow = () => {
    mutate(
      { following, username },
      {
        onSuccess: (res) => {
          client.setQueryData(['profile', { username }], res);
          client.setQueryData(['article'], () => {
            if (article) {
              const cloneArticle = { ...article };
              cloneArticle.author = res;
              return cloneArticle;
            }
          });
        }
      }
    );
  };

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      disabled={isLoading}
      onClick={onToggleFollow}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
