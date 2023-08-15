import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  if (!order) {
    return <p>Loading...</p>;
   }
  const { name, address, id, items } = order;

  function calculateTotalPrice() {
    if (!items) {
      return 0; 
    }

    return items.reduce((total, item) => total + item.item.price * item.quantity, 0);
  }

  const totalPrice = calculateTotalPrice().toFixed(2);

  return (
    <div className={styles.container}>
      <h2>Order Confirmation</h2>
      <p className={styles.orderId}>Order ID: {id}</p>
      <div className={styles.customerDetails}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
      </div>
      <div className={styles.itemsContainer}>
        <strong>Items Ordered:</strong>
        <ul className={styles.itemsList}>
          {items.map((item) => (
            <li key={item.item.id} className={styles.item}>
              <p>
                <strong>Name:</strong> {item.item.name}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Price:</strong> ${item.item.price}
              </p>
              <hr className={styles.hr} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.total}>
        <p className={styles.subTotal}>Sub Total: ${totalPrice}</p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
