import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { NewComment, User } from 'src/common/models';
import { useGetQueryData } from 'src/hooks';
import { formatDate } from 'src/utils/format-date';
import appApi from '../shared/data-access/app.api';

const Comment = ({ slug }: { slug: string }) => {
  const client = useQueryClient();
  const user = useGetQueryData<User>(['user']);

  const { data: comments } = useQuery({
    queryKey: ['comment'],
    queryFn: () => appApi.getComments(slug),
    initialData: []
  });

  const createCommentMutation = useMutation({
    mutationFn: (comment: NewComment) => appApi.createComment(slug, comment)
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => appApi.deleteComment(slug, id)
  });

  const { register, handleSubmit, reset } = useForm<NewComment>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<NewComment> = (comment) => {
    createCommentMutation.mutate(comment, {
      onSuccess: (res) => {
        client.setQueryData(['comment'], () => {
          const cloneComments = [...comments];
          cloneComments.unshift(res);
          return cloneComments;
        });
        reset();
      }
    });
  };

  const onDeleteComment = (id: number) => {
    if (deleteCommentMutation.isLoading) {
      return;
    }
    deleteCommentMutation.mutate(id, {
      onSuccess: () => client.setQueryData(['comment'], () => comments.filter((x) => x.id === id))
    });
  };

  return (
    <>
      <form className="card comment-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            {...register('body', { required: true })}
          ></textarea>
        </div>
        <div className="card-footer">
          <img src={user?.image} className="comment-author-img" alt="" />
          <button className="btn btn-sm btn-primary" disabled={createCommentMutation.isLoading}>
            Post Comment
          </button>
        </div>
      </form>

      {comments.length > 0 && (
        <>
          {comments.map((comment) => (
            <div className="card" key={comment.id}>
              <div className="card-block">
                <p className="card-text">{comment.body}</p>
              </div>
              <div className="card-footer">
                <Link to={`/profile/${comment.author.username}`} className="comment-author">
                  <img src={comment.author.image} className="comment-author-img" alt="" />
                </Link>
                &nbsp;
                <Link to={`/profile/${comment.author.username}`} className="comment-author">
                  {comment.author.username}
                </Link>
                <span className="date-posted">{formatDate(comment.createdAt)}</span>
                {comment.author.username === user?.username && (
                  <span className="mod-options">
                    <i className="ion-trash-a" onClick={() => onDeleteComment(comment.id)}></i>
                  </span>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
