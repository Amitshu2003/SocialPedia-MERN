import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'saturate(180%) blur(12px)',
    WebkitBackdropFilter: 'saturate(180%) blur(12px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 68,
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      paddingTop: theme.spacing(1),
    },
  },
  searchForm: {
    flex: 1,
    maxWidth: 560,
    margin: theme.spacing(0, 3),
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 4px 4px 14px',
    borderRadius: 999,
    backgroundColor: '#f1f2f9',
    border: '1px solid transparent',
    transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
    '&:focus-within': {
      backgroundColor: '#fff',
      borderColor: theme.palette.primary.light,
      boxShadow: '0 0 0 4px rgba(108, 99, 255, 0.12)',
    },
    // phones: search gets its own full-width row under the logo and profile
    [theme.breakpoints.down('xs')]: {
      order: 3,
      flexBasis: '100%',
      maxWidth: 'none',
      margin: theme.spacing(1, 0, 1.5),
    },
  },
  searchIcon: {
    color: theme.palette.text.secondary,
  },
  searchInput: {
    flex: 1,
    fontSize: '0.95rem',
  },
  searchButton: {
    borderRadius: 999,
    padding: '6px 16px',
    boxShadow: 'none',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImage: {
    height: 38,
    width: 'auto',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 14px 4px 4px',
    borderRadius: 999,
    backgroundColor: 'rgba(108, 99, 255, 0.08)',
  },
  avatar: {
    width: 34,
    height: 34,
    fontSize: '0.95rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6c63ff 0%, #f43f73 100%)',
  },
  userName: {
    fontWeight: 600,
    maxWidth: 180,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 110,
    },
  },
  logout: {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.divider,
    '&:hover': {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.light,
      backgroundColor: 'rgba(244, 63, 115, 0.06)',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  logoutIcon: {
    display: 'none',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      display: 'inline-flex',
    },
  },
}));
