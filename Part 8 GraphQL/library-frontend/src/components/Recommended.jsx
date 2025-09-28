import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import BookList from "./BookList"


const Recommended = (props) => {
    const { genre } = props
    const result = useQuery(ALL_BOOKS, {
        variables: {
            genre
        }
    })
    if(result.loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Recommended</h2>
            <BookList books={result.data.allBooks}/>
        </div>
    )
}

export default Recommended