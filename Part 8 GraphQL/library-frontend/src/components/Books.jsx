import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"
import GenreList from "./GenreList"
import BookList from "./BookList"



const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  if(result.loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const extractGenres = (books) => {
    const nonUniqueGenres = books.reduce((acc, curr) => {
      return [...acc, ...curr.genres]
    }, [])

    const uniqueGenresSet = new Set(nonUniqueGenres)
    return Array.from(uniqueGenresSet.values())
  }

  const books = result.data ? result.data.allBooks : []
  const uniqueGenres = extractGenres(books)

  
  return (
    <div>
      <h2>Books</h2>
      <BookList
        books={books}
        genreListComponent={
          <GenreList
            uniqueGenres={uniqueGenres}
            setSelectedGenre={setSelectedGenre}
          />
        }
      />
    </div>
  )
}

export default Books
