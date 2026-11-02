const express = require('express');
const router = express.Router();
const { orders } = require('../data/store');

function getPriorityLevel(order) {
    if (order.express === true) {
        return 1;
    } else if (order.total >= 5000) {
        return 2;
    } else {
        return 3;
    }
}

router.get('/queue', (req, res) => {
    try {
        const sortedQueue = [...orders].sort((a, b) => {
            const pA = getPriorityLevel(a);
            const pB = getPriorityLevel(b);

            if (pA !== pB) {
                return pA - pB;
            }

            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        res.status(200).json({
            success: true,
            count: sortedQueue.length,
            data: sortedQueue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delivery queue fetch failed",
            error: error.message
        });
    }
});

module.exports = router;