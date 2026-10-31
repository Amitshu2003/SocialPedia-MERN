import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, Container, Tooltip, IconButton, InputBase } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from "./styles"
import social from "../../images/social.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const navigate = useNavigate()
    const location = useLocation()

    const [search, setSearch] = useState('')

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))

        // keep the search box in sync with the URL (back/forward, "Clear search", etc.)
        const query = location.pathname === '/posts/search' ? new URLSearchParams(location.search).get('searchQuery') : ''
        setSearch(query || '')
    }, [location])

    const handleLogout = async () => {
        localStorage.clear()
        setUser(null)
        navigate("/auth")
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const query = search.trim()
        navigate(query ? `/posts/search?${new URLSearchParams({ searchQuery: query, page: 1 })}` : '/posts')
    }

    const clearSearch = () => {
        setSearch('')
        if (location.pathname === '/posts/search') navigate('/posts')
    }

    return (
        <AppBar className={classes.appBar} position="sticky" color="inherit" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar className={classes.toolbar} disableGutters>
                    <Link to="/" className={classes.brandContainer}>
                        <img src={social} alt="SocialPedia" className={classes.logoImage} />
                    </Link>

                    {location.pathname !== '/auth' && (
                        <form className={classes.searchForm} onSubmit={handleSearch} role="search">
                            <SearchIcon className={classes.searchIcon} />
                            <InputBase
                                className={classes.searchInput}
                                placeholder="Search by title or #tag"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                inputProps={{ 'aria-label': 'Search posts by title or tag' }}
                            />
                            {search && (
                                <IconButton size="small" onClick={clearSearch} aria-label="Clear search">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )}
                            <Button type="submit" variant="contained" color="primary" size="small" className={classes.searchButton}>
                                Search
                            </Button>
                        </form>
                    )}

                    {user?.result ? (
                        <div className={classes.profile}>
                            <div className={classes.userChip}>
                                <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.imageUrl || user?.result.picture}>
                                    {user?.result.name.charAt(0)}
                                </Avatar>
                                <Typography className={classes.userName} variant="subtitle2">{user?.result.name}</Typography>
                            </div>
                            <Button variant="outlined" className={classes.logout} onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                                Logout
                            </Button>
                            <Tooltip title="Logout">
                                <IconButton className={classes.logoutIcon} onClick={handleLogout}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        location.pathname !== '/auth' && (
                            <Button onClick={() => navigate("/auth")} variant="contained" color="primary">Sign In</Button>
                        )
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar
