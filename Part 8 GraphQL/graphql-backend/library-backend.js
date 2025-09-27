require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./schemas/book')
const Author = require('./schemas/author')
const { GraphQLError } = require('graphql')




mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
    ): Book!,

    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author!
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
        return -1
    }
  },
  Query: {
    bookCount: async () => {
        const allBooks = await Book.find({})
        return allBooks.length
    },
    authorCount: async () => {
        const allAuthors = await Author.find({})
        return allAuthors.length
    },
    allBooks: async (root, args) => {
        const books = await Book.find({}).populate('author')
        if(!args.author && !args.genre) {
            return books
        }
        let result = books
        if(args.author) {
            result = books.filter((book) => {
                return book.author === args.author
            })
        }
        if(args.genre) {
            result = result.filter((book) => {
                return book.genres.includes(args.genre)
            })
        }
        return result
    },
    allAuthors: async (root, args) => {
        return Author.find({})
    } 
  },
  Mutation: {
    addBook: async (root, args) => {
        try {
            let foundAuthor = await Author.find({ name: args.author })
            
            if(!foundAuthor.length) {
                const newAuthor = new Author({ name: args.author })
                foundAuthor = await newAuthor.save()
                console.log('foundAuthor', foundAuthor)
            }

            args.author = foundAuthor.id

            const newBook = new Book(args)
            const savedNewBook = await(await newBook.save()).populate('author')
            return savedNewBook
        }
        catch(error) {
            throw new GraphQLError('Saving book failed.', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args,
                    error
                }
            })
        }
    },
    editAuthor: async (root, args) => {
        const { name, setBornTo } = args
        const updatedAuthor = await Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
        return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})