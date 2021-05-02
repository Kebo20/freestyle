<template>
  <a-row >
    <a-col v-for="category in arrayCategories" :key='category.idCategory' :xs='2'><a-tag>{{category.name}} </a-tag></a-col>
  </a-row>
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
