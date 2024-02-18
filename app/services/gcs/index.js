const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
const { BadRequestError } = require('../../errors');

const path = require('path');
const keyFilename = path.resolve(
  __dirname,
  `../../../googleServiceAccountKey.json`
);

const storage = new Storage({
  keyFilename: keyFilename,
});
const bucket = storage.bucket('user_posts-bucket');

const upload = async (file) => {
  try {
    if (!file) {
      throw new BadRequestError('Please upload a file!');
    }

    const uploadedName = `${Date.now()}_${file.originalname}`;
    const blob = bucket.file(uploadedName);

    // Create a Promise to handle the asynchronous operations
    const uploadPromise = new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        throw new Error(err.message);
      });

      blobStream.on('finish', async (data) => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        try {
          // Make the file public
          await bucket.file(uploadedName).makePublic();
          resolve(publicUrl); // Resolve the Promise with the publicUrl
        } catch (err) {
          throw new Error(
            `Uploaded the file successfully: ${file.originalname}, but public access is denied!`
          );
        }
      });

      blobStream.end(file.buffer);
    });

    const publicUrl = await uploadPromise; // Wait for the Promise to resolve
    return publicUrl;
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      throw new BadRequestError('File size cannot be larger than 2MB!');
    }
    throw new Error(`Could not upload the file: ${err}`);
  }
};

module.exports = {
  upload,
};
