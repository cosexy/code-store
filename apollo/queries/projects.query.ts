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
                avatar {
                    id
                    path
                }
            }
        }
    }
`

export const GET_PRODUCT = gql`
    query GetProduct($filter: GetProductFilter!) {
        product(filter: $filter) {
            id
            name
            description
            price
            sale
            avatar {
                id
                path
            }
            createdAt
        }
    }
`
