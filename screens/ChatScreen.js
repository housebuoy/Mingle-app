import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, FlatList, TextInput,TouchableOpacity, ActivityIndicator, Alert, Modal  } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import NetInfo from '@react-native-community/netinfo';
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { Audio } from 'expo-av';

const ChatScreen = () => {
    const route = useRoute();
    const { userId, userName } = route.params;
    const db = getFirestore()
    const storage = getStorage()

    const [messages, setMessages] = useState([   
      ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [playingMessageId, setPlayingMessageId] = useState(null); // Track currently playing message
    const [sound, setSound] = useState(null);
    const [currentChatRoomId, setCurrentChatRoomId] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const flatListRef = useRef(null);
    const [isOnline, setIsOnline] = useState(true);
    const [lastMessages, setLastMessages] = useState([]);
    

    useEffect(() => {
      const getUserToken = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          if (token) {
            setUserToken(token);
          }
        } catch (error) {
          console.error('Error fetching user token:', error);
        }
      };
  
      getUserToken();
    }, []);
  
    useEffect(() => {
      if (userToken) {
        const chatRoomId = `${userId}-${userToken}`;
        const reverseChatRoomId = `${userToken}-${userId}`;
        setCurrentChatRoomId(chatRoomId);
  
        checkAndCreateChatRoom(chatRoomId, reverseChatRoomId);
      }
    }, [userToken]);
  
    const checkAndCreateChatRoom = async (chatRoomId, reverseChatRoomId) => {
      try {
        const chatRoomDoc = await getDoc(doc(db, 'messages', chatRoomId));
        const reverseChatRoomDoc = await getDoc(doc(db, 'messages', reverseChatRoomId));
  
        if (chatRoomDoc.exists()) {
          setCurrentChatRoomId(chatRoomId);
          loadMessages(chatRoomId);
        } else if (reverseChatRoomDoc.exists()) {
          setCurrentChatRoomId(reverseChatRoomId);
          loadMessages(reverseChatRoomId);
        } else {
          await setDoc(doc(db, 'messages', chatRoomId), { messages: [] });
          setCurrentChatRoomId(chatRoomId);
        }
      } catch (error) {
        console.error('Error checking or creating chat room:', error);
      }
    };
  
    const loadMessages = (chatRoomId) => {
      const unsubscribe = onSnapshot(doc(db, 'messages', chatRoomId), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages || []);
          // Scroll to bottom when messages are loaded
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }
      });
  
      return () => unsubscribe();
    };

  


  
    const handleLongPress = (message) => {
        setSelectedMessage(message);
        setModalVisible(true);
        
    };

    const copyMessage = (text) => {
        Clipboard.setString(text);
        setModalVisible(false); // Optionally close the modal after copying
    };
    const deleteMessage = (messageId) => {
        setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
        setModalVisible(false); // Optionally close the modal after deleting
    };
    

      useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
      }, [messages]);
    
      useEffect(() => {
        return () => {
          if (recording) {
            recording.stopAndUnloadAsync();
            recording.setOnRecordingStatusUpdate(null);
            setRecording(null);
          }
          if (sound) {
            sound.unloadAsync();
          }
        };
      }, [recording, sound]);
    
      const startRecording = async () => {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
    
          console.log('Starting recording..');
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
    
          if (recording) {
            await recording.stopAndUnloadAsync();
            recording.setOnRecordingStatusUpdate(null);
            setRecording(null);
          }
    
          const { recording: newRecording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          setRecording(newRecording);
          setIsRecording(true);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      };
    
      const stopRecording = async () => {
        console.log('Stopping recording..');
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    
        // Upload audio file to Firebase Storage
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `audioMessages/${Date.now()}-${userToken}.m4a`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
    
        const newMsg = {
          id: (messages.length + 1).toString(),
          audioUri: downloadURL,
          sender: userToken,
          receiver: userId,
          timestamp: Timestamp.now()
        };
        
        await updateDoc(doc(db, 'messages', currentChatRoomId), {
          messages: arrayUnion(newMsg)
        });
        await updateDoc(doc(db, 'messages', currentChatRoomId), {
          messages: arrayUnion(newMsg),
          lastMessage: newMsg // Update last message field
        });
    
        setMessages([newMsg, ...messages]);
        setRecording(null);
      };
    
      const playAudio = async (uri, messageId) => {
        try {
          if (playingMessageId === messageId) {
            // If already playing, pause or stop
            if (sound) {
              await sound.stopAsync();
              setSound(null);
              setPlayingMessageId(null);
            }
          } else {
            // Otherwise, play new audio
            if (sound) {
              await sound.unloadAsync();
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri });
            setSound(newSound);
            setPlayingMessageId(messageId);
            await newSound.playAsync();
            newSound.setOnPlaybackStatusUpdate((status) => {
              if (status.didJustFinish) {
                setPlayingMessageId(null);
                setSound(null);
              }
            });
          }
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      };
    
    
      const handleSend = async () => {
        try {
          if (newMessage.trim()) {
            const messageId = Math.random().toString(36).substr(2, 9);
            const newMsg = {
              id: messageId,
              text: newMessage,
              sender: userToken,
              receiver: userId,
              timestamp: Timestamp.now()
            };
    
            await updateDoc(doc(db, 'messages', currentChatRoomId), {
              messages: arrayUnion(newMsg)
            });
            await updateDoc(doc(db, 'messages', currentChatRoomId), {
              messages: arrayUnion(newMsg),
              lastMessage: newMsg // Update last message field
            });
            setNewMessage('');
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
    
      const renderItem = ({ item }) => {
        const timestamp = item.timestamp instanceof Timestamp ? item.timestamp.toDate() : new Date(item.timestamp);
        const formattedTime = timestamp.toLocaleTimeString();
    
        return (
          <TouchableOpacity style={item.sender === userToken ? styles.myMessageContainer : styles.userMessageContainer} onLongPress={() => handleLongPress(item)}>
            {item.text ? (
              <Text style={item.sender === userToken ? styles.myMessageText : styles.userMessageText}>{item.text}</Text>
            ) : (
              <TouchableOpacity onPress={() => playAudio(item.audioUri, item.id)} style={styles.voiceNoteContainer}>
                <Icon name="mic" size={20} color="#fff" />
                <Text style={styles.audioMessageText}>Voice Note</Text>
                {playingMessageId === item.id ? <ActivityIndicator color="#fff" /> : null}
              </TouchableOpacity>
            )}
            <Text style={item.sender === userToken ? styles.myTimestamp : styles.userTimestamp}>{formattedTime}</Text>
          </TouchableOpacity>
        );
      };
    // const handleSend = () => {
    //   const messageId = Math.random().toString(36).substr(2, 9);
    //     if (newMessage.trim()) {
    //       const newMsg = {
    //         id: messageId,
    //         text: newMessage,
    //         sender: userToken,
    //         receiver: userId,
    //         timestamp: new Date()
    //       };
    //       setMessages([newMsg, ...messages]); // Add the new message at the start since the list is inverted
    //       setNewMessage('');
    //     }
    //   };
      return (
        <>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <FlatList
            data={messages.slice().reverse()}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            inverted
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}  
              multiline
              placeholder="Type a message"
            />
            {isRecording ? (
          <TouchableOpacity onPress={stopRecording} style={styles.sendButton}>
            <ActivityIndicator color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={newMessage.trim() ? handleSend : startRecording} style={styles.sendButton}>
            <Icon name={newMessage.trim() ? "send" : "mic"} size={24} color="#fff" />
          </TouchableOpacity>
        )}
          </View>
        </KeyboardAvoidingView>
        <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}
          >
              <View style={styles.modalView}>
                  <TouchableOpacity style={styles.optionButton} onPress={() => copyMessage(selectedMessage.text)}>
                      <Icon name='copy' type='feather' size={14} color="#e94057" />
                      <Text style={styles.modalText}>Copy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionButton} onPress={() => deleteMessage(selectedMessage.id)}>
                      <Icon name='delete'  size={14} color="#e94057" />
                      <Text style={styles.modalText}>Delete</Text>
                  </TouchableOpacity>
              </View>
          </Modal>
        </>
      );

}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    listContainer: {
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    myMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#e94057',
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      marginVertical: 5,
      maxWidth: '75%',
    },
    userMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#FDF2F3',
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginVertical: 5,
      maxWidth: '75%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    myMessageText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
    userMessageText: {
      color: '#000',
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
    audioMessageText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
    },
    voiceNoteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#0084ff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: '75%',
      },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 16,
      marginRight: 12,
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
    },
    sendButton: {
      backgroundColor: '#E94057',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: 'whitesmoke',
      borderRadius: 6,
      paddingVertical: 10,
      // paddingHorizontal: 10,
      width: 150,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 300,
  },
  optionButton: {
      // backgroundColor: '#e94078',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 0.3,
      borderRadius: 5,
      gap: 4,
  },
  modalText: {
      color: '#e94057',
      textAlign: 'center',
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
  },
  cancelButton: {
      backgroundColor: '#e94057',
  },
  cancelText: {
      color: '#fff'
  },
  myTimestamp: {
      color: '#ddd',
      fontFamily: 'Poppins-Medium',
      fontSize: 12,
      textAlign : 'right'
  },
  userTimestamp: {
      color: '#e94057',
      fontFamily: 'Poppins-Medium',
      fontSize: 10,
      marginTop: 1,
      textAlign : 'right'
  },
  });