const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    billerStreetAddress: String,
    billerCity: String,
    billerZipCode: Number,
    billerCountry: String,
    clientName: String,
    clientEmail: String,
    clientStreetAddress: String,
    clientCity: String,
    clientZipCode: Number,
    clientCountry: String,
    invoiceDate: String,
    invoiceDateUnix: Number,
    paymentTerms: String,
    paymentDueDate: String,
    paymentDueDateUnix: Number,
    productDescription: String,
    invoiceItemList: [
      {
        itemName: String,
        qty: Number,
        total: Number,
      },
    ],
    invoiceTotal: Number,
    invoicePending: Schema.Types.Boolean,
    invoiceDraft: Schema.Types.Boolean,
    invoicePaid: Schema.Types.Boolean,
  }
);

module.exports = mongoose.model("invoice", invoiceSchema);
