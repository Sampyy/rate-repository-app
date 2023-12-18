import { useQuery } from '@apollo/client';
import Text from './Text';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';

const RepositoryView = () => {
    let { repoId } = useParams();
    const { data, loading } = useQuery(GET_REPOSITORY, {
        variables: {
            repositoryId: repoId,
        },
    });
    if (loading) {
        return <Text>Loading..</Text>;
    }

    return (
        <View>
            {data.repository && (
                <RepositoryItem
                    item={data.repository}
                    showUrl={true}
                    url={data.repository.url}
                />
            )}
        </View>
    );
};

export default RepositoryView;
