import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useNavigate } from "react-router"

export const BOOKS_LOGIN_TOKEN_KEY = 'books-user-token'


const LoginForm = (props) => {
    const { setToken } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log('error', error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem(BOOKS_LOGIN_TOKEN_KEY, token)
            navigate('/')
        }
    }, [result.data, setToken, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ variables: { username, password }})
    }

    return (
        <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm