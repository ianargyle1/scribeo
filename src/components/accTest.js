import React from "react";
import { getUser, setUser } from "../utils/auth"

class Login extends React.Component {

  render() {

    function getEmail () {
        var u = getUser();
        if (u)
            if (u.user)
                return u.user.email;
        return 'No account found.'
    }

    return (
      <>
        <h1>{getEmail()}</h1>
      </>
    );
  }
}

export default Login;
