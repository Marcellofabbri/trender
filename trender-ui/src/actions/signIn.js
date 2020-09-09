import axios from 'axios';

const signInSuccessful = (user) => {
  let username = user[0].username
  let userID = user[0].id
  return {
    type: 'LOGIN_SUCCESSFUL',
    username: username,
    userID: userID
  }
}

const signInFailed = () => {
  return {
    type: 'LOGIN_FAILED'
  }
}

const checkUsers = (json, username, password) => {
  if (json.length > 0) {
    return json.filter(user => user.username == username && user.password == password);
  }
  // returns the users that it finds: e.g. { id: 1, username: 'TheName', password: 'PWD' }
}

export const signIn = (credentials) => {
  let username = credentials.username;
  let password = credentials.password;
  return (dispatch) => {
    fetch("api/users/")
    .then(response => response.json())
    .then((json) => { typeof checkUsers(json, username, password) != 'undefined' && checkUsers(json, username, password).length > 0 ?
      dispatch(signInSuccessful(checkUsers(json, username, password))) :
      dispatch(signInFailed())
    })
    .catch((err) => console.log(err))
    };
}