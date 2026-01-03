import axios from "axios";

const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    "Accept-Version": "v1",
  },
});

export const fetchImages = async (page = 1) => {
  const res = await unsplash.get("/photos", {
    params: {
      page,
      per_page: 12,
    },
  });
  return res.data;
};
