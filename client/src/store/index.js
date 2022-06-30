import { createStore } from "vuex";
import { createInvoice, readBulkInvoice, updateInvoice } from "@/api/invoice";

export default createStore({
  state: {
    invoiceData: [],
    invoicesLoaded: false,
    currentInvoice: [],
    editInvoice: false,
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
      state.invoiceData = payload;
    },
    TOGGLE_INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoice = state.invoiceData.filter((invoice) => {
        return invoice._id === payload;
      });
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },
    UPDATE_INVOICE(state, payload) {
      state.currentInvoice = [payload];
    },
  },
  actions: {
    async CREATE_INVOICE({ dispatch }, payloadInvoice) {
      await createInvoice(payloadInvoice);
      dispatch("READ_INVOICES");
    },
    async READ_INVOICES({ commit }) {
      const response = await readBulkInvoice();
      commit("SET_INVOICE_DATA", response.data);
      commit("TOGGLE_INVOICES_LOADED");
    },
    async UPDATE_INVOICE({ commit }, { _id, payload }) {
      const response = await updateInvoice(_id, payload);
      commit("UPDATE_INVOICE", response.data.payload);
    },
  },
  modules: {},
});
