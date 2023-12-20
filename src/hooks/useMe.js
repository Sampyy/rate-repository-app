import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useState, useEffect } from 'react';

const useMe = (includeReviews) => {
    const [me, setMe] = useState(null);

    const { loading, data, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: {
            includeReviews: includeReviews || false,
        },
    });

    useEffect(() => {
        if (data) {
            let meData = data.me;
            setMe(data.me);
        }
    }, [data]);

    return { me, loading, refetch };
};

export default useMe;
