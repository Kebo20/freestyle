<template>
  <div>
    <a-row class="header" style="padding: 30px">
      <a-col :xs="23" :sm="11" :md="11" :lg="1" :xl="1"> </a-col>
      <a-col :xs="23" :sm="11" :md="11" :lg="6" :xl="6">
        <span style="color: white; font-size: 50px">FreeStyle</span>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="4"
        :xl="4"
        style="margin-top: 20px"
      >
        <a-select
          show-search
          placeholder="Categorías"
          option-filter-prop="children"
          style="width: 100%"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          v-model="category"
         
        >
          <a-select-option value='all' >Todas las categorias </a-select-option>

          <a-select-option  v-for="Category in arrayCategories" :value='Category.idCategory' :key="Category.idCategory"> {{ Category.name }} </a-select-option>
        </a-select>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="10"
        :xl="10"
        style="margin-top: 20px"
      >
        <a-input-search
          placeholder="Buscar en la Tienda"
          style="width: 100%"
          @search="onSearch"
          v-model="search"
        />
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="2"
        :xl="2"
        style="margin-top: 20px"
      >
        <a-button style="color: #086fbb">
          <a-icon type="shopping-cart" /> | Carrito</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from "../Config/axios";

export default {
  data() {
    return {
      arrayCategories: [],
      category:'all',
      search:''
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
    onSearch(){
      // this.$router.push("/products?category=" + this.category+"&search="+this.search);
      window.location="/products?category=" + this.category+"&search="+this.search

    },
    handleChange(value) {
      this.category=value
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
.header {
  background: linear-gradient(-90deg, #086fbb 1%, #232323 99%) !important;
}
</style>
