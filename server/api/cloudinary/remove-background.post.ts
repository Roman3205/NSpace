import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event)
    const file = formData.get('image') as File

    if (!file) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No image provided'
        })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    await connectCloudinary()

    const uploadImage = (): Promise<UploadApiResponse> => {
        new Promise((resolve, reject) => {
            
        })
    }
})