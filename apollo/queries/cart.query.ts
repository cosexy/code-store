import { gql } from '#imports'

export const GET_CART = gql`
    query GetCart {
        cart {
            id
            product {
                id
                name
                slug
                avatar {
                    id
                    path
                }
                price
                sale
                
            }
            license
            quantity
        }
    }
`
