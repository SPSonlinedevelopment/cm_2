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

// exports.imageUploaded = functions.storage
//   .object()
//   .onFinalize(async (object) => {
//     const bucket = object.bucket;
//     const file = object.name;
//     const contentType = object.contentType;

//     console.log("test funcyion");
//     // Check if the uploaded file is an image
//     if (contentType.startsWith("image/")) {
//       console.log(`New image uploaded to ${bucket}/${file}`);
//     }
//   });

exports.detectInappropriateImages = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Unauthenticated user."
      );
    }

    // Get the image URL from the request data
    const imageUrl = data.imageUrl;

    // Check if the image URL is valid
    if (!imageUrl) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Image URL is required."
      );
    }

    // Check if the file is an image
    if (!imageUrl.startsWith("gs://")) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Image URL must be a Google Cloud Storage URL."
      );
    }

    try {
      const [result] = await client.safeSearchDetection(imageUrl);
      const detections = result.safeSearchAnnotation;
      const unAcceptableResponses = ["POSSIBLE", "LIKELY", "VERY_LIKELY"];
      const values = Object.values(detections);

      const containsInappropriateContent = values.some((item) =>
        unAcceptableResponses.includes(item)
      );

      if (containsInappropriateContent) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      console.error(`Error analyzing image ${imageUrl}:`, error);
    }
  }
);

exports.deleteImageWithFace = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Unauthenticated user."
    );
  }

  // Get the image URL from the request data
  const imageUrl = data.imageUrl;

  // Check if the image URL is valid
  if (!imageUrl) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Image URL is required."
    );
  }

  // Check if the file is an image
  if (!imageUrl.startsWith("gs://")) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Image URL must be a Google Cloud Storage URL."
    );
  }

  // Perform face detection
  const [result] = await client.faceDetection(imageUrl);

  if (result.faceAnnotations && result.faceAnnotations.length > 0) {
    console.log("Face detected in the image.");

    // Delete the image from Firebase Storage

    try {
      //   await bucket.file(imageUrl.replace("gs://", "")).delete();
      //   console.log("Image deleted successfully.");

      return { success: true, message: "Face detected in image" };
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("No face detected in the image.");
    return { success: false, message: "No face detected in the image." };
  }
});
