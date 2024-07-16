import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFirestore, doc, getDoc,  collection, query, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TopNavBar from '../components/TopNavBar'
import setting from '../assets/images/icons/setting-config.png';
import cardTrans from '../assets/images/icons/card-solid-trans.png'
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-solid.png';
import search from '../assets/images/icons/search-alt-regular-36.png';
import user from '../assets/images/icons/user.png';
import { Icon } from '@rneui/themed';
import { data } from '../components/data'
import { useUser } from '../context/UseContext';

const MessageScreen = ({navigation}) => {

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [matches, setMatches] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const { userData } = useUser();

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
    const fetchMatches = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) throw new Error('No user is signed in');
  
        const userDocRef = doc(db, 'users', userToken);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const matchesIds = userData.matches || [];
  
          const matchesData = await Promise.all(matchesIds.map(async (matchId) => {
            const matchDocRef = doc(db, 'users', matchId);
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
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
  
    fetchMatches();
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


  

  const renderItem = ({ item }) => {
    const lastMessageText = item.lastMessage ? item.lastMessage.text : 'No messages yet';
    const lastMessageTime = item.lastMessage ? new Date(item.lastMessage.timestamp.seconds * 1000).toLocaleTimeString() : '';

    return(
    <View style={styles.userContainer}>
      <Image source={item.profileImageUrl? { uri: item.profileImageUrl }: user} style={styles.userImage} />
      <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('Chat', { userId: item.id, userName: item.username, profilePicture: item.profileImageUrl })}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.userTime}>{lastMessageTime}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.userText}>{lastMessageText.length > 23 ? lastMessageText.slice(0, 23) + '...' : lastMessageText}</Text>
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
      <Image source={{ uri: item.profileImageUrl }} style={styles.userImage} />
      <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('Chat', { userId: item.id, userName: item.username, profilePicture: item.profileImageUrl })}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.userName}>{item.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityContainer}>
        <>
            <Image source={{ uri: item.profileImageUrl }} style={styles.userImage} />
            <Text style={{fontFamily:'Poppins-Bold', fontSize: 12}}>{item.name.split(' ')[0]}</Text>
        </>
      
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title={'Messages'} iconSource={search} handlePress={toggleSearchModal} />
      {matches.length === 0 ? (
        <Text style={{fontFamily:'Poppins-Regular', fontSize: 32, textAlign: 'center', color: '#ddd', marginHorizontal: 10 }}>Swipe and get swiped to start messaging</Text>
      ) :
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff', }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000000' }}>Gallery</Text>
            <View style={{ flexDirection: 'row', gap: 10}}>
              <View style={[{ alignItems: 'center', justifyContent: 'center',}]}>
                  <View style={[{borderWidth: 1, borderColor: 'red',  borderRadius: 35, width: 55, height: 55, justifyContent: 'center',}]}>
                    <Image source={userData.profileImageUrl ? { uri: userData.profileImageUrl } : user} style={styles.userImage} />
                  </View>                
                    <Text style={{fontFamily:'Poppins-Bold', fontSize: 12}}>You</Text>
                
              </View>        
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
      },
      userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 2,
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 0.3,
      },
      userImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
        marginRight: 16,
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
        fontSize: 15,
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
})