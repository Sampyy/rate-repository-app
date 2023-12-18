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
