import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;
  
    return <Image source={imageSource} style={styles.profileImage} />;
  }
  

  const styles = StyleSheet.create({
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    }
  })