import { requireAuth } from "~~/server/services/better-auth";

export default defineEventHandler(async (event) => {
    const protectedRoutes = ['/api/cloudinary', '/api/cloudinary', '/api/ai-tools', '/api/user']

    if (protectedRoutes.some(route => getRequestURL(event).pathname.startsWith(route))) {
        await requireAuth(event)
    } else {
        return
    }
})