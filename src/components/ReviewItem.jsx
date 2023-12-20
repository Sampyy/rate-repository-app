import Text from './Text';
import theme from '../theme';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    reviewButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        alignItems: 'center',
        padding: 7,
        marginTop: 10,
        borderRadius: 5,
    },
    viewButton: {
        backgroundColor: theme.colors.blueBackground,
    },
    deleteButton: {
        backgroundColor: theme.colors.delete,
    },
});

const deletePress = (deleteReview, id, refetch) => {
    Alert.alert('Delete', 'Are you sure you want to Delete?', [
        {
            text: 'Cancel',
            onPress: () => {
                console.log('Cancel Pressed');
            },
            style: 'cancel',
        },
        {
            text: 'OK',
            onPress: () => {
                try {
                    deleteReview(id);
                    refetch();
                } catch (e) {
                    console.log('Error while deleting review: ', e);
                }
            },
        },
    ]);
};

export const ReviewItemContainer = ({
    date,
    navigate,
    review,
    reviewPage,
    refetch,
    deleteReview,
}) => {
    return (
        <View
            style={{
                display: 'flex',
                backgroundColor: theme.colors.darkBackgroundText,
                margin: 10,
                padding: 10,
            }}
        >
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
                    {!reviewPage && (
                        <Text
                            style={styles.reviewUser}
                            fontSize="heading"
                            fontWeight="bold"
                        >
                            {review.user.username}
                        </Text>
                    )}
                    {reviewPage && (
                        <Text
                            style={styles.reviewUser}
                            fontSize="heading"
                            fontWeight="bold"
                        >
                            {review.repository.fullName}
                        </Text>
                    )}
                    <Text style={styles.reviewDate} color="textSecondary">
                        {date}
                    </Text>
                    <Text style={styles.reviewContent}>{review.text}</Text>
                </View>
            </View>
            {reviewPage && (
                <View style={styles.reviewButtons}>
                    <Pressable
                        style={[styles.button, styles.viewButton]}
                        onPress={() =>
                            navigate(`/repository/${review.repository.id}`)
                        }
                    >
                        <Text
                            color="darkBackgroundText"
                            fontSize="subheading"
                            fontWeight="bold"
                        >
                            View repository
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.deleteButton]}
                        onPress={() =>
                            deletePress(deleteReview, review.id, refetch)
                        }
                    >
                        <Text
                            color="darkBackgroundText"
                            fontSize="subheading"
                            fontWeight="bold"
                        >
                            Delete review
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const ReviewItem = ({ review, reviewPage, refetch }) => {
    const date = format(new Date(review.createdAt), 'dd.MM.yyyy');
    const navigate = useNavigate();
    const [deleteReview, result] = useDeleteReview();

    return (
        <ReviewItemContainer
            date={date}
            navigate={navigate}
            review={review}
            reviewPage={reviewPage}
            refetch={refetch}
            deleteReview={deleteReview}
        />
    );
};

export default ReviewItem;
