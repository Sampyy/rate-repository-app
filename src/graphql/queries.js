import { gql } from '@apollo/client';
import { CORE_REPOSITORY_ITEM, REVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
    ${CORE_REPOSITORY_ITEM}
    query Repositories(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $cursor: String
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
            first: 5
            after: $cursor
        ) {
            edges {
                node {
                    ...CoreRepositoryItem
                }
            }
            pageInfo {
                endCursor
                hasNextPage
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
    query Reviews($repositoryId: ID!, $cursor: String) {
        repository(id: $repositoryId) {
            id
            fullName
            reviews(first: 2, after: $cursor) {
                edges {
                    node {
                        ...ReviewItem
                    }
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
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
