import React, { useContext, useEffect, useState } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper, IconButton } from '@material-ui/core';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom';
import myContext from '../../Context/MyContext';


function Form({ currentId, setCurrentId }) {
  const { createPost, updatePost, posts } = useContext(myContext)

  const classes = useStyles()
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })

  const post = currentId ? posts.find((p) => p._id === currentId) : null

  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId) {
      const data = {...postData, name: user?.result?.name }
      updatePost(currentId, data)
    }
    else {
      const data = {...postData, name: user?.result?.name }
      createPost(data)
      navigate("/posts")
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }

  if (!user?.result?.name) {
    return (
      <Paper elevation={3} className={`${classes.paper} ${classes.signInCard}`}>
        <div className={classes.iconBadge}>
          <LockOpenOutlinedIcon />
        </div>
        <Typography variant="h6" gutterBottom>Join the conversation</Typography>
        <Typography variant="body2" color="textSecondary" className={classes.signInText}>
          Sign in to create your own posts and like other people's posts.
        </Typography>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/auth')}>
          Sign In
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <div className={classes.iconBadge}>
            <CreateOutlinedIcon fontSize="small" />
          </div>
          <div>
            <Typography variant='h6' className={classes.title}>{currentId ? 'Edit post' : 'Create a post'}</Typography>
            <Typography variant='caption' color='textSecondary'>
              {currentId ? 'Update your memory' : 'Share something with everyone'}
            </Typography>
          </div>
        </div>

        <TextField name='title' variant='outlined' label='Title' size='small' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

        <TextField name='message' minRows={4} multiline variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField name='tags' variant='outlined' label='Tags' size='small' helperText='Separate tags with commas' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        {postData.selectedFile ? (
          <div className={classes.preview}>
            <img src={postData.selectedFile} alt="Selected" className={classes.previewImage} />
            <IconButton size="small" className={classes.removeImage} onClick={() => setPostData({ ...postData, selectedFile: '' })}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ) : (
          <label className={classes.dropzone}>
            <AddPhotoAlternateOutlinedIcon className={classes.dropzoneIcon} />
            <Typography variant="body2" className={classes.dropzoneText}>Click to add a photo</Typography>
            <div className={classes.hiddenInput}>
              <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </div>
          </label>
        )}

        <Button variant='contained' color='primary' size='large' type='submit' fullWidth>
          {currentId ? 'Save changes' : 'Publish'}
        </Button>
        <Button variant='text' size='small' onClick={clear} fullWidth className={classes.clearButton}>
          {currentId ? 'Cancel' : 'Clear'}
        </Button>
      </form>
    </Paper>
  )
}

export default Form
