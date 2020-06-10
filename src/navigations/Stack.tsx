import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import PlayerView from '../views/PlayerView/PlayerView'
import BottomTab from './BottomTab'

const Stack = createStackNavigator()

function StackView() {
  return (
    <Stack.Navigator screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="Player" component={PlayerView} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default StackView
