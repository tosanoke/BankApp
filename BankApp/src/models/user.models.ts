import {Schema, model} from 'mongoose';


const UsersSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }

})

const Users = model('Users', UsersSchema);

export default Users;