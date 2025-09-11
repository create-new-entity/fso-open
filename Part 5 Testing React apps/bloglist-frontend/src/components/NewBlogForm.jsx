import { useState } from "react"
import blogs from "../services/blogs"
import { handleNotification } from "./Notification"


const NewBlogForm = (props) => {
    const { setBlogs, setNotification } = props
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const clearAllInputStates = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleAuthorChange = (e) => setAuthor(e.target.value)
    const handleUrlChange = (e) => setUrl(e.target.value)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const createdBlog = await blogs.createNewBlog({ title, author, url })
            setBlogs((prevBlogs) => {
                return [...prevBlogs, createdBlog]
            })
            clearAllInputStates()
            const successNotification = {
                success: true,
                msg: 'Created new blog.'
            }
            handleNotification(successNotification, setNotification)
        }
        catch(e) {
            const failedNotification = {
                success: false,
                msg: 'Failed to create new blog.'
            }
            handleNotification(failedNotification, setNotification)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Create New</h2>
                <div>
                    <label>
                        title:
                        <input value={title} onChange={handleTitleChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input value={author} onChange={handleAuthorChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input value={url} onChange={handleUrlChange}/>
                    </label>
                </div>
            </div>
            <button type='submit'>Create</button>
        </form>
    )
}

export default NewBlogForm