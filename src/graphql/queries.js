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
