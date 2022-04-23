import express from 'express';
const router = express.Router();
import {getAllBalance, getUserBalance, createAccount, transfer, getTransactions} from '../controllers/controller';
import {validate, balanceSchema, transferSchema} from '../validation/schema';
import protect from '../middleware/authMiddleware'



router.get('/balance',protect, getAllBalance);
router.get('/balance/:accountNumber', protect, getUserBalance);
router.post('/create-account',validate(balanceSchema),protect, createAccount);
router.post('/transfer',validate(transferSchema), protect, transfer);
router.get('/transactions', protect, getTransactions);

export default router;