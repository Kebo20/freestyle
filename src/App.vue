<template>
  <div > 
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
        <Menu @select="onClose" />
      </a-drawer>
    </div>
    <a-layout id="components-layout-demo-responsive">
      <a-layout>
        <!-- <a-layout-header :style="{ background: 'linear-gradient(-90deg, #086FBB 8%, #00c9db 92%)', padding: 0 }"> -->
        <div :style="this.$store.state.responsive?'text-align:left;':'text-align:right;'" >
          <a-menu
            v-model="current"
            mode="horizontal"
            class="navBar header"
            :style="{
              background: 'linear-gradient(-90deg, #086FBB 8%, #232323 92%) ',
              padding: 0,
            }"
           
          >
            <a-menu-item  v-if='this.$store.state.responsive' key="drawer" @click="showDrawer">
              <a-icon type="unordered-list" />
            </a-menu-item>
            <a-menu-item v-if="this.$store.state.rol != ''" key="admin">
              <router-link to="/admin">
                <a-icon type="safety-certificate" />ADMIN
              </router-link>
            </a-menu-item>
            <a-menu-item key="home" >
              <router-link to="/"> <a-icon type="shop" />Inicio </router-link>
            </a-menu-item>
              <a-menu-item
              key="fb"
            >
             <a href="https://www.facebook.com/freestyle2911" target="_blank"><a-icon type="facebook" />Facebook </a> 
            </a-menu-item>
            <a-menu-item
              key="ig"
            >
             <a href="https://www.facebook.com/freestyle2911" target="_blank"> <a-icon type="instagram" />Instagram </a> 
            </a-menu-item>
            <a-menu-item v-if="this.$store.state.rol == ''" key="login">
              <router-link to="/login">
                <a-icon type="login" />Ingresar
              </router-link>
            </a-menu-item>
            <a-menu-item
              v-if="this.$store.state.rol != ''"
              key="logout"
              @click="logout"
            >
              <a-icon type="logout" />Salir
            </a-menu-item>
          </a-menu>
        </div>
     
        <Header />

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
import Header from "./views/Header.vue";
import Menu from "./components/Menu";
import axios from "./Config/axios";

export default {
  components: { Header, Menu },
  data() {
    return {
      current: ["mail"],
      visible: false,
    };
  },
  mounted() {
    this.responsive();
    this.$store.commit("api_url", "https://freestyle-backend.gogazo.com");
    // this.$store.commit("api_url", "http://freestyle-backend");

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

    logout() {
      let me = this;

      axios
        .get("/auth/logout")
        .then(function (response) {
          console.log(response);
          me.$store.commit("user", "");
          me.$store.commit("rol", "");
          me.$store.commit("token", "");

          me.$router.push("/");
        })
        .catch(function (error) {
          console.log(error);
          me.$store.commit("user", "");
          me.$store.commit("rol", "");
          me.$store.commit("token", "");
          me.$router.push("/");
        });
    },

    responsive() {
      let me = this;
      var mql = window.matchMedia("(max-width: 650px)");

      if (window.matchMedia("(max-width: 650px)").matches) {
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

.navBar a {
  color: #fff  !important;
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


.header {
   background: linear-gradient(-90deg, #086fbb 1%, #232323 99%) !important; 
  /* background: linear-gradient(-90deg, #2180ce 1%, #2180ce 99%) !important; */
  // background-image: url('https://www.bypeople.com/wp-content/uploads/2015/05/css-dark-chain-background.png')  !important;

}
</style>

