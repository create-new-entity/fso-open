import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            title
            published
            author {
                name
            }
            genres
            id
        }
    }
`


export const ADD_BOOK = gql`
    mutation createBook(
        $title: String!,
        $published: Int!,
        $author: String!,
        $genres: [String!]!
    ){
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ){
            title
            published
            author {
                name
            }
            id
            genres
        }
    }
`

export const SET_BIRTH_YEAR = gql`
    mutation setBirthYear($name: String!, $setBornTo: Int!){
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            id
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const GET_LOGGED_IN_USER = gql`
    query Me {
        me {
            favoriteGenre
            id
            username
        }
    }
`