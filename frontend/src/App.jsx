import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Flights from './views/flights/index';
import ConfirmarPago from './views/confirmar_pago'; // Importa el componente ConfirmarPago
import Result from './views/resultado';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [transactionData, setTransactionData] = useState(null);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  useEffect(() => {
    if (transactionSuccess) {
      setTimeout(() => {
        // Redirigir a la página de confirmación después de 2 segundos
        setTransactionSuccess(false);
      }, 2000);
    }
  }, [transactionSuccess]);

  const handleTransaction = async () => {
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'arquisis.grupo03@gmail.com',
          amount: 237000,
          flightId: 2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Transaction successful:', data);
        setTransactionData(data); // Guarda los datos de la transacción en el estado
        setTransactionSuccess(true);
      } else {
        const errorData = await response.json();
        console.error('Transaction failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/flights" component={Flights} />
        <Route path="/resultado" component={Result} />
        <Route path="/confirmar_pago">
          {/* Renderiza el componente ConfirmarPago y pasa los datos de la transacción como props */}
          <ConfirmarPago transactionData={transactionData} />
        </Route>
        <Route path="/">
          <>
            <div className="transaction-button-container">
              <button className="transaction-button" onClick={handleTransaction}>
                Comprar Vuelo
              </button>
            </div>
            {transactionSuccess && <Redirect to="/confirmar_pago" />}
          </>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;