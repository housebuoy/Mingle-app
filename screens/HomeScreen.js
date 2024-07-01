import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavBar from '../components/TopNavBar';
import DiscoverCard from '../components/DiscoverCard';
import BottomNavBar from '../components/BottomNavBar';

const HomeScreen = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Discover"/>
      <DiscoverCard />
      <BottomNavBar />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 40
  },

})