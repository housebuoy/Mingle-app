import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import right from '../assets/images/icons/right.png';
import setting from '../assets/images/icons/setting-config.png';
import React from 'react'

const TopNavBar = ({title, handlePress}) => {
  return (
    <View style={styles.topNav}>        
        <View style={styles.topLeftNav}>
        <Text style={{fontFamily: 'Poppins-Medium', textAlign: 'center', fontSize: 18, color:'#767474'}}>Chicago</Text>
        </View>
        <View>
          <Text style={styles.topMidNavText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.topRightNav} onPress={handlePress}>
          <Image source={setting} style={styles.subImage} resizeMode="cover"/>
        </TouchableOpacity>
    </View>
  )
}

export default TopNavBar

const styles = StyleSheet.create({
    topNav: {
        borderBottomColor: '#E8E6EA',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        paddingBottom: 4,
        paddingVertical: 10
      },
      topLeftNav: {
        paddingVertical: 8,
        paddingHorizontal: 8,
      },
      topRightNav: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E8E6EA',
        borderRadius: 10,
      },
      topMidNavText: {
        fontFamily: "Poppins-ExtraBold",
        fontSize: 28,
      }
})