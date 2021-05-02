<template>
  <div style="justify-content: center">
    <a-row>
      <a-col :xs="6" style="margin-right: 13px" v-show="this.$store.state.responsive ? false : true">
       
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

          <div slot="header">
            <a-icon type="menu" /> <span>CATEGORÍAS</span>
          </div>
          <!-- <div slot="footer"></div> -->
        </a-list>
         <div class="div-freestyle item-category" @click="link('all')" style="padding:10px;padding-left:36px;cursor:pointer">
          <span>Todas las categorias</span>
        </div>
      </a-col>

      <a-col :xs="this.$store.state.responsive ?24:17">
        <a-tag color="#033254" style="font-size: 20px; padding: 5px"
          ><b> {{ category.name }} </b>
        </a-tag>
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
            :lg="8"
            :xl="8"
            style="margin-bottom: 5px"
            v-for="product in arrayProducts"
            :key="product.idProduct"
          >
            <Product :product="product" />
          </a-col>
        </a-row>
      </a-col>

        <a-col :xs="22" style="margin-right: 13px" v-show="this.$store.state.responsive ? true : false">
       
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

          <div slot="header">
            <a-icon type="menu" /> <span>CATEGORÍAS</span>
          </div>
          <!-- <div slot="footer"></div> -->
        </a-list>
         <div class="div-freestyle item-category" @click="link('all')" style="padding:10px;padding-left:36px;cursor:pointer">
          <span>Todas las categorias</span>
        </div>
      </a-col>

    </a-row>
  </div>
</template>
<script>
import Product from "../components/Product.vue";
import Menu from "../components/Menu.vue";
import axios from "../Config/axios";

export default {
  components: { Product, Menu },

  data() {
    return {
      collapsed: false,
      order: "ASC",
      order_name: "name",
      arrayProducts: [],
      search: "",
      category: [],
      arrayCategories: [],
    };
  },
  mounted() {
    // var queryString = window.location.search;
    // var urlParams = new URLSearchParams(queryString);
    // this.search = urlParams.get("search") ? urlParams.get("search") : "";
    // this.idCategory = urlParams.get("category");

    this.search = this.$store.state.search;
    if (this.$store.state.idCategory == "all") {
      this.category = { name: "Todas las categorias" };
    } else {
      this.getCategory();
    }

    this.byCategory();
    this.categories();
  },
  methods: {
    link(idCategory) {
      let me = this;
      me.$store.commit("idCategory", idCategory);
      this.byCategory();
      this.getCategory();
    },
    categories() {
      let me = this;
      axios
        .get("/categories/list")
        .then(function (response) {
          me.arrayCategories = response.data.data;
        })
        .catch(function (error) {});
    },
    byCategory() {
      let me = this;

      axios
        .post("/products/byCategory", {
          order: me.order,
          order_name: me.order_name,
          search: me.search,
          idCategory: this.$store.state.idCategory,
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

      axios
        .get("/categories/" + this.$store.state.idCategory)
        .then(function (response) {
          me.category = response.data.data;
        })
        .catch(function (error) {});
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
.ant-modal-content {
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

.div-freestyle {
  /* background: linear-gradient(-180deg, #086FBB 1%, #232323 99%) ; */
  background-color: #033254 !important;
  color: white !important;
}

.item-category:hover{
  background-color: #c5ccd1 !important;
  color: #033254 !important;


}
</style>
