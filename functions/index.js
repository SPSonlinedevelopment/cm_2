/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const vision = require("@google-cloud/vision");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const functions = require("firebase-functions");

const client = new vision.ImageAnnotatorClient();
const admin = require("firebase-admin");
admin.initializeApp();
const bucket = admin.storage().bucket();

exports.imageUploaded = functions.storage
  .object()
  .onFinalize(async (object) => {
    const bucket = object.bucket;
    const file = object.name;
    const contentType = object.contentType;

    console.log("test funcyion");
    // Check if the uploaded file is an image
    if (contentType.startsWith("image/")) {
      console.log(`New image uploaded to ${bucket}/${file}`);
    }
  });

exports.detectInappropriateImages = functions.storage
  .object()
  .onFinalize(async (object) => {
    const imageUri = `gs://${object.bucket}/${object.name}`;

    console.log("image detect functio test");

    try {
      const [result] = await client.safeSearchDetection(imageUri);
      const detections = result.safeSearchAnnotation;

      console.log(`Adult: ${detections.adult}`);
      console.log(`Spoof: ${detections.spoof}`);
      console.log(`Medical: ${detections.medical}`);
      console.log(`Violence: ${detections.violence}`);
      console.log(detections);

      if (detections.adult >= 3 || detections.violence >= 3) {
        console.log(`Image ${object.name} detected as inappropriate.`);
        // Handle inappropriate image (e.g., blur, delete, notify)
      } else {
        console.log(`Image ${object.name} detected as safe.`);
      }
    } catch (error) {
      console.error(`Error analyzing image ${object.name}:`, error);
    }
  });

// to do convert to HTTP request and call from app

exports.deleteImageWithFace = functions.storage
  .object()
  .onFinalize(async (object) => {
    // Check if the file is an image
    if (!object.contentType.startsWith("image/")) {
      console.log("File is not an image, skipping face detection.");
      return;
    }
    console.log("url", `gs://${object.bucket}/${object.name}`);
    const [result] = await client.faceDetection(
      `gs://${object.bucket}/${object.name}`
    );

    if (result.faceAnnotations && result.faceAnnotations.length > 0) {
      console.log("Face detected in the image.");

      // Delete the image from Firebase Storage
      await bucket.file(object.name).delete();
      console.log("Image deleted successfully.");

      return true; // A face is present
    } else {
      console.log("No face detected in the image.");
      return false; // No face present
    }
  });
