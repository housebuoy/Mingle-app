import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { Slider } from '@rneui/themed';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar';
import DiscoverCard from '../components/DiscoverCard';
import BottomNavBar from '../components/BottomNavBar';
import setting from '../assets/images/icons/setting-config.png';
import cards from '../assets/images/icons/card-solid-36.png';
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-detail-solid-36.png';
import user from '../assets/images/icons/user.png';
import { useLikedUsers } from '../hooks/likedUsersContext' // bound to be removed
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = ({navigation, location, likedUsers, setLikedUsers }) => {
  const { activeGender, setActiveGender } = useLikedUsers();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const continueButton = async () => {
    try {
      // Save the ageRange to AsyncStorage as a 
      if (ageRange !== null){
        await AsyncStorage.setItem('ageRange', JSON.stringify(ageRange));
      }
      if(activeGender !== null){
        await AsyncStorage.setItem('genderActive', activeGender);
      }
      console.log('success', ageRange, activeGender) 
      setModalVisible(!modalVisible);
    } catch (error) {
      console.error('Error saving ageRange to AsyncStorage:', error);
    }
  };

  const [activeIndex, setActiveIndex] = useState(2);

  const handlePress = (index, gender) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
      setActiveGender(null); // clear active state
    } else {
      setActiveIndex(index);
      setActiveGender(gender);
      console.log(gender)
    }   
  };

  const handleClear = () => {
    setActiveIndex(-1); // clear all active states
  };

  const [distance, setDistance] = useState(10); // initialize distance to 10 km

  const handleDistanceChange = (value) => {
    setDistance(value);
  };

  

  const [ageRange, setAgeRange] = useState(50);

  const handleAgeRangeChange = (value) => {
    setAgeRange(value);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Discover"
                 iconSource={setting} 
                 handlePress={toggleModal}
      />

      <DiscoverCard likedUsers={likedUsers}
                    setLikedUsers={setLikedUsers}      
      />

      <BottomNavBar navigation={navigation} 
                    cardIcon={cards}
                    matchIcon={heart}
                    messageIcon={messages}
                    userIcon={user}
                    location={location}
      />

      <Modal
        animationType="slide"
        // onShow={() => console.log('showed') }
        visible={modalVisible}
        onRequestClose={toggleModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTopContent}>
            <TouchableOpacity style={styles.clearButton} onPress={() => handleClear()}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <Text style={styles.contentHeading}>Filters</Text>
              <TouchableOpacity style={[styles.clearButton,{justifyContent: 'flex-end'}]} onPress={() => toggleModal()}>
                <Icon name="close" size={36} color="#E94057" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalConfig}>
              <View style={styles.genderConfig}>
                <Text style={styles.genderConfigHead}>Interested In</Text>
                <View style={styles.genderConfigButtons}>
                  <TouchableOpacity style={[
                    styles.maleButton,
                    activeIndex === 0 ? styles.activeButton : null
                    ]}
                    onPress={() => handlePress(0, 'Man')}
                    >
                    <Text style={[
                      styles.maleButtonText, 
                      activeIndex === 0 ? styles.activeButtonText : null
                    ]}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    styles.femaleButton,
                    activeIndex === 1 ? styles.activeButton : null
                    ]}
                    onPress={() => handlePress(1, 'Woman')}
                  >
                  <Text style={[
                      styles.femaleButtonText, 
                      activeIndex === 1 ? styles.activeButtonText : null
                    ]}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    styles.allButton,
                    activeIndex === 2 ? styles.activeButton : null
                    ]}
                    onPress={() => handlePress(2, 'all')}>
                    <Text style={[
                      styles.allButtonText, 
                      activeIndex === 2 ? styles.activeButtonText : null
                    ]}>All</Text>
                  </TouchableOpacity>
                </View>                
              </View>
            </View>
            <View style={styles.distanceContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.genderConfigHead}>Distance Apart</Text>
                <Text style={styles.label}>{distance} km</Text>
              </View>
                <Slider
                  style={styles.slider}
                  value={distance}
                  onValueChange={handleDistanceChange}
                  minimumValue={10}
                  maximumValue={100}
                  step={1}
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                  thumbTintColor='#e94057'
                  minimumTrackTintColor ='#e94057'
                  maximumTrackTintColor ='#ddd'
                />
            </View>
            <View style={styles.distanceContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.genderConfigHead}>Maximum Age</Text>
                <Text style={styles.label}>{ageRange} yrs</Text>
              </View>
                <Slider
                  style={styles.slider}
                  value={ageRange}
                  onValueChange={handleAgeRangeChange}
                  minimumValue={0}
                  maximumValue={150}
                  step={1}
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                  thumbTintColor='#e94057'
                  minimumTrackTintColor ='#e94057'
                  maximumTrackTintColor ='#ddd'
                />
            </View>
            <TouchableOpacity onPress={()=>continueButton()} style={styles.continueButton}>
              <Text style={styles.closeButton}>Continue</Text>
            </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
    backgroundColor: '#fff'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
  },
  continueButton: { 
    backgroundColor: '#e94057',
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40
  },
  closeButton: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  contentHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    flex: 1,
    textAlign: 'right'
  },
  modalTopContent:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearButton: {
    flex: 1,
  },
  clearButtonText: {
      textAlign: 'center',
      color: '#e94057',
      fontFamily: 'Poppins-Bold',
      fontSize: 18
  },
  genderConfigButtons: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    borderRadius: 10,
  },
  genderConfigHead:{
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 5,
  },
  maleButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  femaleButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  allButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  maleButton: {
    borderRightWidth: 1,
    borderColor: '#dfdfdf',
    flex: 1,
    paddingVertical: 10,
    backgroundColor : '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  femaleButton: {
    borderRightWidth: 1,
    borderColor: '#dfdfdf',
    // backgroundColor : 'red',
    flex: 1,
    paddingVertical: 10,
  },
  allButton: {

    backgroundColor : '#fff',
    flex: 1,
    height: '100%',
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeButton: {
    backgroundColor: '#e94057',
  },
  activeButtonText:{
    color: '#fff'
  },
  label: {
    fontFamily: 'Poppins-Bold',
    color: '#B1B1B1',
    fontSize: 18,
  },
  thumb: {
    width: 30,
    height: 30,
    borderWidth: 4,
    borderColor: '#f1efef'
  },
  track: {
    height: 8,
    borderRadius: 10,
  },
  distanceContainer: {
    marginTop: 25,
  }
})