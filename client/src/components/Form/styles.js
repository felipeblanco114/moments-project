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
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: 'rgb(3, 79, 157, 0.9)',
    color: 'rgb(218, 161, 209)'
  },
  clean: {
    backgroundColor: 'rgb(218, 161, 209)',
    color: 'rgb(3, 79, 157, 0.9)'
  }
}));