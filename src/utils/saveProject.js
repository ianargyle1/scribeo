export const saveProject = async (project) => {
    if (!isLoggedIn) {
      throw 'No user logged in.'
    }
    var idToken = await firebase.auth().currentUser.getIdToken(true);
    var resp = await fetch('https://us-central1-scribeo-ai.cloudfunctions.net/saveUserProject', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: idToken,
        project: project
      })
    });
    if (resp.status == 200) {
        return;
    } else {
        throw 'Unable to save project.'
    }
  }