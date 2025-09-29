
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./schemas/book')
const Author = require('./schemas/author')

const resolvers = {
  Author: {
    bookCount: (root) => {
        return root.booksAuthored.length
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
                return book.author.name === args.author
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
        const allAuthors = await Author.find({}).populate('booksAuthored')
        return allAuthors
    },
    me: (root, args, context) => {
        return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
        try {
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            let foundAuthor = await Author.find({ name: args.author })
            
            if(!foundAuthor.length) {
                const newAuthor = new Author({ name: args.author })
                foundAuthor = [await newAuthor.save()]
            }

            foundAuthor = foundAuthor[0]
            args.author = foundAuthor._id
            const newBook = new Book(args)
            const savedNewBook = await ((await newBook.save()).populate('author'))

            foundAuthor.booksAuthored = foundAuthor.booksAuthored.concat(savedNewBook.id)
            await foundAuthor.save()
            
            pubsub.publish('BOOK_ADDED', { bookAdded: savedNewBook })
            return savedNewBook
        }
        catch(error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args
                }
            })
        }
    },
    editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
            throw new GraphQLError('Not authenticated', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            })
        }
        const { name, setBornTo } = args
        const updatedAuthor = await Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
        return updatedAuthor
    },
    createUser: async (root, args) => {
        const { username, favoriteGenre } = args
        const newUser = new User({ username, favoriteGenre })
        const savedUser = await newUser.save()
        return savedUser
    },
    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'testpassword' ) {
            throw new GraphQLError('wrong credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
            })        
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
}

module.exports = resolvers