import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {Auth} from 'aws-amplify'

const HomeView = ({navigation}) => {
  console.log(Auth, Auth.currentUserInfo())
  return (
    <View style={styles.container}>
      <Text>Home View</Text>
      <Button
        title={'asdfaaaaa'}
        onPress={() => {
          navigation.navigate('Player', {meditationId: 1})
        }}>
        asdf
      </Button>
    </View>
  )
}

export default HomeView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
