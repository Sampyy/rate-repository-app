import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import theme from '../theme';
import Text from './Text';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
        backgroundColor: '#ECF0F1',
    },
    pickerContainer: {
        padding: 7,
        marginTop: 10,
        borderRadius: 5,
    },
    textInput: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        borderColor: theme.colors.textPrimary,
        margin: 5,
        backgroundColor: '#F8F7FB'
    },
});

const RepositoryListOrderingMenu = ({
    selectedOrdering,
    setSelectedOrdering,
}) => {
    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedOrdering}
                onValueChange={(itemValue) => setSelectedOrdering(itemValue)}
            >
                <Picker.Item
                    style={styles.pickerItem}
                    label="Latest Repositories"
                    value="latest"
                />
                <Picker.Item
                    style={styles.pickerItem}
                    label="Highest rated"
                    value="highest"
                />
                <Picker.Item
                    style={styles.pickerItem}
                    label="Lowest rated"
                    value="lowest"
                />
            </Picker>
        </View>
    );
};

export const RepositoryListContainer = ({
    repositories,
    navigate,
    selectedOrdering,
    setSelectedOrdering,
}) => {
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
            ListHeaderComponent={
                <RepositoryListOrderingMenu
                    selectedOrdering={selectedOrdering}
                    setSelectedOrdering={setSelectedOrdering}
                />
            }
            // other props
        />
    );
};

const SearchText = ({ setSearchKeyword }) => {
    return (
        <TextInput
            style={styles.textInput}
            onChange={({ target }) => setSearchKeyword(target.value)}
        />
    );
};

const RepositoryList = () => {
    const navigate = useNavigate();
    const [selectedOrdering, setSelectedOrdering] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedSearch] = useDebounce(searchKeyword, 500);
    const { repositories, loading } = useRepositories(
        selectedOrdering,
        debouncedSearch
    );
    // Get the nodes from the edges array

    return (
        <View style={styles.container}>
            <SearchText setSearchKeyword={setSearchKeyword} />
            {loading == true ? (
                <Text>Repositories loading</Text>
            ) : (
                <RepositoryListContainer
                    repositories={repositories}
                    navigate={navigate}
                    selectedOrdering={selectedOrdering}
                    setSelectedOrdering={setSelectedOrdering}
                />
            )}
        </View>
    );
};

export default RepositoryList;
