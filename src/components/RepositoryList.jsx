import { FlatList, View, StyleSheet } from 'react-native';
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

const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    const ItemSeparator = () => <View style={styles.separator} />;
    //console.log('rendering repositorylist', repositories)
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            style={styles.container}
            // other props
        />
    );
}

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();

    // Get the nodes from the edges array
    if (loading) {
        return <Text>Repositories loading</Text>;
    }
    
    return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;
