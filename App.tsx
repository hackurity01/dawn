import React from 'react'
import Amplify from 'aws-amplify'
import {withAuthenticator} from 'aws-amplify-react-native'
import {NavigationContainer} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont()

import Stack from './src/navigations/Stack'
import awsConfig from './src/aws-exports'

Amplify.configure(awsConfig)

function App() {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  )
}
// export default App
export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
    signUpFields: [
      {label: 'Name', key: 'name', required: true, type: 'string'},
    ],
  },
})
