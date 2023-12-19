import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ( repoId ) => {
    const [repo, setRepo] = useState();
    const { data, loading } = useQuery(GET_REPOSITORY, {
        variables: {
            repositoryId: repoId,
        },
    });

    useEffect(() => {
        if (data) {
            console.log(data.repository);
            setRepo(data.repository)
        }
    }, [data]);

    return { repo, loading };
};

export default useRepository;
