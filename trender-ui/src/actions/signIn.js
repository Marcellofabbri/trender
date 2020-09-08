import axios from 'axios';

const export signIn = (credentials) => {
  let user = credentials.user;
  let password = credentials.password;
  return (dispatch) => {
    fetch("api/users/?user=" + user + "&password=" + password)
    .then(results => results.json())
    .then((json) => { dispatch({ type: LOGIN_SUCCESS });
    })
    .catch((err) => { dispatch({ type: LOGIN_ERROR, err });
    })
  }
}