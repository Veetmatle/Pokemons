const faceDetectorEnabled = process.env.EXCLUDE_FACE_DETECTOR !== '1';

module.exports = {
  expo: {
    name: 'pokemon-lask',
    slug: 'pokemon-lask',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.andrzejlaskowski.pokemonlask',
      infoPlist: {
        NSCameraUsageDescription:
          'This app uses the camera to let you take photos of Pokemon.',
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
      package: 'com.andrzejlaskowski.pokemonlask',
      permissions: ['android.permission.CAMERA'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      faceDetectorEnabled,
    },
    plugins: [
      'expo-image',
      'react-native-permissions',
      'expo-location',
      [
        'react-native-maps',
        {
          androidGoogleMapsApiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY,
        },
      ],
    ],
  },
};
