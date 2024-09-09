import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css"; // Đảm bảo bạn có file CSS này để style nếu cần
import { toast } from "react-toastify";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  const fetchOrderList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/order/place/list` // Đảm bảo URL đúng
      );

      if (response.data.success) {
        setOrderList(response.data.data);
      } else {
        toast.error("No orders found");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div className="order-list">
      <h2>All Orders</h2>
      {orderList.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Status</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Cart Data</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.amount}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>{order.payment ? "Paid" : "Not Paid"}</td>
                <td>
                  {order.cartData && Object.keys(order.cartData).length > 0 ? (
                    <ul>
                      {Object.entries(order.cartData).map(([id, quantity]) => (
                        <li key={id}>
                          Product ID: {id} - Quantity: {quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No items"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderList;
