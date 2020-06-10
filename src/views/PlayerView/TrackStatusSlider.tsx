import React, {useState, useEffect, useMemo} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useTrackPlayerProgress} from 'react-native-track-player'
import Slider from 'react-native-slider'

type TrackStatusSliderProps = {
  TrackPlayer: any
  changeValue: (value: number) => void
}

const getMinSec = (sec: number): string =>
  `${Math.floor(Math.ceil(sec) / 60)}:${String(Math.ceil(sec) % 60).padStart(
    2,
    '0',
  )}`

const TrackStatusSlider = (props: TrackStatusSliderProps) => {
  const {position, bufferedPosition, duration} = useTrackPlayerProgress(200)

  console.log('TrackStatusSlider', {
    position,
    bufferedPosition,
    duration,
  })

  const durationMinSec = useMemo(() => getMinSec(duration), [duration])
  const positionMinSec = getMinSec(position)

  return (
    <View style={{margin: 32}}>
      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={position}
        thumbStyle={styles.thumb}
        minimumTrackTintColor="rgba(255,255,255,0.9)"
        maximumTrackTintColor="rgba(255,255,255,0.5)"
        onValueChange={(second) => {
          console.log('changeValue', second)
          props.changeValue(second)
        }}
      />
      <View
        style={{
          marginTop: -12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.timeText}>{positionMinSec}</Text>
        <Text style={styles.timeText}>{durationMinSec}</Text>
      </View>
    </View>
  )
}

export default TrackStatusSlider

const styles = StyleSheet.create({
  timeText: {
    color: 'rgba(255,255,255,0.9)',
  },
  thumb: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
})
