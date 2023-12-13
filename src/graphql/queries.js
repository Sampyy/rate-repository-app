import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
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
            }
        }
    }
`;
