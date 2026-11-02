
// Data base ekak nathi hinda mama me tika dnwa

const products = [
  { id: '001', name: 'rice', price: 100 },
  { id: '002', name: 'milk', price: 200 },
  { id: '003', name: 'fish', price: 300 },
  { id: '004', name: 'water bottle', price: 400 },
];


//orders walata empty array ekak dnnwa
const orders = [];

// me status tika thiyenwa orders walata
const statuses = ['PENDING', 'CONFIRMED', 'OUT_OF_STOCK'];

let lastOrderNumber = 1000;

// me thiynne order id ek prooduct id ekka ptlgnna epa
function newOrderId() {
  lastOrderNumber = lastOrderNumber + 1;
  return 'ORD-' + lastOrderNumber;
}

module.exports = { products, orders, statuses, newOrderId };
