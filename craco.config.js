module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "util": require.resolve("util/"),
          "buffer": require.resolve("buffer/"),
          "stream": require.resolve("stream-browserify"),
          "xml2js": require.resolve("xml2js"),
          "timers": require.resolve("timers-browserify")
        }
      }
    }
  }
}; 