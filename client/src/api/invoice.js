import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

function createInvoice(payloadInvoice) {
  return axios.post("/api/invoice", payloadInvoice);
}

function readBulkInvoice() {
  return axios.get("/api/invoices");
}

function updateInvoice(_id, payloadInvoice) {
  return axios.put(`/api/invoice/${_id}`, payloadInvoice);
}

function deleteInvoice(_id) {
  return axios.delete(`/api/invoice/${_id}`);
}

export { createInvoice, readBulkInvoice, updateInvoice, deleteInvoice };
