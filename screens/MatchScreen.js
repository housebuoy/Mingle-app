import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar'
import sort from '../assets/images/icons/sort-two.png'
import cardTrans from '../assets/images/icons/card-solid-trans.png'
import heartRed from '../assets/images/icons/heart-solid.png'
import messages from '../assets/images/icons/message-square-detail-solid-36.png';
import { Icon } from '@rneui/themed';
import { data as users } from '../components/data'
import { useLikedUsers } from '../hooks/likedUsersContext'

const MatchScreen = ({navigation}) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1);
    const [data, setData] = useState(users)
    const { likedUsers } = useLikedUsers();
    const handleActiveIndex = (index) => {
        if (activeIndex === index) {
          setActiveIndex(0); // clear active state
        } else {
          setActiveIndex(index);
        }
      };

      const handleRemove = (id) => {
        console.log('Removing item with id:', id);  // Log the id to ensure it's correct
        setData((prevData) => prevData.filter(item => item.id !== id));
      };
    

      const renderItem = ({ item }) => (
            <TouchableOpacity style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name.split(' ')[0]}, {item.age}</Text>
                    {/* <Text style={styles.profession}>{item.profession}</Text> */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity onPress={() => handleRemove(item.id)}>
                            <Icon name='close'
                                  type='font-awesome'
                                  color='#fff'
                                  size={30}
                            />
                        </TouchableOpacity>                        
                        <TouchableOpacity >
                        <Icon name='heart'
                                  type='font-awesome'
                                  color='#fff'
                                  size={30}
                            />
                        </TouchableOpacity>                        
                    </View>
                </View>
          </TouchableOpacity>
      );
      
  return (
    <SafeAreaView style={styles.container}>
            <TopNavBar title={'Matches'} 
                       iconSource={sort}
                       handlePress={() => setIsPopupVisible(!isPopupVisible)}
            />
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text style={{fontFamily: 'Poppins-SemiBold', textAlign: 'center', fontSize: 18, color:'#767474'}}>This is a list of people who have liked you and your matches.</Text>
            </View>
            {isPopupVisible && (
                <View style={styles.popupContainer}>
                    <TouchableOpacity style={[
                            styles.popupButton1,
                            activeIndex === 0 ? styles.activeButton : null
                        ]} 
                        onPress={() => {
                            setIsPopupVisible(false)
                            handleActiveIndex(0)
                        }}>
                        <Text style={[
                                styles.popupButtonText,
                                activeIndex === 0 ? styles.activeButtonText : null
                            ]}>Matches</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            styles.popupButton2,
                            activeIndex === 1 ? styles.activeButton : null
                        ]} 
                        onPress={() => {
                            setIsPopupVisible(false)
                            handleActiveIndex(1)
                        }}>
                        <Text style={[
                                styles.popupButtonText,
                                activeIndex === 1 ? styles.activeButtonText : null
                            ]}>Who You Liked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity                         style={[
                            styles.popupButton3,
                            activeIndex === 2 ? styles.activeButton : null
                        ]} 
                        onPress={() => {
                            setIsPopupVisible(false)
                            handleActiveIndex(2)
                        }}>
                        <Text style={[
                          styles.popupButtonText,
                          activeIndex === 2 ? styles.activeButtonText : null                          
                          ]}>Who Liked You</Text>
                    </TouchableOpacity>
                </View>
            )}
            {activeIndex === 2 ? (
              <View style={styles.viewContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator= {false}
                    style={styles.flatList}
                    numColumns={2}                
                />
              </View>
            ): null}
            { activeIndex === 1? (
              <View style={styles.viewContainer}>
                <FlatList
                    data={likedUsers.map(id => users.find(user => user.id === id))}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator= {false}
                    style={styles.flatList}
                    numColumns={2}                
                />
              </View>
            ): null}
            <BottomNavBar navigation={navigation} 
                          cardIcon={cardTrans}        
                          matchIcon={heartRed} 
                          messageIcon={messages}
            />        
    </SafeAreaView>
  )
}

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
})