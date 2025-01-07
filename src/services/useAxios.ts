import axios from "axios";
import { useEffect, useState } from "react"

const useAxios = (parameter?: any) => {
  const [unsplashResponse, setUnsplashResponse] = useState([]);
  const [error, setError] = useState('');

  axios.defaults.baseURL = 'https://api.unsplash.com';

  const unsplashFetchData = async (url: string) => {
    try {
      const res = await axios(url);
      setUnsplashResponse(res.data.results);
    } catch (err: any) {
      setError(err)
    } finally {}
  }

  useEffect(() => {
    unsplashFetchData(parameter);
  }, [parameter])

  return {
    unsplashResponse,
    error,
    unsplashFetchData: (url: string) => unsplashFetchData(url)
  }
}

export {
 useAxios,
} 