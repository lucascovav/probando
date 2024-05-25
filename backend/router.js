// router.js

const Router = require('koa-router');
const transactionController = require('./controllers/transactionController');
const router = new Router();


router.post('/transactions', transactionController.createTransaction);
router.post('/transactions/result', transactionController.transactionResult);
router.get('/transactions/result', transactionController.getTransaction);

module.exports = router;