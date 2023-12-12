import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
        display: 'flex',
        // ...
    },
    text: {
        marginBottom: theme.margins.normal,
    },
    // ...
});

const onPressHeading = () => {
    console.log('Heading was pressed');
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPressHeading}>
                <Text
                    style={styles.text}
                    color="darkBackgroundText"
                    fontSize="heading"
                >
                    Repositories
                </Text>
            </Pressable>
        </View>
    );
};

export default AppBar;
