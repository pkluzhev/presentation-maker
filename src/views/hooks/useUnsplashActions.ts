import { useEffect } from "react"
import { useAxios } from "../../views/hooks/useAxios";

const UNSPLASH_CLIENT_ID: string = 'HBbHA_QvbYr6CQAb2_e0-wW0zdFCnWlJIlRtgu5hDWk'

const useUnsplashActions = (page: number, value: string) => {
  const { unsplashResponse, unsplashFetchData } = useAxios(`search/photos?page=1&per_page=15&query=unsplash&client_id=${UNSPLASH_CLIENT_ID}`);

  const getData = (page: number, value: string) => unsplashFetchData(`search/photos?page=${page}&per_page=15&query=${value}&client_id=${UNSPLASH_CLIENT_ID}`)
  let responseData = unsplashResponse
  
  useEffect(() => {
    getData(page, value);
    responseData = unsplashResponse
  }, [])

  return {
    responseData,
    getData: (page: number, value: string) => getData(page, value)
  }
}

export {
  useUnsplashActions,
} 
