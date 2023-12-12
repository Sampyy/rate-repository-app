import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
        display: 'flex',
        flexDirection: 'row',
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

const TabText = ({ text }) => {
    return (
        <Text style={styles.text} color="darkBackgroundText" fontSize="heading">
            {text}
        </Text>
    );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Pressable onPress={onPressHeading}>
                    <Link to="/">
                        <TabText text="Repositories" />
                    </Link>
                </Pressable>
                <Link to="/Signin">
                    <TabText text="Sign in" />
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;
