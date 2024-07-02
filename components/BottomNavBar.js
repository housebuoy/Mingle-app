import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import cards from '../assets/images/icons/card-solid-36.png';
import people from '../assets/images/icons/user.png';
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-detail-solid-36.png';

const BottomNavBar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={cards} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
        <Image source={heart} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={messages} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={people} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
    </View>
  )
}

export default BottomNavBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FEFEFE',
        borderTopWidth: 2,
        borderColor: '#E8E6EA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        gap: 45
    },
    icon: {
        width: 35,
    }
})