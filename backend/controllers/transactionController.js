const { TicketModel } = require('../models/ticket')
const { Flight } = require('../models/flight')
const { UserModel } = require('../models/user')
const { TransactionModel } = require('../models/transaction')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')
const nodemailer = require('nodemailer');

const WebpayPlus = require("transbank-sdk").WebpayPlus; // CommonJS
const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk"); // CommonJS



async function createTransaction(ctx) {
    try {
        const { email, amount, flightId } = ctx.request.body;
        //ESTAN HARDCODEADOS PARA PROBAR
        const ApiKeySecret = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
        const commerceWebPayPlus = "597055555532";
        const tx = new WebpayPlus.Transaction(new Options(commerceWebPayPlus, ApiKeySecret, Environment.Integration));
        const buyOrder = Math.floor(Math.random() * 100000000000000000000).toString().padStart(20, '0');
        const buyOrderString = buyOrder.toString();
        const sessionId = "237320";
        const returnUrl = 'http://localhost:5173/resultado';

        const response = await tx.create(buyOrderString, sessionId, amount, returnUrl);

        const transaction = new TransactionModel({
            email: email, 
            token: response.token, 
            amount: amount,
            status: "transaction created", 
            flightId: flightId
        });

        await transaction.save();
        ctx.status = 201;
        ctx.body = response;

    } catch (error) {
        console.error('Error al crear transacción:', error);
        ctx.status = 500;
        ctx.body = { error: 'Error al crear transacción' };
    }
}

async function transactionResult(ctx) {
    try {
        const { token_ws } = ctx.request.body;
        const transaction = await TransactionModel.findOne({ token: token_ws });
        const ApiKeySecret = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
        const commerceWebPayPlus = "597055555532";
        const tx = new WebpayPlus.Transaction(new Options(commerceWebPayPlus, ApiKeySecret, Environment.Integration));
        const response = await tx.commit(token_ws);
        transaction.status = response.status;

        await transaction.save();



        ctx.status = 200;
        ctx.body = transaction;
    }
    catch (error) {
        console.error('Error al obtener resultado de transacción:', error);
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener resultado de transacción' };
    }
}


async function getTransaction(ctx) {
    try {
        const { token } = ctx.params;
        const transaction = await TransactionModel.findOne({ token: token });
        ctx.status = 200;
        ctx.body = transaction;
    }
    catch (error) {
        console.error('Error al obtener transacción:', error);
        ctx.status
    }
}


module.exports = {
    createTransaction,
    transactionResult,
    getTransaction
}
