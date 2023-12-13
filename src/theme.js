import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        appBar: '#33332D',
        darkBackgroundText: '#F8F7FB',
        blueBackground: '#0065E2',
        error: '#BE7081',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        heading: 18,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    margins: {
        normal: 10,
    },
    paddings: {
        smallBackgroundTextPadding: 3,
    },
};

export default theme;
