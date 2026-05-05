import { useFonts } from 'expo-font';

export function useAppFonts() {
  const [loaded] = useFonts({
    // Poppins
    'Poppins-Black': require('../../assets/fonts/Poppins/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../../assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins/Poppins-Italic.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../../assets/fonts/Poppins/Poppins-ThinItalic.ttf'),

    // Montserrat
    'Montserrat-Black': require('../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    'Montserrat-BlackItalic': require('../../assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('../../assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    'Montserrat-ExtraLightItalic': require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat-Italic': require('../../assets/fonts/Montserrat/static/Montserrat-Italic.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Montserrat-LightItalic': require('../../assets/fonts/Montserrat/static/Montserrat-LightItalic.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('../../assets/fonts/Montserrat/static/Montserrat-MediumItalic.ttf'),
    'Montserrat-Regular': require('../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('../../assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-Thin': require('../../assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-ThinItalic': require('../../assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf'),
  });

  return loaded;
}
