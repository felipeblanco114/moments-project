import { makeStyles } from '@material-ui/core/styles';
import { blue, indigo, pink } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    marginLeft: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
    marginLeft: '4rem',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    color: 'rgb(3, 79, 157, 0.7)',
    cursor: 'pointer',
    margin: '0px',
    fontWeight: '500',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: pink[100],
    backgroundColor: indigo[400],
    width: '2.1rem',
    height: '2.1rem'
  },
  [theme.breakpoints.down('sm')] : {
    toolbar: {
      marginLeft: '-13.5rem',
      width: '100%',
    },
    profile: {
      marginLeft: '0rem',
    }
  }
}));