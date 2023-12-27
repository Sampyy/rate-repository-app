import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react-native';

import { ReviewContainer } from '../../components/ReviewForm';

describe('ReviewForm', () => {
    describe('ReviewFormContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Owner'),
                'rails'
            );

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'ruby'
            );

            fireEvent.changeText(screen.getByPlaceholderText('Rating'), 35);

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    repositoryName: 'ruby',
                    repositoryOwner: 'rails',
                    rating: 35,
                    review: 'lorum lorum ispasu',
                });
            });
        });
        it(`doesn't call onSubmit function with non-number rating`, async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Owner'),
                'rails'
            );

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'ruby'
            );

            fireEvent.changeText(screen.getByPlaceholderText('Rating'), 'mate');

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls).toHaveLength(0);
                expect(
                    screen.getByText(
                        'Error: rating must be a `number` type, but the final value was: `NaN` (cast from the value `"mate"`).'
                    )
                );
            });
        });
        it(`doesn't call onSubmit function with missing repository Name`, async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Owner'),
                'rails'
            );

            fireEvent.changeText(screen.getByPlaceholderText('Rating'), 35);

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls).toHaveLength(0);
                expect(screen.getByText('Error: Repository name required'));
            });
        });
        it(`doesn't call onSubmit function with missing rating`, async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Owner'),
                'rails'
            );

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'ruby'
            );

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls).toHaveLength(0);
                expect(screen.getByText('Error: Rating required'));
            });
        });
        it(`doesn't call onSubmit function with missing repository Owner`, async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'rails'
            );

            fireEvent.changeText(screen.getByPlaceholderText('Rating'), 35);

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls).toHaveLength(0);
                expect(screen.getByText('Error: Repository owner required'));
            });
        });
        it(`doesn't call onSubmit function with rating being below 0`, async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'rails'
            );

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'ruby'
            );

            fireEvent.changeText(screen.getByPlaceholderText('Rating'), -3);

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls).toHaveLength(0);
                expect(screen.getByText('Error: Rating should be at least 0'));
            });
        });
        it(`doesn't call onSubmit function with rating being below 0`, async () => {
            const onSubmit = jest.fn();
            render(<ReviewContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'rails'
            );

            fireEvent.changeText(
                screen.getByPlaceholderText('Repository Name'),
                'ruby'
            );

            fireEvent.changeText(screen.getByPlaceholderText('Rating'), 125);

            fireEvent.changeText(
                screen.getByPlaceholderText('Review'),
                'lorum lorum ispasu'
            );

            fireEvent.press(screen.getByText('Post review'));

            await waitFor(() => {
                expect(onSubmit.mock.calls).toHaveLength(0);
                expect(screen.getByText('Error: Rating should be at most 100'));
            });
        });
    });
});
