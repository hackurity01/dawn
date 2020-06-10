import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const HomeView = () => {
  return (
    <View style={styles.container}>
      <Text>Category View</Text>
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
