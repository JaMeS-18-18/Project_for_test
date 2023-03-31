class Product {
  GetProducts(token) {
   let response = fetch(`https://toko.ox-sys.com/variations`, {
     method: 'GET',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
   })
     .then(ress => {
       return ress.json();
     })
     .then(json => {
       return json;
     })
     .catch(err => {
       return err;
     });

   return response;
 }
}

export default new Product();