// import AWS from 'aws-sdk';
import {accessKeyId} from '../../src/hidden.js';
import {secretAccessKey} from '../../src/hidden.js';
import {region} from '../../src/hidden.js'
import { User } from '../database/model.js';

// AWS.config.update({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey,
//     region: region,
//   });
  
//   const s3 = new AWS.S3();

  const awsFunctions = {
    // upload: async (req, res) => {
    //     const file = req.file
    //     console.log('this is file', file)

    //     const params = {
    //         Bucket: 'national-parks-dev-mtn',
    //         Key: `userPic_${Date.now()}_${file.originalname}`,
    //         Body: file.buffer,
    //         ACL: 'public-read',
    //         ContentType: file.mimetype
    //     };
    //     console.log('this is the params body', params.Body)

    //     s3.upload(params, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).json({ error: 'Failed to upload file' });
    //           } else {
    //             console.log('File uploaded successfully:', data.Location);
    //             res.status(200).json({ imageUrl: data.Location });
    //           }
    //         });
    // },

    upload: async (req, res) => {
        const {userId} = req.params
        const {imgUrl} = req.body;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).send({
                    message: "user not found",
                    success: false
                })
            }
            user.imgUrl = imgUrl
            await user.save();

            res.send({
                message: 'user profile image updated correctly',
                success: true,
                user
            })
        } catch(error) {
            console.log('Error updating user profile image', error);
            res.status(500).send({
                message: 'error updating user profile',
                success: false
            })
        }
    }
  }

  export default awsFunctions;