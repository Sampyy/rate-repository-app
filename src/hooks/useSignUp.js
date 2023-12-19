import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);

    const createUser = async (username, password) => {
        const { data } = await mutate({
            variables: {
                user: {
                    username: username,
                    password: password,
                },
            },
        });

        console.log('data: ', data);

        return data;
    };

    return [createUser, result];
};

export default useSignUp;
