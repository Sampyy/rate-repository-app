import Text from './Text';
import { useParams } from 'react-router-native';
import { View, FlatList } from 'react-native';
import theme from '../theme';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import { ReviewItem } from './ReviewItem';



const RepositoryView = () => {
    let { repoId } = useParams();
    const { repo, loading: repoLoading } = useRepository(repoId);
    const { reviews, loading: reviewsLoading } = useReviews(repoId);
    const reviewNodes = reviews ? reviews.map((review) => review.node) : [];
    if (repoLoading) {
        return <Text>Loading..</Text>;
    }

    return (
        <View>
            {repo && (
                <RepositoryItem item={repo} showUrl={true} url={repo.url} />
            )}
            {!reviewsLoading && reviews && (
                <FlatList
                    data={reviewNodes}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={({ id }) => id}
                />
            )}
        </View>
    );
};

export default RepositoryView;
