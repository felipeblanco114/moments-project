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
    color: 'black'
  },
  pagination: {
    marginTop: '2.6rem',
    paddingBottom: '5rem'
  },
  pagButton: {
    color: 'black',
    backgroundColor: 'rgb(255, 255, 255, 0.8)',
    fontWeight: 'bold',
    height: '2rem',
    position: 'relative',
    marginTop: '1.2rem'
  },
  cPage: {
    color: 'black'
  }
}));