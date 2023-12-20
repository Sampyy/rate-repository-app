import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id) => {
        const { data, loading } = await mutate({
            variables: {
                deleteReviewId: id,
            },
        });
        console.log(data);
        return data;
    };
    return [deleteReview, result];
};

export default useDeleteReview;
