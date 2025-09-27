import { useState } from "react"
import { ALL_AUTHORS, SET_BIRTH_YEAR } from "../queries"
import { useMutation } from "@apollo/client"

const BirthYearForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [ changeBirthYear ] = useMutation(SET_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const variables = { name, setBornTo: parseInt(born, 10) }
        changeBirthYear({ variables })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set Birth Year</h2>
            <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label>
                        Name
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
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