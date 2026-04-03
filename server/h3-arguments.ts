import 'h3'

declare module 'h3' {
    interface H3EventContext {
        user: {
            id: string
        }
    }
}

export {}