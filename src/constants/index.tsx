// @ts-ignore
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY as string;
export const GIPHY_API_TRENDING = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
export const GIPHY_API_SEARCH = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=25&rating=g&lang=en&bundle=messaging_non_clips`;
