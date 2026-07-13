// Exclude face detector for iOS sim build. Android stays the same.
const excludeFaceDetector = process.env.EXCLUDE_FACE_DETECTOR === '1';

module.exports = {
  dependencies: {
    'react-native-vision-camera-face-detector': {
      platforms: {
        ios: excludeFaceDetector ? null : {},
      },
    },
  },
};
