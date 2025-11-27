import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  //Auth functions
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "UNKNOWN_ERROR",
      };
    }finally{
      setLoading(false);
    }
  };

  const signupUser = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "register", {
        name,
        email,
        password,
      });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response.data.message };
    }finally{
      setLoading(false);  
    }
  };

  const logoutUser = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
  };

  //calculate incomes
  const addIncome = async (income) => {
    setLoading(true);
    income.amount = Number(income.amount);
    const response = await axios
      .post(`${BASE_URL}add-income`, income, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
    setLoading(false);
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`, config);
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`, config);
    getIncomes();
  };

  const totalIncome = () => {
    return incomes.reduce((acc, item) => acc + item.amount, 0);
  };

  //calculate incomes
  const addExpense = async (expense) => {
    setLoading(true);
    expense.amount = Number(expense.amount);
    await axios.post(`${BASE_URL}add-expense`, expense, config);
    getExpenses();
    setLoading(false);  
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`, config);
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`, config);
    getExpenses();
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, item) => acc + item.amount, 0);
  };

  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

 const allTransactions = () => {
  const history = [...incomes, ...expenses];

  history.sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt);
    const dateB = new Date(b.date || b.createdAt);
    return dateB - dateA;
  });

  return history;
};


  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        user,
        loginUser,
        signupUser,
        logoutUser,
        allTransactions,
        setLoading,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
