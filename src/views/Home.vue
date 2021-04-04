<template>
  <div>
   
   
    <a-carousel autoplay>
      <div>
        <img
          height="400px"
          width="100%"
          src="https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?cs=srgb&dl=pexels-cottonbro-3944405.jpg&fm=jpg"
        />
      </div>
      <div>
        <img
          height="400px"
          width="100%"
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5632402.jpg&fm=jpg"
        />
      </div>
      <div>
        <img
          height="400px"
          width="100%"
          src="https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>
    </a-carousel>
    <br />
   
    <a-row>
      <a-col :xs="24">
        <br />
        <products />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import products from "./products";
export default {
  components: { products },
  methods: {
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

</style>
