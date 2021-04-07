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
    backgroundColor: 'rgb(255, 245, 255)',
    border: 'solid .1px rgb(0,0,0)',
    color: 'rgb(0,0,0)'
  },
  clean: {
    backgroundColor: 'rgb(255,245,255)',
    border: 'solid .1px rgb(0,0,0)',
    color: 'rgb(0,0,0)'
  },
}));