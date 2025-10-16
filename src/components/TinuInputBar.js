import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../theme/colors';

const TinuInputBar = ({inputRef, inputText, onChangeText, onSend}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Ask me anything..."
        placeholderTextColor={colors.textSecondary}
        value={inputText}
        onChangeText={onChangeText}
        multiline={false}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Image
          source={require('../assets/images/enter.png')}
          style={styles.sendIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 23.57,
    right: 23.57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 365,
    height: 62,
    backgroundColor: colors.white,
    borderRadius: 70,
    paddingTop: 8,
    paddingRight: 6,
    paddingBottom: 8,
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  input: {
    fontFamily: 'Quicksand-Regular',
    flex: 1,
    fontSize: 14,
    color: '#000000',
    paddingVertical: 0,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  sendIcon: {
    width: 52,
    height: 52,
  },
});

export default TinuInputBar;
