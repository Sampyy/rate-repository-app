import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';
import { useState, useEffect } from 'react';

const useReviews = (repoId) => {
    const [reviews, setReviews] = useState();
    const { data, loading } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: repoId },
    });

    useEffect(() => {
        if (data) {
            //console.log(data.repository.reviews.edges);
            setReviews(data.repository.reviews.edges);
        }
    }, [data]);

    return { reviews, loading };
};

export default useReviews;
