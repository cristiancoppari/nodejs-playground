const axios = require("axios");

// function httpClient() {
//   return {
//     get: async (url) => {
//       const res = await fetch(url);

//       return await res.json();
//     },

//     post: async (url, body) => {},
//     put: async (url, body) => {},
//     delete: async (url) => {},
//   };
// }

// module.exports = {
//   httpClient,
// };

function httpClient() {
  return {
    get: async (url) => {
      const res = await axios.get(url);

      return res.data;
    },

    post: async (url, body) => {},
    put: async (url, body) => {},
    delete: async (url) => {},
  };
}

module.exports = {
  httpClient,
};
