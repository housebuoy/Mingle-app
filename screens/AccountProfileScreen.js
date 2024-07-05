import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import BottomNavBar from '../components/BottomNavBar'
import cards from '../assets/images/icons/card-solid-trans.png';
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-detail-solid-36.png';
import user from '../assets/images/icons/user-solid-36.png';
import { Icon } from '@rneui/themed';
import { useLikedUsers } from '../hooks/likedUsersContext'

const AccountProfileScreen = ({navigation, route}) => {
  const { selectedInterests } = useLikedUsers();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const data = 
    {
      id: '1',
      name: 'Jessica Parker',
      age: 23,
      profession: 'Professional model',
      location: 'Chicago, Ghana',
      distance: '1 km',
      image: require('../assets/images/photo.png'),
      activity: require('../assets/images/photo.png'),
      about: 'My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..',
    }


  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.topRightNav} onPress={handleGoBack}>
          <Icon name="chevron-left" type='entypto' size={30} color="#E94057" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topRightNav} >
          <Icon name="logout" size={30} color="#E94057" />
        </TouchableOpacity>
      </View> */}
      <ScrollView style={styles.scrollContainer}>
        <View style={{width: '100%', height: 130, borderRadius: 60, marginTop: 5, alignItems: 'center'}}>
          <Image source={require('../assets/images/photo.png')} resizeMode='cover' style={{width: 130, height: '100%', borderBottomLeftRadius: 30 , borderTopRightRadius: 30 , padding: 2}}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 24}}>{data.name}, {data.age}</Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7}}>{data.profession}</Text>
          </View>
          <TouchableOpacity style={styles.topRightNav} >
            <Icon name="edit" size={24} color="#E94057" />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>Location</Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7}}>{data.location}</Text>
          </View>
          <TouchableOpacity style={[styles.topRightNav, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]} >
            <Icon name="location-pin" size={24} color="#E94057" />
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>{data.distance}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>About</Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7}}>{data.about}</Text>
          </View>
          <TouchableOpacity style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]} >
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, color: '#E94057'}}>Read more</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10}}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>Interests</Text>
          <View  style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 5}}>            
              {selectedInterests && selectedInterests.map((interest, index) => (
                <TouchableOpacity style={[styles.interestTab, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]} >
                  <Text sty key={index} style={styles.interestTabText}>{interest}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        
      </ScrollView>
      <BottomNavBar navigation={navigation} 
                    cardIcon={cards}
                    matchIcon={heart}
                    messageIcon={messages}
                    userIcon={user}
      />
    </SafeAreaView>
  )
}

export default AccountProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  topRightNav: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E8E6EA',
    borderRadius: 10,
  },
  scrollContainer: {
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  interestTab:{
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E94057',
    borderRadius: 8,
  },
  interestTabText:{
    color: '#E94057',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,

  },
})