import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sticky: {
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 92,
    },
  },
  feedHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: theme.spacing(2.5),
  },
  clearSearch: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  pagination: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'center',
  },
  // Below desktop the create form sits above the feed.
  formColumn: {
    [theme.breakpoints.down('sm')]: { order: 1 },
  },
  postsColumn: {
    [theme.breakpoints.down('sm')]: { order: 2 },
  },
}));
