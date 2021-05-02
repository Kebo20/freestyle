<template>
  <div>
    <a-card  class="card-product" @click="detail(product)">
      <img
        slot="cover"
        alt="example"
        :src="this.$store.state.api_url+product.image"
        width="300px"
        height="300px"
      />
      <a-card-meta :title="product.name" description="">
        <a-avatar slot="avatar" :src="this.$store.state.api_url+product.image" />
      </a-card-meta>
      <div style="margin-top: 15px">
        <a-row>
          <a-col v-show="product.price_old != 0" :xs="14">
            <a-tag
              style="
                font-size: 13px;
                padding: 5px;
                margin-bottom: 5px;
                text-decoration: line-through;
              "
              color="black"
              ><b>S/. {{ product.price_old }} </b></a-tag
            >
          </a-col>
          <a-col :xs="8" style="text-align: right">
            <a-tag
              style="font-size: 19px; padding: 5px; margin-bottom: 5px"
              color="blue"
              ><b>S/. {{ product.price }} </b></a-tag
            >
          </a-col>
          <!-- <a-col :xs="24">
            <a-button class="btn-primary">
              <a-icon type="shopping-cart" /> Añadir al carrito
            </a-button>
          </a-col> -->

          <!-- <a-col :xs="1">
            <a-button class="btn-primary" @click="detail(product)">
              <a-icon type="eye" />
            </a-button>
          </a-col> -->
        </a-row>
      </div>
      <!-- <template slot="actions" class="ant-card-actions">
      <a-button class="btn-primary"> <a-icon type="shopping-cart" /> </a-button>
      <a-tag color="cyan"> S/. 39.99 </a-tag>
      <a-icon key="eye" type="eye" />
    </template> -->
    </a-card>

    <!-- Modal Producto -->

    <a-modal v-model="visible" :title="p.name" @ok="handleOk">
      <a-row>
        <a-col :xs="24" :lg="24" style="text-align: center;margin-bottom:20px">
          <img :src="this.$store.state.api_url+p.image" width="290px" />
        </a-col>

         <a-col :xs="24" :lg="24" style="margin-bottom:10px;font-size:20px;color:black">
              <p><b>{{ p.name }}</b></p>

        </a-col>
        <a-col :xs="24" :lg="24">
          <a-row>
            <a-col v-show="p.price_old != 0" :xs="8" style="text-align:right">
              <a-tag
                style="
                  font-size: 13px;
                  padding: 5px;
                  margin-bottom: 5px;
                  text-decoration: line-through;
                  text-align:right
                "
                color="black"
                ><b>S/. {{ p.price_old }} </b></a-tag
              >
            </a-col>
            <a-col :xs="12" style="text-align:left">
              <a-tag
                style="font-size: 18px; padding: 5px; margin-bottom: 25px;"
                color="blue"
                ><b>Ahora: S/. {{ p.price }} </b></a-tag
              >
              
            </a-col>

            <a-col :xs="24">
              
              <p>{{ p.description }}</p>
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
export default {
  name: "Product",
  props: {
    msg: String,
    product: Array,
  },
  data() {
    return {
      visible: false,
      p: [],
    };
  },
  methods: {
    handleClick(product) {
      this.$emit("detailProduct", product);
    },
    detail(a) {
      this.visible = true;
      this.p = a;
    },
    handleOk() {},
    handleCancel() {
      this.visible = false;
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
