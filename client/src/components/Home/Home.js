import React, { useContext, useEffect, useState } from 'react'
import { Grow, Grid, Paper, Typography, Button } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import Paginate from '../Pagination'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useStyles from "./styles"
import myContext from '../../Context/MyContext'


// What's shown is driven entirely by the URL: /posts?page=N or /posts/search?searchQuery=...&page=N
function Home() {
    const [currentId, setCurrentId] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const searchQuery = (searchParams.get('searchQuery') || '').trim()
    const isSearch = location.pathname === '/posts/search' && Boolean(searchQuery)

    const classes = useStyles()
    const { getPosts, getPostBySearch, numberOfPages, isLoading } = useContext(myContext)

    useEffect(() => {
        if (isSearch) {
            getPostBySearch({ search: searchQuery, page })
        } else {
            getPosts(page)
        }
    }, [isSearch, searchQuery, page])

    return (
        <Grow in>
            <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3}>

                <Grid item xs={12} md={9} className={classes.postsColumn}>
                    <div className={classes.feedHeader}>
                        <div>
                            <Typography variant="h5">
                                {isSearch ? <>Results for “{searchQuery}”</> : 'Latest posts'}
                            </Typography>
                            {!isLoading && numberOfPages > 1 && (
                                <Typography variant="body2" color="textSecondary">Page {page} of {numberOfPages}</Typography>
                            )}
                        </div>
                        {isSearch && (
                            <Button size="small" startIcon={<CloseIcon />} onClick={() => navigate('/posts')} className={classes.clearSearch}>
                                Clear search
                            </Button>
                        )}
                    </div>

                    <Posts setCurrentId={setCurrentId} />

                    {!isLoading && numberOfPages > 1 && (
                        <Paper elevation={3} className={classes.pagination}>
                            <Paginate page={page} count={numberOfPages} />
                        </Paper>
                    )}
                </Grid>

                <Grid item xs={12} md={3} className={classes.formColumn}>
                    <div className={classes.sticky}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </div>
                </Grid>
            </Grid>
        </Grow>
    )
}

export default Home
