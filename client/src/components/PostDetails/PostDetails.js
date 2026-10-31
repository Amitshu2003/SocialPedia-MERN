import React, { useContext, useEffect, useRef, useState } from 'react'
import { Paper, Typography, CircularProgress, Divider, Avatar, Button, Grid, Card, CardActionArea, CardMedia, CardContent, Snackbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import CommentSection from './CommentSection';
import myContext from '../../Context/MyContext';
import useLike from '../../hooks/useLike';

const pluralize = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

// "You and 2 others" / "You" / "3" — like Facebook's reaction summary
const likeSummary = (count, hasLiked) => {
  if (!hasLiked) return String(count)
  if (count === 1) return 'You'
  return `You and ${pluralize(count - 1, 'other')}`
}

function PostDetails() {
  const { post, posts, isLoading , getPost, getPostBySearch} = useContext(myContext)
  const classes = useStyles();
  const navigate = useNavigate()
  const { id } = useParams();
  const commentInputRef = useRef()
  const [toast, setToast] = useState('')

  useEffect(() => {
    getPost(id)
  }, [id])

  // Keyed on the id so liking/commenting (which replaces the post object) doesn't refetch recommendations
  const postId = post?._id
  useEffect(() => {
    if (post) {
      getPostBySearch({ search: 'none', tags: post?.tags.join(",") })
    }
  }, [postId])

  const { likes, hasLiked, toggleLike, canLike } = useLike(post)

  if (!post) return null

  if (isLoading) {
    return (
      <Paper elevation={3} className={classes.loadingPaper}>
        <CircularProgress size="4em" />
      </Paper>
    );
  }

  const openPost = (id) => {
    navigate(`/posts/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const searchTag = (tag) => {
    navigate(`/posts/search?${new URLSearchParams({ searchQuery: `#${tag}`, page: 1 })}`)
  }

  const focusComment = () => {
    const input = commentInputRef.current
    if (!input) return
    input.scrollIntoView({ behavior: 'smooth', block: 'center' })
    input.focus({ preventScroll: true })
  }

  const handleLike = () => {
    if (canLike) toggleLike()
    else navigate('/auth')
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: post.title, url }) } catch (e) { /* user cancelled */ }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setToast('Link copied to clipboard')
    } catch (e) {
      setToast("Couldn't copy the link")
    }
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  const tags = post.tags.map((t) => t.trim()).filter(Boolean)
  const commentCount = post.comments?.length || 0
  const hasImage = Boolean(post.selectedFile)

  return (
    <>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/posts')} className={classes.backButton}>
        Back to feed
      </Button>

      <Paper className={`${classes.paper} ${hasImage ? '' : classes.paperNarrow}`} elevation={3}>
        <div className={classes.card}>
          <div className={classes.section}>
            <div className={classes.author}>
              <Avatar className={classes.authorAvatar}>{post.name?.charAt(0)}</Avatar>
              <div>
                <Typography variant="subtitle1" className={classes.authorName}>{post.name}</Typography>
                <Typography variant="body2" color="textSecondary" title={moment(post.createdAt).format('LLL')}>
                  {moment(post.createdAt).fromNow()}
                </Typography>
              </div>
            </div>

            <Typography variant="h4" component="h1" className={classes.title}>{post.title}</Typography>
            {post.message && <Typography variant="body1" component="p" className={classes.message}>{post.message}</Typography>}

            {tags.length > 0 && (
              <div className={classes.tags}>
                {tags.map((tag) => (
                  <button type="button" key={tag} className={classes.tag} onClick={() => searchTag(tag)}>#{tag}</button>
                ))}
              </div>
            )}

            {(likes.length > 0 || commentCount > 0) && (
              <div className={classes.stats}>
                {likes.length > 0 ? (
                  <span className={classes.statLikes}>
                    <span className={classes.heartBadge}><FavoriteIcon /></span>
                    {likeSummary(likes.length, hasLiked)}
                  </span>
                ) : <span />}
                {commentCount > 0 && (
                  <button type="button" className={classes.statLink} onClick={focusComment}>
                    {pluralize(commentCount, 'comment')}
                  </button>
                )}
              </div>
            )}

            <Divider />
            <div className={classes.actionBar}>
              <Button
                onClick={handleLike}
                className={`${classes.actionButton} ${hasLiked ? classes.actionLiked : ''}`}
                startIcon={hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              >
                Like
              </Button>
              <Button onClick={focusComment} className={classes.actionButton} startIcon={<ChatBubbleOutlineIcon />}>
                Comment
              </Button>
              <Button onClick={handleShare} className={classes.actionButton} startIcon={<ShareOutlinedIcon />}>
                Share
              </Button>
            </div>
            <Divider className={classes.actionDivider} />

            <CommentSection post={post} inputRef={commentInputRef} />
          </div>

          {hasImage && (
            <div className={classes.imageSection}>
              <img className={classes.media} src={post.selectedFile} alt={post.title} />
            </div>
          )}
        </div>
      </Paper>

      {recommendedPosts.length > 0 && (
        <div className={classes.recommendedSection}>
          <Typography variant="h5" className={classes.recommendedTitle}>You might also like</Typography>
          <Grid container spacing={3}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <Grid item xs={12} sm={6} md={3} key={_id}>
                <Card className={classes.recommendedCard} elevation={3}>
                  <CardActionArea onClick={() => openPost(_id)} className={classes.recommendedAction}>
                    {selectedFile
                      ? <CardMedia className={classes.recommendedMedia} image={selectedFile} title={title} />
                      : <div className={`${classes.recommendedMedia} ${classes.mediaFallback}`}>{title?.charAt(0)}</div>}
                    <CardContent>
                      <Typography variant="subtitle1" className={classes.clamp1}>{title}</Typography>
                      <Typography variant="caption" color="textSecondary">by {name}</Typography>
                      <Typography variant="body2" color="textSecondary" className={classes.clamp2}>{message}</Typography>
                      <div className={classes.recommendedLikes}>
                        <FavoriteIcon fontSize="inherit" /> {likes.length}
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2500}
        onClose={() => setToast('')}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  )
}

export default PostDetails
