<template>
  <div class="flex-column-space-between-center">
    <img
      v-if="(this.avatar === null) & (this.sex_id === 1)"
      class="avatar mgb-10px"
      src="@/assets/images/icons/avatar-boy.png"
      alt=""
    />
    <img
      v-if="(this.avatar === null) & (this.sex_id === 2)"
      class="avatar mgb-10px"
      src="@/assets/images/icons/avatar-girl.png"
      alt=""
    />
    <img
      v-if="this.avatar !== null"
      class="avatar mgb-10px"
      :src="this.avatar"
      alt=""
    />

    <div class="input-avatar mgb-10px">
      <label for="inputFile">Choose File</label>
      <input
        id="inputFile"
        type="file"
        ref="inputFile"
        @change="uploadFile()"
      />
    </div>
    <button class="btn submit mgb-10px" @click="update()">Update</button>
    <p>
      Dụng lượng file tối đa 1 MB <br />
      Định dạng:.JPEG, .PNG
    </p>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const mapActionsAUTH = createNamespacedHelpers("AUTH");

export default {
  name: "UpdateAvatar",
  data() {
    return {
      namePage: "Update Avatar",
      user: null,
      avatar: null,
      sex_id: null,
      inputPicture: null,
    };
  },
  created() {
    this.getProfile();
  },
  computed: {},
  methods: {
    ...mapActionsAUTH.mapActions(["updateAvatar", "profile"]),

    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.avatar = URL.createObjectURL(this.$refs.inputFile.files[0]);
    },

    async update() {
      if (this.inputPicture === null) {
        this.$swal.fire("You haven't selected a photo yet!", "", "error");
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        const input = {
          file: formData,
          data: this.user,
        };
        const res = await this.updateAvatar(input);
        this.errors = res.errors;
        this.$swal.fire(
          this.namePage + " " + res.alert.message,
          "",
          res.alert.status
        );
        this.getProfile();
      }
    },

    async getProfile() {
      const res = await this.profile();
      if (res.errors) {
        this.errors = res.errors;
        this.$swal.fire("Errors", "", res.alert.status);
      } else {
        this.user = res;
        this.avatar = this.user.avatar_url;
        this.sex_id = this.user.sex_id;
      }
    },
  },
};
</script>