import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../components/Fonts';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF5733',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  poweredBy: {
    fontSize: 16,
    color: '#888',
  },
  mingleInc: {
    fontWeight: 'bold',
    color: '#FF5733',
  },
  carousel: {
    flex: 1,
    width: viewportWidth,
  },
  slide: {
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: viewportHeight * 0.5,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center', // Center the title text
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center', // Center the subtitle text
    marginTop: 10,
    marginBottom: 20, // Add margin bottom to create space between subtitle and interests
  },
  button: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    color: '#FF5733',
    fontWeight: 'bold',
  },
  logoImageSignUp: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signUpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  phoneButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E94057',
  },
  phoneButtonText: {
    color: '#E94057',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  socialButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 30,
  },
  callingCode: {
    fontSize: 18,
    color: '#333',
    marginHorizontal: 10,
  },
  phoneNumberInput: {
    fontSize: 18,
    flex: 1,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    paddingVertical: 10,
    width: '20%',
  },
  filledInput: {
    borderBottomColor: '#E94057',
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 20,
  },
  inputButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  timerText: {
    fontSize: 16,
    color: '#E94057',
    marginVertical: 20,
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  signInSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold'
  },
  profileImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E94057',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: 'white',
    fontSize: 20,
  },
  profileinput: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 20,
  },
  birthdayButton: {
    backgroundColor: '#F8D7DA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  birthdayButtonText: {
    color: '#E94057',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  profilebuttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    backgroundColor: '#E94057',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  gendercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  genderheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 50,
  },
  backButton: {
    fontSize: 18,
    color: '#000',
    padding: 10,
  },
  gendertitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  option: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
  },
  selectedOption: {
    borderColor: '#FF5757',
    backgroundColor: '#FF5757',
  },
  genderoptionText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  gendercontinueButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    backgroundColor: '#E94057',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure the header takes full width
    paddingHorizontal: 20, // Add padding to align with the rest of the screen
    marginTop: 20, // Add margin to the top
    alignItems: 'center', // Center align the items in the header
  },
  skipButton: {
    color: '#ff6666',
    fontWeight: 'bold',
  },
  skipButtonText: {
    fontWeight: 'bold',
    color: '#ff6666',
  },
  backButtonText: {
    fontSize: 18,
    color: '#ff6666',
    fontWeight: 'bold',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10, // Add padding to make space around the interests
  },
  interestButton: {
    width: '48%',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  selectedInterestButton: {
    backgroundColor: '#ff6666',
  },
  interestButtonText: {
    color: '#333',
  },
  selectedInterestButtonText: {
    color: '#fff',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20, // Add padding for alignment
    position: 'absolute', // Make the container absolute to the bottom
    bottom: 20, // Position it at the bottom
  },
  continueButton: {
    backgroundColor: '#E94057',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60, // Add margin to create space between continue button and bottom
    width: '80%', // Make the continue button take 80% of the width
    alignSelf: 'center', // Center the continue button
  },
  disabledContinueButton: {
    backgroundColor: '#ffcccc',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 16,
    color: '#ff5252',
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#e0f7fa',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7d7d7d',
    marginBottom: 40,
  },
  modalButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default styles;
