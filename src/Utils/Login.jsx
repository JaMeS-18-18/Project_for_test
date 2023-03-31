class Login {
   PostUsersLogin(data) {
    let response = fetch(`https://toko.ox-sys.com/security/auth_check`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': 'application/json'
       },
      body: new URLSearchParams(data),
    })
      .then(ress => {
        return ress.json();
      })
      .then(json => {
        localStorage.setItem("Token", JSON.stringify(json.token))
        return json;
      })
      .catch(err => {
        return err;
      });

    return response;
  }
}

export default new Login();