module.exports = require('react-native').Image.resolveAssetSource(
  require('react-native').Platform.OS === 'web' 
    ? {uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}
    : require('./placeholder.png')
);
