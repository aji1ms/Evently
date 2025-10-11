import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, and WebP images are allowed!'));
    }
};

const eventStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'events',
        format: async (req: Request, file: Express.Multer.File) => {
            return file.mimetype.split('/')[1] || 'jpg';
        },
        public_id: (req: Request, file: Express.Multer.File) => {
            return `event-${Date.now()}`;
        },
    } as any,
});

const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profiles',
        format: async (req: Request, file: Express.Multer.File) => {
            return file.mimetype.split('/')[1] || 'jpg';
        },
        public_id: (req: Request, file: Express.Multer.File) => {
            return `profile-${Date.now()}`;
        },
    } as any,                                                                 
});                                                                                                                   
                                                                                                               
export const uploadEventImage = multer({
    storage: eventStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

export const uploadProfileImage = multer({
    storage: profileStorage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter,
});

export { cloudinary };