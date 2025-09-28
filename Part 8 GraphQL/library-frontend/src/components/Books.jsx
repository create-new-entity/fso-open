import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const styles = {
  genreCell: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '5px',
    paddingTop: '10px'
  }
}

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

  const books = result.data.allBooks
  const uniqueGenres = extractGenres(books)

  const getGenreHandler = (genre) => {
    return () => setSelectedGenre(genre)
  }
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} style={styles.genreCell}>
              <button onClick={() => setSelectedGenre('')}>All Genres</button>
              {
                uniqueGenres.map((genre, index) => {
                  return <button key={index} onClick={getGenreHandler(genre)}>{genre}</button>
                })
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Books
