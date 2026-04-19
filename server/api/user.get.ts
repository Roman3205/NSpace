import { getUserApiLimit } from "~~/server/services/user-api-limit"
import { getCustomerPolarUrl, getPolarCustomerState } from '~~/server/services/polar';

export default defineEventHandler(async (event) => {
    const userApiLimitCount = await getUserApiLimit(event.context.user.id)
    const customerPortalUrl = await getCustomerPolarUrl(event.context.user.id)
    const customerState = await getPolarCustomerState(event.context.user.id)
    const subscription = customerState.activeSubscriptions[0]
    return {
        userApiLimitCount,
        subscription,
        customerPortalUrl,
    }
})