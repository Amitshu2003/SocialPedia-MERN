import React, { useContext, useState } from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useNavigate } from 'react-router-dom';
import myContext from '../../../Context/MyContext';

function Post({ post, setCurrentId }) {
  const { likePost, deletePost } = useContext(myContext)
  const classes = useStyles();
  const navigate = useNavigate()
  const [likes, setLikes] = useState(post?.likes)

  const user = JSON.parse(localStorage.getItem('profile'))

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  const [alreadyLiked, setAlreadyLiked] = useState(hasLikedPost)

  const handleLike = async () => {
    likePost(post._id)
    setAlreadyLiked(!alreadyLiked)
    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };


  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >

        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} src='No Image' />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          {alreadyLiked ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpAltOutlined fontSize="small" />} &nbsp;{likes.length}  </Button>

        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)
          &&
          <Button size="small" color="secondary" onClick={() => { deletePost(post._id) }}><DeleteIcon fontSize="small" /> Delete</Button>
        }
      </CardActions>
    </Card >
  )
}

export default Post