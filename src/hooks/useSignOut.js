import { ApolloClient, useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        return 'signed out';
    };
    return [signOut];
};
export default useSignOut;
