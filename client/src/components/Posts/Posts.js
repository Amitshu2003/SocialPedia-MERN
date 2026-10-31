import React, { useContext } from 'react'
import Post from './Post/Post'
import useStyles from './styles';
import { Grid, Paper, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined'
import myContext from '../../Context/MyContext';

function Posts({ setCurrentId }) {
    const classes = useStyles();
    const { posts, isLoading } = useContext(myContext)

    if (isLoading) {
        return (
            <Grid container alignItems='stretch' spacing={3}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Grid item key={i} xs={12} sm={6} lg={4}>
                        <Paper elevation={3} className={classes.skeletonCard}>
                            <Skeleton variant="rect" height={170} animation="wave" />
                            <div className={classes.skeletonBody}>
                                <Skeleton width="40%" animation="wave" />
                                <Skeleton width="80%" height={28} animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton width="60%" animation="wave" />
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (!posts.length) {
        return (
            <Paper elevation={3} className={classes.emptyState}>
                <PhotoLibraryOutlinedIcon className={classes.emptyIcon} />
                <Typography variant="h6">No posts found</Typography>
                <Typography variant="body2" color="textSecondary">
                    Try a different search, or be the first to share something.
                </Typography>
            </Paper>
        )
    }

    return (
        <Grid container alignItems='stretch' spacing={3}>
            {posts.map(post => (
                <Grid item key={post._id} xs={12} sm={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts
