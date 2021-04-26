<template>
  <a-list bordered :data-source="arrayCategories" class="div-freestyle">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <button
        style="
          background-color: transparent;
          border: none;
          cursor: pointer;
          overflow: hidden;
          outline: none;
        "
        @click="link(item.idCategory)"
      >
        {{ item.name }}
      </button>
    </a-list-item>
    <div slot="header"><a-icon type="menu" /> <span>Categorías</span></div>
    <!-- <div slot="footer"></div> -->
  </a-list>
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
        .catch(function (error) {
        });
    },
    link(route) {
      this.$router.push("/products?category=" + route);
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
  background-color: #05558f;
  color: white;
}
</style>
