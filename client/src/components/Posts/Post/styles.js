import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
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
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
    backgroundColor: 'rgb(253, 250, 255)',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '3px',
    marginBottom: '24px',
    marginLeft: '10px'
  },
  title: {
    padding: '0 16px 0',
    marginTop: '-1.5rem',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '-0.3rem'
  },
  message: {
    marginTop: '-10px',
  },
  edit: {
    marginRight: '-40px',
    padding: '0px 0px 0px 0px',
  },
  email: {
    fontSize: '.6rem',
    marginTop: '-0.2rem',
    marginLeft: '-0.5rem'
  }
});