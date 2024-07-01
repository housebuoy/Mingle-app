import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import right from '../assets/images/icons/right.png';
import setting from '../assets/images/icons/setting-config.png';
import React from 'react'

const TopNavBar = ({title}) => {
  return (
    <View style={styles.topNav}>        
        <TouchableOpacity style={styles.topLeftNav}>
          <Image source={right} style={styles.subImage} resizeMode="cover"/>
        </TouchableOpacity>
        <View style={styles.topMidNav}>
          <Text style={styles.topMidNavText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.topRightNav}>
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
        gap: 70,
        paddingBottom: 4,
      },
      topLeftNav: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E8E6EA',
        borderRadius: 10,
      },
      topRightNav: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E8E6EA',
        borderRadius: 10,
      },
      topMidNav: {
        // flex: 1,
        // alignSelf: 'flex-end'
      },
      topMidNavText: {
        fontFamily: "Poppins-Bold",
        fontSize: 25
      }
})