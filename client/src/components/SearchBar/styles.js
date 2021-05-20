import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  typography: {
    fontFamily: [
      
      
      
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
    display: 'flex',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'stretch',
    width: '400px',
    marginLeft: '2.6rem',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    color: 'rgb(50, 50, 50)',
    padding: '.5rem',
    // cursor: 'pointer',
    marginLeft: '0rem',
    borderBottom: 'solid rgb(50,50,50) 0.2px',
    fontWeight: '500',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',     
    '-ms-user-select': 'none',      
    'user-select': 'none', 
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: 'rgb(199,0,37)',
    backgroundColor: 'rgb(255, 255, 255)',
    width: '1.9rem',
    height: '1.9rem',
    // border: 'solid .2rem rgb(3, 79, 157, 0.7)',
    fontWeight: 'bold',
    marginTop: '.25rem',
  },
  [theme.breakpoints.down('sm')] : {
    toolbar: {
      marginLeft: '-13.5rem',
      width: '100%',
    },
    profile: {
      marginLeft: '1rem',
      marginTop: '-2rem'
    }
  }
}));