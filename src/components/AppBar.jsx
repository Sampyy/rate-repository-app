import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';

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
    const { me, loading } = useMe();
    const [signOut] = useSignOut();
    const onPressSignout = async () => {
        try {
            const data = await signOut();
            console.log('signout data: ', data);
        } catch (e) {
            'error on signout: ', e;
        }
    };
    if (loading) {
        return <Text>loading</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Pressable onPress={onPressHeading}>
                    <Link to="/">
                        <TabText text="Repositories" />
                    </Link>
                </Pressable>
                {me == null && (
                    <Link to="/Signin">
                        <TabText text="Sign in" />
                    </Link>
                )}
                {me !== null && (
                    <Pressable onPress={onPressSignout}>
                        <TabText text="Sign out" />
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
