/* eslint-disable prettier/prettier */
import * as SecureStore from 'expo-secure-store'
import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
        setIsUserAuthenticated(!!token)
    })
  },[])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: 'absolute', left: -200 }}
      className="relative flex-1 bg-gray-900"
    >
      <StyledStripes className="absolute left-2" />

    <Stack
        screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade'
    }}
    >
        <Stack.Screen name='index' redirect={isUserAuthenticated}/>
        <Stack.Screen name='new' />
        <Stack.Screen name='memories' />
    </Stack>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
