<template>
  <div vi-if="invoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }"> <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back </router-link>

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
        <button @click="toggleEditInvoice()" class="dark-purple">Edit</button>
        <button @click="deleteInvoice()" class="red">Delete</button>
        <button @click="updateStatusToPaid()" v-if="invoice.invoicePending" class="green">Mark as Paid</button>
        <button @click="updateStatusToPending()" v-if="invoice.invoiceDraft || invoice.invoicePaid" class="orange">Mark as Pending</button>
      </div>
    </div>

    <!-- invoice details -->
    <div class="invoice-details flex flex-column">
      <!-- invoice details - top -->
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ invoice._id }}</p>
          <p>{{ invoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ invoice.billerCountry }}</p>
          <p>{{ invoice.billerCity }} {{ invoice.billerZipCode }}</p>
          <p>{{ invoice.billerStreetAddress }}</p>
        </div>
      </div>
      <!-- invoice details - middle -->
      <div class="middle flex">
        <div class="payment flex flex-column">
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
          <p>${{ invoice.invoiceTotal }}</p>
        </div>
      </div>
      <!-- <button class="download-pdf dark-purple">download pdf</button> -->
    </div>
    <div class="brand-container flex">
      <p class="brand"><span>&lt;/&gt;</span> darklab software solution &copy; 2022</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Invoice",
  data() {
    return {
      invoice: null,
    };
  },
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE", "TOGGLE_EDIT_INVOICE", "TOGGLE_INVOICE"]),
    ...mapActions(["UPDATE_INVOICE", "DELETE_INVOICE"]),
    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params._id);
      this.invoice = this.currentInvoice[0];
    },
    getUpdatedCurrentInoice() {
      this.invoice = this.currentInvoice[0];
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },
    updateStatusToPaid() {
      this.invoice.invoiceDraft = false;
      this.invoice.invoicePending = false;
      this.invoice.invoicePaid = true;
      this.UPDATE_INVOICE({ _id: this.invoice._id, payload: this.invoice });
    },
    updateStatusToPending() {
      this.invoice.invoiceDraft = false;
      this.invoice.invoicePending = true;
      this.invoice.invoicePaid = false;
      this.UPDATE_INVOICE({ _id: this.invoice._id, payload: this.invoice });
    },
    deleteInvoice() {
      console.log(`button delete on ${this.invoice._id}`);
      this.DELETE_INVOICE({ _id: this.invoice._id });
    },
  },
  computed: {
    ...mapState(["currentInvoice"]),
  },
  created() {
    this.getCurrentInvoice();
  },
  watch: {
    "$store.state.currentInvoice": {
      handler() {
        this.getUpdatedCurrentInoice();
      },
    },
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
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 50px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    padding: 50px 50px 50px 50px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }
        p:nth-child(2) {
          text-align: justify;
          font-size: 12px;
          font-weight: 200;
          color: #888eb0;
        }
        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
        color: #888eb0;
        text-align: right;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 30px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }
        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: 15px;
        }
        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }

    .download-pdf {
      margin: auto;
      margin-top: 30px;
      width: 200px;
    }
  }

  .brand-container {
    .brand {
      margin-top: 20px;
      color: #888eb0;
      font-size: 12px;
      span {
        color: #fff;
        padding: 5px;
        background-color: #111420;
        border-radius: 5px;
        font-size: 16px;
      }
    }
  }
}
</style>
