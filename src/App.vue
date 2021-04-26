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
        <menuf />
      </a-drawer>
    </div>
    <a-layout id="components-layout-demo-responsive">
      <a-layout>
        <!-- <a-layout-header :style="{ background: 'linear-gradient(-90deg, #086FBB 8%, #00c9db 92%)', padding: 0 }"> -->
        <div v-if="this.$store.state.responsive">
          <a-menu
            v-model="current"
            mode="horizontal"
            class="navBar"
            :style="{
              background: 'linear-gradient(-90deg, #086FBB 8%, #232323 92%) ',
              padding: 0,
            }"
          >
            <a-menu-item key="" @click="showDrawer">
              <a-icon type="unordered-list" />
            </a-menu-item>
            <a-menu-item key="mail" @click="link('')">
              <a-icon type="home" />Inicio
            </a-menu-item>
            <a-menu-item
              key="mail"
              @click="redirect('https://www.facebook.com/freestyle2911')"
            >
              <a-icon type="facebook" />Facebook
            </a-menu-item>
            <a-menu-item
              key="instagram"
              @click="redirect('https://www.facebook.com/freestyle2911')"
            >
              <a-icon type="instagram" />Instagram
            </a-menu-item>
            <a-menu-item key="login" @click="link('login')">
              <a-icon type="user" />Ingresar
            </a-menu-item>
            <a-menu-item key="logout" @click="link('logout')">
              <a-icon type="logout" />Salir
            </a-menu-item>
          </a-menu>
        </div>
        <div v-else align="right">
          <a-menu
            v-model="current"
            mode="horizontal"
            class="navBar"
            :style="{
              background: 'linear-gradient(-90deg, #086FBB 8%, #232323 92%) ',
              padding: 0,
            }"
          >
            <a-menu-item key="mail" @click="link('')">
              <a-icon type="home" />Inicio
            </a-menu-item>
            <a-menu-item
              key="mail"
              @click="redirect('https://www.facebook.com/freestyle2911')"
            >
              <a-icon type="facebook" />Facebook
            </a-menu-item>
            <a-menu-item
              key="instagram"
              @click="redirect('https://www.facebook.com/freestyle2911')"
            >
              <a-icon type="instagram" />Instagram
            </a-menu-item>
             <a-menu-item key="login" @click="link('login')">
              <a-icon type="user-add" />Registrarse
            </a-menu-item>
            <a-menu-item key="login" @click="link('login')">
              <a-icon type="login" />Ingresar
            </a-menu-item>
            <a-menu-item key="logout" @click="link('logout')">
              <a-icon type="logout" />Salir
            </a-menu-item>
            <!-- <a-sub-menu>
              <span slot="title" class="submenu-title-wrapper"
                ><a-icon type="setting" />Navigation Three - Submenu</span
              >
               <a-menu-item-group title="Item 1" > 
              <a-menu-item key="setting:1"> Option 1 </a-menu-item>
              <a-menu-item key="setting:2"> Option 2 </a-menu-item>
               </a-menu-item-group> 
               <a-menu-item-group title="Item 2" > 
              <a-menu-item key="setting:3"> Option 3 </a-menu-item>
              <a-menu-item key="setting:4"> Option 4 </a-menu-item>
               </a-menu-item-group> 
            </a-sub-menu> -->
          </a-menu>
        </div>
        <headerf />

        <!-- </a-layout-header> -->
        <a-layout-content :style="{ margin: '10px 16px 0' }">
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
import headerf from "./views/Header.vue";
import menuf from "./views/Menu";

export default {
  components: { headerf, menuf },
  data() {
    return {
      current: ["mail"],
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
    redirect(link) {
      window.open(link);
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
        me.$store.commit("setResponsive", true);
      } else {
        me.$store.commit("setResponsive", false);
      }

      mql.addListener(function (event) {
        if (event.matches) {
          // La media querie coincide
          me.$store.commit("setResponsive", true);
        } else {
          me.$store.commit("setResponsive", false);
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
  color: #fff !important;
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

