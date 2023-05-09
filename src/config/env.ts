import dotenv from "dotenv";

dotenv.config();

export const config = {
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME || "",
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "",
};
