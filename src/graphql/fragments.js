import { gql } from '@apollo/client';

export const CORE_REPOSITORY_ITEM = gql`
    fragment CoreRepositoryItem on Repository {
        id
        ratingAverage
        forksCount
        stargazersCount
        language
        description
        ownerAvatarUrl
        fullName
        ownerName
        reviewCount
    }
`;

export const REVIEW = gql`
    fragment ReviewItem on Review {
        id
        text
        rating
        createdAt
        user {
            id
            username
        }
    }
`;
