import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import woman from '../assets/images/photo.png';

const DiscoverCard = () => {
  return (
    <View style={styles.container}>
        <View>
            <Image source={woman} style={styles.image}/>
        </View>
    </View>
  )
}

export default DiscoverCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        
    }
})