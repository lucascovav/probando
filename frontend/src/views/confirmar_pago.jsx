import React from 'react';

function ConfirmarPago({ transactionData }) {
  return (
    <div>
      <h1>Confirmación de Pago</h1>
      {transactionData && (
        <div>
          <p>Token: {transactionData.token}</p>
          <p>Url: {transactionData.url}</p>
          {/* Agrega el formulario aquí */}
          <form action={transactionData.url} method="POST">
            <input type="hidden" name="token_ws" value={transactionData.token} />
            <input type="submit" value="Pagar" />
          </form>
        </div>
      )}
    </div>
  );
}

export default ConfirmarPago;
