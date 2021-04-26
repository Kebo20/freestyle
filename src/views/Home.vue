<template>
  <div>
    <a-row>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        v-show="this.$store.state.responsive ? false : true"
      >
        <menuf />
      </a-col>
      <a-col :xs="23" :sm="11" :md="11" :lg="18" :xl="18">
        <a-carousel autoplay>
          <div>
            <img
              height="400px"
              width="100%"
              src="https://phantom.pe/pub/media/wysiwyg/slider-corsair.jpg"
            />
          </div>
          <div>
            <img
              height="400px"
              width="100%"
              src="https://phantom.pe/pub/media/wysiwyg/banner-semana-santa2.jpg"
            />
          </div>
          <div>
            <img
              height="400px"
              width="100%"
              src="https://phantom.pe/pub/media/wysiwyg/slider-razer.jpg"
            />
          </div>
        </a-carousel>
      </a-col>
    </a-row>
    <br />

    <a-row>
      <a-col :xs="24">
        <span
          style="
            color: #232323;
            font-size: 30px;
            border-bottom: 3px solid #086fbb !important;
            border-radius: 5px;
            margin-bottom: 10px;
          "
          >Novedades</span
        >
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
            <Product :product="product" @detailProduct="detail" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- Modal Producto -->

    <a-modal
      v-model="visible"
      :title="product.name"
      @ok="handleOk"
      :dialog-style="{ right: '100px' }"
    >
      <a-row>
        <a-col :xs="24" :lg="12">
          <img :src="product.image" width="270px" />
        </a-col>
        <a-col :xs="24" :lg="12">
          <a-row>
            <a-col :xs="16">
              <a-tag
                style="font-size: 18px; padding: 5px; margin-bottom: 5px"
                color="blue"
                ><b>S/. {{ product.price }} </b></a-tag
              >
            </a-col>

            <a-col :xs="16">
              <p>{{ product.description }}</p>
            </a-col>
            <a-col :xs="16"> </a-col>
          </a-row>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Cerrar </a-button>
        <a-button
          class="btn-primary"
          key="submit"
          type="primary"
          @click="handleOk"
        >
          <a-icon type="shopping-cart" /> Añadir al carrito
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import menuf from "./Menu";
import Product from "../components/Product.vue";
import axios from "../Config/axios";

export default {
  components: { menuf, Product },
  data() {
    return {
      data: [
        { name: "Relojes", id: 1 },
        { name: "Home Office", id: 1 },
        { name: "Gaming", id: 1 },
        { name: "Funkos", id: 1 },
        { name: "Juegos de mesa", id: 1 },
        { name: "Tecnología", id: 1 },
        { name: "Audio y video", id: 1 },
        { name: "Regalos", id: 1 },
      ],
      visible: false,
      product: {},
      arrayProducts: [],
    };
  },
  mounted() {
    this.novelties();
  },
  methods: {
    novelties() {
      let me = this;
      axios
        .get("/products/novelties")
        .then(function (response) {
          me.arrayProducts = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    link(route) {
      this.$router.push("/products?category=" + route);
    },

    detail(a) {
      this.visible = true;
      this.product = a;
    },
    handleOk() {},
    handleCancel() {
      this.visible = false;
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
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.div-freestyle {
  /* background: linear-gradient(-180deg, #086FBB 1%, #232323 99%) ; */
  background-color: #033254;
  color: white;
}
</style>
