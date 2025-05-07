import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envConfig } from '../config';

type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

@Injectable()
export class FileUploadService {
  constructor() {
    cloudinary.config({
      cloud_name: envConfig().cloudinary.cloudName,
      api_key: envConfig().cloudinary.apiKey,
      api_secret: envConfig().cloudinary.apiSecret,
    });
  }

  async uploadImage(file: MulterFile, folder: string = 'brands'): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');

    try {
      // Convertir el archivo a base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Subir a Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: 'auto',
      });

      return result.secure_url;
    } catch (error) {
      throw new BadRequestException('Error uploading file: ' + error.message);
    }
  }

  async deleteImage(url: string): Promise<void> {
    if (!url) return;

    try {
      // Extraer el public_id de la URL
      const publicId = url.split('/').slice(-1)[0].split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
} 