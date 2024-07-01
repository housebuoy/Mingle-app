import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
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
          image: require('../assets/images/onboarding/female1.png'), // Replace with actual image URL
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
                <Icon name="location-on" size={18} color="#888" />
                <Text style={styles.distance}>{user.distance}</Text>
              </View>
            </View>
          </View>
        );
      };
        


    
      return (
        <View style={styles.container}>
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
            // infinite
          />
        </View>
      );
    };

export default DiscoverCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      card: {
         borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E6EA',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%'
      },
      image: {
        // flex: 1,
        resizeMode: 'cover',
        borderRadius: 10,
      },
      infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'flex-start',
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
})