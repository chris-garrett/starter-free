import type { MetaFunction } from '@remix-run/node'
import { styled, Text, View } from '@my/ui'
import { useState } from 'react'
import { HomeScreen } from 'app/features/home/screen'

export const meta: MetaFunction = () => {
  return [
    { title: 'Tamagui with Remix' },
    {
      name: 'description',
      content: 'A demo showcasing Tamagui working with Remix.',
    },
  ]
}

export default function Index() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <View
      theme={theme}
      flexDirection="column"
      gap={16}
      backgroundColor="$background"
      minHeight="100vh"
    >
      <HomeScreen />
    </View>
  )
}
