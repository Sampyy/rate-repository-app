import Text from './Text';
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.darkBackgroundText,
        justifyContent: 'flex-start',
        margin: theme.margins.normal,
        flexDirection: 'row',
    },
    ratingContainer: {},
    ratingNumber: {
        borderColor: theme.colors.blueBackground,
        borderWidth: 3,
        width: 60,
        height: 60,
        borderRadius: 30,
        textAlign: 'center',
        padding: 15,
    },
    reviewContainer: {
        margin: theme.margins.normal,
        alignItems: 'flex-start',
        flex: 1,
    },
    reviewUser: {},
    reviewContent: {
        alignSelf: 'flex-start',
        marginRight: 20,
        flex: 1,
    },
});

const ReviewItem = ({ review }) => {
    const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text
                    style={styles.ratingNumber}
                    color="primary"
                    fontWeight="bold"
                >
                    {review.rating}
                </Text>
            </View>
            <View style={styles.reviewContainer}>
                <Text
                    style={styles.reviewUser}
                    fontSize="heading"
                    fontWeight="bold"
                >
                    {review.user.username}
                </Text>
                <Text style={styles.reviewDate} color='textSecondary'>{date}</Text>
                <Text style={styles.reviewContent} >{review.text}</Text>
            </View>
        </View>
    );
};

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
