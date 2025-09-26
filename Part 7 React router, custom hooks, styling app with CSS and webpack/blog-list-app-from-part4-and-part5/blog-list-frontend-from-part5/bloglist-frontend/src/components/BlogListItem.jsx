import { Link } from 'react-router-dom'
import { Box } from '@mui/material'


const styles = {
  blog: {
    padding: '5px',
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '5px',
    marginBottom: '5px',
    backgroundColor: '#298F24'
  },
  link: {
    '& a': {
      color: 'white',
      textDecoration: 'none'
    }
  }
}

const BlogListItem = ({
  blog
}) => {

  return (
    <Box sx={styles.blog} className="blog">
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '10px',
        }}
      >
        <Box sx={styles.link} className="blog-title">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default BlogListItem
