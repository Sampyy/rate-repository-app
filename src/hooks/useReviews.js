import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';
import { useState, useEffect } from 'react';

const useReviews = (repoId) => {
    const [reviews, setReviews] = useState();
    const { data, loading, fetchMore } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: repoId },
    });

    useEffect(() => {
        if (data) {
            //console.log(data.repository.reviews.edges);
            setReviews(data.repository.reviews.edges);
        }
    }, [data]);

    const handleFetchMore = () => {
        //console.log('Fetch more reviews: ', 1);
        const canFetchMore =
            !loading && data?.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return;
        }
        //console.log('Fetch more reviews: ', 2);
        fetchMore({
            variables: {
                cursor: data.repository.reviews.pageInfo.endCursor,
                repositoryId: repoId,
            },
        });
    };

    return {
        reviews,
        loading,
        fetchMore: handleFetchMore,
    };
};

export default useReviews;
