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
      pagination: {
        width: '20rem',
        marginTop: '3rem',
        marginBottom: '3rem',
        marginLeft: '20%',
      },
      [theme.breakpoints.down('sm')] : {
        mainContainer: {
          flexDirection: 'column-reverse',
        },
        pagination: {
          width: '100%',
          marginLeft: '0',
        }
      }
}));