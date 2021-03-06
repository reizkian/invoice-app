<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="loading" />
      <h1 v-if="!editInvoice">New Invoice</h1>
      <h1 v-if="editInvoice">Edit Invoice</h1>

      <!-- bill from -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddres">Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      <!-- bill to -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>

      <!-- invoice work details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due </label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Next 30 days</option>
            <option value="60">Next 60 days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="productDescription" />
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName" /></td>
              <td class="qty"><input type="text" v-model.number="item.qty" /></td>
              <td class="price"><input type="text" v-model.number="item.price" /></td>
              <td class="total flex">$ {{ (item.total = item.qty * item.price) }}</td>
              <img @click="deleteInvoiceItem(item.id)" src="@/assets/icon-delete.svg" alt="" />
            </tr>
          </table>
          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- save / exit -->
      <div class="save flex">
        <div class="left">
          <button @click="closeInvoice" type="button" class="red">cancel</button>
        </div>
        <div class="right">
          <button v-if="!editInvoice" @click="saveDraft" type="submit" class="dark-purple">Save Draft</button>
          <button v-if="!editInvoice" @click="publishInvoice" type="submit" class="green">Create Invoice</button>
          <button v-if="editInvoice" @click="upadteInvoice" type="submit" class="purple">Update Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Loading from "@/components/Loading.vue";

export default {
  name: "InvoiceModal",
  data() {
    return {
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: false,
      invoiceDraft: false,
      invoicePaid: false,
      invoiceItemList: [],
      invoiceTotal: null,
      dateOptions: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      loading: false,
    };
  },
  components: { Loading },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_MODAL", "TOGGLE_EDIT_INVOICE"]),
    ...mapActions(["CREATE_INVOICE", "UPDATE_INVOICE"]),
    checkClick(event) {
      if (event.target === this.$refs.invoiceWrap) {
        this.TOGGLE_MODAL();
      }
    },
    closeInvoice() {
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },
    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter((item) => item.id !== id);
    },
    callInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    saveDraft() {
      this.invoiceDraft = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please ensure you fill out work items!");
        return;
      }
      this.loading = true;
      this.callInvoiceTotal();
      const payloadInvoice = {
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      };

      if (!this.editInvoice) {
        // create mode
        this.CREATE_INVOICE(payloadInvoice);
      } else {
        // update mode
        this.UPDATE_INVOICE({_id: this._id, payload: payloadInvoice});
        this.TOGGLE_EDIT_INVOICE();
      }

      this.loading = false;
      this.TOGGLE_INVOICE();
    },
    submitForm() {
      this.uploadInvoice();
    },
  },
  computed: {
    ...mapState(["editInvoice", "currentInvoice"]),
  },
  created() {
    if (!this.editInvoice) {
      // get current date for invoice field
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString("en-us", this.dateOptions);
    }
    if (this.editInvoice) {
      const invoice = this.currentInvoice[0];
      this._id = invoice._id;
      this.billerStreetAddress = invoice.billerStreetAddress;
      this.billerCity = invoice.billerCity;
      this.billerZipCode = invoice.billerZipCode;
      this.billerCountry = invoice.billerCountry;
      this.clientName = invoice.clientName;
      this.clientEmail = invoice.clientEmail;
      this.clientStreetAddress = invoice.clientStreetAddress;
      this.clientCity = invoice.clientCity;
      this.clientZipCode = invoice.clientZipCode;
      this.clientCountry = invoice.clientCountry;
      this.invoiceDateUnix = invoice.invoiceDateUnix;
      this.invoiceDate = invoice.invoiceDate;
      this.paymentTerms = invoice.paymentTerms;
      this.paymentDueDateUnix = invoice.paymentDueDateUnix;
      this.paymentDueDate = invoice.paymentDueDate;
      this.productDescription = invoice.productDescription;
      this.invoicePending = invoice.invoicePending;
      this.invoiceDraft = invoice.invoiceDraft;
      this.invoiceItemList = invoice.invoiceItemList;
      this.invoiceTotal = invoice.invoiceTotal;
    }
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
    }
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }
    h4 {
      font-size: 12px;
      color: #7c5dfa;
      margin-bottom: 24px;
    }
    // bill to - bill from
    .bill-to,
    .bill-from {
      margin-bottom: 48px;
      .location-details {
        gap: 24px;
        div {
          flex: 1;
        }
      }
    }

    // invoice work
    .invoice-work {
      .payment {
        gap: 24px;
      }
      .work-items {
        .item-list {
          width: 100%;
          // item table
          .table-heading,
          .table-items {
            gap: 24px;
            font-size: 12px;
            .item-name {
              flex-basis: 50%;
            }
            .qty {
              flex-basis: 10%;
            }
            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-items: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;
          box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 500ms ease;
          &:hover {
            box-shadow: none;
          }
          img {
            margin-right: 12px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;
      div {
        flex: 1;
      }
      .right {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2136;
    color: #fff;
    border-radius: 4px;
    padding: 12px 12px;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
</style>
