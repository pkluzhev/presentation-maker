import { useEffect, useState } from "react"
import { useAxios } from "../../services/useAxios";

const UNSPLASH_CLIENT_ID: string = 'HBbHA_QvbYr6CQAb2_e0-wW0zdFCnWlJIlRtgu5hDWk'

const useUnsplashActions = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const { unsplashResponse, unsplashFetchData } = useAxios(`search/photos?page=1&per_page=15&query=unsplash&client_id=${UNSPLASH_CLIENT_ID}`);

  const getData = (page: number, value: string) => unsplashFetchData(`search/photos?page=${page}&per_page=15&query=${value || 'unsplash'}&client_id=${UNSPLASH_CLIENT_ID}`)
  let responseData = unsplashResponse
  
  useEffect(() => {
    getData(currentPage, searchValue);
    responseData = unsplashResponse
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value)
  }

  const handleButtonSearch = () => {
      if (searchValue != '') {
          let newPage: number = 1
          getData(newPage, searchValue)
          setCurrentPage(newPage)
      }
  }

  const handlePreviousPage = () => {
      if (currentPage > 1) {
          let newPage: number = currentPage - 1
          getData(newPage, searchValue)
          setCurrentPage(newPage)
      }
  }

  const handleNextPage = () => {
      let newPage: number = currentPage + 1
      getData(newPage, searchValue)
      setCurrentPage(newPage)
  }

  return {
    responseData,
    searchValue,
    handleInputChange,
    handleButtonSearch,
    handlePreviousPage,
    handleNextPage,
  }
}

export {
  useUnsplashActions,
} 
