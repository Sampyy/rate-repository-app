import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
        backgroundColor: '#ECF0F1',
    },
});

export const RepositoryListContainer = ({ repositories, navigate }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    const navigateToRepo = (item) => {
        console.log('navigate repo: ', item);
        navigate(`/repository/${item.id}`);
    };
    //console.log('rendering repositorylist', repositories)
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigateToRepo(item)}>
                    <RepositoryItem item={item} />
                </Pressable>
            )}
            style={styles.container}
            // other props
        />
    );
};

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();
    const navigate = useNavigate();
    // Get the nodes from the edges array
    if (loading) {
        return <Text>Repositories loading</Text>;
    }

    return (
        <RepositoryListContainer
            repositories={repositories}
            navigate={navigate}
        />
    );
};

export default RepositoryList;
