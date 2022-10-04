<template>
    <div class="body-child">
        <div class="container">
            <div class="container bg-white">
                <div class="panel-body flex-row-space-between-center">
                    <div class="">
                        <button class="btn btn-primary text-white">
                            <router-link to="/saler">List Product</router-link>
                        </button>
                    </div>
                    <div class="">
                        <button class="btn btn-primary text-white">
                            <router-link :to="{ name: 'home.saler.products.create' }">Create New</router-link>
                        </button>
                    </div>
                </div>
                <div class="card-deck mb-3 text-center scroll-x">
                    <table class="table table-primary table-bdrs-5px">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Number</th>
                                <th scope="col">Master SKU</th>
                                <th scope="col">Master List Price</th>
                                <th scope="col">Master Sales Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="post in List" :key="post.id">
                                <td scope="row">{{ post.id }}</td>
                                <td>{{ post.name }}</td>
                                <td>{{ post.number }}</td>
                                <td>{{ post.master_sku }}</td>
                                <td>{{ post.master_list_price }}</td>
                                <td>{{ post.master_sales_price }}</td>
                                <td class="gap-10px">
                                    <router-link :to="{ name: 'home.saler.products.edit', params: { id: post.id } }">
                                        <b-button variant="primary">
                                            <i class="fa fa-edit"></i>
                                        </b-button>
                                    </router-link>
                                    <b-button variant="danger" @click="onDelete(post.id)">
                                        <i class="fa fa-trash"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="this.params.pages > 1" class="panel-footer">
                    <paginate v-model="params.page" :page-count="this.params.pages" :page-range="3" :margin-pages="2"
                        :click-handler="clickCallback" :prev-text="'<<'" :next-text="'>>'"
                        :container-class="'pagination'" :page-class="'page-item'">
                    </paginate>
                </div>
            </div>
        </div>
    </div>
    <!-- <router-view/> -->
</template>
<script>
import api from '@/plugin/axios';

export default {
    name: "ProductForm",
    components: {
        // HeaderTest,
    },
    data() {
        return {
            showFilter: false,
            products: [],
            currentSort: "time",
            currentSortDir: 1,
            search: {
                id: "",
                name: "",
                email: "",
            },
            page: {
                pageCount: 0,
                count: 1,
                per_page: 5,
            },
            params: {
                page: 1,
                per_page: 10,
                sort_column: "id",
                direction: "desc",
                search_column: "id",
                search_operator: "equal_to",
                search_query_1: "",
                search_query_2: "",
                q: {},
                pages: "",
            },
        };
    },
    beforeCreate() {
    },
    created() {
        this.getAll();
    },
    mounted() {
    },
    methods: {
        clickCallback(pageNum) {
            this.params.page = pageNum
            this.getAll()
        },
        prev() {
            if (this.model.prev_page_url) {
                this.params.page--;
                this.getAll();
            }
        },
        next() {
            if (this.model.next_page_url) {
                this.params.page--;
                this.getAll();
            }
        },
        async getAll() {
            await this.$store.dispatch("PROD/getAll", { page: this.params.page, per_page: this.params.per_page, q: {} })
            this.params.pages = this.$store.state.PROD.state.params.pages;
        },
        onDelete(productId) {
            this.$swal
                .fire({
                    title: "Delete?",
                    text: "You won't be able to revert this!",
                    icon: "question",
                    type: "warning",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!",
                    timer: 5000,
                    // closeOnConfirm: false,
                    // closeOnCancel: false
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        api
                            .delete(`/api/products`, { id: productId })
                            .then((res) => {
                                console.log(res)
                                if (res.data.success) {
                                    this.$swal.fire("Đã Xóa", "", "success");
                                    this.getAll();
                                }
                            });
                    }
                });
        },
    },
    watch: {},
    computed: {
        List() {
            return this.products = this.$store.state.PROD.state.products;
        },
        getPages() {
            return this.params.pages = this.$store.state.PROD.state.params.pages;
        },
    },
    // components: { HeaderApp },
};
</script>
<style>
table {
    border-radius: 6px;
}

table td,
table th {
    border: 1px solid #f5f5f5;
}

table th {
    background: var(--primary) !important;
    color: var(--white);
}

.pagination li,
.page-item {
    background: var(--white);
    height: 30px;
    width: 30px;
    font-weight: 30px;
    vertical-align: middle;
    border: 1px solid #000;
}

.page-item.active {
    background: var(--primary);
}
</style>
  