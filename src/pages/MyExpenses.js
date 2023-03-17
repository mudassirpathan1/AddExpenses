import axios from "axios";
import React, { useContext, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseContext from "../store/expense-context";
import classes from "./MyExpenses.module.css";

const MyExpenses = () => {
  
  const expenseCtx = useContext(ExpenseContext);

 useEffect(()=>{
     axios
      .get(
        "https://expense-tracker-64234-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((response) => {
        console.log(response.data);
        if(response.status===200){
            expenseCtx.expenselist(response.data);
        }
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const expenseList = expenseCtx.expenses.map((expense) => {
    return (
      <li className={classes.expenseitem} key={expense.id}>
        <div>${expense.amount}</div>
        <div>{expense.description}</div>
        <div>{expense.category}</div>
      </li>
    );
  });

  return (
    <div className={classes.expensebox}>
      <h1>Expenses</h1>
      <ExpenseForm />
      <div className={classes.expenseheading}>
        <h2>Amount</h2>
        <h2 className={classes.description}>Description</h2>
        <h2>Category</h2>
      </div>
      <ul className={classes.expenselist}>{expenseList}</ul>
    </div>
  );
};

export default MyExpenses;
