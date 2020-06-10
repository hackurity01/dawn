import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native'
import TrackPlayer, {STATE_NONE} from 'react-native-track-player'
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypoIcon from 'react-native-vector-icons/Entypo'
FeatherIcon.loadFont()
EntypoIcon.loadFont()

import TrackStatusSlider from './TrackStatusSlider'

const PlayerView = (props) => {
  const [playStatus, setPlayStatus] = useState<
    string | 'loading' | 'playing' | 'waiting' | 'paused'
  >('loading')
  const [audio, setAudio] = useState<any>([])

  useEffect(() => {
    TrackPlayer.getState().then(async (state) => {
      console.log('useEffect', state)
      const trackId = await TrackPlayer.getCurrentTrack()
      const meditationId = props.route.params.meditationId.toString()
      if (state !== STATE_NONE && trackId === meditationId) {
        console.log('playing----')
        TrackPlayer.getTrack(trackId).then((track) => {
          console.log('track', track)

          setAudio({
            id: track.id,
            url: track.url,
            title: track.title,
            artist: track.artist,
            artwork: track.artwork,
          })
        })
      } else {
        axios
          .get(
            'https://aal9gv4594.execute-api.ap-northeast-2.amazonaws.com/default/apptest',
          )
          .then((payload) => {
            console.log('axios payload', payload)
            const meditation = payload.data.Item
            TrackPlayer.setupPlayer().then(async () => {
              await TrackPlayer.add({
                id: meditation.id,
                url: meditation.url,
                title: meditation.title,
                artist: meditation.author,
                date: meditation.createTime,
                artwork: meditation.bgImage,
              })
              setAudio({
                id: meditation.id,
                url: meditation.url,
                title: meditation.title,
                artist: meditation.author,
                date: meditation.createTime,
                artwork: meditation.bgImage,
              })
              TrackPlayer.play()
            })
          })
      }
    })
  }, [props.route.params.meditationId])

  const {goBack} = props.navigation

  function playMusic() {
    if (playStatus === 'playing') {
      TrackPlayer.pause()
      setPlayStatus('paused')
    } else {
      TrackPlayer.play()
      setPlayStatus('playing')
    }
  }

  function changeTime(second) {
    console.log(second)
    TrackPlayer.seekTo(second)
  }

  function moveBeforeSeconds() {
    setPlayStatus('loading')
    TrackPlayer.getPosition().then((position) => {
      TrackPlayer.seekTo(position - 5)
      setPlayStatus('playing')
    })
  }

  function moveAfterSeconds() {
    setPlayStatus('loading')
    TrackPlayer.getPosition().then((position) => {
      TrackPlayer.seekTo(position + 5)
      setPlayStatus('playing')
    })
  }

  return (
    <ImageBackground
      source={{uri: audio.artwork ? audio.artwork : ''}}
      style={styles.bgImage}
      blurRadius={1}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <EntypoIcon
            name="chevron-thin-left"
            size={30}
            color="rgba(255,255,255,0.9)"
            onPress={() => goBack()}
          />
        </View>
        <View style={styles.body}>
          <View style={{alignItems: 'center', marginTop: 120}}>
            <Text style={{fontSize: 40, fontWeight: '300', color: '#fff'}}>
              {audio.title}
            </Text>
          </View>
        </View>
        <View style={styles.controller}>
          <View>
            <TrackStatusSlider
              TrackPlayer={TrackPlayer}
              changeValue={changeTime}
            />
          </View>

          <View style={styles.controllerBtns}>
            <TouchableOpacity>
              <FeatherIcon
                name="rotate-ccw"
                size={46}
                color="#fff"
                onPress={moveBeforeSeconds}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={playMusic} style={styles.playBtnWrapper}>
              {playStatus === 'playing' ? (
                <FeatherIcon
                  name="pause"
                  size={58}
                  color="#fff"
                  style={{marginLeft: 5, marginRight: 5}}
                />
              ) : (
                <FeatherIcon
                  name="play"
                  size={58}
                  color="#fff"
                  style={{marginLeft: 7, marginRight: 3}}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <FeatherIcon
                name="rotate-cw"
                size={46}
                color="#fff"
                onPress={moveAfterSeconds}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default PlayerView

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  header: {
    height: 90,
    justifyContent: 'flex-end',
    paddingLeft: 15,
    // backgroundColor: 'powderblue',
  },
  body: {
    flex: 1,
    // backgroundColor: 'powderblue',
  },
  controller: {
    height: 260,
    // backgroundColor: 'skyblue',
  },
  controllerBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtnWrapper: {
    marginHorizontal: 20,
  },
  textLight: {
    color: '#B6B7BF',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
  },
})

TrackPlayer.registerEventHandler(require('./player-handler.js'))
