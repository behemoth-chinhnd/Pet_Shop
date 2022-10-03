<template>
    <div class="body">
        <div class="container">
            <div class="login-user bg-white">
                <div class="container">
                    <h1 class="center color-primary">PROFILE USER</h1>
                    <form action="" @submit.prevent="login()" class="needs-validation text-left" novalidate>
                        <div class="form-group row flex-row-start-center">
                            <label for="name" class="col-md-3 col-form-label">Name:</label>
                            <p id="name" class=" col-md-9">{{this.$store.state.AUTH.state.user.name}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="email" class="col-md-3 col-form-label">Email:</label>
                            <p id="email" class=" col-md-9">{{this.$store.state.AUTH.state.user.email}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="phone" class="col-md-3 col-form-label">Phone:</label>
                            <p id="phone" class=" col-md-9">{{this.phone}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="sex" class="col-md-3 col-form-label">Sex:</label>
                            <p id="sex" class=" col-md-9">{{this.sex}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="birthday" class="col-md-3 col-form-label">Birthday:</label>
                            <p id="birthday" class=" col-md-9">{{this.$store.state.AUTH.state.user.birthday}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="address" class="col-md-3 col-form-label">Address:</label>
                            <p id="address" class=" col-md-9">{{this.address_user}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="type_user" class="col-md-3 col-form-label">User Type:</label>
                            <p id="type_user" class=" col-md-9">{{this.type_user}}</p>
                        </div>
                        <div class="form-group row flex-row-start-center">
                            <label for="created" class="col-md-3 col-form-label">Created:</label>
                            <p id="created" class=" col-md-9">{{this.created_at}}</p>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ProfileUser",
    data() {
        return {
            email: '',
            password: '',
            sex: "",
            phone: null,
            type_user:"",
            address_user: null ,
            created_at: "",
        };
    },
    created() {
        this.isActive();
        const sex_id = this.$store.state.AUTH.state.user.sex_id;
        this.sexUser(sex_id);
        const phone = this.$store.state.AUTH.state.user.phone;
        this.phoneUser(phone)
        const type = this.$store.state.AUTH.state.user.user_type;
        this.typeUser(type)
        const address = this.$store.state.AUTH.state.user.address;
        this.addressUser(address)
        this.created_at = this.$store.state.AUTH.state.user.created_at.slice(0,10)
    },
    computed: {},
    methods: {
        sexUser(sex_id) {
            if (sex_id === 1) {
                return this.sex = "Male";
            } else if (sex_id === 2) {
                this.sex = "Female";
            } else {
                return this.$sex = "Unknown";
            }
        },
        phoneUser(phone) {
            if (phone === null) {
                return this.phone = "Empty";
            } else {
                return this.phone = phone;
            }
        },
        typeUser(type) {
            if (type === 1) {
                return this.type_user = "Member";
            } else if (type === 2) {
                return this.type_user = "Saler";
            } else {
                return this.type_user = "Unknow";
            }
        },
        addressUser(address) {
            if (address === null) {
                return this.address_user = "Empty";
            } else {
                return this.address_user = address;
            }
        },
        isActive() {
            if (!this.$store.state.AUTH.state.isActive) {
                window.location.href = "/login";
            }
        },
    },
};
</script>
<style scoped>
    label{
        font-weight: 800;
    }
.login-user {
    width: 500px;
    margin: 0 auto;
    border: 1px solid #a4a4a4;
}

.form-group {
    margin-bottom: 10px;
}
</style>
      