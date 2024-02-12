export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_BASE_URL!!
    : "http://localhost:3000";

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!!;

export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!!;

export const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER!!;

export const PER_PAGE = 10;
