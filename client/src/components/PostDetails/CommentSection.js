import React, { useState, useContext } from 'react';
import { Typography, Button, Avatar, InputBase, IconButton, CircularProgress } from '@material-ui/core/';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useStyles from "./styles"
import myContext from '../../Context/MyContext';
import { getProfile, getUserId } from '../../utils/user';

const INITIAL_VISIBLE = 5

// Older comments are stored as "Name : text" strings; newer ones are objects with an id, author and time.
const normalizeComment = (c, i) => {
    if (typeof c === 'string') {
        const idx = c.indexOf(':')
        return {
            key: `legacy-${i}`,
            name: idx === -1 ? '' : c.slice(0, idx).trim(),
            text: idx === -1 ? c : c.slice(idx + 1).trim(),
        }
    }
    return { key: c._id, id: c._id, name: c.name, text: c.text, authorId: c.authorId, createdAt: c.createdAt }
}

const CommentSection = ({ post, inputRef }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { commentPost, deleteComment } = useContext(myContext)
    const [comment, setComment] = useState("")
    const [posting, setPosting] = useState(false)
    const [error, setError] = useState('')
    const [showAll, setShowAll] = useState(false)

    const user = getProfile()
    const userId = getUserId(user)
    const isSignedIn = Boolean(user?.result?.name)

    // newest first
    const comments = (post.comments || []).map(normalizeComment).reverse()
    const visibleComments = showAll ? comments : comments.slice(0, INITIAL_VISIBLE)
    const hiddenCount = comments.length - visibleComments.length

    const handleComment = async () => {
        const text = comment.trim()
        if (!text || posting) return

        setPosting(true)
        setError('')
        const updatedPost = await commentPost(text, post._id)
        setPosting(false)

        if (updatedPost) {
            setComment('')
        } else {
            setError("Couldn't post your comment. Please try again.")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleComment()
        }
    }

    const handleDelete = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return
        await deleteComment(post._id, commentId)
    }

    const canDelete = (c) => Boolean(c.id && userId) && (c.authorId === userId || post.creator === userId)

    return (
        <div>
            {isSignedIn ? (
                <>
                    <div className={classes.composer}>
                        <Avatar className={classes.composerAvatar} src={user.result.picture || user.result.imageUrl} alt={user.result.name}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <div className={classes.composerField}>
                            <InputBase
                                className={classes.composerInput}
                                placeholder="Write a comment..."
                                multiline
                                maxRows={6}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={handleKeyDown}
                                inputRef={inputRef}
                                disabled={posting}
                                inputProps={{ 'aria-label': 'Write a comment', maxLength: 1000 }}
                            />
                            <IconButton size="small" color="primary" disabled={!comment.trim() || posting} onClick={handleComment} aria-label="Post comment">
                                {posting ? <CircularProgress size={18} /> : <SendIcon fontSize="small" />}
                            </IconButton>
                        </div>
                    </div>
                    <Typography variant="caption" color={error ? 'error' : 'textSecondary'} className={classes.composerHint}>
                        {error || 'Press Enter to post · Shift + Enter for a new line'}
                    </Typography>
                </>
            ) : (
                <div className={classes.composer}>
                    <Avatar className={classes.composerAvatar} />
                    <div className={`${classes.composerField} ${classes.composerDisabled}`}>
                        <InputBase className={classes.composerInput} placeholder="Sign in to write a comment" disabled inputRef={inputRef} />
                        <Button size="small" color="primary" onClick={() => navigate('/auth')} className={classes.signInButton}>
                            Sign in
                        </Button>
                    </div>
                </div>
            )}

            <div className={classes.commentsList}>
                {comments.length === 0 && (
                    <Typography variant="body2" color="textSecondary" className={classes.noComments}>
                        No comments yet. Be the first to comment.
                    </Typography>
                )}

                {visibleComments.map((c) => (
                    <div key={c.key} className={classes.comment}>
                        <Avatar className={classes.commentAvatar}>{c.name.charAt(0) || '?'}</Avatar>
                        <div className={classes.commentBody}>
                            <div className={classes.commentBubble}>
                                <Typography variant="subtitle2" className={classes.commentAuthor}>
                                    {c.name}
                                    {c.authorId && c.authorId === post.creator && <span className={classes.authorBadge}>Author</span>}
                                </Typography>
                                <Typography variant="body2" className={classes.commentText}>{c.text}</Typography>
                            </div>
                            {(c.createdAt || canDelete(c)) && (
                                <div className={classes.commentMeta}>
                                    {c.createdAt && (
                                        <Typography variant="caption" color="textSecondary" title={moment(c.createdAt).format('LLL')}>
                                            {moment(c.createdAt).fromNow()}
                                        </Typography>
                                    )}
                                    {canDelete(c) && (
                                        <button type="button" className={classes.metaAction} onClick={() => handleDelete(c.id)}>Delete</button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {comments.length > INITIAL_VISIBLE && (
                    <button type="button" className={classes.viewMore} onClick={() => setShowAll(!showAll)}>
                        {hiddenCount > 0 ? `View ${hiddenCount} more comment${hiddenCount > 1 ? 's' : ''}` : 'Show fewer comments'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default CommentSection
