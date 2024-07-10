import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base';

export default function GalleryViewer({ images, onRemoveImage }) {
  return (
    <View style={styles.galleryContainer}>
      {images.map((image, index) => (
        <View key={index} style={styles.galleryImageContainer}>
          <Image source={{ uri: image.downloadURL }} style={styles.galleryImage} resizeMode="cover" />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemoveImage(index)}
          >
            <Icon name="delete" size={20} color="#e94057" />
          </TouchableOpacity>
        </View>
      ))}
      {images.length === 0 && (
        <View style={[styles.galleryTab1]}>
          <Text style={styles.emptyText}>No images in the gallery</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 20,
  },
  galleryImageContainer: {
    width: '60%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  galleryTab1: {
    paddingHorizontal: 10,
    width: '60%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 50,
  },
});
