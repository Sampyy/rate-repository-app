import { ApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const signIn = async (username, password) => {
        let token = await authStorage.getAccessToken();


        const { data } = await mutate({
            variables: {
                credentials: { username: username, password: password },
            },
        });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        token = await authStorage.getAccessToken();

        apolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;