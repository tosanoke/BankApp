import {Schema, model} from 'mongoose';

const transactionSchema = new Schema({
    reference: { 
        type: String,
        unique: true
    },
    senderAccount: {
        type: String,
        required: true,
    }, 
    amount: { 
        type: Number,
        required: true
    },
    receiverAccount: {
        type: String,
        required: true,
    }, 
    transferDesc: { 
        type: String, 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true,
    }
)

const Transaction = model('Transaction', transactionSchema);

export default Transaction;