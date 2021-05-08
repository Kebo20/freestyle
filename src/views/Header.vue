<template>
  <div>
    <a-row class="header" style="padding: 15px">
      <a-col :xs="23" :sm="11" :md="11" :lg="1" :xl="1"> </a-col>
      <a-col :xs="23" :sm="11" :md="11" :lg="6" :xl="6">
        <router-link to="/">
          <span style="color: white; font-size: 50px">FreeStyle</span>
        </router-link>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="4"
        :xl="4"
        style="margin-top: 20px"
        v-if="this.$store.state.responsive ? false : true"
        v-show="this.$route.name.search('Admin') > -1 ? false : true"
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
          <a-select-option value="all">Todas las categorias </a-select-option>

          <a-select-option
            v-for="Category in arrayCategories"
            :value="Category.idCategory"
            :key="Category.idCategory"
          >
            {{ Category.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="10"
        :xl="10"
        style="margin-top: 20px"
        v-show="this.$route.name.search('Admin') > -1 ? false : true"
        v-if="this.$store.state.responsive ? true : true"
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
        style="margin-top: 20px;display:none"
        v-show="this.$route.name.search('Admin') > -1 ? false : true"
        v-if="this.$store.state.responsive ? false : true"
      >
        <a-button style="color: #086fbb">
          <a-icon type="shopping-cart" /> | Carrito</a-button
        >
      </a-col>
    </a-row>
    <a-row>
      <!-- <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="10"
        :xl="10"
        style="margin: 10px"
        v-show="this.$route.name.search('Admin') > -1 ? false : true"
        v-if="this.$store.state.responsive"
      >
        <a-input-search
          placeholder="Buscar en la Tienda"
          style="width: 100%"
          @search="onSearch"
          v-model="search"
        />
      </a-col> -->
    </a-row>
  </div>
</template>
<script>
import axios from "../Config/axios";

export default {
  data() {
    return {
      arrayCategories: [],
      category: "all",
      search: "",
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
    onSearch() {
      let me = this;
      me.$store.commit("idCategory", me.category);
      me.$store.commit("search", me.search);
      if (me.$route.name.search("products") > -1) {
        window.location = "/products";
      } else {
        me.$router.push("/products");
      }
    },
    handleChange(value) {
      this.category = value;
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
  /* background: linear-gradient(-90deg, #086fbb 1%, #232323 99%) !important; */
  /* background: linear-gradient(-90deg, #2180ce 1%, #2180ce 99%) !important; */
  /* background-image: url("https://www.bypeople.com/wp-content/uploads/2015/05/css-dark-chain-background.png"); */
}
</style>
