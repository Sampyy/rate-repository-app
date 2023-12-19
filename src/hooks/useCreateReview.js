import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async (
        repositoryOwner,
        repositoryName,
        rating,
        text
    ) => {
        /*console.log(
            'Creating review: ',
            repositoryOwner,
            repositoryName,
            rating,
            text
        );*/
        const { data } = await mutate({
            variables: {
                review: {
                    ownerName: repositoryOwner,
                    repositoryName: repositoryName,
                    rating: parseInt(rating),
                    text: text,
                },
            },
        });
        //console.log('data: ', data);
        return data;
    };
    return [createReview, result];
};

export default useCreateReview;
