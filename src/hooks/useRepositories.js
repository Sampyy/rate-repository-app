import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, searchKeyword) => {
    const [repositories, setRepositories] = useState();
    const [orderBy, setOrderBy] = useState('');
    const [orderDirection, setOrderDirection] = useState('');
    useEffect(() => {
        //console.log('order: ', order);
        //console.log(order === 'highest');
        switch (order) {
            case 'latest':
                setOrderBy('CREATED_AT');
                setOrderDirection('DESC');
                break;
            case 'lowest':
                setOrderBy('RATING_AVERAGE');
                setOrderDirection('ASC');
                break;
            case 'highest':
                setOrderBy('RATING_AVERAGE');
                setOrderDirection('DESC');
                break;
        }
    }, [order]);
    //console.log('order by: ', orderBy, ' orderDir: ', orderDirection);

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            orderBy: orderBy,
            orderDirection: orderDirection,
            searchKeyword: searchKeyword,
        },
    });

    useEffect(() => {
        !loading && setRepositories(data.repositories);
    }, [loading]);

    return { repositories, loading };
};

export default useRepositories;
