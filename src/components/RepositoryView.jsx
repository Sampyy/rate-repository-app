import Text from './Text';
import { useParams } from 'react-router-native';
import { View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
    },
});

export const RepositoryViewContainer = ({
    repo,
    reviewNodes,
    onEndReach,
    onEndReachedThreshold,
    reviewsLoading,
    reviews,
}) => {
    return (
        <View style={styles.flatListContainer}>
            {repo && (
                <RepositoryItem item={repo} showUrl={true} url={repo.url} />
            )}
            {!reviewsLoading && reviews && (
                <FlatList
                    data={reviewNodes}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={({ id }) => id}
                    onEndReached={onEndReach}
                    onEndReachedThreshold={onEndReachedThreshold}
                />
            )}
        </View>
    );
};

const RepositoryView = () => {
    let { repoId } = useParams();
    const { repo, loading: repoLoading } = useRepository(repoId);
    const { reviews, loading: reviewsLoading, fetchMore } = useReviews(repoId);
    const reviewNodes = reviews ? reviews.map((review) => review.node) : [];
    if (repoLoading) {
        return <Text>Loading..</Text>;
    }

    const onEndReach = () => {
        console.log('end reached reviews');
        fetchMore();
    };

    return (
        <RepositoryViewContainer
            repo={repo}
            reviewNodes={reviewNodes}
            onEndReach={onEndReach}
            onEndReachedThreshold={0.5}
            reviewsLoading={reviewsLoading}
            reviews={reviews}
        />
    );
};

export default RepositoryView;
