import { Response, Request } from "express";
import { customAlphabet } from 'nanoid/async'
import transaction  from '../utils/utils'
import Balance from '../models/balances.model';
import Transaction from "../models/transaction.models";




// generate unique number
const nanoid = customAlphabet('12345678900', 10)

const createAccount = async (req: Request, res: Response) => {
try {
      const body = req.body;
      const newAccount = new Balance({
        account: await nanoid(),
        balance: body.balance,
        user: req.user.id,
        createdAt: new Date().toISOString()
    })
      await newAccount.save();
      res.status(201).json(newAccount)
} catch(err) {
    res.status(400).json({"error": "unable to create account"})
}   
   

}

const getUserBalance = async(req: Request, res: Response) => {
   
   try {
    // const userBalance = await Balance.findOne({account: req.params.accountNumber})
    const userBalance = await Balance.findOne({user: req.user.id})
    if(userBalance.account !== req.params.accountNumber){
        return res.status(400).json({msg: 'Please enter a valid account number'})
    }else{
        return res.status(200).json(userBalance)
    }
   }catch(err) {
    res.status(404).json({ message: "cannot find resource"})
   }

}

const getAllBalance = async(req: Request, res: Response) => {
    try{ 
        const { page = 1 } = req.query;

        let pages = Number(page);
        let limits = 3;
    
        const startIndex = (pages - 1) * limits 
        const endIndex = pages * limits
    
        const results: any = {}
        if (startIndex > 0) results.previous = pages - 1
        if (endIndex < await Balance.countDocuments().exec()) results.next =  pages + 1 
           results.data = await Balance.find({user: req.user.id}).limit(limits).skip(startIndex).exec()
           res.status(200).json(results)
           
        
    } catch(err){
        res.status(400).json({'error': 'error getting all Transactions'})
    }
    
}

const transfer = async(req: Request, res: Response) => {
    // recieves the transfer request from the body and generates a transaction transaction
    // reciept and updates to the transaction database
    const {from, to, amount} = req.body;
   
    try {
        const sender = await Balance.findOne({account: from});
        if(req.user.id != sender.user){
           return res.status(404).json({msg: 'Please enter your account number'})
        }
        if(sender.balance > amount){
        const reciept = await transaction(from, to, amount);
        res.status(201).json(reciept);
        } else if(sender.balance < amount) {
        res.status(401).json({msg: 'insufficient funds'})
        }
   } catch(error) {
      return res.status(404).json({msg: 'Account number not found'})
   }
}

const getTransactions = async (req: Request, res: Response) => {
    try{ 
        const { page = 1 } = req.query;

        let pages = Number(page);
        let limits = 5;
    
        const startIndex = (pages - 1) * limits 
        const endIndex = pages * limits
    
        const results: any = {}
        if (startIndex > 0) results.previous = pages - 1
        if (endIndex < await Transaction.countDocuments().exec()) results.next =  pages + 1 
           results.data = await Transaction.find({user: req.user.id}).limit(limits).skip(startIndex).exec()
           res.status(200).json(results)
        
    } catch(err){
        res.status(400).json({'error': 'error getting all balance'})
    }
}


export {
    createAccount,
    getAllBalance,
    getUserBalance,
    transfer,
    getTransactions
}