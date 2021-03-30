import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  circular: {
    marginLeft: '50%',
    marginTop: '4rem',
    color: 'white'
  },
  pagination: {
    marginTop: '2.6rem',
  },
  pagButton: {
    color: 'rgba(50, 78, 128)',
    backgroundColor: 'rgb(255, 220, 255, 0.8)'
  },
  cPage: {
    color: 'rgb(255,225, 255)'
  }
}));