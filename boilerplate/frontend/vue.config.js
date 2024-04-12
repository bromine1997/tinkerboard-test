module.exports = {
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: {
      '': {
        target: 'http://localhost:8080',
      },
    },
  },
};
