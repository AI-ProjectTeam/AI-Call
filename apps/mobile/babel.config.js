module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 웹 번들에서 import.meta를 안전하게 변환
      'babel-plugin-transform-import-meta',
    ],
  };
};


