import React, { useContext, useEffect } from 'react'
import { Pagination, PaginationItem } from "@material-ui/lab"
import useStyles from './styles'
import { Link } from 'react-router-dom'
import myContext from '../Context/MyContext'

function Paginate({ page }) {
    const classes = useStyles()
    const { numberOfPages, getPosts } = useContext(myContext)

    useEffect(() => {
        if (page) {
            getPosts(page)
        }
    }, [page])
    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate