import React, { useContext, useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core"
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import Paginate from '../Pagination'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useStyles from "./styles"
import ChipInput from 'material-ui-chip-input'
import myContext from '../../Context/MyContext'


function Home() {
    const [currentId, setCurrentId] = useState(null)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')
    
    const classes = useStyles()
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const { getPosts, getPostBySearch } = useContext(myContext)

    useEffect(() => {
        getPosts()
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
            getPostBySearch({ search, tags: tags.join(",") })
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
        } else {
            navigate("/")
        }
    }

    return (
        <Grow in style={{ padding: 0 }}>
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
                        <Posts setCurrentId={setCurrentId} />
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