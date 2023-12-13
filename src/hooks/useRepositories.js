import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();

    const { data, error, loading } = useQuery(GET_REPOSITORIES);


    return { data, loading };
};

export default useRepositories;
