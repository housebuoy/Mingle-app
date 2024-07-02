import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar';
import DiscoverCard from '../components/DiscoverCard';
import BottomNavBar from '../components/BottomNavBar';

const HomeScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [activeIndex, setActiveIndex] = useState(-1);

  const handlePress = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1); // clear active state
    } else {
      setActiveIndex(index);
    }
  };

  const handleClear = () => {
    setActiveIndex(-1); // clear all active states
  };

  const [distance, setDistance] = useState(10); // initialize distance to 10 km

  const handleDistanceChange = (value) => {
    setDistance(value);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Discover" handlePress={toggleModal}/>
      <DiscoverCard />
      <BottomNavBar />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTopContent}>
              <Text style={styles.contentHeading}>Filters</Text>
              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.clearButtonText}>Clear</Text>
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
                    onPress={() => handlePress(0)}
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
                    onPress={() => handlePress(1)}
                  >
                  <Text style={[
                      styles.maleButtonText, 
                      activeIndex === 1 ? styles.activeButtonText : null
                    ]}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    styles.allButton,
                    activeIndex === 2 ? styles.activeButton : null
                    ]}
                    onPress={() => handlePress(2)}>
                    <Text style={[
                      styles.allButtonText, 
                      activeIndex === 2 ? styles.activeButtonText : null
                    ]}>All</Text>
                  </TouchableOpacity>
                </View>                
              </View>
            </View>
            <View style={styles.distanceContainer}>
              <Text style={styles.label}>Distance: {distance} km</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                value={distance}
                onValueChange={handleDistanceChange}
                minimumTrackTintColor="#e94057"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#e94057"
              />
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Close</Text>
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
    marginTop: 20,
    gap: 5
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  closeButton: {
    color: 'blue',
    textAlign: 'right',
    marginTop: 10,
  },
  contentHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    flex: 1.5,
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
      textAlign: 'right',
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
    // paddingVertical: 10,
    borderRadius: 10,
  },
  genderConfigHead:{
    fontFamily: 'Poppins-Bold',
    fontSize: 20,

  },
  maleButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  femaleButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  allButtonText: {
    fontFamily: 'Poppins-Medium',
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

})