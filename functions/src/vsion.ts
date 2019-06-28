
import * as functions from 'firebase-functions';


// Cloud Vision
const vision = require('@google-cloud/vision');
const visionClient =  new vision.ImageAnnotatorClient();

 import * as Storage from '@google-cloud/storage';
 const gcs =  Storage;
 import { tmpdir } from 'os';
 import { join, dirname } from 'path';

const fs = require('fs');

// import * as Canvas from 'Canvas';

const bucketName = 'xyz-bucket.appspot.com';


import { db,  } from './config'; 
            


export const imageTagger = functions.storage
    


    .bucket(bucketName)
    .object()
    .onFinalize(async (object, context) => {
        //const user = event.user;
            // File data
            // const dataobject = object.data;
            const dataobject = object.contentType; 
            const filePath = object.name;   

            const fileName = filePath.split('/').pop();
            const tmpFilePath = join(tmpdir(), object.name);
            // Location of saved file in bucket
            const imageUri = `gs://${bucketName}/${filePath}`;


 //custom metadata
 const customMetadata = object.metadata;

 const customMetadataDeviceID = customMetadata['uid'];
            const docId = filePath.split('.jpg')[0];
            const docRef  = //admin.firestore()
            db
            .doc(`users/${customMetadataDeviceID}`).collection('photos').doc(docId);


            // Await the cloud vision response
            const results = await visionClient.labelDetection(imageUri);

            // Map the data to desired format
            const labels = results[0].labelAnnotations.map(obj => obj.description);
            
            // const faces = results[0].faceAnnotations;
            // const numFaces = faces.length;
            // console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);

            // const faces = results[0].faceAnnotations.forEach((face, i) => {

            //     //face.map(obj => obj.i;
            //     face.map(obj => obj.joyLikelihood);
            //     face.map(obj => obj.angerLikelihood);
            //     face.map(obj => obj.sorrowLikelihood);
            //     face.map(obj => obj.surpriseLikelihood);
            //     face.map(obj => obj.underExposedLikelihood);
            //     face.map(obj => obj.blurredLikelihood);
            //     face.map(obj => obj.headwearLikelihood);

            //     // console.log(`Face #${i + 1}:`);
            //     // console.log(`Joy: ${face.joyLikelihood}`);
            //     // console.log(`Anger: ${face.angerLikelihood}`);
            //     // console.log(`Sorrow: ${face.sorrowLikelihood}`);
            //     // console.log(`Surprise: ${face.surpriseLikelihood}`);

            //   });

//const results2 = await visionClient.faceDetection(imageUri);
            //const labels = results[0].labelAnnotations.map(obj => obj.description);
            
            //async function detectFaces(inputFile) {
                // Make a call to the Vision API to detect the faces
                //const request = {image: {source: {filename: inputFile}}};
                //const results = await visionClient.faceDetection(request);
//const faces = results2[0].faceAnnotations;
                //const numFaces = faces.length;
                //console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);


               // return faces;
             // }
//     //face.map(obj => obj.i;

// faces.forEach(i => {
//                  faces.map(obj2 => obj2
//                   .map(obj3=>obj3.joyLikelihood)
//                  )
//             //     face.map(obj => obj.angerLikelihood);
//             //     face.map(obj => obj.sorrowLikelihood);
//             //     face.map(obj => obj.surpriseLikelihood);
//             //     face.map(obj => obj.underExposedLikelihood);
//             //     face.map(obj => obj.blurredLikelihood);
//             //     face.map(obj => obj.headwearLikelihood);

//           });


            // const {promisify} = require('util');
            // const readFile = promisify(fs.readFile);
            // const image = await readFile(docRef);
            // const Image = Canvas.Image;
            // // Open the original image into a canvas
            // const img = new Image();
            // img.src = image;
            // const canvas = new Canvas.Canvas(img.width, img.height);
            // const context2 = canvas.getContext('2d');
            // context2.drawImage(img, 0, 0, img.width, img.height);
          
            // // Now draw boxes around all the faces
            // context2.strokeStyle = 'rgba(0,255,0,0.8)';
            // context2.lineWidth = '5';
          
            // faces.forEach(face => {
            //   context2.beginPath();
            //   let origX = 0;
            //   let origY = 0;
            //   face.boundingPoly.vertices.forEach((bounds, i) => {
            //     if (i === 0) {
            //       origX = bounds.x;
            //       origY = bounds.y;
            //     }
            //     context2.lineTo(bounds.x, bounds.y);
            //   });
            //   context2.lineTo(origX, origY);
            //   context2.stroke();
            // });
          

            // // return bucket.upload(tmpAvatarPath, {
            // //     destination: join(dirname(filePath), avatarFileName)
            // //   });
            //   const bucket = gcs.bucket(object.bucket);
            //   const avatarFileName = 'emojied_' + fileName;
            //   const tmpAvatarPath = join(tmpdir(), avatarFileName);
            //  const outputFile=bucket.upload(tmpAvatarPath)
              
            // // Write the result to a file
            // //console.log(`Writing to file ${outputFile}`);
            // const writeStream = fs.createWriteStream(outputFile);
            // const pngStream = canvas.pngStream();
          
            // await new Promise((resolve, reject) => {
            //   pngStream
            //     .on('data', chunk => writeStream.write(chunk))
            //     .on('error', reject)
            //     .on('end', resolve);
            // });








                //const joyLikelihood = faces.includes('joyLikelihood')

                const dimples = labels.includes('testxyzLabel');
              // or await
              return docRef.set({ testxyzLabel, labels//, faces 
                }, { merge: true });



});







