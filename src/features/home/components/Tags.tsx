import { useQuery } from '@tanstack/react-query';
import appApi from 'src/features/shared/data-access/app.api';

const Tags = ({ onSelectTag }: { onSelectTag: Function }) => {
  const {
    data: tags,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ['tags'],
    queryFn: () => appApi.getTags(),
    initialData: [],
    staleTime: 60 * 1000
  });

  return (
    <div className="tag-list">
      {isLoading && 'Loading tags...'}
      {isSuccess &&
        tags.map((tag, index) => (
          <div key={index} className="tag-pill tag-default" onClick={() => onSelectTag(tag)}>
            {tag}
          </div>
        ))}
    </div>
  );
};

export default Tags;
