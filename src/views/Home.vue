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
        <Menu />
      </a-col>
      <a-col :xs="23" :sm="11" :md="11" :lg="18" :xl="18" v-show="this.$store.state.responsive ? false : true">
        <a-carousel arrows autoplay>
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
      <a-col  :xs="24" :sm="11" :md="11" :lg="18" :xl="18" v-show="this.$store.state.responsive">
        <a-carousel arrows autoplay >
          <div>
            <img
              height="300px"
              width="100%"
              src="https://phantom.pe/pub/media/wysiwyg/slider-corsair.jpg"
            />
          </div>
          <div>
            <img
              height="300px"
              width="100%"
              src="https://phantom.pe/pub/media/wysiwyg/banner-semana-santa2.jpg"
            />
          </div>
          <div>
            <img
              height="300px"
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
          >Novedades:</span
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
            <Product :product="product" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Menu from "../components/Menu.vue";
import Product from "../components/Product.vue";
import axios from "../Config/axios";

export default {
  components: { Menu, Product },
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
  background: #a6b2c7;
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

@media screen and (max-width: 650px) {
  .ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #a6b2c7;
  overflow: hidden;
}
}
</style>
