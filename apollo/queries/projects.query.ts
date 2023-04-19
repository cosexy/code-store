import { gql } from '#imports'

export const GET_PRODUCTS = gql`
    query GetProducts($filter: GetProductsFilter!) {
        products(filter: $filter) {
            id
            name
            category {
                id
                name
                slug
            }
            slug
            price
            sale
            avatar {
                id
                path
            }
            user {
                id
                slug
                avatar
            }
        }
    }
`
