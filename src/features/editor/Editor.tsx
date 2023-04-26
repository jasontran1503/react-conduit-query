import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { NewArticle, UpdateArticle, User } from 'src/common/models';
import appApi from '../shared/data-access/app.api';
import ErrorsForm from '../shared/ui/errors-form/ErrorsForm';

const Editor = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const slug = useParams<{ slug: string }>().slug;
  const [errorsForm, setErrorsForm] = useState<Record<string, string[]>>({});
  const [tags, setTags] = useState<string[]>([]);
  const client = useQueryClient();

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

  const { mutate, isLoading } = useMutation({
    mutationFn: (value: NewArticle | UpdateArticle) => {
      if (slug) {
        return appApi.updateArticle(slug, value as UpdateArticle);
      }
      return appApi.createArticle(value as NewArticle);
    }
  });

  const { register, handleSubmit, setValue, reset } = useForm<NewArticle | UpdateArticle>({
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<NewArticle | UpdateArticle> = async (data) => {
    setErrorsForm({});
    setValue('tagList', tags);
    const value = { ...data, tagList: tags };

    mutate(value, {
      onSuccess: (res) => {
        client.setQueryData(['article'], res);
        reset();
        navigate(`/article/${res.slug}`);
      }
    });
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value.trim();

    if (inputValue) {
      setTags([...tags, inputValue]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const deleteTag = (tagRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagRemove);
    setTags(newTags);
    setValue('tagList', newTags);
  };

  useEffect(() => {
    const setValueForm = async () => {
      if (article) {
        if (article.author.username === user?.username) {
          setValue('title', article.title);
          setValue('body', article.body);
          setValue('description', article.description);
          setValue('tagList', article.tagList);
          setTags(article.tagList);
          return;
        }
        navigate('/');
      }
    };

    setValueForm();
  }, [article]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorsForm errors={errorsForm} />
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    {...register('title')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What's this article about?"
                    {...register('description')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    {...register('body')}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e);
                      }
                    }}
                  />
                  {tags.length > 0 && (
                    <div className="tag-list">
                      {tags.map((tag, index) => (
                        <span key={index} className="tag-pill tag-default">
                          <i className="ion-close-round" onClick={() => deleteTag(tag)}></i>
                          {' ' + tag}
                        </span>
                      ))}
                    </div>
                  )}
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
