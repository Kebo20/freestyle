<template>
  <div>
    <!--Menu responsive -->
    <div>
      <a-drawer
        title="FreeStyle"
        placement="left"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <a-menu theme="light" mode="inline" :default-selected-keys="['4']">
          <a-menu-item key="1" @click="link('products')">
            <a-icon type="user" />
            <span class="nav-text">Productos</span>
          </a-menu-item>
          <a-menu-item key="2" @click="link('')">
            <a-icon type="video-camera" />
            <span class="nav-text">Inicio</span>
          </a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title"
              ><a-icon type="appstore" /><span>Navigation Two</span></span
            >
            <a-menu-item key="9"> Option 9 </a-menu-item>
            <a-menu-item key="10"> Option 10 </a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="11"> Option 11 </a-menu-item>
              <a-menu-item key="12"> Option 12 </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </a-drawer>
    </div>
    <a-layout id="components-layout-demo-responsive">
      <a-layout>
        <!-- <a-layout-header :style="{ background: 'linear-gradient(-90deg, #086FBB 8%, #00c9db 92%)', padding: 0 }"> -->
        <div v-if="valorResponsive">
          <a-menu
            v-model="current"
            mode="horizontal"
            class="navBar"
            :style="{
              background: 'linear-gradient(-90deg, #086FBB 8%, #00c9db 92%) ',
              padding: 0,
            }"
          >
            <a-menu-item key="" @click="showDrawer">
              <a-icon type="unordered-list" />
            </a-menu-item>
          </a-menu>
        </div>
        <div v-else>
          <a-menu
            v-model="current"
            mode="horizontal"
            class="navBar"
            :style="{
              background: 'linear-gradient(-90deg, #086FBB 8%, #00c9db 92%) ',
              padding: 0,
            }"
          >
            <a-menu-item key="mail" @click="link('products')">
              <a-icon type="mail" />Productos
            </a-menu-item>
            <a-menu-item key="app" @click="link('')">
              <a-icon type="appstore" />Navigation Two
            </a-menu-item>
            <a-sub-menu>
              <span slot="title" class="submenu-title-wrapper"
                ><a-icon type="setting" />Navigation Three - Submenu</span
              >
              <!-- <a-menu-item-group title="Item 1" > -->
              <a-menu-item key="setting:1"> Option 1 </a-menu-item>
              <a-menu-item key="setting:2"> Option 2 </a-menu-item>
              <!-- </a-menu-item-group> -->
              <!-- <a-menu-item-group title="Item 2" > -->
              <a-menu-item key="setting:3"> Option 3 </a-menu-item>
              <a-menu-item key="setting:4"> Option 4 </a-menu-item>
              <!-- </a-menu-item-group> -->
            </a-sub-menu>
          </a-menu>
        </div>

        <!-- </a-layout-header> -->
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <!-- <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        > -->
          <router-view />
          <!-- </div> -->
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          FreeStyle ©2021 Created by
          <a href="https://gogazo.com" target="_blank">Gogazo </a>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ["mail"],
      valorResponsive: false,
      visible: false,
    };
  },
  mounted() {
    this.responsive();
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },

    link(route) {
      this.$router.push("/" + route);
    },
    showDrawer() {
      let me = this;
      me.visible = true;
    },
    onClose() {
      let me = this;
      me.visible = false;
    },

    responsive() {
      let me = this;
      var mql = window.matchMedia("(max-width: 500px)");

      if (window.matchMedia("(max-width: 500px)").matches) {
        // La media querie coincide
        me.valorResponsive = true;
      } else {
        me.valorResponsive = false;
      }

      mql.addListener(function (event) {
        if (event.matches) {
          // La media querie coincide
          me.valorResponsive = true;
        } else {
          me.valorResponsive = false;
        }
      });
    },
  },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.navBar .ant-menu-sub .ant-menu-item,
.navBar .ant-menu-sub .ant-menu-submenu-inline {
  color: #000 !important;
  border-bottom: 0px solid #fff !important;
}

.navBar .ant-menu-sub .ant-menu-item:hover {
  color: #086fbb !important;
  border-bottom: 0px solid #fff !important;
}

.navBar .ant-menu-item,
.navBar .ant-menu-submenu,
.navBar .ant-menu-submenu-active {
  color: #fff !important;
  border-bottom: 0px solid #fff !important;
}
.navBar .ant-menu-item:hover,
.navBar .ant-menu-submenu-title:hover {
  color: #000 !important;
  /* border-bottom: 1px solid #fff !important; */
}
</style>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav {
// padding: 30px;

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
// }
</style>

