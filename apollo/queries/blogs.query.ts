import { gql } from '#imports'

export const GET_POSTS = gql`
    query HomePosts ($filter: PostsFilter!) {
        posts(filter: $filter) {
            id
            name
            description
            avatar {
                id
                path
            }
            user {
                id
                slug
                role
                name
                avatar {
                    id
                    path
                }
            }
            createdAt
        }
    }
`
