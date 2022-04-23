import {Schema, model} from 'mongoose';

const balanceSchema = new Schema({
    account: { 
        type: String,
        unique: true
    },
    balance:{
        type: Number,
        required: true,
        default: 0
    }, 
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
    {
        timestamps: true,
    }
);

const Balance = model('Balances', balanceSchema);

export default Balance;