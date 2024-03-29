import AWS from 'aws-sdk';
import {accessKeyId} from '../../src/hidden.js';
import {secretAccessKey} from '../../src/hidden.js';
import {region} from '../../src/hidden.js'

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });
  
  const s3 = new AWS.S3();

  const awsFunctions = {
    upload: async (req, res) => {
        const file = req.file;

        const params = {
            Bucket: 'national-parks-dev-mtn',
            Key: 'file.name',
            Body: 'file.buffer',
            ACL: 'public-read'
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to upload file' });
              } else {
                console.log('File uploaded successfully:', data.Location);
                res.status(200).json({ imageUrl: data.Location });
              }
            });
    },
  }

  export default awsFunctions;