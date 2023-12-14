import { ApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const signIn = async (username, password) => {
        console.log(await authStorage.getAccessToken());

        const { data } = await mutate({
            variables: {
                credentials: { username: username, password: password },
            },
        });
        //console.log(data.authenticate.accessToken)
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;
