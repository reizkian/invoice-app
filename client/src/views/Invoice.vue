<template>
  <div vi-if="invoice" class="invoice-view container">
    <router-link class="nav-link flex" to="{name:'Home'}"> <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back </router-link>

    <!-- header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div class="status-button flex" :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
          <span v-if="invoice.invoicePaid">Paid</span>
          <span v-if="invoice.invoiceDraft">Draft</span>
          <span v-if="invoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditInvoice(invoice._id)" class="dark-purple">Edit</button>
        <button @click="deleteInvoice(invoice._id)" class="red">Delete</button>
        <button @click="updateStatusToPaid(invoice._id)" v-if="invoice.invoicePending" class="green">Mark as Paid</button>
        <button @click="updateStatusToPending(invoice._id)" v-if="invoice.invoiceDraft || invoice.invoicePaid" class="orange">Mark as Pending</button>
      </div>
    </div>

    <!-- invoice details -->
    <div class="invoice-details flex flex-column">
      <!-- invoice details - top -->
      <div class="top flex">
        <div class="left flex">
          <p><span>#</span>{{ invoice._id }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ invoice.billerStreetAddress }}</p>
          <p>{{ invoice.billerCity }}</p>
          <p>{{ invoice.billerZipCode }}</p>
          <p>{{ invoice.billerCountry }}</p>
        </div>
      </div>
      <!-- invoice details - middle -->
      <div class="middle flex">
        <div class="payment flex flex.column">
          <h4>Invoice Date</h4>
          <p>{{ invoice.invoiceDate }}</p>
          <h4>Payment Date</h4>
          <p>{{ invoice.paymentDueDate }}</p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ invoice.clientName }}</p>
          <p>{{ invoice.clientStreetAddress }}</p>
          <p>{{ invoice.clientCity }}</p>
          <p>{{ invoice.clientZipCode }}</p>
          <p>{{ invoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Send To</h4>
          <p>{{ invoice.clientEmail }}</p>
        </div>
      </div>
      <!-- invoice details - bottom -->
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>Qty</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div class="item flex" v-for="(item, index) in invoice.invoiceItemList" :key="index">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ invoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Invoice",
  data() {
    return {
      invoice: null,
    };
  },
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE"]),
    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params._id);
      this.invoice = this.currentInvoice[0];
    },
  },
  computed: {
    ...mapState(["currentInvoice"]),
  },
  created() {
    this.getCurrentInvoice();
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      widht: 7px;
      height: 10px;
    }
  }
}
</style>
