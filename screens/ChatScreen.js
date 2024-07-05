import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, FlatList, TextInput,TouchableOpacity, ActivityIndicator, Alert, Modal  } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { Audio } from 'expo-av';

const ChatScreen = () => {
    const route = useRoute();
    const { userId, userName } = route.params;

    const [messages, setMessages] = useState([
        { id: 4, text: 'I am good, thanks!', sender: 'me' },
        { id: 3, text: 'How are you?', sender: 'user' },
        { id: 2, text: 'Hi there!', sender: 'me' },
        { id: 1, text: 'Hello!', sender: 'user' },
        
        
        
      ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleLongPress = (message) => {
        setSelectedMessage(message);
        setModalVisible(true);
    };

    // const copyMessage = (message) => {
    //     // Implement copy functionality
    //     console.log("Copying message:", message.text);
    //     Clipboard.setString(message.text);
    //     // Clipboard API can be used to copy text to clipboard
    // };

    const copyMessage = (text) => {
        Clipboard.setString(text);
        setModalVisible(false); // Optionally close the modal after copying
    };
    const deleteMessage = (messageId) => {
        setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
        setModalVisible(false); // Optionally close the modal after deleting
    };
    
      const [newMessage, setNewMessage] = useState('');
      const [recording, setRecording] = useState(null);
      const [isRecording, setIsRecording] = useState(false);
      const [playingMessageId, setPlayingMessageId] = useState(null); // Track currently playing message
      const [sound, setSound] = useState(null);
      const flatListRef = useRef(null);
    
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
    
        const newMsg = {
          id: (messages.length + 1).toString(),
          audioUri: uri,
          sender: 'me',
        };
        setMessages([newMsg, ...messages]); // Add the new message at the start since the list is inverted
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
    
      const renderItem = ({ item }) => (
        <TouchableOpacity onLongPress={() => handleLongPress(item)} style={item.sender === 'me' ? styles.myMessageContainer : styles.userMessageContainer}>
          {item.text ? (
            <Text style={item.sender === 'me' ? styles.myMessageText : styles.userMessageText}>{item.text}</Text>
          ) : (
            <TouchableOpacity onPress={() => playAudio(item.audioUri, item.id)} style={styles.voiceNoteContainer}>
              <Icon name="mic" size={20} color="#fff" />
              <Text style={styles.audioMessageText}>Voice Note</Text>
              {playingMessageId === item.id ? <ActivityIndicator color="#fff" /> : null}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      );


    const handleSend = () => {
        if (newMessage.trim()) {
          const newMsg = {
            id: (messages.length + 1).toString(),
            text: newMessage,
            sender: 'me',
          };
          setMessages([newMsg, ...messages]); // Add the new message at the start since the list is inverted
          setNewMessage('');
        }
      };
    

      return (
        <>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <FlatList
            data={messages}
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
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => copyMessage(selectedMessage?.text)} style={styles.optionButton}>
                        <Text style={styles.modalText}>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteMessage(selectedMessage?.id)} style={styles.optionButton}>
                        <Text style={styles.modalText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.optionButton, styles.cancelButton]}>
                        <Text style={[styles.modalText, styles.cancelText]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
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
      paddingVertical: 8,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      marginVertical: 5,
      maxWidth: '75%',
    },
    userMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#FDF2F3',
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 5,
      maxWidth: '75%',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
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
        borderRadius: 10,
        paddingVertical: 3,
        // paddingHorizontal: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    optionButton: {
        // backgroundColor: '#e94078',
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.3,
        borderRadius: 5,
    },
    modalText: {
        color: '#e94057',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
    },
    cancelButton: {
        backgroundColor: '#e94057',
    },
    cancelText: {
        color: '#fff'
    },
  });