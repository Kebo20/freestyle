<template>
  <div>
    <br />
    <br />

    <a-row v-show="this.$store.state.responsive ? false : true">
      <a-col :xs="8">
        <router-link to="/admin/products">
          <a-card
            :bordered="false"
            :hover="true"
            class="card-admin"
            style="width: 80%"
          >
            <a-row>
              <a-col :xs="8">
                <a-icon type="shop" style="font-size: 80px" theme="twoTone" />
              </a-col>

              <a-col :xs="12">
                <p>Productos</p>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </a-col>

      <a-col :xs="8">
        <router-link to="/admin/categories">
          <a-card
            :bordered="false"
            :hover="true"
            class="card-admin"
            style="width: 80%"
          >
            <a-row>
              <a-col :xs="8">
                <a-icon
                  type="file-text"
                  style="font-size: 80px"
                  theme="twoTone"
                />
              </a-col>

              <a-col :xs="12">
                <p>Categorias</p>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </a-col>

      <a-col :xs="8">
        <router-link to="/admin/products">
          <a-card
            :bordered="false"
            :hover="true"
            class="card-admin"
            style="width: 80%"
          >
            <a-row>
              <a-col :xs="8">
                <a-icon
                  type="file-text"
                  style="font-size: 80px"
                  theme="twoTone"
                />
              </a-col>
              <a-col :xs="8">
                <p>Almacén</p>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
      <a-row v-show="this.$store.state.responsive ? true : false">
      <a-col :xs="24">
        <router-link to="/admin/products">
          <a-card
            :bordered="false"
            :hover="true"
            class="card-admin"
            style="width: 80%"
          >
            <a-row>
              <a-col :xs="8">
                <a-icon type="shop" style="font-size: 60px" theme="twoTone" />
              </a-col>

              <a-col :xs="12">
                <p>Productos</p>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </a-col>

      <a-col :xs="24">
        <router-link to="/admin/categories">
          <a-card
            :bordered="false"
            :hover="true"
            class="card-admin"
            style="width: 80%"
          >
            <a-row>
              <a-col :xs="8">
                <a-icon
                  type="file-text"
                  style="font-size: 60px"
                  theme="twoTone"
                />
              </a-col>

              <a-col :xs="12">
                <p>Categorias</p>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </a-col>

      <a-col :xs="24">
        <router-link to="/admin/products">
          <a-card
            :bordered="false"
            :hover="true"
            class="card-admin"
            style="width: 80%"
          >
            <a-row>
              <a-col :xs="8">
                <a-icon
                  type="file-text"
                  style="font-size: 60px"
                  theme="twoTone"
                />
              </a-col>
              <a-col :xs="8">
                <p>Almacén</p>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>


<script>
import axios from "../../Config/axios";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    // scopedSlots: { customRender: "name" },
  },

  {
    title: "Acciones",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "Product",
  components: {},

  data() {
    return {
      arrayProducts: [],
      product: {
        code: "",
        name: "",
        brand: "",
        price: "",
        price_old: "",
        price2: "",
        units: "",
        id_category: "",
      },
      category: {},
      arrayCategories: [],
      visible: false,
      rol: this.$store.state.rol,
      page: 1,
      data: [],
      pagination: {},
      loading: false,
      columns,
      image: "",
      form: this.$form.createForm(this, { name: "normal_login" }),
      headers: {
        Authorization: "Bearer " + this.$store.state.token,
      },
    };
  },

  mounted() {
    this.categories();
  },
  computed() {},
  methods: {
    openModal() {
      let me = this;
      me.visible = true;
      me.form.resetFields();
      me.image = "";
      me.accion = 1;
    },
    handleCancel() {
      let me = this;

      me.visible = false;
    },

    handleSubmit(e) {
      e.preventDefault();
      let me = this;

      me.form.validateFields((err, values) => {
        if (!err) {
          values.image = me.image;
          me.save(values);
        }
      });
    },

    edit(product) {
      let me = this;
      me.visible = true;
      me.accion = 2;
      me.image = product.image;
      setTimeout(() => {
        this.form.setFieldsValue(product);
      }, 300);
    },
    delet(id) {
      let me = this;
      me.id = id;
      axios
        .delete("/auth/categories/" + me.id)
        .then(function (response) {
          console.log(response);
          if (response) {
            me.$message.success(response.data.message);

            me.categories();
          } else {
            me.$message.error(error.response.data.message);
          }
        })
        .catch(function (error) {
          me.$message.error(error.response.data.message);
        });
    },

    active(id) {
      let me = this;
      me.id = id;
      axios
        .post("/auth/categories/active/" + me.id)
        .then(function (response) {
          console.log(response);
          if (response) {
            me.categories();
            me.$message.success(response.data.message);
          } else {
            me.$message.error(error.response.data.message);
          }
        })
        .catch(function (error) {
          me.$message.error(error.response.data.message);
        });
    },

    closeModal(status, evt, accept) {
      if (accept) {
        alert("ok");
      }
    },

    categories() {
      let me = this;
      me.loading = true;

      axios
        .get("/auth/categories?page=" + me.page)
        .then(function (response) {
          let data = response.data;
          const pagination = { ...me.pagination };
          pagination.total = data.meta.total;
          pagination.pageSize = data.meta.per_page;

          me.data = data.data;
          me.pagination = pagination;

          me.loading = false;
        })
        .catch(function (error) {
          me.loading = false;
        });
    },
    onChangePage(current, pageSize) {
      let me = this;
      me.page = current.current;
      me.products();
    },

    save(category) {
      let me = this;

      if (me.accion == 1) {
        axios
          .post("/auth/categories", {
            name: category.name,
          })
          .then(function (response) {
            me.categories();
            if (response) {
              me.form.resetFields();

              me.$message.success(response.data.message);

              me.visible = false;
            } else {
              me.$message.error(response.data.message);
            }
          })
          .catch(function (error) {
            me.$message.error(error.response.data.message);
          });
      } else {
        axios
          .put("/auth/categories/" + category.idCategory, {
            name: category.name,
          })
          .then(function (response) {
            me.categories();
            if (response) {
              me.form.resetFields();

              me.$message.success(response.data.message);
              me.visible = false;
            } else {
              me.$message.error(response.data.message);
            }
          })
          .catch(function (error) {
            me.$message.error(error.response.data.message);
          });
      }
    },

    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
  },
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>