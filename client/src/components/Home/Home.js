import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core"
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import { useDispatch } from 'react-redux'
import { getPosts, getPostBySearch } from '../../actions/posts'
import Paginate from '../Pagination'
import { useNavigate, useLocation } from 'react-router-dom'
import useStyles from "./styles"
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    console.log(useLocation().search);
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page')
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) searchPost()
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }
    const handleDelete = (tagtoDelete) => {
        setTags(tags.filter((tag) => tag !== tagtoDelete))
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            //dispatch fetch search post 
            dispatch(getPostBySearch({ search, tags: tags.join(",") }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
        } else {
            navigate("/")
        }
    }

    return (
        <Grow in style={{padding:0}}>
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>

                    <Grid item xs={12} sm={3} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search By Title" fullWidth value={search} onChange={(e) => { setSearch(e.target.value) }}
                                onKeyDown={handleKeyDown} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search By Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>

                        <Paper elevation={6} className={classes.pagination}>
                            <Paginate page={page} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Posts  setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={3} md={3}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                    </Grid>
                </Grid>
            </Container>
        </Grow>

    )
}

export default Home