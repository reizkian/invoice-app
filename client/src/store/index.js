import { createStore } from "vuex";
import { readBulkInvoice } from "@/api/invoice";

export default createStore({
  state: {
    invoiceData: [],
    invoicesLoaded: false,
    currentInvoice: [],
    invoiceModal: false,
    modalActive: false,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(...payload);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoice = state.invoiceData.filter((invoice) => {
        return invoice._id === payload;
      });
      console.log(state.currentInvoice);
    },
  },
  actions: {
    async READ_INVOICES({ commit }) {
      const response = await readBulkInvoice();
      commit("SET_INVOICE_DATA", response.data);
      commit("INVOICES_LOADED");
    },
  },
  modules: {},
});
