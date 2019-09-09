<template>
  <div>
    <app-store-grid :data="products" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppStoreGrid from "~/components/AppStoreGrid.vue";

export default {
  components: {
    AppStoreGrid
  },
  computed: {
    ...mapState(["storedata"]),
    products() {
      return this.storedata.filter(
        product => product.collections.includes(this.handle)
      )
    }
  },
  data() {
    return {
      handle: this.$route.params.handle,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
