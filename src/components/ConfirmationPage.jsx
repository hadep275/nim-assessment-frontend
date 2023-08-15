import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ConfirmationPage.module.css";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = async () => { 
    try {
      const response = await fetch(`/api/orders/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder(); 
  }, []);

  return (
    <div className={styles.confirmationPage}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {console.log("order:", order)}
      {order && <OrderConfirmation order={order} />}
    </div>
  );
}

export default ConfirmationPage;
