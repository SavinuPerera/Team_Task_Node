const { orders, statuses, newOrderId } = require('../data/store');
const productService = require('./productService');

// Customer saha items validate karala order eka save karanawa
function createOrder(orderData) {
  const customer = orderData.customer;
  const items = orderData.items;
  const express = orderData.express || false;

  // Customer details check karanawa
  if (!customer || !customer.name || !customer.phone || !customer.address) {
    return {
      success: false,
      status: 400,
      message: 'Customer name, phone, and address are required',
    };
  }

  // Items array check karanawa
  if (!items || !Array.isArray(items) || items.length === 0) {
    return {
      success: false,
      status: 400,
      message: 'Items array cannot be empty',
    };
  }

  // Item quantity check karanawa
  for (let i = 0; i < items.length; i++) {
    if (!items[i].productId || !items[i].quantity || items[i].quantity <= 0) {
      return {
        success: false,
        status: 400,
        message: 'Invalid item quantity',
      };
    }
  }

  const stockCheck = productService.checkStock(items);
  if (!stockCheck.ok) {
    return {
      success: false,
      status: stockCheck.status,
      message: stockCheck.message,
    };
  }


  productService.reduceStock(items);

  // Aluth order eka hadanawa 
  const newOrder = {
    orderId: newOrderId(),
    customer: customer,
    items: items,
    express: express,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  return {
    success: true,
    data: newOrder,
  };
}

// All orders return karanawa
function getAllOrders() {
  return orders;
}

// ID eken order eka hoyanawa
function getOrderById(id) {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId === id) {
      return orders[i];
    }
  }
  return null;
}

// Order status eka update karanawa
function updateOrderStatus(id, newStatus) {
  const order = getOrderById(id);

  if (!order) {
    return {
      success: false,
      status: 404,
      message: 'Order ' + id + ' not found',
    };
  }

  if (!newStatus || !statuses.includes(newStatus)) {
    return {
      success: false,
      status: 400,
      message: 'Invalid status. Allowed statuses: ' + statuses.join(', '),
    };
  }

  order.status = newStatus;

  return {
    success: true,
    data: order,
  };
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
