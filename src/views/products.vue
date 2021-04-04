<template>
  <div style="justify-content: center">
    <a-row>
      <!-- <a-col :xs="23" :sm="11" :md="11" :lg="6" :xl="6">
        <a-select
          show-search
          placeholder="Seleccione una categoría"
          option-filter-prop="children"
          style="width: 100%"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :dropdownMenuStyle="{
            background: 'linear-gradient(-90deg, #086FBB 8%, #00c9db 92%) ',
          }"
        >
          <a-select-option value="jack"> Jack </a-select-option>
          <a-select-option value="lucy"> Lucy </a-select-option>
          <a-select-option value="tom"> Tom </a-select-option>
        </a-select>
      </a-col> -->
      <a-col :xs="23" :sm="11" :md="11" :lg="24" :xl="24">
        <input
          placeholder="Buscar producto"
          enter-button
          @search="onSearch"
          class="ant-input"
        />
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        style="margin-bottom: 5px"
      >
        <a-card hoverable style="width: 95%">
          <img
            slot="cover"
            alt="example"
            src="http://sc04.alicdn.com/kf/HTB1tER7lKuSBuNjy1Xcq6AYjFXaJ.jpg"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta
            title="Reloj Hombre"
            description="This is the description"
          >
            <a-avatar
              slot="avatar"
              src="https://image.made-in-china.com/202f0j10qEeRSaMIhmou/E-7323-CS-Alibaba-Express-Fashion-Cheap-Jewellery-Wedding-Bridal-Jewelry-Sets.jpg"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        style="margin-bottom: 5px"
      >
        <a-card hoverable style="width: 95%">
          <img
            slot="cover"
            alt="example"
            src="https://sc04.alicdn.com/kf/HTB1nO0xHVXXXXcPXXXXq6xXFXXXj.jpg"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta
            title="Reloj Hombre"
            description="This is the description"
          >
            <a-avatar
              slot="avatar"
              src="https://sc04.alicdn.com/kf/HTB1nO0xHVXXXXcPXXXXq6xXFXXXj.jpg"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        style="margin-bottom: 5px"
      >
        <a-card hoverable style="width: 95%">
          <img
            slot="cover"
            alt="example"
            src="https://sc01.alicdn.com/kf/H8ff796b359854e8bbb4d947cb84b538ct.jpg"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta
            title="Reloj Hombre"
            description="This is the description"
          >
            <a-avatar
              slot="avatar"
              src="https://sc01.alicdn.com/kf/H8ff796b359854e8bbb4d947cb84b538ct.jpg"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        style="margin-bottom: 5px"
      >
        <a-card hoverable style="width: 95%">
          <img
            slot="cover"
            alt="example"
            src="https://sc01.alicdn.com/kf/H8ff796b359854e8bbb4d947cb84b538ct.jpg"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta
            title="Reloj Hombre"
            description="This is the description"
          >
            <a-avatar
              slot="avatar"
              src="https://sc01.alicdn.com/kf/H8ff796b359854e8bbb4d947cb84b538ct.jpg"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col
        :xs="23"
        :sm="11"
        :md="11"
        :lg="6"
        :xl="6"
        style="margin-bottom: 5px"
      >
        <a-card hoverable style="width: 95%">
          <img
            slot="cover"
            alt="example"
            src="http://sc04.alicdn.com/kf/HTB1tER7lKuSBuNjy1Xcq6AYjFXaJ.jpg"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta
            title="Reloj Hombre"
            description="This is the description"
          >
            <a-avatar
              slot="avatar"
              src="https://image.made-in-china.com/202f0j10qEeRSaMIhmou/E-7323-CS-Alibaba-Express-Fashion-Cheap-Jewellery-Wedding-Bridal-Jewelry-Sets.jpg"
            />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
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
  background: linear-gradient(-90deg, #086fbb 1%, #00c9db 99%)!important;
  /* background-color: #086fbb!important; */

  color:  #fff !important;
}
.ant-input::placeholder{
  color:#fff !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
