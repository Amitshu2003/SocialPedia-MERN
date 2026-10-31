import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonCard: {
    overflow: 'hidden',
    height: '100%',
  },
  skeletonBody: {
    padding: theme.spacing(2),
  },
  emptyState: {
    padding: theme.spacing(6, 3),
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: 56,
    color: theme.palette.primary.light,
    marginBottom: theme.spacing(1),
  },
}));
