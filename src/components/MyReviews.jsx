import Text from './Text';
import { View, FlatList } from 'react-native';
import useMe from '../hooks/useMe';
import ReviewItem from './ReviewItem';

const MyReviews = () => {
    const { me, loading, refetch } = useMe(true);
    //me && console.log(me.reviews.edges);
    const reviewNodes = me ? me.reviews.edges.map((review) => review.node) : [];

    return (
        <View>
            {me && (
                <FlatList
                    data={reviewNodes}
                    renderItem={({ item }) => (
                        <ReviewItem
                            review={item}
                            reviewPage={true}
                            refetch={refetch}
                        />
                    )}
                />
            )}
        </View>
    );
};

export default MyReviews;
