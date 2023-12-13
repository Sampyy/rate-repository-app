import { Button, View, StyleSheet, TouchableHighlight } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
    username: '',
    password: '',
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: theme.colors.blueBackground,
        padding: 7,
        marginTop: 10,
        borderRadius: 5,
    },
    container: {
        margin: theme.margins.normal,
        display: 'flex',
    },
    loginText: {
        color: theme.colors.darkBackgroundText,
    },
});

const signInSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableHighlight style={styles.button} onPress={onSubmit}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
        </View>
    );
};
const SignIn = () => {
    const onSubmit = ({ username, password }) => {
        console.log(username, ', ', password);
    };

    return (
        <View>
            <Text color="primary" fontSize="header">
                Log in:
            </Text>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={signInSchema}
            >
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    );
};

export default SignIn;
