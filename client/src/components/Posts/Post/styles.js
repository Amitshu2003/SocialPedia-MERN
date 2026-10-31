import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 40px rgba(31,35,64,0.14)',
    },
    '&:hover $media': {
      transform: 'scale(1.05)',
    },
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    width: '100%',
  },
  mediaWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  media: {
    height: 0,
    paddingTop: '60%',
    backgroundColor: '#e8e9f5',
    transition: 'transform 0.4s ease',
  },
  mediaFallback: {
    background: 'linear-gradient(135deg, #6c63ff 0%, #8b5cf6 50%, #f43f73 100%)',
  },
  mediaShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(15,17,40,0.55) 0%, rgba(15,17,40,0) 45%)',
    pointerEvents: 'none',
  },
  overlay: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 56,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    fontSize: '0.9rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6c63ff 0%, #f43f73 100%)',
    border: '2px solid rgba(255,255,255,0.8)',
  },
  authorName: {
    lineHeight: 1.2,
    fontWeight: 700,
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  timestamp: {
    opacity: 0.85,
  },
  editButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(6px)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.32)',
    },
  },
  content: {
    padding: theme.spacing(2, 2, 1),
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: theme.spacing(1),
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(108, 99, 255, 0.08)',
    padding: '2px 8px',
    borderRadius: 999,
  },
  title: {
    lineHeight: 1.3,
    marginBottom: theme.spacing(0.5),
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  message: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardActions: {
    padding: theme.spacing(1, 1.5, 1.5),
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  stats: {
    display: 'flex',
    gap: '4px',
  },
  likeButton: {
    color: theme.palette.text.secondary,
    minWidth: 0,
    padding: '4px 10px',
  },
  liked: {
    color: theme.palette.secondary.main,
    minWidth: 0,
    padding: '4px 10px',
    backgroundColor: 'rgba(244, 63, 115, 0.08)',
  },
  deleteButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: 'rgba(244, 63, 115, 0.08)',
    },
  },
}));
