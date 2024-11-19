const express = require('express');
const router = express.Router();
const modelsToSync = [
    { name: 'Food', model: require('../models/food') },
    { name: 'Category', model: require('../models/category') },
    { name: 'Customer', model: require('../models/costemer') },
    { name: 'CounterSchema', model: require('../models/CounterSchema') },
    { name: 'Delevery', model: require('../models/delevery') },
    { name: 'Devices', model: require('../models/devices') },
    { name: 'Discount', model: require('../models/discount') },
    { name: 'Invoice', model: require('../models/invoice') },
    { name: 'PageSetting', model: require('../models/pagesetting') },
    { name: 'PaymentType', model: require('../models/paymentType') },
    { name: 'PurchasesInvoice', model: require('../models/purchasesInvoice') },
    { name: 'Storge', model: require('../models/storge') },
    { name: 'Supplier', model: require('../models/Supplier') },
    { name: 'SystemSetting', model: require('../models/systemSetting') },
    { name: 'table', model: require('../models/table') },
    { name: 'user', model: require('../models/user') }
];

router.post('/sync', async (req, res) => {
    const { model: modelName, data ,systemId} = req.body;
    try {
        if (!data || !data._id) {
            console.log('Invalid data or missing _id');
            return res.status(400).json({ error: 'Invalid data or missing _id' });
        }

        if (!modelName) {
            console.log('Model name not provided');
            return res.status(400).json({ error: 'Model name not provided' });
        }

        // Find the model from the array
        const modelEntry = modelsToSync.find(entry => entry.name === modelName);
        if (!modelEntry) {
            console.log(`Model ${modelName} not found`);
            return res.status(400).json({ error: `Model ${modelName} not found` });
        }
        
        const Model = modelEntry.model;
        console.log(systemId)
        data.systemId = systemId
        // Find existing document by _id
        const existingDoc = await Model.findById(data._id);

        if (existingDoc) {
            // Update existing document
            await Model.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            // Create new document
            const newDoc = new Model(data);
            await newDoc.save();
        }

        res.status(200).json({ message: 'Sync successful' });
    } catch (error) {
        console.error(`Error syncing ${modelName} document:`, error.message);
        res.status(500).json({ error: 'Sync failed', details: error.message });
    }
});

module.exports = router;
