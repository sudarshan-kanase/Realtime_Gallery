import axios from "axios";

// Create a pre-configured Axios instance for Unsplash API
// This helps avoid repeating base URL and headers in every request
const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",

  headers: {
    // Authorization header using Unsplash access key from Vite environment variables
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,

    // Specify Unsplash API version
    "Accept-Version": "v1",
  },
});

// Fetch images from Unsplash API
// `page` parameter is used for pagination (default: page 1)
export const fetchImages = async (page = 1) => {
  // Make GET request to /photos endpoint with query parameters
  const res = await unsplash.get("/photos", {
    params: {
      page,        // Page number for pagination
      per_page: 12 // Number of images per page
    },
  });

  // Return only the response data (image list)
  return res.data;
};
