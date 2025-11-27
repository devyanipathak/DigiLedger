import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function TransactionsView() {
  const { allTransactions } = useGlobalContext();
  const transactions = allTransactions();

  // Format date properly
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <TransStyled>
      <h2>All Transactions</h2>

      <div className="list">
        {transactions.length === 0 && (
          <p className="empty">No transactions yet.</p>
        )}

        {transactions.map((item) => (
          <div key={item._id} className="card">
            <div className="header">
              <h3>{item.title}</h3>
              <span className={item.type === "expense" ? "red" : "green"}>
                {item.type === "expense" ? "-" : "+"}{item.amount}
              </span>
            </div>

            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Date:</strong> {formatDate(item.date || item.createdAt)}</p>
          </div>
        ))}
      </div>
    </TransStyled>
  );
}

const TransStyled = styled.div`
  padding: 2rem;

  h2 {
    text-align: center;
    color: #222260;
    margin-bottom: 2rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .empty {
    text-align: center;
    color: gray;
    padding: 2rem;
  }

  .card {
    background: #fcf6f9;
    border: 2px solid #fff;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
    padding: 1.5rem;
    border-radius: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.7rem;
  }

  .red {
    color: red;
    font-weight: bold;
  }

  .green {
    color: var(--color-green);
    font-weight: bold;
  }
`;

export default TransactionsView;
