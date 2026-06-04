const axios = require("axios");

const searchJobs = async (role) => {
  try {

    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search-v2",
      {
        params: {
          query: role,
          country: "in",
          num_pages: "1",
          date_posted: "month"
        },
        headers: {
          "x-rapidapi-key":
            process.env.RAPID_API_KEY,
          "x-rapidapi-host":
            "jsearch.p.rapidapi.com"
        }
      }
    );

    return response.data.data || [];

  } catch (error) {

    console.error(
      "JSearch Error:",
      error.response?.data ||
      error.message
    );

    return [];
  }
};

module.exports = {
  searchJobs
};