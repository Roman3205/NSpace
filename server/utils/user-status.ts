import { MAX_API_COUNT } from '~~/constants/max-api-limit';
import { getPolarCustomerState } from "~~/server/services/polar";

const getUserFreeTrialStatus = async (userId: string) => {
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userApiLimit || userApiLimit.count < MAX_API_COUNT) {
        return true
    }

    return false
}

const getUserProStatus = async (userId: string) => {
    const customer = await getPolarCustomerState(userId)

    return !!customer.activeSubscriptions[0]
}

export const validateUserStatus = async (userId: string) => {
    const isFreeTrialExists = await getUserFreeTrialStatus(userId)
    const isPro = await getUserProStatus(userId)
    
    if (!isPro && !isFreeTrialExists) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Free trial has expired. Please upgrade to pro.'
        })
    }

    return {isPro: isPro}
}