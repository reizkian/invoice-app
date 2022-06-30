const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const { createInvoice, readBulkInvoices, updateInvoice, deleteInvoice } = require("./controller/invoice");

// api
app.post("/api/invoice", createInvoice);
app.get("/api/invoices", readBulkInvoices);
app.put("/api/invoice/:_id", updateInvoice);
app.delete("/api/invoice/:_id", deleteInvoice);

// database connection
mongoose
  .connect("mongodb://localhost:27017/INVOICE_DATABASE")
  .then(() => {
    console.log("connected to mongodb://localhost:27017/INVOICE_DATABASE");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(8081, function () {
  console.log("Server listening on PORT 8081");
});
