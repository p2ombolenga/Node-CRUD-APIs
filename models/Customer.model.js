const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Name"]
        },

        age: {
            type: Number,
            required: true,
             default: 0
        },

        salary: {
            type: Number,
            required: true,
            default: 0
        },

        address: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
    );

    const Customer = mongoose.model("Customer", CustomerSchema);
    module.exports = Customer;