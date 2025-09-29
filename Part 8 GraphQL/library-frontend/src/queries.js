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

const BOOK_FRAGMENT = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
        }
        id
        genres
    }
`

export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_FRAGMENT}
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
            ...BookDetails
        }
    }
    ${BOOK_FRAGMENT}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_FRAGMENT}
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