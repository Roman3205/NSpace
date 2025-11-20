import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event)
    const file = formData.get('image') as File
    const object = formData.get('object') as string

    if (!file) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No image provided'
        })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    await connectCloudinary()

    const uploadImage = (): Promise<UploadApiResponse> => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error || !result) {
                    return reject(error || new Error('upload failed'))
                }
                resolve(result)
            })
            uploadStream.end(buffer)
        })
    }

    const result = await uploadImage()

    const transformatedImage = cloudinary.url(result.public_id, {
        transformation: [
            {
                effect: `gen_remove:${object}`
            }
        ],
        resource_type: 'image',
        secure: true
    })

    return transformatedImage
})