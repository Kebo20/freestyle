<template>
  <div>
    <a-button-group>
      <a-button type="primary"> <a-icon type="plus" />Añadir producto</a-button>
    </a-button-group>
    <br />
    <br />

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="onChangePage"
      :scroll="{ x: 700 }"
    >
      <span slot="active" slot-scope="text, record">
        <a-tag v-if="record.active == 1" color="blue">Activo </a-tag>
        <a-tag v-else color="red">Inactivo </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-tag
          color="blue"
          style="cursor: pointer"
          @click="active(record.idProduct)"
          ><a-icon type="eye"
        /></a-tag>
        <a-tag color="blue" style="cursor: pointer" @click="edit(record)"
          ><a-icon type="edit"
        /></a-tag>
        <a-popconfirm
          title="Seguro de eliminar este producto?"
          ok-text="Si"
          cancel-text="No"
          @confirm="delet(record.idProduct)"
        >
          <a-tag color="red" style="cursor: pointer"
            ><a-icon type="delete"
          /></a-tag>
        </a-popconfirm>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="Registrar Producto"
      @ok="handleOk"
    >
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item label='Nombre'>
          <a-input
            v-model="product.name"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: 'Por favor ingrese un nombre' },
                ],
              },
            ]"
            placeholder="Nombre"
          >
          </a-input>
        </a-form-item>
        <a-form-item label='Precio'>
          <a-input-number
            v-model="product.price"
            :min='1'
            v-decorator="[
              'price',
              {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese un precio',
                  },
                ],
              },
            ]"
            placeholder="Precio"
          >
          </a-input-number>
        </a-form-item>
      </a-form>
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
    title: "Precio",
    dataIndex: "price",
    sorter: true,
    width: "20%",
  },
  {
    title: "Precio antiguo",
    dataIndex: "price_old",
    sorter: true,
    width: "20%",
  },
  {
    title: "Categoría",
    dataIndex: "category_name",
    sorter: true,
  },
  {
    title: "Estado",
    key: "active",
    scopedSlots: { customRender: "active" },
  },
  {
    title: "Acciones",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

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
    };
  },

  mounted() {
    this.products();
    this.categories();
  },
  computed() {},
  methods: {
    clean() {
      let me = this;
      me.product = {
        name: "",
        brand: "",
        price: "",
        units: "",
        id_category: "",
        category: {},
      };
    },

    handleCancel() {
      let me = this;

      me.visible = false;
    },

    handleSubmit(e) {
      e.preventDefault();
      let me = this;

      this.form.validateFields((err, values) => {
        if (!err) {
          alert();
        }
      });
    },

    edit(product) {
      let me = this;
      me.product = product;
      me.visible = true;
    },
    delet(id) {
      let me = this;
      me.id = id;
      axios
        .delete("/auth/products/" + me.id)
        .then(function (response) {
          console.log(response);
          if (response) {
            me.$message.success(response.data.message);

            me.products();
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
        .post("/auth/products/active/" + me.id)
        .then(function (response) {
          console.log(response);
          if (response) {
            me.products();
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

    products() {
      let me = this;
      me.loading = true;

      axios
        .get("/auth/products?page=" + me.page)
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
    categories() {
      let me = this;
      axios
        .get("/auth/categories")
        .then(function (response) {
          me.arrayCategories = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getProduct(id) {
      let me = this;
      axios
        .get("/auth/products/" + id)
        .then(function (response) {
          me.product = response.data.data;

          me.category = { id_category: me.product.id_category };
          me.id = id;
          me.accion = 2;
          me.modal = 1;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validate() {
      let me = this;
      let count = 0;

      if (me.product.name == "") {
        swal("Datos incompletos", "Ingrese un nombre", "warning");
        count = 1;
      }
      if (me.product.price == "") {
        swal("Datos incompletos", "Ingrese el precio del producto", "warning");
        count = 1;
      }
      if (me.category.id_category == "") {
        swal("Datos incompletos", "Seleccione una categoría", "warning");
        count = 1;
      }

      return count;
    },

    save() {
      let me = this;
      if (this.validate() > 0) {
        return false;
      }
      if (me.accion == 1) {
        axios
          .post("/auth/products", {
            code: me.product.code,
            name: me.product.name,
            brand: me.product.brand,
            price: me.product.price,
            price_min: me.product.price_min,
            price2: me.product.price2,

            id_category: me.category.id_category,
            units: me.product.units,
          })
          .then(function (response) {
            me.products();
            if (response) {
              swal("Correcto", response.data.message, "success");
            } else {
              swal("Error ", response.message, "error");
            }
          })
          .catch(function (error) {
            console.log(error.response);
            swal("Error ", error.response.data.message, "error");
          });
        me.modal = 0;
      } else {
        axios
          .put("/auth/products/" + me.id, {
            code: me.product.code,
            name: me.product.name,
            brand: me.product.brand,
            price_min: me.product.price_min,
            price: me.product.price,
            price2: me.product.price2,

            id_category: me.category.id_category,
            units: me.product.units,
          })
          .then(function (response) {
            me.products();
            if (response) {
              swal("Correcto", response.data.message, "success");
            } else {
              swal("Error ", response.message, "error");
            }
          })
          .catch(function (error) {
            console.log(error.response);
            swal("Error ", error.response.data.message, "error");
          });

        me.modal = 0;
      }
    },

    validator(val) {
      return val ? val.length > 0 : false;
    },

    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
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
</style>