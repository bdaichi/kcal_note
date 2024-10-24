import axios from "axios";

export const getImage = async (query: string) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&lang=ja`
  );
  const images = response.data.results.map((result: any) => result.urls.small);
  return images;
};
