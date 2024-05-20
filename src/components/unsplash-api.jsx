import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos?client_id=";

export const getPhotos = async (searchQuery, page) => {
  try {
    const query = searchQuery;
    const response = await axios.get("search/photos", {
      params: {
        client_id: 'zSMlenwZaCKdvgMJ8ji46V7MXghdrD9TLiRzWBR-6RU',
        query: query,
        page: page,
        per_page: 10,
        orientation: 'landscape',
      },
    });
    return response.data.results;
  } catch (error) {
    toast.error("Server error. Please try again!");
  }
};