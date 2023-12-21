import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, searchKeyword) => {
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

    const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
        GET_REPOSITORIES,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                orderBy: orderBy,
                orderDirection: orderDirection,
                searchKeyword: searchKeyword,
            },
        }
    );

    const handleFetchMore = () => {
        //console.log('Fetch more: ', 1);
        const canFetchMore =
            !loading && data?.repositories.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return;
        }
        //console.log('after: ', data.repositories.pageInfo.endCursor);
        fetchMore({
            variables: {
                cursor: data.repositories.pageInfo.endCursor,
                orderBy: orderBy,
                orderDirection: orderDirection,
                searchKeyword: searchKeyword,
            },
        });
    };

    return {
        repositories: data?.repositories,
        loading,
        refetch,
        fetchMore: handleFetchMore,
        ...result,
    };
};

export default useRepositories;
