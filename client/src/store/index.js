import { createStore } from "vuex";
import { readBulkInvoice } from "@/api/invoice";

export default createStore({
  state: {
    invoiceData: [],
    invoicesLoaded: false,
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
