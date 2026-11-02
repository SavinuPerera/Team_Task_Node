const { products } = require('../data/store');
const inventory = require('../data/inventory');

const LOW_STOCK_LIMIT = 5; // stock eka 5 ta adunam low stock messege ekak pennanva

// Server start wenakota products walata category saha stock ekathu karanawa
for (let i = 0; i < products.length; i++) {
  const id = products[i].id;

  if (inventory[id]) {
    products[i].category = inventory[id].category;
    products[i].stock = inventory[id].stock;
  } else {
    products[i].category = 'other';
    products[i].stock = 0;
  }
}

// Okkoma products category dunnama e category ekata witharak
function getAllProducts(category) {
  if (!category) {
    return products;
  }

  const result = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].category.toLowerCase() === category.toLowerCase()) {
      result.push(products[i]);
    }
  }
  return result;
}

// id use karala product eka hoyanava product eka nathnm null value ekak denava 
function getProductById(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

// adu stock thiyena procts pennanava
function getLowStockProducts() {
  const result = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].stock <= LOW_STOCK_LIMIT) {
      result.push(products[i]);
    }
  }
  return result;
}

// meken stock check karanava 
function checkStock(items) {
  for (let i = 0; i < items.length; i++) {
    const product = getProductById(items[i].productId);

    // Product eka naththam 404
    if (product === null) {
      return {
        ok: false,
        status: 404,
        message: 'Product ' + items[i].productId + ' not found',
      };
    }

    // Eka product eka items walin kihipa parak dunnoth quantity okkoma ekathu karanawa
    let totalRequested = 0;
    for (let j = 0; j < items.length; j++) {
      if (items[j].productId === items[i].productId) {
        totalRequested = totalRequested + items[j].quantity;
      }
    }

    // Stock madi nam 400
    if (product.stock < totalRequested) {
      return {
        ok: false,
        status: 400,
        message:
          'Insufficient stock for ' + product.name +
          '. Available: ' + product.stock +
          ', requested: ' + totalRequested,
      };
    }
  }

  // Okkoma items walata stock thiyenawa kiiyala kiyanna
  return { ok: true };
}

// checkStock() pass unata passe witharak call karanna
function reduceStock(items) {
  for (let i = 0; i < items.length; i++) {
    const product = getProductById(items[i].productId);
    product.stock = product.stock - items[i].quantity;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getLowStockProducts,
  checkStock,
  reduceStock,
};