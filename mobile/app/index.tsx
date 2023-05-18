/* eslint-disable prettier/prettier */
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

import * as SecureStore from 'expo-secure-store'

import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import blurBg from '../src/assets/bg-blur.png'
import NlwLogoSvg from '../src/assets/nlw-logo.svg'
import Stripes from '../src/assets/stripes.svg'

import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'
import { api } from '../src/lib/api'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/d9f41e13cf87e1670326 ',
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signinWithGithub] = useAuthRequest(
    {
      clientId: 'd9f41e13cf87e1670326',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      api
        .post('/register', {
          code,
        })
        .then((response) => {
          const { token } = response.data
          SecureStore.setItemAsync('token', token)
          router.push('/memories')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: 'absolute', left: -200 }}
      className="relative flex-1 bg-gray-900 px-8 py-10"
    >
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <NlwLogoSvg />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signinWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
