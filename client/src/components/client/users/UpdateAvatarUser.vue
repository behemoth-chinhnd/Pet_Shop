<template>
  <div class="flex-column-space-between-center">
    <img
      v-if="this.avatar === null"
      class="avatar mgb-10px"
      src="@/assets/images/icons/avatar-boy.png"
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
    <button class="btn submit mgb-10px" @click="updateAvatar()">Update</button>
    <p>
      Dụng lượng file tối đa 1 MB <br />
      Định dạng:.JPEG, .PNG
    </p>
  </div>
</template>
<script>
export default {
  name: "UpdateAvatar",
  data() {
    return {
      // update images
      avatar: null,
      inputPicture: null,
    };
  },
  created() {
    this.runStart();
  },
  computed: {
  },
  methods: {
    // Saving the file in our data to send it !
    uploadFile: function () {
      this.inputPicture = this.$refs.inputFile.files[0];
    },

    // Collecting everything inside our FormData object
    updateAvatar() {
      const params = {
        picture: this.inputPicture,
      };

      let formData = new FormData();

      Object.entries(params).forEach(([key, value]) =>
        formData.append(key, value)
      );

      // Finally, sending the POST request with our beloved Axios
      this.$request
        .post("http://localhost:3000/api/user", formData)
        .then((res) => {
          console.log(res);
        });
    },
    
  },
};
</script>