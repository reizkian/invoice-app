<template>
  <router-link :to="{ name: 'Invoice', params: { _id: propInvoice._id } }" class="invoice flex">
    <div class="left flex">
      <span class="tracking-number"># {{ propInvoice._id }}</span>
      <span class="due-date">{{ propInvoice.paymentDueDate }}</span>
      <span class="person">{{ propInvoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ propInvoice.invoiceTotal }}</span>
      <div
        class="status-button flex"
        :class="{ paid: propInvoice.invoicePaid, draft: propInvoice.invoiceDraft, pending: propInvoice.invoicePending }"
      >
        <span v-if="propInvoice.invoicePaid">Paid</span>
        <span v-if="propInvoice.invoiceDraft">Draft</span>
        <span v-if="propInvoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Invoice",
  props: ["propInvoice"],
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 25px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: #1e2139;
  align-items: center;

  span{
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 70%;
    gap: 16px;
    justify-content: space-between;

    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    gap: 10px;
    flex-basis: 30%;
    align-items: center;
    justify-content: space-between;

    .price{
      flex:1;
      font-size:16px;
      font-weight: 600;
    }
  }
}
</style>
