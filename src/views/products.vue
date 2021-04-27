<template>
  <div style="justify-content: center">
    <h1 style="font-size: 25px">
      <b> {{ category.name }} </b>
    </h1>
    <a-row>
      <a-col
        :xs="13"
        :sm="13"
        :md="13"
        :lg="4"
        :xl="4"
        style="margin-top: 30px"
      >
        <a-select
          placeholder="Ordenar por "
          style="width: 100%"
          v-model="order_name"
          @change="byCategory"
        >
          <a-select-option value="price"> Precio </a-select-option>
          <a-select-option value="name"> Nombre (A-Z) </a-select-option>
          <!-- <a-select-option value="date"> Fecha de llegada </a-select-option> -->
        </a-select>
      </a-col>
      <a-col
        :xs="3"
        :sm="3"
        :md="3"
        :lg="2"
        :xl="2"
        v-show="order == 'ASC'"
        style="margin-top: 30px"
      >
        <a-button shape="circle" icon="up" @click="changeOrder" />
      </a-col>
      <a-col
        :xs="3"
        :sm="3"
        :md="3"
        :lg="2"
        :xl="2"
        v-show="order == 'DESC'"
        style="margin-top: 30px"
      >
        <a-button shape="circle" icon="down" @click="changeOrder" />
      </a-col>
      <a-col :xs="13" :sm="13" :md="13" :lg="2" :xl="2">
        <span></span>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="16"
        :xl="16"
        style="margin-top: 30px"
      >
        <input
          placeholder="Buscar aquí"
          style="width: 100%"
          class="ant-input"
          v-model="search"
          @keyup="byCategory"
        />
      </a-col>
    </a-row>
    <br />

    <a-row>
      <br />
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        style="margin-bottom: 5px"
        v-for="product in arrayProducts"
        :key="product.idProduct"
      >
        <Product :product="product"  />
      </a-col>
    </a-row>

  </div>
</template>
<script>
import Product from "../components/Product.vue";
import axios from "../Config/axios";
export default {
  components: { Product },

  data() {
    return {
      collapsed: false,
      order: "ASC",
      order_name: "name",
      arrayProducts: [],
      search: "",
      category: [],
    
    };
  },
  mounted() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    this.search = urlParams.get("search") ? urlParams.get("search") : "";

    if (urlParams.get("category") == "all") {
      this.category = { name: "Todas las categorias" };
    } else {
      this.getCategory();
    }
    this.byCategory();
  },
  methods: {
    byCategory() {
      let me = this;

      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      axios
        .post("/products/byCategory", {
          order: me.order,
          order_name: me.order_name,
          search: me.search,
          idCategory: urlParams.get("category"),
        })
        .then(function (response) {
          me.arrayProducts = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCategory() {
      let me = this;

      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);

      axios
        .get("/categories/" + urlParams.get("category"))
        .then(function (response) {
          me.category = response.data.data;
        })
        .catch(function (error) {
          
        });
    },
    changeOrder() {
      this.order == "ASC" ? (this.order = "DESC") : (this.order = "ASC");
      this.byCategory();
    },
   
  },
};
</script>

<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 11px 28px 11px 0;
  float: left;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ant-input {
  background: linear-gradient(-90deg, #086fbb 1%, #232323 99%) !important;
  /* background-color: #086fbb!important; */

  color: #fff !important;
}
.ant-input::placeholder {
  color: #fff !important;
}
.ant-modal-content{
    width: 800px !important;
}
/* #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
