import { v2 as cloudinary } from 'cloudinary';

const {cloudinaryApiKey, cloudinaryApiSecret, cloudinaryCloudName, public: {appEnv}} = useRuntimeConfig()

export const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: cloudinaryCloudName,
        api_key: cloudinaryApiKey,
        api_secret: cloudinaryApiSecret,
        secure: appEnv == 'production'
    })
}