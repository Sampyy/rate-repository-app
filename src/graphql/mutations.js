import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation signin($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput) {
        createReview(review: $review) {
            userId
            repositoryId
            rating
            createdAt
            user {
                username
                createdAt
                reviewCount
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput) {
        createUser(user: $user) {
            id
            username
            createdAt
            reviewCount
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation Mutation($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`;
