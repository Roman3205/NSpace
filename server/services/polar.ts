import {Polar} from '@polar-sh/sdk'
import {polar, checkout, portal, usage, webhooks} from '@polar-sh/better-auth'

const {polarAccessToken, polarServer, polarProductId, polarWebhookSecret} = useRuntimeConfig()
const polarClient = () => {
    return new Polar({
        accessToken: polarAccessToken,
        server: polarServer as 'sandbox' | 'production'
    })
}

export const setupPolar = () => polar({
    client: polarClient,
    createCustomerOnSignUp: true,
    use: [
        checkout({
            products: [
                {
                    productId: polarProductId,
                    slug: 'pro-monthly'
                }
            ],
            successUrl: '/',
            authenticatedUsersOnly: true
        }),
        portal(),
        usage(),
        webhooks({
            secret: polarWebhookSecret
        })
    ]
})

export const getPolarCustomerState = async (userId: string) => {
    const polar = polarClient()
    const customerState = await polar.customers.getStateExternal({
        externalId: userId
    })

    return customerState
}