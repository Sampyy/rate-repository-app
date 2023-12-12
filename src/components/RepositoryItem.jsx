import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: theme.colors.darkBackgroundText,
        justifyContent: 'center',
        maxWidth: 700,
        margin: theme.margins.normal
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 5,
        border: 1,
    },
    infoHeader: {
        display: 'flex',
        flexGrow: 0,
        flexDirection: 'row',
        flexBasis: 'content',
        maxWidth: 300,
    },
    infoBox: {
        display: 'inline-flex',
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
    language: {
        backgroundColor: theme.colors.blueBackground,
        flexGrow: 0,
        padding: theme.paddings.smallBackgroundTextPadding,
        borderRadius: 5,
        marginTop: theme.margins.normal,
    },
});

const HeaderInfoBox = ({ item }) => {
    return (
        <View style={styles.infoBox}>
            <Text fontSize="subheading" fontWeight="bold">
                {item.fullName}
            </Text>
            <Text color="secondaryText">{item.description}</Text>
            <Text style={styles.language} color="darkBackgroundText">
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

const FooterElement = ({ value, text }) => {
    return (
        <View style={styles.footerElement}>
            <Text fontWeight="bold" fontSize="subheading">
                {value >= 1000 ? Math.round(value / 100) / 10 + 'k' : value}
            </Text>
            <Text>{text}</Text>
        </View>
    );
};

const Footer = ({ item }) => {
    return (
        <View style={styles.footer}>
            <FooterElement value={item.stargazersCount} text="Stars" />
            <FooterElement value={item.forksCount} text="Forks" />
            <FooterElement value={item.reviewCount} text="Reviews" />
            <FooterElement value={item.ratingAverage} text="Rating" />
        </View>
    );
};

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Header item={item} />
            <Footer item={item} />
        </View>
    );
};

export default RepositoryItem;
