import { useEffect, useState } from "react"
import { ALL_AUTHORS, SET_BIRTH_YEAR } from "../queries"
import { useMutation, useQuery } from "@apollo/client"

const BirthYearForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [authors, setAuthors] = useState([])
    const [ changeBirthYear ] = useMutation(SET_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const result = useQuery(ALL_AUTHORS)

    useEffect(() => {
        if(!result.loading) {
            setAuthors(result.data.allAuthors)
            setName(result.data.allAuthors[0].name)
        }
    }, [result.data, result.loading])

    if(result.loading) {
        return (
            <div>
            Loading...
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const variables = { name, setBornTo: parseInt(born, 10) }
        changeBirthYear({ variables })
        setBorn('')
    }

    return (
        <div>
            <h2>Set Birth Year</h2>
            <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <select value={name} onChange={(e) => setName(e.target.value)}>
                        {
                            authors.map((author, index) => {
                                return (
                                    <option value={author.name} key={index}>{author.name}</option>
                                )
                            })
                        }
                    </select>
                    <label>
                        Born
                        <input value={born} onChange={(e) => setBorn(e.target.value)}/>
                    </label>
                    <button type='submit'>Update Author</button>
                </div>
            </form>
        </div>
    )
}

export default BirthYearForm