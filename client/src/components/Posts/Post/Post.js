import React, { useContext } from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Avatar, IconButton, Tooltip } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import myContext from '../../../Context/MyContext';
import useLike from '../../../hooks/useLike';
import { getProfile, getUserId } from '../../../utils/user';

function Post({ post, setCurrentId }) {
  const { deletePost } = useContext(myContext)
  const classes = useStyles();
  const navigate = useNavigate()
  const { likes, hasLiked, toggleLike, canLike } = useLike(post)

  const userId = getUserId(getProfile())
  const isCreator = Boolean(userId) && userId === post?.creator

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  return (
    <Card className={classes.card} elevation={3}>
      <ButtonBase
        component="div"
        className={classes.cardAction}
        onClick={openPost}
      >
        <div className={classes.mediaWrapper}>
          {post.selectedFile
            ? <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            : <div className={`${classes.media} ${classes.mediaFallback}`} />}
          <div className={classes.mediaShade} />
          <div className={classes.overlay}>
            <Avatar className={classes.authorAvatar}>{post.name?.charAt(0)}</Avatar>
            <div>
              <Typography variant="subtitle2" className={classes.authorName}>{post.name}</Typography>
              <Typography variant="caption" className={classes.timestamp}>{moment(post.createdAt).fromNow()}</Typography>
            </div>
          </div>
          {isCreator && (
            <Tooltip title="Edit post">
              <IconButton
                className={classes.editButton}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </div>

        <CardContent className={classes.content}>
          {post.tags?.filter(Boolean).length > 0 && (
            <div className={classes.tags}>
              {post.tags.filter(Boolean).map((tag) => (
                <span key={tag} className={classes.tag}>#{tag.trim()}</span>
              ))}
            </div>
          )}
          <Typography className={classes.title} variant="h6" component="h2">{post.title}</Typography>
          <Typography className={classes.message} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <div className={classes.stats}>
          <Button
            size="small"
            disabled={!canLike}
            onClick={toggleLike}
            className={hasLiked ? classes.liked : classes.likeButton}
            startIcon={hasLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          >
            {likes.length}
          </Button>
          <Button size="small" className={classes.likeButton} onClick={openPost} startIcon={<ChatBubbleOutlineIcon fontSize="small" />}>
            {post.comments?.length || 0}
          </Button>
        </div>

        {isCreator && (
          <Tooltip title="Delete post">
            <IconButton size="small" className={classes.deleteButton} onClick={() => { deletePost(post._id) }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  )
}

export default Post
