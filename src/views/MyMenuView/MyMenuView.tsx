import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {Auth} from 'aws-amplify'

const HomeView = () => {
  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  return (
    <View style={styles.container}>
      <Text>MyMenu View</Text>
      <Button title={'로그아웃'} onPress={signOut} />
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
