import { File, Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";
import { Readable } from "stream";
import { config } from "../config/env";
import { IUploadImage } from "../types/upload-image-type";

async function uploadImage(file: Express.Multer.File): Promise<IUploadImage> {
  const storage = new Storage();
  const bucketName = config.GCS_BUCKET_NAME;
  const imageFilename = `${randomUUID()}_${file.originalname}`;
  const bucket = storage.bucket(bucketName);
  const imageFile = bucket.file(imageFilename);
  const bufferStream = new Readable();

  bufferStream.push(file.buffer);
  bufferStream.push(null);

  await new Promise((resolve, reject) => {
    bufferStream
      .pipe(
        imageFile.createWriteStream({
          contentType: file.mimetype,
        })
      )
      .on("error", reject)
      .on("finish", resolve);
  });

  await makeFilePublic(imageFile);
  const imageUrl = imageFile.publicUrl();

  return {
    uri: `gs://${bucketName}/${imageFilename}`,
    url: imageUrl,
  };
}

async function makeFilePublic(file: File): Promise<void> {
  await file.makePublic();
}

export { uploadImage };
