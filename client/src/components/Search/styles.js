import { makeStyles } from '@material-ui/core/styles';

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
        margin: '0 0 0 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: '#29526e',
      },
      image: {
        marginLeft: '15px',
      },
      back: {
        color: 'black !important',
        textAlign: 'center',
      },
      monkeyImg: {
        width: '10%',
        height: '10%'
      },
      circular: {
        marginLeft: '50%',
        marginTop: '4rem',
        color: 'black'
      },
      gridResults: {
        width: '75%',
      },
      mainContainer: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down('sm')] : {
        mainContainer: {
          flexDirection: 'column-reverse',
        }
      }
}));