import { gql } from '@apollo/client';
import { CORE_REPOSITORY_ITEM } from './fragments';

export const GET_REPOSITORIES = gql`
    ${CORE_REPOSITORY_ITEM}
    query {
        repositories {
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

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
