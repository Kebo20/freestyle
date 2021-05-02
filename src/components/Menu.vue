<template>
  <div>
    <a-list bordered :data-source="arrayCategories" class="div-freestyle">
      <a-list-item
        class="item-category"
        slot="renderItem"
        style="cursor: pointer"
        @click="link(item.idCategory)"
        slot-scope="item, index"
      >
        <button
          style="
            background-color: transparent;
            border: none;
            cursor: pointer;
            overflow: hidden;
            outline: none;
          "
        >
          {{ item.name }}
        </button>
      </a-list-item>

      <div slot="header"><a-icon type="menu" /> <span>CATEGORÍAS</span></div>
      <!-- <div slot="footer"></div> -->
    </a-list>
    <div
      class="div-freestyle item-category"
      @click="link('all')"
      style="padding: 10px; padding-left: 36px; cursor: pointer"
    >
      <span>Todas las categorias</span>
    </div>
  </div>
</template>
<script>
import axios from "../Config/axios";

export default {
  data() {
    return {
      arrayCategories: [],
    };
  },
  mounted() {
    this.categories();
  },
  methods: {
    categories() {
      let me = this;
      axios
        .get("/categories/list")
        .then(function (response) {
          me.arrayCategories = response.data.data;
        })
        .catch(function (error) {});
    },
    link(route) {
      let me = this;
      this.$emit("select");
      me.$store.commit("idCategory", route);
      if (me.$route.name.search("products") > -1) {
        window.location = "/products";
      } else {
        me.$router.push("/products");
      }
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style scoped>
.div-freestyle {
  /* background: linear-gradient(-180deg, #086FBB 1%, #232323 99%) ; */
  background-color: #033254 !important;
  color: white !important;
}

.item-category:hover {
  background-color: #c5ccd1 !important;
  color: #033254 !important;
}
</style>
