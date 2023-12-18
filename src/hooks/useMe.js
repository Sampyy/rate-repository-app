import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useState, useEffect } from 'react';

const useMe = () => {
    const [me, setMe] = useState(null);

    const { loading, data } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
    });

    const refresh = () => {};

    useEffect(() => {
        if (data) {
            let meData = data.me
            setMe(data.me);
        }
    }, [data]);

    return { me, loading, refresh };
};

export default useMe;
