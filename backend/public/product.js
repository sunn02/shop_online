const token = localStorage.getItem('token');

if (token) {
  fetch('/products', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token 
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Productos:', data);
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = data.map(product => `
      <li>${product.product_name} - ${product.product_price}</li>
    `).join('');
  })
  .catch(error => {
    console.error('Error:', error);
    window.location.href = '/login'; 
  });
} else {
  console.log('No estás autenticado');
  window.location.href = '/login';  
}

