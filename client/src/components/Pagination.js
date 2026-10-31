import React from 'react'
import { Pagination, PaginationItem } from "@material-ui/lab"
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

// Renders page links for the current URL, keeping any search query and only swapping `page`.
function Paginate({ page, count }) {
    const classes = useStyles()
    const location = useLocation()

    const linkFor = (pageNumber) => {
        const params = new URLSearchParams(location.search)
        params.set('page', pageNumber)
        return `${location.pathname}?${params.toString()}`
    }

    if (count <= 1) return null

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={count}
            page={page}
            color="primary"
            shape="rounded"
            size="large"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={linkFor(item.page)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            )}
        />
    )
}

export default Paginate
