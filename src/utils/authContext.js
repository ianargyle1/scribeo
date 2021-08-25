import React, { useContext, useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

const defaultState = {
  currentUser: '',
  setCurrentUser: () => {}
}

const AuthContext = React.createContext(defaultState);

export function AuthProvider({ children }) {
    const [currentUser] = useState();

    // function signup (email, password) {
    //     return firebase.auth().createUserWithEmailAndPassword(email, password);
    // }

    function signin (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    function setCurrentUser (user) {
        this.setState({ currentUser: user });
    }

    // useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //         console.log('setting user to: ' + String(user));
    //         setCurrentUser(user);
    //         setLoading(false);
    //     });

    //     return unsubscribe;
    // }, [])

    // const value = {
    //     currentUser,
    //     setCurrentUser
    // }

    return (
        <AuthContext.Provider value={currentUser, setCurrentUser}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext


// import React from "react"
// import firebase from "gatsby-plugin-firebase"

// const defaultState = {
//   currentUser: '',
//   setCurrentUser: () => {}
// }

// const AuthContext = React.createContext(defaultState)

// class AuthProvider extends React.Component {
//   state = {
//     currentUser: ''
//   }

//   setCurrentUser = (user) => {
//     localStorage.setItem("user", JSON.stringify(user))
//     this.setState({ currentUser: user })
//   }

//   componentDidMount() {
//     // Getting dark mode value from localStorage!
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       this.setState({ currentUser: user });
//     }
//   }

//   render() {
//     const { children } = this.props
//     const { currentUser } = this.state
//     return (
//       <AuthContext.Provider
//         value={{
//           currentUser,
//           setCurrentUser: this.setCurrentUser,
//         }}
//       >
//         {children}
//       </AuthContext.Provider>
//     )
//   }
// }
// export default AuthContext
// export { AuthProvider }