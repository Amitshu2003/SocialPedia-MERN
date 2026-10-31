import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2.5),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    lineHeight: 1.2,
  },
  iconBadge: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    background: 'linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%)',
    boxShadow: '0 6px 14px rgba(108, 99, 255, 0.35)',
  },
  signInCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& $iconBadge': {
      marginBottom: theme.spacing(2),
    },
  },
  signInText: {
    marginBottom: theme.spacing(2.5),
  },
  dropzone: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    borderRadius: 12,
    border: '2px dashed rgba(108, 99, 255, 0.35)',
    backgroundColor: 'rgba(108, 99, 255, 0.04)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgba(108, 99, 255, 0.08)',
    },
  },
  dropzoneIcon: {
    fontSize: 32,
    color: theme.palette.primary.main,
    marginBottom: 4,
  },
  dropzoneText: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  hiddenInput: {
    '& input': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
    },
  },
  preview: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    display: 'block',
    width: '100%',
    maxHeight: 180,
    objectFit: 'cover',
  },
  removeImage: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    backgroundColor: 'rgba(15, 17, 40, 0.55)',
    '&:hover': {
      backgroundColor: 'rgba(15, 17, 40, 0.75)',
    },
  },
  clearButton: {
    color: theme.palette.text.secondary,
  },
}));
