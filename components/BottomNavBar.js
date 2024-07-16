import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import people from '../assets/images/icons/user.png';
import messages from '../assets/images/icons/message-square-detail-solid-36.png';


const BottomNavBar = ({navigation, cardIcon, matchIcon, messageIcon, userIcon}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handlePress = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1); // clear active state
    } else {
      setActiveIndex(index);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={cardIcon} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {navigation.navigate('Matches')}}>
        <Image source={matchIcon}
          resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('Messages')}}>
        <Image source={messageIcon} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('Account')}}>
        <Image source={userIcon} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
    </View>
  )
}

export default BottomNavBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FEFEFE',
        borderTopWidth: 1,
        borderColor: '#E94057',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 2,
        gap: 45,
        position: 'fixed',
        bottom: 0,
    },
    icon: {
        width: 35,
    }
})