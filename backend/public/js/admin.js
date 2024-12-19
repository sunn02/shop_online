const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token'); 

console.log('Token obtenido WIIIII:', token);

fetch('/admin/products', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token, // Token enviado en los encabezados
  },
})
.then(response => {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Token inválido o expirado');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
})
.then(data => {
  console.log('Productos:', data);
})
.catch(error => {
  console.error('Error:', error);
  alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
  window.location.href = '/login';
});


  // Asegúrate de hacer lo mismo para las órdenes
  fetch('/admin/orders', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Token inválido o expirado');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      console.log('Órdenes:', data);
      const ordersList = document.getElementById('orders-list');
      ordersList.innerHTML = data.map(order => `
        <li>Pedido #${order.order_number} - Cliente: ${order.customer_name}</li>
      `).join('');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      window.location.href = '/login';
    });

} else {
  console.log('No estás autenticado');
  alert('No estás autenticado. Por favor, inicia sesión.');
  window.location.href = '/login';
}

