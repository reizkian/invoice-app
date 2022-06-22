const invoice = require("../models/invoice");

exports.createInvoice = (req, res) => {
  const payloadInvoice = req.body;
  const newInvoice = new invoice(payloadInvoice);
  newInvoice.save((error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: `internal server error` });
    } else {
      console.log(`success create invoice ${result._id}`);
      return res.status(200).json({ message: `success create invoice ${result._id}` });
    }
  });
};

exports.readBulkInvoices = (req, res) => {
  invoice.find((error, invoices) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: `internal server error` });
    } else {
      console.log(invoices);
      return res.status(200).json(invoices);
    }
  });
};