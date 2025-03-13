import cloudinary from "cloudinary";

const cld = cloudinary.v2;

cld.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export async function uploadToCloudinary(file: string): Promise<string> {
    const result = await cld.uploader.upload(file, {
        resource_type: "auto",
        folder: "youtube-backend",
    });
    return result.url;
}

export async function deleteFromCloudinary(url: string) {
    const fileId = getPublicId(url);
    await cld.api.delete_resources([fileId]);
}

function getPublicId(url: string): string {
    return (
        "youtube-backend/" +
        url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
    );
}
