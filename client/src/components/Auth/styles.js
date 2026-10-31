import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3, 2),
    },
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(135deg, #6c63ff 0%, #f43f73 100%)',
    boxShadow: '0 8px 20px rgba(108, 99, 255, 0.35)',
  },
  subtitle: {
    marginTop: theme.spacing(0.5),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  alert: {
    marginBottom: theme.spacing(2),
    borderRadius: 10,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: '0.8rem',
    margin: theme.spacing(0, 0, 2),
    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& span': {
      padding: theme.spacing(0, 1.5),
    },
  },
  googleButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  switchText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    padding: '4px 8px',
    minWidth: 0,
  },
}));
