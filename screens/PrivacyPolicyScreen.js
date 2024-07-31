import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image,  Modal, Pressable, SafeAreaView, Linking } from 'react-native';
import React, {useState, useRef} from 'react'
import {getAuth} from 'firebase/auth'
import { Icon } from '@rneui/themed';



const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{alignSelf: 'flex-start', }} onPress={() => navigation.goBack()}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 25, marginTop: 40, marginLeft: 10 }}>
                Back
            </Text>
        </TouchableOpacity >
        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', gap: 10, marginTop: 10, marginHorizontal: 6 }}>
            <Icon name="privacy-tip" type='material' size={40} color="#e94057" />
            <Text style={styles.signInTitle}>Privacy Policy</Text>
        </View>
        <ScrollView style={styles.container}>
            <View style={styles.centeredContainer}>               
                <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left', marginBottom: 20}}>Welcome to Mingle, your go-to app for connecting with new people and finding meaningful relationships. Here at Mingle, we are committed to protecting your privacy and ensuring that your personal information is handled securely. This Privacy policy outlines how we collect, use, disclose and protect your information when you use our app.    </Text>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>1. Information We Collect.</Text>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>2. How We Use Your Information</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We use the information we collect for various purposes, including:</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>•	Providing and improving our services:</Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>To enable user interactions, personalize your experience, and enhance app functionality.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>•	Communicating with you: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>To send you updates, notifications, and promotional offers related to Mingle.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>• Conducting research: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>To analyze usage trends and improve our app's performance and features.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>3. How We Share Your Information</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We do not sell your personal information to third parties. We may share your information in the following circumstances:</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>• With Service Providers: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We may share information with third-party service providers who assist us in operating and improving the app, such as cloud storage, analytics, and customer support services.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>•	For Legal Reasons:</Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We may disclose information if required by law or in response to legal requests, such as subpoenas or court orders.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>•	In Case of Business Transfers: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>If Mingle undergoes a merger, acquisition, or any other business transfer, your information may be transferred as part of the transaction.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>4. Your Choices and Rights</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>4.1 Access and Update</Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>You have the right to access and update your personal information through your account settings. If you need assistance, please contact our support team @datingappmingle@gmail.com</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>4.2 Data Deletion</Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>You may request the deletion of your account and personal information at any time. Please note that some information may be retained for legal or business purposes. </Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>4.3 Opt-Out</Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>If Mingle undergoes a merger, acquisition, or any other business transfer, your information may be transferred as part of the transaction.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>5. Children's Privacy</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>Mingle is not intended for use by individuals under the age of 18. We do not knowingly collect or solicit personal information from individuals under 18. If we become aware that we have collected such information, we will take steps to delete it. </Text>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>7. Changes to This Privacy Policy</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the revised policy on our app and updating the effective date. Your continued use of Mingle after any changes indicates your acceptance of the updated policy.</Text>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>8. Contact Us</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>If you have any questions or concerns about this Privacy Policy or our practices, please contact us at:</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#E94057", lineHeight: 25, textAlign: 'left'}}>datingappmingle@gmail.com</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left', marginTop: 10}}>Thank you for using Mingle. Your trust is important to us, and we are committed to safeguarding your privacy.</Text>
                </View>
            </View >
        </ScrollView>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#000", lineHeight: 25, textAlign: 'center', marginTop: 10}}>Last updated: 31/07/2024 </Text>
    </SafeAreaView>
  )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 5,
      },
      centeredContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 1,
      },
      signInSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
      },
      signInTitle: {
        fontSize: 42,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 5,
        lineHeight: 50,
        textAlign: 'left',
      },
      infoTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 2,
        lineHeight: 27,
        textAlign: 'left',
      },
      inputContainer:{
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#cecdcd',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '90%',
        paddingHorizontal:  13,
        paddingVertical : 3,
      },
      optionContainer:{
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#000',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '90%',
        paddingHorizontal:  13,
        marginBottom: -15
      },
      inputLabel: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#E94057',
      },
      button: {
        backgroundColor: '#E94057',
        marginVertical: 10,
        paddingHorizontal: 55,
        paddingVertical: 18,
        borderRadius: 10,
      },
      input: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#878686',
        width: '100%',
        paddingHorizontal:  5,
        paddingTop : 5,
    },
    
      buttonText: {
        backgroundColor: '#E94057',
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
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
      infoInput: {
        width: '100%',
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Poppins-Medium'
      },
})