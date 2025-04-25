module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // các plugin khác nếu có
    'react-native-reanimated/plugin', // bắt buộc phải là dòng cuối
  ],
};
