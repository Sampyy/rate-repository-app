import { gql } from '@apollo/client';
import { CORE_REPOSITORY_ITEM, REVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
    ${CORE_REPOSITORY_ITEM}
    query Repositories(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
        ) {
            edges {
                node {
                    ...CoreRepositoryItem
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    ${CORE_REPOSITORY_ITEM}
    query Repository($repositoryId: ID!) {
        repository(id: $repositoryId) {
            ...CoreRepositoryItem
            url
        }
    }
`;

export const GET_REVIEWS = gql`
    ${REVIEW}
    query Reviews($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            reviews {
                edges {
                    node {
                        ...ReviewItem
                    }
                }
            }
        }
    }
`;

export const ME = gql`
    ${REVIEW}
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewItem
                        repository {
                            fullName
                            id
                        }
                    }
                }
            }
        }
    }
`;
