<template>
  <a-card hoverable class="card-product">
    <img slot="cover" alt="example" :src="product.image" />
    <a-card-meta :title="product.name" description="">
      <a-avatar slot="avatar" :src="product.image" />
    </a-card-meta>
    <div style="margin-top: 15px">
      <a-row>
        <a-col :xs="24">
          <a-tag
            style="font-size: 18px; padding: 5px; margin-bottom: 5px"
            color="blue"
            ><b>S/. {{ product.price }} </b></a-tag
          >
        </a-col>
        <a-col :xs="16">
          <a-button class="btn-primary">
            <a-icon type="shopping-cart" /> Añadir al carrito
          </a-button>
        </a-col>

        <a-col :xs="1">
          <a-button class="btn-primary" @click="handleClick(product)">
            <a-icon type="eye" />
          </a-button>
        </a-col>
      </a-row>
    </div>
    <!-- <template slot="actions" class="ant-card-actions">
      <a-button class="btn-primary"> <a-icon type="shopping-cart" /> </a-button>
      <a-tag color="cyan"> S/. 39.99 </a-tag>
      <a-icon key="eye" type="eye" />
    </template> -->
  </a-card>
</template>

<script>
export default {
  name: "Product",
  props: {
    msg: String,
    product: Array,
  },
  methods: {
    handleClick(product) {
      this.$emit("detailProduct", product);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
