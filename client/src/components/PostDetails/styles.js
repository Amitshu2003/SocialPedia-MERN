import { makeStyles } from '@material-ui/core/styles';

const clamp = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

// plain <button>s used as inline text links
const textButton = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  cursor: 'pointer',
};

export default makeStyles((theme) => ({
  backButton: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  // text-only posts read better at a narrower width
  paperNarrow: {
    maxWidth: 760,
    margin: '0 auto',
  },
  card: {
    display: 'flex',
    width: '100%',
    gap: '32px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: '24px',
    },
  },
  section: {
    flex: 1,
    minWidth: 0,
  },
  imageSection: {
    flex: 1,
    minWidth: 0,
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 92,
      alignSelf: 'flex-start',
    },
  },
  media: {
    display: 'block',
    borderRadius: 16,
    objectFit: 'cover',
    width: '100%',
    maxHeight: 560,
    boxShadow: '0 16px 40px rgba(31,35,64,0.14)',
  },

  // header
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: theme.spacing(2),
  },
  authorAvatar: {
    width: 44,
    height: 44,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6c63ff 0%, #f43f73 100%)',
  },
  authorName: {
    lineHeight: 1.2,
  },
  title: {
    wordBreak: 'break-word',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem',
    },
  },
  message: {
    fontSize: '1.05rem',
    lineHeight: 1.7,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    color: theme.palette.text.primary,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: theme.spacing(1.5),
  },
  tag: {
    ...textButton,
    fontSize: '0.85rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  // likes / comments summary + Like · Comment · Share bar
  stats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
  },
  statLikes: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  heartBadge: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    background: 'linear-gradient(135deg, #ff7aa2 0%, #f43f73 100%)',
    '& svg': {
      fontSize: 12,
    },
  },
  statLink: {
    ...textButton,
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  actionBar: {
    display: 'flex',
    gap: '4px',
    padding: theme.spacing(0.5, 0),
  },
  actionButton: {
    flex: 1,
    color: theme.palette.text.secondary,
    borderRadius: 8,
    padding: '8px 0',
    '&:hover': {
      backgroundColor: '#f1f2f9',
    },
  },
  actionLiked: {
    color: theme.palette.secondary.main,
  },
  actionDivider: {
    marginBottom: theme.spacing(2),
  },

  // comments
  composer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  composerAvatar: {
    width: 36,
    height: 36,
    fontSize: '0.95rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6c63ff 0%, #f43f73 100%)',
  },
  composerField: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    alignItems: 'flex-end',
    gap: '4px',
    padding: '4px 6px 4px 16px',
    borderRadius: 20,
    backgroundColor: '#f1f2f9',
    border: '1px solid transparent',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    '&:focus-within': {
      backgroundColor: '#fff',
      borderColor: theme.palette.primary.light,
    },
  },
  composerDisabled: {
    alignItems: 'center',
  },
  composerInput: {
    flex: 1,
    padding: '5px 0',
    fontSize: '0.95rem',
  },
  composerHint: {
    display: 'block',
    margin: theme.spacing(0.5, 0, 0, 6.5),
  },
  signInButton: {
    borderRadius: 999,
    padding: '4px 12px',
    flexShrink: 0,
  },
  commentsList: {
    marginTop: theme.spacing(2),
  },
  noComments: {
    marginLeft: theme.spacing(6.5),
  },
  comment: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: theme.spacing(1.5),
  },
  commentAvatar: {
    width: 36,
    height: 36,
    fontSize: '0.9rem',
    fontWeight: 700,
    backgroundColor: theme.palette.primary.light,
  },
  commentBody: {
    minWidth: 0,
  },
  commentBubble: {
    display: 'inline-block',
    maxWidth: '100%',
    backgroundColor: '#f1f2f9',
    padding: theme.spacing(1, 1.5),
    borderRadius: 16,
    wordBreak: 'break-word',
  },
  commentAuthor: {
    fontWeight: 700,
    lineHeight: 1.3,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  authorBadge: {
    fontSize: '0.68rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(108, 99, 255, 0.12)',
    padding: '1px 6px',
    borderRadius: 4,
  },
  commentText: {
    whiteSpace: 'pre-line',
  },
  commentMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: theme.spacing(0.25, 1.5, 0),
  },
  metaAction: {
    ...textButton,
    fontSize: '0.75rem',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main,
    },
  },
  viewMore: {
    ...textButton,
    fontSize: '0.9rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(6.5),
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  // recommendations
  recommendedSection: {
    marginTop: theme.spacing(5),
  },
  recommendedTitle: {
    marginBottom: theme.spacing(2),
  },
  recommendedCard: {
    height: '100%',
    borderRadius: 16,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 40px rgba(31,35,64,0.14)',
    },
  },
  recommendedAction: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  recommendedMedia: {
    height: 150,
  },
  mediaFallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontWeight: 800,
    color: 'rgba(255,255,255,0.9)',
    textTransform: 'uppercase',
    background: 'linear-gradient(135deg, #6c63ff 0%, #f43f73 100%)',
  },
  clamp1: clamp(1),
  clamp2: {
    ...clamp(2),
    marginTop: theme.spacing(1),
  },
  recommendedLikes: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: theme.spacing(1.5),
    fontSize: '0.85rem',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: 20,
    height: '39vh',
  },
}));
