import { Formik, Form } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

import FormikTextInput from './FormikTextInput';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        margin: theme.margins.normal,
        display: 'flex',
    },
});

const reviewSchema = yup.object({
    repositoryName: yup.string().required('Repository name required'),
    repositoryOwner: yup.string().required('Repository owner required'),
    rating: yup
        .number('Rating should be a number')
        .required('Rating required')
        .min(0, 'Rating should be at least 0')
        .max(100, 'Rating should be at most 100'),
    review: yup.string(),
});

const ReviewFormikForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                name="repositoryOwner"
                placeholder="Repository Owner"
            />
            <FormikTextInput
                name="repositoryName"
                placeholder="Repository Name"
            />
            <FormikTextInput name="rating" placeholder="Rating" />
            <FormikTextInput name="review" placeholder="Review" />
            <Pressable onPress={onSubmit}>
                <Text>Post review</Text>
            </Pressable>
        </View>
    );
};

const ReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        repositoryName: '',
        repositoryOwner: '',
        rating: 50,
        review: '',
    };
    return (
        <View>
            <Text>Create review</Text>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={reviewSchema}
            >
                {({ handleSubmit }) => (
                    <ReviewFormikForm onSubmit={handleSubmit} />
                )}
            </Formik>
        </View>
    );
};

const ReviewForm = () => {
    const onSubmit = async ({
        repositoryName,
        repositoryOwner,
        rating,
        review,
    }) => {
        console.log('Form: ', repositoryName, repositoryOwner, rating, review);
    };
    return <ReviewContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
