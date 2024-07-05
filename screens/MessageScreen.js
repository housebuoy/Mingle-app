import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, TextInput} from 'react-native'
import React, {useState} from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar'
import setting from '../assets/images/icons/setting-config.png';
import cardTrans from '../assets/images/icons/card-solid-trans.png'
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-solid.png';
import search from '../assets/images/icons/search-alt-regular-36.png';
import user from '../assets/images/icons/user.png';
import { Icon } from '@rneui/themed';
import { data } from '../components/data'

const MessageScreen = ({navigation}) => {

    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showFlatList, setShowFlatList] = useState(false);
    //toggleSearchModal
    const toggleSearchModal = () => {
        if (searchText.length > 0) {
        setSearchText('');
        } else {
        setIsSearchModalVisible(!isSearchModalVisible);
        }
    };

    
      const count = data.unread
      const filteredData = data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

      const renderItem = ({ item }) => (
        <View style={styles.userContainer}>
          <Image source={item.image} style={styles.userImage} />
          <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('Chat', { userId: item.id, userName: item.name, profilePicture: item.image })}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userTime}>{item.time} mins</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                <Text style={styles.userText} >{item.text.length > 23 ? item.text.slice(0, 23) + '...' : item.text}</Text>
                {item.unread !== undefined && (
                <View style={{
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor:'#E94057', 
                    width: 26, 
                    height: 26, 
                    borderRadius: 14}}>
                    <Text style={{
                        fontFamily: 'Poppins-Bold', 
                        color:'#fff', 
                        fontSize: 12
                    }}>
                        {item.unread > 99 ? '99+' : item.unread}
                    </Text>
                </View>)
                }
            </View>
          </TouchableOpacity>
        </View>
      );

      const renderSearchItem = ({ item }) => (
        <View style={styles.userContainer}>
          <Image source={item.image} style={styles.userImage} />
          <TouchableOpacity style={styles.userInfo}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                <Text style={styles.userName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );

      const countString = typeof count === 'number' ? count.toString() : count || '0';
      const containerWidth = Math.max(20 * countString.length + 10, 30);

      const renderActivity = ({ item }) => (
        <View style={styles.activityContainer}>
            {item.activity !== undefined &&
          (
            <>
                <Image source={item.activity} style={styles.userImage} />
                <Text style={{fontFamily:'Poppins-Bold', fontSize: 12}}>{item.name.split(' ')[0]}</Text>
            </>
          )}
        </View>
      );

      //the search icon
      

  return (
    <SafeAreaView style={styles.container}>
            <TopNavBar title={'Messages'} 
                       iconSource={search}
                       handlePress={toggleSearchModal}
            />
            <View style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff',}}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color:'#000000'}}>Activities</Text>
                <View style={styles.activityContainer}>
                    <FlatList
                        data={data}
                        renderItem={renderActivity}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.activityListContainer}
                        // style={styles.flatList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            {/* <ScrollView style={styles.scrollContainer}> */}
            <View style={styles.viewContainer}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color:'#000000', marginLeft: 20, marginBottom: 10,}}>Chats</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                // contentContainerStyle={styles.listContainer}
                style={styles.flatList}
            />
            </View>
            <BottomNavBar navigation={navigation} 
                          cardIcon={cardTrans}        
                          matchIcon={heart} 
                          messageIcon={messages}
                          userIcon={user}
            />
            <Modal visible={isSearchModalVisible} animationType="slide" transparent={true}>
                <View style={styles.searchModalContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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
                        <TouchableOpacity onPress={toggleSearchModal} style={{backgroundColor:'#fff', height: 50, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                            <Icon name="close" type="material" size={35} color="#ff6b6b" />
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
  )
}

export default MessageScreen

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
        width: 60,
        height: 60,
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