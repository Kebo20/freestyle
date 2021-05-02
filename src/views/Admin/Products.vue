<template>
  <div>
    <a-button-group>
      <a-button type="primary" @click="openModal">
        <a-icon type="plus" />Añadir producto</a-button
      >
    </a-button-group>
    <br />
    <br />
<a-card>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="onChangePage"
      :scroll="{ x: 700 }"
    >
      <span slot="novelty" slot-scope="text, record">
        <a-checkbox :checked="record.novelty == 1 ? true : false" color="blue">
        </a-checkbox>
      </span>
      <span slot="active" slot-scope="text, record">
        <a-tag v-if="record.active == 1" color="blue">Activo </a-tag>
        <a-tag v-else color="red">Inactivo </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-tag
          color="blue"
          style="cursor: pointer"
          @click="active(record.idProduct)"
          ><a-icon type="reload"
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
</a-card>    
    <a-modal
      v-model="visible"
      :title="accion == 1 ? 'Registrar Producto' : 'Actualizar Producto'"
      @ok="handleSubmit"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="Foto del producto">
          <a-upload
            name="file_to_upload"
            list-type="picture-card"
            class="avatar-uploader"
            :action="this.$store.state.api_url+'/api/auth/files/storage'"
            :show-upload-list='false'
            :before-upload="beforeUpload"
            :headers="headers"
            @change="handleChangeUpload"
          >
            <img
              v-if="image"
              width="200px"
              :src="this.$store.state.api_url+image"
              alt="Imagen"
            />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Subir</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="idProduct" style="display: none">
          <a-input
            v-decorator="[
              'idProduct',
              {
                rules: [
                  { required: false, message: 'Por favor ingrese un nombre' },
                ],
              },
            ]"
            placeholder="Nombre"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Nombre">
          <a-input
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
        <a-form-item label="Precio">
          <a-input-number
            :min="1"
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
            placeholder="0.00"
          >
          </a-input-number>
        </a-form-item>

        <a-form-item label="Precio antiguo">
          <a-input-number
            :min="1"
            v-decorator="[
              'price_old',
              {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese un precio',
                  },
                ],
              },
            ]"
            placeholder="0.00"
          >
          </a-input-number>
        </a-form-item>
        <a-form-item label="Categoría">
          <a-select
            :min="1"
            show-search
            option-filter-prop="children"
            :filter-option="filterOption"
            v-decorator="[
              'idCategory',
              {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione una categoría',
                  },
                ],
              },
            ]"
            placeholder="0.00"
          >
            <a-select-option
              v-for="category in arrayCategories"
              :key="category.idCategory"
              :value="category.idCategory"
            >
              {{ category.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Novedad">
          <a-checkbox
            v-decorator="[
            'novelty',
           {
            valuePropName: 'checked',

           }]
          "
          >
          </a-checkbox>

          <!-- <a-button key="back" @click="handleCancel"> Cerrar </a-button>
          <a-button class="btn-primary" type="primary" html-type="submit">
            <a-icon type="save" /> Guardar
          </a-button> -->
        </a-form-item>
      </a-form>
      <!-- <template slot="footer">
        <a-button key="back" @click="handleCancel"> Cerrar </a-button>
        <a-button class="btn-primary" type="primary" html-type="submit">
          <a-icon type="save" /> Guardar
        </a-button>
        <div></div>
      </template> -->
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
    width: "25%",
    // scopedSlots: { customRender: "name" },
  },
  {
    title: "Precio",
    dataIndex: "price",
    sorter: true,
    width: "10%",
  },
  {
    title: "Precio antiguo",
    dataIndex: "price_old",
    sorter: true,
    width: "10%",
  },
  {
    title: "Categoría",
    dataIndex: "category_name",
    sorter: true,
    width: "20%",

  },
  {
    title: "Novedades",
    key: "novelty",
    scopedSlots: { customRender: "novelty" },
    width: "10%",

  },

  {
    title: "Estado",
    key: "active",
    scopedSlots: { customRender: "active" },
    width: "10%",

  },
  {
    title: "Acciones",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "15%",

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
      accion:0,
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
    this.products();
    this.categories();
  },
  computed() {},
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
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
        .get("/auth/categories/list")
        .then(function (response) {
          me.arrayCategories = response.data.data;
          console.log(response.data.data);
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

    save(product) {
      let me = this;

      if (me.accion == 1) {
        axios
          .post("/auth/products", {
            name: product.name,
            brand: product.brand,
            price: product.price,
            price_old: product.price_old,
            idCategory: product.idCategory,
            image: product.image,
            novelty: product.novelty,
          })
          .then(function (response) {
            me.products();
            if (response) {
              me.form.resetFields();
              me.image = "";

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
          .put("/auth/products/" + product.idProduct, {
            name: product.name,
            brand: product.brand,
            price: product.price,
            price_old: product.price_old,
            idCategory: product.idCategory,
            image: product.image,
            novelty: product.novelty,
          })
          .then(function (response) {
            me.products();
            if (response) {
              me.form.resetFields();
              me.image = "";

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

    handleChangeUpload(info) {
      let me = this;

      if (info.file.status === "uploading") {
        me.loading = true;
        return;
      }
      if (info.file.status === "done") {
        me.image = info.file.response.url;

        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, (imageUrl) => {
        //  me.imageUrl = imageUrl;
        //
        //

        // });
        me.loading = false;
        me.$message.success(
          "La imagen " + info.file.response.name + " se cargo correctamente"
        );
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
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