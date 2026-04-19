export const incrementApiLimit = async (userId: string) => {
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: {userId},
            data: {
                count: {increment: 1}
            }
        })
    } else {
        await prisma.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        })
    }
}

export const getUserApiLimit = async (userId: string) => {
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {userId},
        select: {count: true}
    })

    if (!userApiLimit) {
        return 0
    }

    return userApiLimit.count
}