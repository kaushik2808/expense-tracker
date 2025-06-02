import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState('');
  
  const { user, logout, globalLoading } = useAuth();

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [filter]);

  const fetchExpenses = async () => {
    try {
      const params = filter ? { category: filter } : {};
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expenses`, { params });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expenses/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleExpenseSubmit = async (expenseData) => {
    try {
      if (editingExpense) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/expenses/${editingExpense._id}`, expenseData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/expenses`, expenseData);
      }
      
      setShowForm(false);
      setEditingExpense(null);
      fetchExpenses();
      fetchStats();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/expenses/${id}`);
        fetchExpenses();
        fetchStats();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="dashboard">
      {globalLoading && <div className="loading"><div className="spinner"></div></div>}
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p>{expenses.length} expenses</p>
        </div>
      </div>

      <div className="dashboard-controls">
        <button 
          onClick={() => setShowForm(true)}
          className="add-expense-btn"
        >
          Add Expense
        </button>
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {stats.length > 0 && <ExpenseChart data={stats} />}

      <ExpenseList 
        expenses={expenses} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onSubmit={handleExpenseSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
