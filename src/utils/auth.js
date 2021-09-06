// import firebase from "gatsby-plugin-firebase"

// export const isBrowser = () => typeof window !== "undefined"

// export const getUser = () =>
//   isBrowser() && window.localStorage.getItem("user")
//     ? JSON.parse(window.localStorage.getItem("user"))
//     : {}

// export const setUser = user =>
//   isBrowser() && window.localStorage.setItem("user", JSON.stringify(user))

//   export const isLoggedIn = () => {
//   const user = getUser()
//   return !!user.email
// }

// export const signUp = (email, password) => {
//     firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
//         setUser(userCredential.user);
//     });
// }

// export const logout = (firebase) => {
//   return new Promise(resolve => {
//     firebase.auth().signOut().then(function() {
//       setUser({});
//       resolve();
//     });
//   })
// }



import firebase from "gatsby-plugin-firebase"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && firebase.auth().currentUser
    ? firebase.auth().currentUser
    : {}

export const getUserData = () => {
  if (!isLoggedIn) {
    throw 'No user logged in.'
  }
  var user; 
  if (isBrowser()) {
    user = localStorage.getItem('scribeoUser');
  }
  if (user !== undefined) {
    return JSON.parse(user);
  } else {
    return {};
  }
}

export const setUser = async () => {
  if (!isLoggedIn) {
    throw 'No user logged in.'
  }
  var idToken = await firebase.auth().currentUser.getIdToken(true);
  var resp = await fetch('https://us-central1-scribeo-ai.cloudfunctions.net/getUserData', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: idToken
    })
  });
  var json = await resp.json()
  if (typeof window !== 'undefined') {
    localStorage.setItem('scribeoUser', JSON.stringify(json));
  }
  return;
}

export const isLoggedIn = () => {
  return !!firebase.auth().currentUser
}

// export const logout = callback => {
//   setUser({})
//   callback()
// }