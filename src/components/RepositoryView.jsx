import { useQuery } from '@apollo/client';
import Text from './Text';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';
import useRepository from '../hooks/useRepository';

const RepositoryView = () => {
    let { repoId } = useParams();
    const { repo, loading } = useRepository(repoId);
    if (loading) {
        return <Text>Loading..</Text>;
    }

    return (
        <View>
            {repo && (
                <RepositoryItem
                    item={repo}
                    showUrl={true}
                    url={repo.url}
                />
            )}
        </View>
    );
};

export default RepositoryView;
