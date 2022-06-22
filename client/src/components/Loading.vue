<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss">
.loading {
  top: 0;
  left: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border: 8px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    animation: spin ease 1200ms infinite;
  }
}
</style>