

const styles = {
  genreCell: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '5px',
    paddingTop: '10px'
  }
}


const GenreList = (props) => {
    const { uniqueGenres, setSelectedGenre } = props

    const getGenreHandler = (genre) => {
        return () => setSelectedGenre(genre)
    }

    return (
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
    )
}

export default GenreList