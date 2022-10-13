<template>
  <div class="flex-column-space-between-center">
    <img
      v-if="
        (this.avatar === null) &
        (this.$store.state.AUTH.state.user.sex_id === 1)
      "
      class="avatar mgb-10px"
      src="@/assets/images/icons/avatar-boy.png"
      alt=""
    />
    <img
      v-if="
        (this.avatar === null) &
        (this.$store.state.AUTH.state.user.sex_id === 2)
      "
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
      // update images
      avatar: this.$store.state.AUTH.state.user.avatar_url,
      inputPicture: null,
      res:{
        is_res:"",
        status:"",
        message:""
      },
      user: null,
      
      
    };
  },
  created() {
    this.getData();
  },
  computed: {
  },
  methods: {
    ...mapActionsAUTH.mapActions(["updateAvatar", "profile"]),
    // Saving the file in our data to send it !
    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
      this.avatar = URL.createObjectURL(this.$refs.inputFile.files[0]);
    },

    // Collecting everything inside our FormData object
    async update() {
      if (this.inputPicture === null) {
        this.$swal.fire("You haven't selected a photo yet!", "", "error");
      } else {
        let formData = new FormData();
        formData.append("file", this.inputPicture);
        const input = {
          file: formData,
          data: this.user
        };
        await this.updateAvatar(input).then(() => {
          this.getData()
          .then(() => {
            this.$swal.fire(this.res.message, "", this.res.status);
          })
        });
      }
    },
    async getData() {
      await this.profile()
      .then(() => {
        this.user = this.$store.state.AUTH.state.user;
        this.avatar = this.$store.state.AUTH.state.user.avatar_url;
        this.res.is_res = this.$store.state.AUTH.state.res.is_res;
        this.res.status = this.$store.state.AUTH.state.res.status;
        this.res.message = this.$store.state.AUTH.state.res.message;
      })
        
      // return this.avatar = this.$store.state.AUTH.state.user.avatar_url;
    }
  },
};
</script>