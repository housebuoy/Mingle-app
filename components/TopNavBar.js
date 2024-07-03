import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import right from '../assets/images/icons/right.png';
import React from 'react'

const TopNavBar = ({title, iconSource, handlePress}) => {
  return (
    <View style={styles.topNav}>        
        {/* <View style={styles.topLeftNav}>
        </View> */}
        <View>
          <Text style={styles.topMidNavText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.topRightNav} onPress={handlePress}>
          <Image source={iconSource} style={styles.subImage} resizeMode="cover"/>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        // gap: 60,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
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
        fontFamily: "Poppins-Bold",
        fontSize: 30,
      },
      subImage:{
        width: 24,
        height: 24,
      }
})