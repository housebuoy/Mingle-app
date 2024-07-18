import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from '@rneui/base';

export default function GalleryViewer({ images, onRemoveImage }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryContainer}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  galleryImageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ccc',
  },
  galleryTab1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
