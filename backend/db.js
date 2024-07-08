import firebaseConfig from '../utils/firebaseConfig';

export async function registerUser(nameValue, email, password) {
  try {
    // Get a reference to the Firestore database
    const firestore = firebase.firestore();

    // Check if the user already exists
    const userSnapshot = await firestore.collection('users').where('email', '==', email).get();
    if (!userSnapshot.empty) {
      throw new Error('User already exists');
    }

    // Save the new user to Firestore
    await firestore.collection('users').add({ nameValue, email, password });
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}