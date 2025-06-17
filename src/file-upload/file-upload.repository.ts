import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(error);
          } else {
            resolve(result!);
          }
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toStream(file.buffer).pipe(upload);
    });
  }
}
