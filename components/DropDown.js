import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

// const data = [
//   { label: 'Non-binary', value: '1' },
//   { label: 'Transgender', value: '2' },
//   { label: 'Cisgender', value: '3' },
//   { label: 'Gender fluid', value: '4' },
// ];

const DropdownComponent = ({onGenderSelect, data}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { backgroundColor: 'transparent', color: 'white', top: 12, }]}>
          Choose another
        </Text>
      );
    }
    return null;
  };

  const handleValueChange = (item) => {
    setValue(item.value);
    setIsFocus(false);
    onGenderSelect(item.label); // Call the callback function with the selected gender
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#E94057', backgroundColor: '#E94057', }]}
        placeholderStyle={[styles.placeholderStyle, isFocus && {color: 'white'}]}
        selectedTextStyle={[
            styles.selectedTextStyle,
            isFocus && { color: 'white' },
            (value === null) && { color: '#E94057' }, // Adjust the color of "Choose another" selected text
          ]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle	={styles.itemContainerStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Choose one' : ''}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleValueChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#fff' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    width: '100%',
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 8,
    // paddingHorizontal: 8,
    paddingHorizontal: 25,
    paddingVertical: 35,
    backgroundColor: '#ffffff'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
  placeholderStyle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold'
  },
  selectedTextStyle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemContainerStyle: {
    // borderRadius: 20,
    // backgroundColor: 'red'
  },
  itemTextStyle:{
    fontSize: 20,
    fontFamily: 'Poppins-Bold'
  }

});