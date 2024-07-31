import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect, } from 'react'
import Swiper from 'react-native-deck-swiper';
import { Icon } from 'react-native-elements';
import { useLikedUsers } from '../hooks/likedUsersContext';
import { useUser } from '../context/UseContext';
import { collection, getDocs, getFirestore,  doc, query, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



const db = getFirestore()
const DiscoverCard = () => {         
      const auth = getAuth();
      const [users, setUsers] = useState([]);
      const [whoYouLiked, setWhoYouLiked] = useState([]);
      const { activeGender } = useLikedUsers();
      const [loading, setLoading] = useState(true);
      const { userData} = useUser();
      const { matched } = useLikedUsers();
      const { ageInterval } = useLikedUsers(); // bound to be removed
      const [lastVisible, setLastVisible] = useState(null);
      const [lastViewedIndex, setLastViewedIndex] = useState(0);
      const [error, setError] = useState(null);
      const [showReload, setShowReload] = useState(false);
      const swiperRef = useRef(null);

      const currentUserLocation = userData?.location

      const haversineDistance = (user, currentUserLocation) => {
        if (!currentUserLocation || !currentUserLocation?.latitude || !currentUserLocation?.longitude || !user.location) {
          return 'N/A'; // or handle the error appropriately
        }
      
        const toRad = (x) => x * Math.PI / 180;
      
        const lat1 = currentUserLocation.latitude;
        const lon1 = currentUserLocation.longitude;
        const lat2 = user?.location.latitude
        const lon2 = user?.location.longitude
      
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLon / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
      
        return distance.toFixed(2); // Round to two decimal places
      };

     
      const fetchUsers = async (currentUserId, lastIndex) => {
        try {
          const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
          const currentUserData = currentUserDoc.data();
          const whoYouLiked = currentUserData.whoYouLiked || [];
      
          const storedAgeRange = parseInt(await AsyncStorage.getItem('ageRange'), 10);
          const genderActive = await AsyncStorage.getItem('genderActive');
      
          const currentYear = new Date().getFullYear();
          
          let queryConstraints = [];
          if (genderActive && genderActive !== 'all') {
            queryConstraints.push(where('gender', '==', genderActive));
          }
      
          const querySnapshot = await getDocs(query(collection(db, 'users'), ...queryConstraints));
      
          const usersList = querySnapshot.docs
            .map(doc => {
              const userData = doc.data();
              const userBirthYear = userData.birthdate.toDate().getFullYear();
              const userAge = currentYear - userBirthYear;
      
              return {
                ...userData,
                id: doc.id,
                age: userAge,
              };
            })
            .filter(user => {
              const isValidAge = storedAgeRange ? user.age <= storedAgeRange : true;
              const isNotCurrentUser = user.id !== currentUserId;
              const isNotLikedByCurrentUser = !whoYouLiked.includes(user.id);
      
              return isValidAge && isNotCurrentUser && isNotLikedByCurrentUser;
            });
      
          return usersList.slice(lastIndex);
        } catch (error) {
          console.error('Error fetching users:', error);
          throw error;
        }
      };
      
            

      useEffect(() => {
        console.log(activeGender)
        const fetchWhoYouLiked = async () => {
          try {
            const currentUserId = await AsyncStorage.getItem('userToken');
            if (currentUserId) {
              const userDocRef = doc(db, 'users', currentUserId);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                setWhoYouLiked(userDoc.data().whoYouLiked || []);
              }
            }
          } catch (error) {
            console.error('Error fetching whoYouLiked:', error);
          }
        };
      
        fetchWhoYouLiked();
      }, []);

      const mapUserData = (userData) => {
        return userData.map(user => ({
          id: user.id,
          name: `${user.username}`,
          age: new Date().getFullYear() - new Date(user.birthdate.toDate()).getFullYear(),
          profession: user.occupation,
          gender: user.gender,
          location: user.location,
          distance: `${haversineDistance(user, currentUserLocation)} km`, // You might want to calculate or fetch the actual distance
          image: { uri: user.profileImageUrl }, // Assuming profileImageUrl is the URL of the image
        }));
      };

      useEffect(() => {
        const fetchAndSetUsers = async () => {
          setLoading(true);
          setError(null);
          try {
            const currentUser = auth.currentUser;
            const currentUserId = await AsyncStorage.getItem('userToken');
            const storedLastViewedIndex = await AsyncStorage.getItem('lastViewedIndex');
            const lastIndex = storedLastViewedIndex ? parseInt(storedLastViewedIndex, 10) : 0;
            setLastViewedIndex(lastIndex);
            console.log(currentUserId)
            const fetchedUsers = await fetchUsers(currentUserId, lastIndex);
            const formattedUsers = mapUserData(fetchedUsers);
            setUsers(formattedUsers);
            setShowReload(formattedUsers.length === 0);
          } catch (error) {
            console.log(error)
            setError('Failed to fetch user data. Please check your network connection.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchAndSetUsers();
      }, [whoYouLiked]);
    
      const handleRetry = () => {
        const fetchAndSetUsers = async () => {
          setLoading(true);
          setError(null);
          try {
            const currentUser = auth.currentUser;
            const currentUserId = await AsyncStorage.getItem('userToken');
            const storedLastViewedIndex = await AsyncStorage.getItem('lastViewedIndex');
            const lastIndex = storedLastViewedIndex ? parseInt(storedLastViewedIndex, 10) : 0;
            setLastViewedIndex(lastIndex);
            const fetchedUsers = await fetchUsers(currentUserId, whoYouLiked, lastIndex);
            const formattedUsers = mapUserData(fetchedUsers);
            setUsers(formattedUsers);
            setShowReload(formattedUsers.length === 0);
          } catch (error) {
            console.log(error)
            setError('Failed to fetch user data. Please check your network connection.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchAndSetUsers();
      };

      const handleCardView = async (viewedIndex) => {
        try {
          await AsyncStorage.setItem('lastViewedIndex', viewedIndex.toString());
         const last = await AsyncStorage.getItem('lastViewedIndex');
          setLastViewedIndex(viewedIndex);
          console.warn(last)
          if (viewedIndex >= users.length - 1) {
            setShowReload(true);
          }
        } catch (error) {
          console.error('Error saving last viewed index:', error);
        }
      };  
    
      const handleSwipeLeft = (cardIndex) => {
        console.log('Disliked:', users[cardIndex].name);
        handleCardView(cardIndex)
      };
    
      const handleSwipeRight = async (cardIndex) => {
        const likedUserId = users[cardIndex].id;
        const currentUserId = await AsyncStorage.getItem('userToken');
        handleCardView(cardIndex)
      
        if (currentUserId) {
          // Retrieve the current user's 'whoYouLiked' array from Firestore
          const currentUserDocRef = doc(db, 'users', currentUserId);
          const currentUserDoc = await getDoc(currentUserDocRef);
          const currentUserData = currentUserDoc.data();
          const currentWhoYouLiked = currentUserData.whoYouLiked || [];
      
          // Update the 'whoYouLiked' array and save it to Firestore
          const updatedWhoYouLiked = [...currentWhoYouLiked, likedUserId];
          await updateDoc(currentUserDocRef, {
            whoYouLiked: updatedWhoYouLiked,
          });      
          // Update the local 'whoYouLiked' state
          setWhoYouLiked(updatedWhoYouLiked);

      
          // Update the whoLikedYou array in the liked user's document
          const likedUserDocRef = doc(db, 'users', likedUserId);
          updateDoc(likedUserDocRef, {
            whoLikedYou: arrayUnion(currentUserId),
          })
            .then(() => {
              console.log('Updated Firestore with whoLikedYou array');
              // checkAndUpdateMatches(currentUserId, updatedWhoYouLiked, whoLikedYou);
            })
            .catch((error) => {
              console.error('Error updating Firestore:', error);
            });
        }
      };
      

      const handleSwipeTop = (cardIndex) => {
        console.log('Super liked:', users[cardIndex].name);
        handleCardView(cardIndex)
      };
    
      const renderCard = (user) => {
        if (!user || !user.image || !user.name || !user.age || !user.profession || !user.distance || !user.gender) {
          return null;
        }
        return (
          <View style={styles.card}>
            <Image source={user.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{user.name}, {user.age !== null ? user.age : ''}</Text>
              <Text style={styles.profession}>{user.profession}, {user.gender}</Text>
              <View style={styles.distanceContainer}>
                <Icon name="location-on" size={18} color="#aeadad" />
                <Text style={styles.distance}>{user.distance}</Text>
              </View>
            </View>
          </View>
        );
      };
        
      if (error) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 10, marginTop: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center', fontSize: 18, color: '#767474' }}>
              Make new matches by swiping
            </Text>
            <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Reload</Text>
            </TouchableOpacity>
          </View>          
            {loading ? (
                <View style={styles.loaderContainer}>
                   <ActivityIndicator size="large" color="#e94057" />
                </View>
                ): showReload ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>No more users available. Try reloading or broadening your search criteria.</Text>
                  </View>
                ) : ( <View style={styles.subContainer}>
                <View style={{marginTop: -50}}>
                <Swiper
                  ref={swiperRef}
                  cards={users}
                  renderCard={renderCard}
                  onSwipedLeft={handleSwipeLeft}
                  onSwipedRight={handleSwipeRight}
                  onSwipedTop={handleSwipeTop}
                  onSwipedBottom={handleSwipeTop}
                  cardIndex={0}
                  backgroundColor={'#f8f8f8'}
                  stackSize={5}
                  showSecondCard={true}
                  // infinite
                />
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} style={styles.actionButton}>
                  <Icon name="close" type="font-awesome" size={35} color="#ff6b6b" />
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
            )}
        </View>
      );
    };

export default DiscoverCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // justifyContent: 'center'
      },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // justifyContent: 'space-between'
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
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        gap: 10,
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
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 25,
        width: '80%',
      },
      errorText: {
        color: '#e94057',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
      },
      retryButton: {
        padding: 10,
        backgroundColor: '#e94057',
        borderRadius: 5,
      },
      retryButtonText: {
        color: '#fff',
        // fontWeight: 'bold',
        fontFamily: 'Poppins-Bold'
      },
})