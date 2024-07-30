import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar'
import sort from '../assets/images/icons/sort-two.png'
import cardTrans from '../assets/images/icons/card-solid-trans.png'
import heartRed from '../assets/images/icons/heart-solid.png'
import messages from '../assets/images/icons/message-square-detail-solid-36.png';
import user from '../assets/images/icons/user.png';
import { Icon } from '@rneui/themed';
// import { data as users } from '../components/data'
import { useLikedUsers } from '../hooks/likedUsersContext'
import { collection, getFirestore,  doc, getDoc, query, getDocs, setDoc, startAfter, limit, where, arrayRemove, updateDoc, arrayUnion} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInYears } from 'date-fns';

const db = getFirestore()
const auth = getAuth()

const MatchScreen = ({navigation}) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { setMatched } = useLikedUsers();
    const [whoYouLiked, setWhoYouLiked] = useState([]);
    const [whoLikedYou, setWhoLikedYou] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [allLoaded, setAllLoaded] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const checkAndUpdateMatches = async (userId, whoYouLiked, whoLikedYou) => {
      const matches = whoYouLiked.filter(id => whoLikedYou.includes(id));
      if (matches.length > 0) {
        try {
          const userDocRef = doc(db, 'users', userId);
          await updateDoc(userDocRef, { matches: arrayUnion(...matches) });
          console.log('Matches updated:', matches);
          
          //context api setting matched users
          setMatched(matches) 

          // Create chat rooms for each match
          for (const matchId of matches) {
            const chatRoomId = `${userId}-${matchId}`;
            const reverseChatRoomId = `${matchId}-${userId}`;
            
            // Check if the chat room already exists in either order
            const chatRoomRef = doc(db, 'messages', chatRoomId);
            const reverseChatRoomRef = doc(db, 'messages', reverseChatRoomId);
            
            const chatRoomDoc = await getDoc(chatRoomRef);
            const reverseChatRoomDoc = await getDoc(reverseChatRoomRef);
            
            if (!chatRoomDoc.exists() && !reverseChatRoomDoc.exists()) {
              await setDoc(chatRoomRef, {
                users: [userId, matchId],
                createdAt: new Date(),
                messages: []
              });
              console.log('Chat room created with ID:', chatRoomId);
            } else {
              console.log('Chat room already exists for IDs:', chatRoomId, 'or', reverseChatRoomId);
            }
          }
        } catch (error) {
          console.error('Error updating matches or creating chat rooms:', error);
        }
      }
    };


    


    useEffect(() => {
      const fetchCurrentUser = async () => {
        const userId = await AsyncStorage.getItem('userToken');
        if (userId) {
          setCurrentUserId(userId);
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const whoYouLikedArray = userData.whoYouLiked || [];
            const whoLikedYouArray = userData.whoLikedYou || [];
            setWhoYouLiked(whoYouLikedArray);
            setWhoLikedYou(whoLikedYouArray); // Set whoLikedYou data
            fetchUsers(whoYouLikedArray);
            checkAndUpdateMatches(userId, whoYouLikedArray, whoLikedYouArray);
            fetchMatches(userId); 
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("User ID not found in AsyncStorage");
        }
      };
      fetchCurrentUser();
    }, []);
  
    const fetchUsers = async (whoYouLikedArray) => {
      if (!whoYouLikedArray || whoYouLikedArray.length === 0) {
        setLoading(false);
        return;
      }
  
      try {
        const usersQuery = query(collection(db, 'users'), limit(30));
        const documentSnapshots = await getDocs(usersQuery);
        const usersList = documentSnapshots.docs
          .filter(doc => whoYouLikedArray.includes(doc.id))
          .map(doc => ({ ...doc.data(), id: doc.id }));
        setData(usersList);
        setUsers(documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))); // Store all users
        setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err)
        setModalMessage('You are offline; Reconnect to the internet ');
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 3000);
      }
    };

    const closeModal = () => {
      setModalVisible(false);
      setModalMessage(""); // Optional: Reset the message when closing the modal
    };
  
    const fetchMoreUsers = async () => {
      if (allLoaded || !lastVisible) return;
  
      setLoading(true);
      try {
        const usersQuery = query(
          collection(db, 'users'),
          startAfter(lastVisible),
          limit(30)
        );
        const documentSnapshots = await getDocs(usersQuery);
        if (documentSnapshots.empty) {
          setAllLoaded(true);
          setLoading(false);
          return;
        }
        const usersList = documentSnapshots.docs
          .filter(doc => whoYouLiked.includes(doc.id))
          .map(doc => ({ ...doc.data(), id: doc.id }));
        setData(prevData => [...prevData, ...usersList]);
        setUsers(prevUsers => [...prevUsers, ...documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))]); // Store all users
        setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    const handleActiveIndex = (index) => {
      if (activeIndex === index) {
        setActiveIndex(0); // clear active state
      } else {
        setActiveIndex(index);
      }
    };

    const confirmRemoveUser = (id) => {
      Alert.alert(
        'Remove User',
        'Are you sure you want to remove this user?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => handleMatchesRemove(id),
          },
        ],
        { cancelable: false }
      );
    };

    const confirmWhoYouLikedRemove = (id) => {
      Alert.alert(
        'Remove User',
        'Are you sure you want to remove this user?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => handleRemove(id),
          },
        ],
        { cancelable: false }
      );
    };
  
    const handleRemove = async (id) => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          throw new Error('No user is signed in');
        }
  
        const firestore = getFirestore();
        const currentUserRef = doc(firestore, 'users', userToken);
  
        // Remove the userId from the "whoYouLiked" array
        await updateDoc(currentUserRef, {
          whoYouLiked: arrayRemove(id),
        });
        console.log(id, "removed")
      } catch (error) {
        console.error('Error removing user from "whoYouLiked":', error);
      }
    };

    const confirmWhoLikedYouRemove = (id) => {
      Alert.alert(
        'Remove User',
        'Are you sure you want to remove this user?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => handleWhoLikedYouRemove(id),
          },
        ],
        { cancelable: false }
      );
    };
  

    const handleWhoLikedYouRemove = async (id) => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          throw new Error('No user is signed in');
        }
  
        const firestore = getFirestore();
        const currentUserRef = doc(firestore, 'users', userToken);
  
        // Remove the userId from the "whoYouLiked" array
        await updateDoc(currentUserRef, {
          whoLikedYou: arrayRemove(id),
        });
        console.log(id, "removed")
      } catch (error) {
        console.error('Error removing user from "whoLikedYou":', error);
      }
    };

    const handleMatchesRemove = async (id) => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          throw new Error('No user is signed in');
        }
  
        const firestore = getFirestore();
        const currentUserRef = doc(firestore, 'users', userToken);
  
        // Remove the userId from the "whoYouLiked" array
        await updateDoc(currentUserRef, {
          whoLikedYou: arrayRemove(id),
          matches: arrayRemove(id),
        });
        console.log(id, "removed")
      } catch (error) {
        console.error('Error removing user from "whoLikedYou":', error);
      }
    };

    const fetchMatches = async (userToken) => {
      try {
        const userDocRef = doc(db, 'users', userToken);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const matchesArray = userData.matches || [];
    
          const matchedUsers = await Promise.all(
            matchesArray.map(async (matchId) => {
              const matchDoc = await getDoc(doc(db, 'users', matchId));
              return { ...matchDoc.data(), id: matchDoc.id };
            })
          );
    
          setMatches(matchedUsers);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    
    
    // Fetch matched users when matches state updates
    // useEffect(() => {
    //   const currentUserId = AsyncStorage.getItem('userToken');
    //   if (currentUserId) {
    //     fetchMatches(userToken);
    //   }
    // }, [matches]);

  const renderWhoLikeYouItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UserMatchesInfo', { userId: item.id, userName: item.username })}>
      <Image source={{ uri: item.profileImageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name.split(' ')[0]}, {differenceInYears(new Date(), new Date(item.birthdate.toDate()))}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => confirmWhoLikedYouRemove(item.id)}>
            <Icon name='close' type='font-awesome' color='#fff' size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='heart' type='font-awesome' color='#fff' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWhoYouLikeItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UserMatchesInfo', { userId: item.id, userName: item.username })}>
      <Image source={{ uri: item.profileImageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name.split(' ')[0]}, {differenceInYears(new Date(), new Date(item.birthdate.toDate()))}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => confirmWhoYouLikedRemove(item.id)}>
            <Icon name='close' type='font-awesome' color='#fff' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UserMatchesInfo', { userId: item.id, userName: item.username })}>
      <Image source={{ uri: item.profileImageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name.split(' ')[0]}, {differenceInYears(new Date(), new Date(item.birthdate.toDate()))}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => confirmRemoveUser(item.id)}>
            <Icon name='close' type='font-awesome' color='#fff' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar
        title={'Matches'}
        iconSource={sort}
        handlePress={() => setIsPopupVisible(!isPopupVisible)}
      />
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center', fontSize: 18, color: '#767474' }}>
          This is a list of people who have liked you and your matches.
        </Text>
      </View>
      {isPopupVisible && (
        <View style={styles.popupContainer}>
          {/* Matches tab */}
          <TouchableOpacity
            style={[
              styles.popupButton1,
              activeIndex === 0 ? styles.activeButton : null
            ]}
            onPress={() => {
              // setIsPopupVisible(false);
              handleActiveIndex(0);
            }}
          >
            <Text
              style={[
                styles.popupButtonText,
                activeIndex === 0 ? styles.activeButtonText : null
              ]}
            >
              Matches
            </Text>
          </TouchableOpacity>

          {/* Who You Liked tab */}
          <TouchableOpacity
            style={[
              styles.popupButton2,
              activeIndex === 1 ? styles.activeButton : null
            ]}
            onPress={() => {
              // setIsPopupVisible(false);
              handleActiveIndex(1);
            }}
          >
            <Text
              style={[
                styles.popupButtonText,
                activeIndex === 1 ? styles.activeButtonText : null
              ]}
            >
              Who You Liked
            </Text>
          </TouchableOpacity>

          {/* Who Liked You tab */}
          <TouchableOpacity
            style={[
              styles.popupButton3,
              activeIndex === 2 ? styles.activeButton : null
            ]}
            onPress={() => {
              // setIsPopupVisible(false);
              handleActiveIndex(2);
            }}
          >
            <Text
              style={[
                styles.popupButtonText,
                activeIndex === 2 ? styles.activeButtonText : null
              ]}
            >
              Who Liked You
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {activeIndex === 1 ? (
        <View style={styles.viewContainer}>
          <FlatList
            data={whoYouLiked.map(id => users.find(user => user.id === id)).filter(Boolean)}
            renderItem={renderWhoYouLikeItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            numColumns={2}
            onEndReached={fetchMoreUsers}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ActivityIndicator size="large" color="#e94057" />}
          />
        </View>
      ) : null}
      {activeIndex === 2 ? (
        <View style={styles.viewContainer}>
          <FlatList
            data={whoLikedYou.map(id => users.find(user => user.id === id)).filter(Boolean)}
            renderItem={renderWhoLikeYouItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            numColumns={2}
            onEndReached={fetchMoreUsers}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ActivityIndicator size="large" color="#e94057" />}
          />
        </View>
      ) : null}
      {activeIndex === 0 ? (
        <View style={styles.viewContainer}>
          <FlatList
            data={matches}
            renderItem={renderMatchItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            numColumns={2}
            onEndReached={fetchMoreUsers}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ActivityIndicator size="large" color="#e94057" />}
          />
        </View>
      ) : null}
      <BottomNavBar
        navigation={navigation}
        cardIcon={cardTrans}
        matchIcon={heartRed}
        messageIcon={messages}
        userIcon={user}
      />
      <Modal  
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                closeModal();
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
};


export default MatchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      },
      viewContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
      },
    
      card: {
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '50%',
        height: 250,
        alignItems:'center',
        padding: 4
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 10,
        width: '100%',
        height: "100%",
      },
      infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        alignItems: 'flex-start',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
      },
      actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        // flex: 1
      },
      name: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
      },
      listContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      popupContainer: {
        // paddingHorizontal: 20,
        // paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      popupButton1: {
        paddingHorizontal: 18,
        paddingVertical: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#f0f0f0'
      },
      popupButton2: {
        paddingHorizontal: 18,
        paddingVertical: 1,
        backgroundColor: '#f0f0f0'
      },
      popupButton3: {
        paddingHorizontal: 18,
        paddingVertical: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#f0f0f0',
      },
      popupButtonText:{
        fontFamily: 'Poppins-Bold',
        color: '#e94057',
        fontSize: 14,
      },
      activeButton: {
        backgroundColor: '#E94057'
      },
      activeButtonText: {
        color: '#fff'
      },
      modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
})