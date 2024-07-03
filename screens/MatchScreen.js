import { StyleSheet, Text, View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar'
import sort from '../assets/images/icons/sort-two.png'
import cardTrans from '../assets/images/icons/card-solid-trans.png'
import heartRed from '../assets/images/icons/heart-solid.png'
import messages from '../assets/images/icons/message-square-detail-solid-36.png';

const MatchScreen = ({navigation}) => {
    const { height } = Dimensions.get('window');

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
          activity: require('../assets/images/photo1.png'),
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
          image: require('../assets/images/photo3.png'), // Replace with actual image URL
          activity: require('../assets/images/photo1.png'),
        },
        {
          id: '5',
          name: 'Ava Davis',
          age: 24,
          profession: 'Photographer',
          distance: '0.5 km',
          image: require('../assets/images/onboarding/female1.png'), // Replace with actual image URL
        },
        {
          id: '6',
          name: 'Ava Davis',
          age: 24,
          profession: 'Photographer',
          distance: '0.5 km',
          image: require('../assets/images/onboarding/female1.png'), // Replace with actual image URL
        },
        {
          id: '7',
          name: 'Ava Davis',
          age: 24,
          profession: 'Photographer',
          distance: '0.5 km',
          image: require('../assets/images/onboarding/female1.png'),
          activity: require('../assets/images/photo1.png'), // Replace with actual image URL
        },
        // Add more users as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.userContainer}>
          <Image source={item.image} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userAge}>{item.age}</Text>
            <Text style={styles.userProfession}>{item.profession}</Text>
            <Text style={styles.userDistance}>{item.distance}</Text>
          </View>
        </View>
      );
      
  return (
    <SafeAreaView style={styles.container}>
            <TopNavBar title={'Matches'} 
                       iconSource={sort}
            />
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'center', fontSize: 18, color:'#767474'}}>This is a list of people who have liked you and your matches.</Text>
            </View>
            {/* <ScrollView style={styles.scrollContainer}> */}
            <View style={styles.viewContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                style={styles.flatList}
            />
            </View>
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
      },
      viewContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      activityContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      scrollContainer:{
        paddingHorizontal: 30,
        paddingVertical: 20,
      }, 
      userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
      },
      userInfo: {
        flex: 1,
      },
      userName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      userAge: {
        fontSize: 14,
        color: '#666',
      },
      userProfession: {
        fontSize: 14,
        color: '#333',
      },
      userDistance: {
        fontSize: 14,
        color: '#999',
      },
      listContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
      },
})