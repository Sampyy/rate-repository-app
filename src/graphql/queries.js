import { gql } from '@apollo/client';
import { CORE_REPOSITORY_ITEM } from './fragments';

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
    query Reviews($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
