import React, { useState, useEffect } from 'react';

function ExpenseForm({ expense, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        description: expense.description || '',
        date: new Date(expense.date).toISOString().split('T')[0]
      });
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{expense ? 'Edit Expense' : 'Add New Expense'}</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Expense title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
          
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
          
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
          
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          
          <div className="form-actions">
            <button type="submit">
              {expense ? 'Update' : 'Add'} Expense
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
