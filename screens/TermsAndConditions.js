import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image,  Modal, Pressable, SafeAreaView, Linking } from 'react-native';
import React, {useState, useRef} from 'react'
import {getAuth} from 'firebase/auth'
import { Icon } from '@rneui/themed';



const TermsAndConditions = ({navigation}) => {      
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{alignSelf: 'flex-start', }} onPress={() => navigation.goBack()}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 25, marginTop: 40, marginLeft: 10 }}>
                Back
            </Text>
        </TouchableOpacity >
        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', gap: 10, marginTop: 10, marginHorizontal: 6 }}>
            <Icon name="code-of-conduct" type='octicon' size={40} color="#e94057" />
            <Text style={styles.signInTitle}>Terms and Conditions</Text>
        </View>
        <ScrollView style={styles.container}>
            <View style={styles.centeredContainer}>               
                <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left', marginBottom: 20}}>Welcome to Mingle! We’re excited to have you on board. By using our app, you agree to the following terms and conditions. Please read them carefully.</Text>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>1. Acceptance of Terms</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>By accessing Mingle you agree to be bound by these Terms and Conditions (THE TERMS WILL BE STATED HERE). If you do not agree with these Terms, please do not use the App.</Text>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>2. Eligibility</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>You must be at least 18 years old to use the App. By using the App, you affirm that you are 18 years of age or older</Text>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>3. Account Creation and Security</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>To use the App, you must create an account. You agree to:</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Provide accurate and complete information during registration.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Maintain the confidentiality of your account password.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Notify us immediately of any unauthorized use of your account or any other breach of security.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>4. User Conduct</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>You agree to use the App in a manner that is respectful and does not:</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Violate any laws or regulations.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Harass, abuse, or harm others. </Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Post or transmit any content that is offensive or inappropriate.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Engage in fraudulent activities or impersonate others.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>5. Content Ownership and Licensing</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>•	User Content: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>You retain ownership of any content you create and share through the App (e.g., photos, messages). By sharing content, you grant Mingle a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content for the purpose of operating and promoting the App.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>• App Content: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>All content provided by Mingle, including text, graphics, and logos, is owned by Mingle and is protected by intellectual property laws. You may not use this content without our prior written consent.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>6. Prohibited Activities</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Use the App for any illegal or unauthorized purpose.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Attempt to gain unauthorized access to the App or its related systems.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Transmit any malware or viruses.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>• Use automated systems or software to extract data from the App.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>7. Suspension</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We reserve the right to suspend your account at our discretion if we believe you have violated these Terms. You may also suspend your account at any time by following the instructions in the App.</Text>
                </View>
                <View style={{ width: '100%', gap: 10, marginTop: 10, }}>
                    <Text style={styles.infoTitle}>8. Disclaimers and Limitations of Liability</Text>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>•	No Warranty: </Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>The App is provided “as is” without warranties of any kind. We do not guarantee that the App will be uninterrupted or error-free.</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, marginLeft: 10 }}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: "#000", lineHeight: 25, textAlign: 'left'}}>• Limitation of Liability:</Text>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>To the fullest extent permitted by law, Mingle is not liable for any indirect, incidental, special, or consequential damages arising from your use of the App.</Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>10. Changes to Terms</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>We may update these Terms from time to time. We will notify you of any significant changes by posting the new Terms on the App. Your continued use of the App constitutes acceptance of the updated Terms.</Text>
                </View>
                <View style={{ width: '100%', marginTop: 10, }}>
                    <Text style={styles.infoTitle}>10. Contact Us</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left'}}>If you have any questions or concerns about these Terms, please contact us at:</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#E94057", lineHeight: 25, textAlign: 'left'}}>datingappmingle@gmail.com</Text>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#8D8B8B", lineHeight: 25, textAlign: 'left', marginTop: 10}}>Thank you for using Mingle. Your trust is important to us, and we are committed to safeguarding your privacy.</Text>
                </View>
            </View >
        </ScrollView>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#000", lineHeight: 25, textAlign: 'center', marginTop: 10}}>Last updated: 31/07/2024 </Text>
    </SafeAreaView>
  )
}

export default TermsAndConditions

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