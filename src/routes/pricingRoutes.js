// QUICKCART - PRICING ALGORITHM - MEMBER 4

const express = require("express");
const router = express.Router();

// store.js eken products gannawa
const { products } = require("../data/store");

// Subtotal eka calculate karanawa
function calculateSubtotal(items) {
    let subtotal = 0;

    for (let i = 0; i < items.length; i++) {
        let product = products.find(function(p) {
            return p.id === items[i].productId;
        });

        if (!product) {
            return -1;
        }

        subtotal += product.price * items[i].quantity;
    }

    return subtotal;
}

// Total Quantity eka calculate karanawa
function calculateTotalQuantity(items) {
    let totalQuantity = 0;

    for (let i = 0; i < items.length; i++) {
        totalQuantity += items[i].quantity;
    }

    return totalQuantity;
}

// Discount eka calculate karanawa
function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 10 / 100;
    }

    return 0;
}

// Delivery Fee eka calculate karanawa
function calculateDeliveryFee(subtotal) {
    if (subtotal < 2000) {
        return 250;
    }

    return 150;
}

// Final Total eka calculate karanawa
function calculateFinalTotal(subtotal, discount, deliveryFee) {
    return subtotal - discount + deliveryFee;
}

// Main Pricing Function
function calculatePricing(items) {

    // Empty items check karanawa
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    // Quantity validation
    for (let i = 0; i < items.length; i++) {
        if (!items[i] || !Number.isInteger(items[i].quantity) || items[i].quantity <= 0) {
            return null;
        }
    }

    let subtotal = calculateSubtotal(items);

    // Invalid product ID check karanawa
    if (subtotal === -1) {
        return null;
    }

    let totalQuantity = calculateTotalQuantity(items);
    let discount = calculateDiscount(subtotal);
    let deliveryFee = calculateDeliveryFee(subtotal);
    let finalTotal = calculateFinalTotal(subtotal, discount, deliveryFee);

    return {
        subtotal: subtotal,
        totalQuantity: totalQuantity,
        discount: discount,
        deliveryFee: deliveryFee,
        finalTotal: finalTotal
    };
}

// Pricing API Endpoint
router.post("/", (req, res) => {

    let items = req.body ? req.body.items : null;
    let result = calculatePricing(items);

    if (result === null) {
        return res.status(400).json({
            message: "Invalid items or product details"
        });
    }

    res.status(200).json({
        message: "Pricing calculated successfully",
        pricing: result
    });
});

module.exports = router;