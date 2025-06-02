import React from 'react';

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return (
      <div className="empty-state">
        <h3>No Expenses Found</h3>
        <p>Add an expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-item">
          <div className="expense-details">
            <h4>{expense.title}</h4>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
            <span className={`category-badge category-${expense.category.toLowerCase()}`}>
              {expense.category}
            </span>
            {expense.description && <p>{expense.description}</p>}
          </div>
          <div className="expense-amount">
            ${expense.amount.toFixed(2)}
          </div>
          <div className="expense-actions">
            <button className="edit-btn" onClick={() => onEdit(expense)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(expense._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;