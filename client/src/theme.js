import { createTheme } from '@material-ui/core/styles';

const fontFamily = '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const theme = createTheme({
  palette: {
    primary: { light: '#8b85ff', main: '#6c63ff', dark: '#4b44c9', contrastText: '#fff' },
    secondary: { light: '#ff7aa2', main: '#f43f73', dark: '#c4245a', contrastText: '#fff' },
    background: { default: '#f5f6fb', paper: '#ffffff' },
    text: { primary: '#1f2340', secondary: '#6b7090' },
    divider: 'rgba(31, 35, 64, 0.08)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily,
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shadows: [
    'none',
    '0 1px 2px rgba(31,35,64,0.06)',
    '0 2px 6px rgba(31,35,64,0.06)',
    '0 4px 12px rgba(31,35,64,0.07)',
    '0 6px 16px rgba(31,35,64,0.08)',
    '0 8px 20px rgba(31,35,64,0.08)',
    '0 10px 30px rgba(31,35,64,0.08)',
    ...Array(18).fill('0 16px 40px rgba(31,35,64,0.12)'),
  ],
  overrides: {
    MuiButton: {
      root: { borderRadius: 10, padding: '8px 18px' },
      containedPrimary: {
        background: 'linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%)',
        boxShadow: '0 6px 16px rgba(108, 99, 255, 0.35)',
        '&:hover': {
          background: 'linear-gradient(135deg, #5a52f0 0%, #7c4ee6 100%)',
          boxShadow: '0 8px 20px rgba(108, 99, 255, 0.45)',
        },
      },
      containedSecondary: { boxShadow: '0 6px 16px rgba(244, 63, 115, 0.3)' },
    },
    MuiPaper: {
      rounded: { borderRadius: 16 },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 10,
        backgroundColor: '#fafbff',
        '&:hover $notchedOutline': { borderColor: '#b9b5ff' },
      },
      notchedOutline: { borderColor: 'rgba(31,35,64,0.12)' },
    },
    MuiChip: {
      root: { fontWeight: 500 },
    },
    MuiPaginationItem: {
      root: { fontWeight: 600 },
    },
  },
});

export default theme;
