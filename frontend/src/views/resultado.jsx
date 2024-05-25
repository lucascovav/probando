import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './resultado.css'; // Asegúrate de importar el archivo CSS

function Result() {
  const [transactionData, setTransactionData] = useState({
    _id: "123123123",
    email: "lucascova@uc.cl",
    token: "120938910238901203091372093",
    amount: 237000,
    status: "AUTHORIZED",
    flightId: "3",
    __v: 0 
  });

  const componentRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTransactionData({
        _id: "123123123",
        email: "lucascova@uc.cl",
        token: "120938910238901203091372093",
        amount: 237000,
        status: "AUTHORIZED",
        flightId: "3",
        __v: 0 
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log('Datos simulados del backend:', transactionData);

  return (
    <div>
      <h1>Resultado del Pago</h1>
      <div ref={componentRef} className="transaction-container">
      <div className="transaction-detail">
          <p><strong>Grupo 3</strong></p>
        </div>
        <div className="transaction-detail">
          <p><strong>ID de transacción:</strong> {transactionData._id}</p>
        </div>
        <div className="transaction-detail">
          <p><strong>Email:</strong> {transactionData.email}</p>
        </div>
        <div className="transaction-detail">
          <p><strong>Token:</strong> {transactionData.token}</p>
        </div>
        <div className="transaction-detail">
          <p><strong>Monto:</strong> {transactionData.amount}</p>
        </div>
        <div className="transaction-detail">
          <p><strong>Estado:</strong> {transactionData.status}</p>
        </div>
        <div className="transaction-detail">
          <p><strong>ID del vuelo:</strong> {transactionData.flightId}</p>
        </div>
      </div>
      <button onClick={handlePrint}>Descargar como PDF</button>
    </div>
  );
}

export default Result;
