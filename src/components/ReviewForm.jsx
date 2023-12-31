import { Formik, Form } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

import FormikTextInput from './FormikTextInput';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
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
            <FormikTextInput name="review" placeholder="Review" multiline />
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text color='darkBackgroundText' fontSize='subheading' fontWeight='bold'>Post review</Text>
            </Pressable>
        </View>
    );
};

export const ReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        repositoryName: '',
        repositoryOwner: '',
        rating: '',
        review: '',
    };
    return (
        <View>
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
    const [createReview] = useCreateReview();
    const navigate = useNavigate();
    const onSubmit = async ({
        repositoryName,
        repositoryOwner,
        rating,
        review,
    }) => {
        console.log('Form: ', repositoryName, repositoryOwner, rating, review);
        try {
            const data = await createReview(
                repositoryOwner,
                repositoryName,
                rating,
                review
            );
            //console.log('reviewdata: ', data);
            navigate(`/repository/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };
    return <ReviewContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
