const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary upload image
const cloudinaryUploadImage = async (fileToUploadPath) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUploadPath, {
            resource_type: 'auto'
        });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

// Cloudinary remove image
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
};
