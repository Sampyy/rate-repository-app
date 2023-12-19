import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        margin: theme.margins.normal,
        display: 'flex',
    },
    button: {
        alignItems: 'center',
        backgroundColor: theme.colors.blueBackground,
        padding: 7,
        marginTop: 10,
        borderRadius: 5,
    },
});

const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
};

const signUpSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(5, 'Username needs to be at least 5 letters')
        .max(30, 'Username can be at most 30 letters'),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password needs to be at least 5 letters')
        .max(50, 'Username can be at most 50 letters'),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref('password'), null],
            'Password confirm has to match password'
        )
        .required('Password confirm is required'),
});

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry={true}
            />
            <FormikTextInput
                name="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text
                    color="darkBackgroundText"
                    fontSize="subheading"
                    fontWeight="bold"
                >
                    Sign Up
                </Text>
            </Pressable>
        </View>
    );
};

const SignUpContainer = ({ onSubmit }) => {
    return (
        <View>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={signUpSchema}
            >
                {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    );
};

const SignUp = () => {
    const [createUser, result] = useSignUp();
    const [signIn, signInResult] = useSignIn();
    const navigate = useNavigate();
    const onSubmit = async ({ username, password, confirmPassword }) => {
        console.log('onchange', username, password, confirmPassword);
        try {
            await createUser(username, password);
            await signIn(username, password);
            navigate('/');
        } catch (e) {
            console.log('Error occured while creating user: ', e);
        }
    };
    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
