const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all expenses for user
router.get(
  '/',
  auth,
  [
    query('category').optional().isIn(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other']),
    query('startDate').optional().isISO8601().toDate(),
    query('endDate').optional().isISO8601().toDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { category, startDate, endDate } = req.query;
      let filter = { user: req.user._id };

      if (category) filter.category = category;
      if (startDate && endDate) {
        filter.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }

      const expenses = await Expense.find(filter).sort({ date: -1 });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create expense
router.post(
  '/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('category').isIn(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other']),
    body('date').isISO8601().toDate().withMessage('Invalid date format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const expense = new Expense({
        ...req.body,
        user: req.user._id
      });
      
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Update expense
router.put(
  '/:id',
  auth,
  [
    body('title').optional().trim().notEmpty().withMessage('Title is required'),
    body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('category').optional().isIn(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other']),
    body('date').optional().isISO8601().toDate().withMessage('Invalid date format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const expense = await Expense.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
      );
      
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      
      res.json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get expense statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
