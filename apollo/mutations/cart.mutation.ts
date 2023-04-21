import { gql } from '#imports'

export const ADD_TO_CART = gql`
    mutation AddToCart($input: AddToCartInput!) {
        addToCart(input: $input) {
            id
            product {
                id
            }
            license
            createdAt
        }
    }
`
