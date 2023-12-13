import { FlatList, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
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

const RepositoryList = () => {
    const { data, loading } = useRepositories();

    // Get the nodes from the edges array
    const repositoryNodes = !loading && data.repositories
        ? data.repositories.edges.map((edge) => edge.node)
        : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            style={styles.container}
            // other props
        />
    );
};

export default RepositoryList;
