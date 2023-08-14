import React, { useState } from "react";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^[\d-()]+$/;
    return phoneRegex.test(number);
  };

  const validateForm = () => {
    const errors = {};

    if (name.trim() === "") {
      errors.name = "Please enter your name.";
    }

    if (phone.trim() === "") {
      errors.phone = "Please enter your phone number.";
    } else if (!isValidPhoneNumber(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (address.trim() === "") {
      errors.address = "Please enter your address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      return;
    }

    const formattedPhone = phone.replace(/[^\d]/g, ""); // Remove non-digits
    const formattedPhoneWithFormatting = `(${formattedPhone.slice(
      0,
      3
    )}) ${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6, 10)}`;

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone: formattedPhoneWithFormatting,
        address,
        items: order,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
              <span className={styles.error}>{formErrors.name}</span>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="text"
                id="phone"
              />
              <span className={styles.error}>{formErrors.phone}</span>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
              />
              <span className={styles.error}>{formErrors.address}</span>
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
