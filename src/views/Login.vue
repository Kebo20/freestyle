<template>
  <a-row>
    <a-col :xs="0" :lg="6"> </a-col>
    <a-col :xs="24" :lg="12">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  { required: true, message: 'Por favor ingrese un usuario' },
                ],
              },
            ]"
            placeholder="Usuario"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese una contraseña',
                  },
                ],
              },
            ]"
            type="password"
            placeholder="Contraseña"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            Recordar
          </a-checkbox>
          <a class="login-form-forgot" href=""> Recuperar contraseña </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
          O
          <a href=""> Registrate ahora! </a>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :xs="0" :lg="6"> </a-col>
  </a-row>
</template>
<script>
import axios from "../Config/axios";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      name: "",
      password: "",
      user: "",
    };
  },
  mounted() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let me = this;

      this.form.validateFields((err, values) => {
        if (!err) {
          axios
            .post("/auth/login", {
              name: values.userName,
              password: values.password,
              remember_me: values.remember,
            })
            .then(function (response) {
              if (response) {
                me.$store.commit("user", response.data.user)
                me.$store.commit("rol", response.data.rol);
                me.$store.commit("token", response.data.access_token);
                axios.defaults.headers.common["Authorization"] =
                  "Bearer " + response.data.access_token;
                window.location = "/";
              } else {
              }
            })
            .catch(function (error) {});
        }
      });
    },

    login() {
      let me = this;

      if (me.name == "" || me.password == "") {
        swal("Mensaje ", "Ingrese usuario y contraseña", "warning");
        return false;
      }
      axios
        .post("/auth/login", {
          name: me.name,
          password: me.password,
          remember_me: false,
        })
        .then(function (response) {
          if (response) {
            me.user = response.data.user;
            me.$store.commit("user", response.data.user);
            me.$store.commit("rol", response.data.rol);
            me.$store.commit("token", response.data.access_token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.access_token;
            window.location = "/";
          } else {
          }
        })
        .catch(function (error) {});
    },
  },
};
</script>


<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>