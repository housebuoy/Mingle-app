import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import woman from '../assets/images/photo.png';
import Swiper from 'react-native-deck-swiper';
import { Icon } from 'react-native-elements';

const DiscoverCard = () => {

    const data = [
        {
          id: '1',
          name: 'Jessica Parker',
          age: 23,
          profession: 'Professional model',
          distance: '1 km',
          image: require('../assets/images/photo.png'),
        },
        {
          id: '2',
          name: 'Emily Johnson',
          age: 27,
          profession: 'Graphic Designer',
          distance: '2 km',
          image: require('../assets/images/photo2.png'), // Replace with actual image URL
        },
        {
          id: '3',
          name: 'Sophia Williams',
          age: 22,
          profession: 'Software Engineer',
          distance: '1.5 km',
          image: require('../assets/images/onboarding/female1.png'), // Replace with actual image URL
        },
        {
          id: '4',
          name: 'Olivia Brown',
          age: 25,
          profession: 'Marketing Specialist',
          distance: '3 km',
          image: require('../assets/images/onboarding/female1.png'), // Replace with actual image URL
        },
        {
          id: '5',
          name: 'Ava Davis',
          age: 24,
          profession: 'Photographer',
          distance: '0.5 km',
          image: require('../assets/images/onboarding/female1.png'), // Replace with actual image URL
        },
        // Add more users as needed
      ];
      

      const [users, setUsers] = useState(data);
      const swiperRef = useRef(null);
    
      const handleSwipeLeft = (cardIndex) => {
        console.log('Disliked:', users[cardIndex].name);
      };
    
      const handleSwipeRight = (cardIndex) => {
        console.log('liked:', users[cardIndex].name);
      };
      const handleSwipeTop = (cardIndex) => {
        console.log('Super liked:', users[cardIndex].name);
      };
    
      const renderCard = (user) => {
        return (
          <View style={styles.card}>
            <Image source={user.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
              <Text style={styles.profession}>{user.profession}</Text>
              <View style={styles.distanceContainer}>
                <Icon name="location-on" size={18} color="#aeadad" />
                <Text style={styles.distance}>{user.distance}</Text>
              </View>
            </View>
          </View>
        );
      };
        


    
      return (
        <View style={styles.container}>
        <View >
          <Swiper
            ref={swiperRef}
            cards={users}
            renderCard={renderCard}
            onSwipedLeft={handleSwipeLeft}
            onSwipedRight={handleSwipeRight}
            onSwipedTop={handleSwipeTop}
            cardIndex={0}
            backgroundColor={'#f8f8f8'}
            stackSize={3}
            showSecondCard={true}
            infinite
          />
        </View>
        <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} style={styles.actionButton}>
              <Icon name="close" type="material" size={35} color="#ff6b6b" />
            </TouchableOpacity>
            <View style={styles.heartButtonContainer}>
              <TouchableOpacity onPress={() => swiperRef.current.swipeRight()} style={styles.heartButton}>
                <Icon name="favorite" type="material" size={50} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.heartButtonContainer}>
              <TouchableOpacity onPress={() => swiperRef.current.swipeTop()} style={styles.actionButton}>
                <Icon name="star" type="material" size={35} color="#8a2387" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

export default DiscoverCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
      },
      card: {
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 450,
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 10,
        width: '100%',
        height: '100%'
      },
      infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'flex-start',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
      },
      profession: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
      },
      distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      distance: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
      },
      actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        // borderTopWidth: 1,
        // borderTopColor: '#eee',
        position: 'absolute',
        bottom: -5,
      },
      actionButton: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,

      },
      heartButtonContainer: {
        alignItems: 'center',
        position: 'relative',
      },
      heartButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
      },
})