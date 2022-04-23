import { v4 as uuidv4 } from "uuid";
import Balance from '../models/balances.model';
import Transaction from '../models/transaction.models'



const transaction = async(senderAcc: string, receiverAcc: string, amount: number) => {
    const sender =  await Balance.findOne({account: senderAcc});
    const receiver = await Balance.findOne({account: receiverAcc});
    const newSenderBalance = sender.balance - amount;
    const newReceiverBalance = receiver.balance + amount;

    await Balance.findOneAndUpdate({account: senderAcc}, { $set: { balance: newSenderBalance }}, {new: true})
    await Balance.findOneAndUpdate({account: receiverAcc}, { $set: { balance: newReceiverBalance }}, {new: true})   
    
     const transactionReciept = await Transaction.create({
            reference: uuidv4(),
            senderAccount: senderAcc, 
            amount: amount,
            receiverAccount: receiverAcc,
            transferDesc: `transferred ${amount} to ${receiverAcc}`,
            user: sender.user
        })
          
        return transactionReciept
}


export default transaction 