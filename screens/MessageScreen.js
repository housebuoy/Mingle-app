import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, TextInput, Alert} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFirestore, doc, getDoc, updateDoc, collection, query, getDocs, setDoc, where, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TopNavBar from '../components/TopNavBar'
import setting from '../assets/images/icons/setting-config.png';
import cardTrans from '../assets/images/icons/card-solid-trans.png'
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-solid.png';
import search from '../assets/images/icons/search-alt-regular-36.png';
import user from '../assets/images/icons/user.png';
import { Icon } from '@rneui/themed';
import { useUser } from '../context/UseContext';
import * as ImagePicker from 'expo-image-picker';
import { LinearProgress } from '@rneui/themed';



const MessageScreen = ({navigation}) => {

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [matches, setMatches] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [stories, setStories] = useState([]);
  const { userData } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activityImageUrl, setActivityImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [activityImageTimestamp, setActivityImageTimestamp] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchActivityImageUrl();
  }, [userData]);

  const db = getFirestore();

  const toggleSearchModal = () => {
    if (searchText.length > 0) {
      setSearchText('');
    } else {
      setIsSearchModalVisible(!isSearchModalVisible);
    }
  };

  const getLastMessage = async (chatRoomId, reverseChatRoomId) => {
    try {
      const chatRoomDoc = await getDoc(doc(db, 'messages', chatRoomId));
      const reverseChatRoomDoc = await getDoc(doc(db, 'messages', reverseChatRoomId));
      let lastMessage = null;
  
      if (chatRoomDoc.exists()) {
        const messages = chatRoomDoc.data().messages;
        if (messages.length > 0) {
          lastMessage = messages[messages.length - 1];
        }
      } else if (reverseChatRoomDoc.exists()) {
        const messages = reverseChatRoomDoc.data().messages;
        if (messages.length > 0) {
          lastMessage = messages[messages.length - 1];
        }
      }
  
      return lastMessage;
    } catch (error) {
      console.error('Error fetching last message:', error);
      return null;
    }
  };
  

  const getLastMessageText = (message) => {
    if (!message) return 'No messages yet';
    if (message.audioUri) return 'Audio';
    if (message.text) return message.text;
    return 'No messages yet';
  };

  useEffect(() => {
    const fetchLastMessages = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) return;
  
      const updatedMatches = await Promise.all(matches.map(async (match) => {
        const chatRoomId = `${match.id}-${userToken}`;
        const reverseChatRoomId = `${userToken}-${match.id}`;
        const lastMsg = await getLastMessage(chatRoomId, reverseChatRoomId);
        return { ...match, lastMessage: lastMsg };
      }));
  
      setMatches(updatedMatches);
    };
  
    if (matches.length > 0) {
      fetchLastMessages();
    }
  }, [matches]);



  useEffect(() => {
    const fetchMatchesAndActivity = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) throw new Error('No user is signed in');
  
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', userToken);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const matchesIds = userData.matches || [];
          
          // Fetching matches data
          const matchesData = await Promise.all(matchesIds.map(async (matchId) => {
            const matchDocRef = doc(firestore, 'users', matchId);
            const matchDocSnap = await getDoc(matchDocRef);
            if (matchDocSnap.exists()) {
              return { id: matchId, ...matchDocSnap.data() };
            }
            return null;
          }));
  
          const filteredMatches = matchesData.filter(match => match !== null);
          setMatches(filteredMatches);
  
          // Store matches data in AsyncStorage
          await AsyncStorage.setItem('matchesData', JSON.stringify(filteredMatches));
  
          // Fetching activity image URL
          const activityImageUrl = userData.activityImageUrl || null;
          setActivityImageUrl(activityImageUrl);
        }
      } catch (error) {
        console.error('Error fetching matches and activity image URL:', error);
      }
    };
  
    fetchMatchesAndActivity();
  }, []);
  

  useEffect(() => {
    const loadMatchesFromStorage = async () => {
      try {
        const storedMatches = await AsyncStorage.getItem('matchesData');
        if (storedMatches) {
          setMatches(JSON.parse(storedMatches));
        }
      } catch (error) {
        console.error('Error loading matches from storage:', error);
      }
    };
  
    loadMatchesFromStorage();
  }, []);
  

  useEffect(() => {
    setFilteredData(matches.filter(item => item.username.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, matches]);

  const fetchActivityImageUrl = async () => {
    try {
      const userId = await AsyncStorage.getItem('userToken');
      if (!userId) {
        throw new Error('No user is signed in');
      }

      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setActivityImageUrl(userData.activityImageUrl || null);
      }
    } catch (error) {
      console.error('Error fetching activity image URL:', error);
    }
  };

  const handlePressUser = async (userId) => {
    try {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSelectedUser({
          ...userData,
          userId: userDoc.id,
        });
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 6000); // Auto-close after 3 seconds
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await uploadImage(imageUri);
    }
  };

  const uploadImage = async (imageUri) => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userToken');
      if (!userId) {
        throw new Error('No user is signed in');
      }
  
      const storage = getStorage();
      const storageRef = ref(storage, `users/${userId}/activityImage.jpg`);
  
      // Convert the image to a blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      // Upload the blob to Firebase Storage
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Save the download URL and timestamp to Firestore
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        activityImageUrl: downloadURL,
        activityImageTimestamp: Timestamp.now(),
      });
  
      setActivityImageUrl(downloadURL);
      setActivityImageTimestamp(Timestamp.now().toDate());
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showDeleteConfirmation = () => {
    setConfirmDeleteVisible(true);
  };

  const deleteImage = async () => {
    try {
      const userId = await AsyncStorage.getItem('userToken');
      if (!userId) {
        throw new Error('No user is signed in');
      }
  
      // Delete the image from Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `users/${userId}/activityImage.jpg`);
      await deleteObject(storageRef);
  
      // Delete the document from Firestore
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        activityImageUrl: null,
        activityImageTimestamp: null,
      });
  
      // Reset the state
      setActivityImageUrl(null);
      setActivityImageTimestamp(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  
  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete the image?',
      [
        {
          text: 'Cancel',
          onPress: () => setConfirmDeleteVisible(false),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: deleteImage,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const openImageViewer = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 6000); // Auto-close after 3 seconds
  };


  const renderItem = ({ item }) => {
    const lastMessageText = getLastMessageText(item.lastMessage);
    const lastMessageTime = item.lastMessage ? new Date(item.lastMessage.timestamp.seconds * 1000).toLocaleTimeString() : '';

    return(
    <View style={styles.userContainer}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('UserMatchesInfo', { userId: item.id, userName: item.username })
        }
        }>
        <Image source={item.profileImageUrl? { uri: item.profileImageUrl }: user} style={styles.userImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.userInfo} 
        onPress={() => 
          {
            navigation.navigate('Chat', { userId: item.id, userName: item.username, profilePicture: item.profileImageUrl })
          }          
          }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.userTime}>{lastMessageTime}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.userText}>
            {lastMessageText
            ? lastMessageText.length > 23
              ? lastMessageText.slice(0, 23) + '...'
              : lastMessageText
            : ''}
          </Text>
          {/* {item.unread == undefined && (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E94057',
              width: 26,
              height: 26,
              borderRadius: 14
            }}>
              <Text style={{
                fontFamily: 'Poppins-Bold',
                color: '#fff',
                fontSize: 12
              }}>
                {item.unread > 99 ? '99+' : item.unread}
              </Text>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    </View>
  )};

  const renderSearchItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={item.profileImageUrl? { uri: item.profileImageUrl }: user} style={styles.userImage} />
      <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('Chat', { userId: item.id, userName: item.username, profilePicture: item.profileImageUrl })}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.userName}>{item.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderActivity = ({ item }) => {
    if (!item.activityImageUrl) {
      return null;
    }

    return(
      <TouchableOpacity 
        style={styles.activityContainer} 
        onPress={() => handlePressUser(item.userId)}
      >
        <>
          <Image source={{ uri: item.profileImageUrl }} style={styles.userActivityImage} />
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12 }}>{item.username}</Text>
        </>      
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title={'Messages'} iconSource={search} handlePress={toggleSearchModal} />
      {matches.length === 0 ? (
        <Text style={{fontFamily:'Poppins-Regular', fontSize: 25, textAlign: 'center', color: '#ddd', marginHorizontal: 40 }}>Swipe and get swiped to start messaging</Text>
      ) :
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff', }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000000' }}>Activity</Text>
            <View style={{ flexDirection: 'row', gap: 10}}>
            <TouchableOpacity onPress={() => {
                if (activityImageUrl) {
                  openImageViewer();
                } else {
                  pickAndUploadImage();
                }
              }}
              disabled={isLoading}
              style={{ alignItems: 'center', justifyContent: 'center' }}
              // onPress={pickAndUploadImage}
            >
              <View style={{ width: 55, height: 55, justifyContent: 'center', position:"relative" }}>
                <Image source={activityImageUrl ? { uri: activityImageUrl } : userData.profileImageUrl ? { uri: userData.profileImageUrl } : user} style={styles.userActivityImage} />
                {!activityImageUrl && (
                  <View style={{ position:'absolute', bottom: 0, right: 0, backgroundColor: '#e94057', borderRadius: 65}}>
                    <Icon name="plus" type="antdesign" size={18} color="#fff" />
                  </View>
                )}           
              </View>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12 }}>You</Text>
            </TouchableOpacity>   
              <View style={styles.activityContainer}>
                <FlatList
                  data={matches}
                  renderItem={renderActivity}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.activityListContainer}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
          <View style={styles.viewContainer}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000000', marginLeft: 20, marginBottom: 10, }}>Chats</Text>
            <FlatList
              data={matches}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.flatList}
            />
          </View>
        </View>
}
      <BottomNavBar navigation={navigation} cardIcon={cardTrans} matchIcon={heart} messageIcon={messages} userIcon={user} />
      <Modal visible={isSearchModalVisible} animationType="slide" transparent={true}>
        <View style={styles.searchModalContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              returnKeyType="search"
              onChangeText={(text) => {
                setSearchText(text);
                if (text.length > 0) {
                  setShowFlatList(true);
                } else {
                  setShowFlatList(false);
                }
              }}
            />
            <TouchableOpacity onPress={toggleSearchModal} style={{ backgroundColor: '#fff', height: 50, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
              <Icon name="close" size={35} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
          
          {showFlatList && (
            <View style={styles.viewContainer}>
              <FlatList
                data={filteredData}
                renderItem={renderSearchItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                style={styles.flatList}
              />
            </View>)}
        </View>
      </Modal>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearProgress
            style={styles.progressBar}
            value={1}
            duration={3000}
            variant="determinate"
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'flex-start' }}>
              <Image source={ userData.profileImageUrl ? { uri: userData.profileImageUrl } : user} style={styles.userImage} />
              <View>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>You</Text>
                {activityImageTimestamp && (
            <Text>
              Uploaded at {activityImageTimestamp.toLocaleTimeString()}
            </Text>
          )}
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.topRightNav} onPress={showDeleteConfirmation}>
                <Icon name="delete" size={25} color="#e94057" />
              </TouchableOpacity>

              {confirmDeleteVisible && (
                <Modal visible={confirmDeleteVisible} transparent>
                  <View style={styles.confirmDeleteContainer}>
                    {confirmDelete()}
                  </View>
                </Modal>
              )}
            </View>
            <TouchableOpacity style={styles.topRightNav} onPress={() => setModalVisible(false)}>
              <Icon name="close" type='antdesign' size={25} color="#e94057" />  
            </TouchableOpacity>
          </View>
          <Image source={{ uri:activityImageUrl }} style={styles.fullImage} />
        </View>
      </Modal>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearProgress
            style={styles.progressBar}
            value={1}
            duration={3000}
            variant="determinate"
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'flex-start' }}>
              <Image source={ selectedUser?.profileImageUrl ? { uri: selectedUser.profileImageUrl } : user} style={styles.userImage} />
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>{selectedUser?.username || 'User'}</Text>
            </View>
            <TouchableOpacity style={styles.topRightNav} onPress={() => setIsModalVisible(false)}>
              <Icon name="close" type='antdesign' size={25} color="#e94057" />  
            </TouchableOpacity>
          </View>
          <Image source={{ uri:selectedUser?.activityImageUrl }} style={styles.fullImage} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default MessageScreen;

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
      }, 
      activityContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        marginRight: 16,
      },
      userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 0.3,
      },
      userImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
        marginRight: 16,
      },
      userActivityImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        // marginRight: 16,
      },
      userInfo: {
        flex: 1,

      },
      userName: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold'
      },
      userText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#666',
      },
      userTime: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: '#979494',
      },
      listContainer: {
        paddingVertical: 16,
        // paddingHorizontal: 16,
        // backgroundColor: 'red',
        // flex: 1,
      },
      searchModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 100,
      },
      searchInput: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullImage: {
        width: '90%',
        height: '85%',
        resizeMode: 'contain',
      },
      progressBar: {
        width: '80%',
        marginTop: 10,
      },
      topRightNav: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#E8E6EA',
        borderRadius: 10,
        marginRight: 10
      },
})