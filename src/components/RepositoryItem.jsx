import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: theme.colors.darkBackgroundText,
        justifyContent: 'center',
        maxWidth: 'auto',
        margin: theme.margins.normal,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 5,
    },
    infoHeader: {
        display: 'flex',
        flexGrow: 0,
        flexDirection: 'row',
        flexBasis: 'content',
    },
    infoBox: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: theme.margins.normal,
    },
    footerElement: {
        display: 'flex',
        alignItems: 'center',
    },
    description: {
        alignSelf: 'flex-start',
        marginRight: 30,
    },
    language: {
        backgroundColor: theme.colors.blueBackground,
        flexGrow: 0,
        padding: theme.paddings.smallBackgroundTextPadding,
        borderRadius: 5,
        marginTop: theme.margins.normal,
    },
    linkElement: {
        backgroundColor: theme.colors.blueBackground,
        flexGrow: 0,
        padding: theme.paddings.smallBackgroundTextPadding,
        borderRadius: 5,
        marginTop: theme.margins.normal,
        textAlign: 'center',
    },
});

const HeaderInfoBox = ({ item }) => {
    return (
        <View style={styles.infoBox}>
            <Text testID="fullName" fontSize="subheading" fontWeight="bold">
                {item.fullName}
            </Text>
            <Text
                testID="description"
                color="secondaryText"
                style={styles.description}
            >
                {item.description}
            </Text>
            <Text
                testID="language"
                style={styles.language}
                color="darkBackgroundText"
            >
                {item.language}
            </Text>
        </View>
    );
};

const Header = ({ item }) => {
    return (
        <View style={styles.infoHeader}>
            <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
            <HeaderInfoBox item={item} />
        </View>
    );
};

const FooterElement = ({ value, text, testID }) => {
    return (
        <View style={styles.footerElement}>
            <Text testID={testID} fontWeight="bold" fontSize="subheading">
                {value >= 1000 ? Math.round(value / 100) / 10 + 'k' : value}
            </Text>
            <Text>{text}</Text>
        </View>
    );
};

const Footer = ({ item }) => {
    return (
        <View style={styles.footer}>
            <FooterElement
                testID="stargazersCount"
                value={item.stargazersCount}
                text="Stars"
            />
            <FooterElement
                testID="forksCount"
                value={item.forksCount}
                text="Forks"
            />
            <FooterElement
                testID="reviewCount"
                value={item.reviewCount}
                text="Reviews"
            />
            <FooterElement
                testID="ratingAverage"
                value={item.ratingAverage}
                text="Rating"
            />
        </View>
    );
};

const LinkElement = ({ url }) => {
    return (
        <Pressable onPress={() => Linking.openURL(url)}>
            <Text style={styles.linkElement} color="darkBackgroundText">
                Open on Github
            </Text>
        </Pressable>
    );
};

const RepositoryItem = ({ item, showUrl, url }) => {
    return (
        <View testID="repositoryItem" style={styles.container}>
            <Header item={item} />
            <Footer item={item} />
            {showUrl && <LinkElement url={url} />}
        </View>
    );
};

export default RepositoryItem;
