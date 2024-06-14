import React from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

const fonts = () => {
    const [fontsLoaded, fontError] = useFonts({
        'GrandHotel-Regular': require('../assets/fonts/GrandHotel-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'), 
        'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }
}

export default fonts
