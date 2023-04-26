import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Article, ArticlesType } from 'src/common/models';
import { useGetQueryData } from 'src/hooks';
import appApi from '../../../data-access/app.api';

const FavoriteButton = ({
  children,
  className,
  article,
  articlesType
}: {
  children: JSX.Element;
  className?: string;
  article: Article;
  articlesType?: ArticlesType;
}) => {
  const client = useQueryClient();
  const articles = useGetQueryData<Article[]>(['articles', { articlesType }]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (article: Article) => appApi.toggleFavorite(article.favorited, article.slug)
  });

  const onToggleFavorite = () => {
    mutate(article, {
      onSuccess: (res) => {
        // client.invalidateQueries({ queryKey: ['articles'] });
        client.setQueryData(
          ['articles', { articlesType }],
          articles?.map((article) => {
            const { slug, favorited, favoritesCount } = res;
            return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
          })
        );
        client.setQueryData(['article'], res);
      }
    });
  };

  return (
    <button
      className={`btn btn-sm ${className} ${
        article.favorited ? 'btn-primary' : 'btn-outline-primary'
      }`}
      disabled={isLoading}
      onClick={onToggleFavorite}
    >
      <i className="ion-heart"></i>&nbsp;
      {children}
    </button>
  );
};

export default FavoriteButton;
