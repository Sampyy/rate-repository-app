import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
    },
    textInput: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        borderColor: theme.colors.textPrimary,
        marginTop: 5,
        marginBottom: 5,

    },
    errorText: {
        color: theme.colors.error,
    },
    error: {
        borderColor: theme.colors.error,
    },
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                style={[styles.textInput, showError && styles.error]}
                placeholderTextColor='#C4C4C4'
                {...props}
            />
            {showError && (
                <Text style={styles.errorText}>Error: {meta.error}</Text>
            )}
        </>
    );
};

export default FormikTextInput;
