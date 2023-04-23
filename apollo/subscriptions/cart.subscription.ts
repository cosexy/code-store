export const ADDED_CART = gql`
    subscription AddedToCart {
        addedToCart {
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
