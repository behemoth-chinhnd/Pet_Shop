<template>
  <!-- <div class="body"> -->
  <!-- <section id="main-body"> -->
  <div class="login-admin">
    <!-- <h1>{{ user.username }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.password }}</h1>
    <h1>{{ $store.state.user.token }}</h1> -->

    <!-- <br /> -->

    <header class="top-header"></header>

    <div id="mainCoantiner">
      <div class="main-header">
        <div class="header-social">
          <ul>
            <li><a id="nmberone">1</a></li>
            <li><a id="nmbertwo">2</a></li>
            <li><a id="numberthree">3</a></li>
            <li><a>4</a></li>
          </ul>
        </div>
        <div class="folio-btn">
          <a class="folio-btn-item ajax" href="#"
            ><span class="folio-btn-dot"></span><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span><span class="folio-btn-dot"></span
            ><span class="folio-btn-dot"></span
          ></a>
        </div>
      </div>

      <!--dust particel-->
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      <!--Dust particle end--->

      <div class="container text-center text-dark mt-5">
        <div class="row">
          <div class="col-lg-4 d-block mx-auto mt-5">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-md-12">
                <div class="card">
                  <div class="card-body wow-bg" id="formBg">
                    <h3 class="colorboard">ADMIN PANEL</h3>

                    <p class="text-muted">Sign In to your account</p>
                    <p v-if="isError" class="error">{{ this.error }}</p>
                    <p v-if="isSuccess" class="success">{{ this.success }}</p>

                    <div class="input-group mb-3">
                      <input
                        type="email"
                        name="email"
                        class="form-control textbox-dg"
                        placeholder="Email"
                        v-model="email"
                      />
                    </div>
                    <div class="input-group mb-4">
                      <input
                        type="password"
                        class="form-control textbox-dg"
                        placeholder="Password"
                        v-model="password"
                      />
                    </div>

                    <div class="row">
                      <div class="col-12">
                        <button
                          type="button"
                          class="btn btn-primary btn-block logn-btn"
                          @click="submit"
                        >
                          Login
                        </button>
                      </div>
                      <div class="col-12">
                        <a href="#" class="btn btn-link box-shadow-0 px-0"
                          >Forgot password?</a
                        >
                      </div>
                    </div>

                    <div class="mt-6 btn-list">
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-facebook fb-color"
                      >
                        <i class="fab fa-facebook-f faa-ring animated"></i>
                      </button>
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-google incolor"
                      >
                        <i class="fab fa-linkedin-in faa-flash animated"></i>
                      </button>
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-twitter tweetcolor"
                      >
                        <i class="fab fa-twitter faa-shake animated"></i>
                      </button>
                      <button
                        type="button"
                        class="socila-btn btn btn-icon btn-dribbble driblecolor"
                      >
                        <i class="fab fa-dribbble faa-pulse animated"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <form action="" class="needs-validation text-left" novalidate>
        <div class="form-group row">
          <label for="inputEmail" class="col-md-3 col-form-label">Email</label>
          <input type="email" class="form-control" v-model="email" />
        </div>

        <div class="form-group row">
          <label for="inputEmail" class="col-md-3 col-form-label">Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group gap-10px">
          <button class="btn btn-primary" @click="submit">button</button>
          <button class="btn btn-danger" @click="logoutUser">Logout</button>
        </div>
      </form> -->
  </div>
  <!-- </section> -->
  <!-- </div> -->
</template>

<script>
// import "@/assets/js/login.js";
export default {
  data() {
    return {
      error: "",
      isError: false,
      success: "",
      isSuccess: false,
      id: "",
      username: "",
      email: "",
      password: "",
      user: {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        username: "",
      },
    };
  },
  created() {
    console.log(this.user.email);
    this.checkUser();
  },
  mounted() {},

  methods: {
    logoutUser() {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("login");
    },
    checkUser() {
      console.log(this.user.email);
      this.$request
        .post("http://localhost:8000/api/client", {
          email: this.user.email,

          // password: this.password,
        })
        .then((res) => {
          // console.log(res);

          if (!res.data.success) {
            console.log(res.data.success);
            console.log(res.status);
          }

          if (res.data.success) {
            // console.log(res.data.token);
            console.log(res.data.user.login);
            // localStorage.setItem("token", res.data.user.token);
            localStorage.setItem("login", "online");
            this.user.username = res.data.user.username;
            this.user.password = res.data.user.password;

            // this.user.name = res.data.user.name;
            // console.log(this.user.name);
            // this.user.token = localStorage.getItem("token");
            // this.user.name = res.data.user.name;
            // console.log(token);
            // this.$router.push("/products");
          }
        });
    },
    reset() {
      this.password = "";
    },
    submit() {
      //       const axios = require("axios").default;

      //       const self = this;
      //       axios
      var md5 = require("md5");
      this.password = md5(this.password);
      console.log(this.password);
      this.$request
        .post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);

          if (!res.data.success) {
            this.isError = true;
            this.isSuccess = false;
            this.error = "Email or Password is not correct";
            this.success = "";
            this.reset();
            console.log(res.data.success);
            console.log(res.status);
          }

          if (res.data.success) {
            this.isError = false;
            this.isSuccess = true;
            console.log(res.data.login);
            console.log(res.data.token);
            console.log(res.data.user.email);
            this.error = "";
            this.success = "Successful Login!";
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("login", "online");
            this.user.name = res.data.user.name;
            console.log(this.user.name);
            this.user.token = localStorage.getItem("token");
            // this.$router.push({ name: "users.list" });
            this.reset();
            // this.$router.push({ name: "admin.management.users" });
            window.location.href = "/admin/management/users";

            // this.user.name = res.data.user.name;
            // console.log(token);
            // this.$router.push("/products");
          }
        });
    },
  },
};
</script>
<style scoped>
p.error {
  margin: 10px auto;
  color: red;
}

p.success {
  background: none;
  color: #00ffaaed;
}
body {
  background-color: #181828;
}

.top-header:before {
  background-image: url(@/assets/images/admin/login/header-footer-gradient-bg.png);
}
.top-header:before {
  content: "";
  display: block;
  width: 100%;
  height: 4px;
  background-repeat: repeat-x;
  background-size: contain;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
}

#mainCoantiner {
  background-color: #181828;
  height: 100%;
  width: 100%;
  padding-bottom: 50px;
  top: 0;
  bottom: 0;
  position: fixed;
}

.mystyleSec {
  background-image: url(@/assets/images/admin/login/h.jpg);
}

.mystylethird {
  /* background-image: url(""); */
}
/*************header*******/

.main-header {
  top: 0;
  left: 0;
  z-index: 20;
  -webkit-transform: translate3d(0, 0, 0);
  height: 70px;
  width: 100%;
  bottom: inherit;
  text-align: center;
  background: rgba(28, 31, 47, 0.16);
  overflow: hidden;
  border: 1px solid #2e344d;
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  box-shadow: 10px 10px 36px rgb(0, 0, 0, 0.5), -13px -13px 23px rgba(255, 255, 255, 0.03);
  border-width: 1px 0px 0 1px;
}

.folio-btn {
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  right: 0;
  height: 70px;
  width: 70px;
}

.folio-btn-item {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 15px;
  top: 15px;
}

.folio-btn-dot {
  float: left;
  width: 33.3%;
  height: 33.3%;
  position: relative;
}

.folio-btn-dot:before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 4px;
  margin: -2px 0 0 -2px;
  border-radius: 50%;
  transition: all 300ms linear;
  transform: scale(1);
}

.folio-btn-dot:before {
  background: #00bcd4;
}

.folio-btn:hover .folio-btn-dot:first-child:before,
.folio-btn:hover .folio-btn-dot:nth-child(3):before,
.folio-btn:hover .folio-btn-dot:nth-child(4):before,
.folio-btn:hover .folio-btn-dot:nth-child(8):before {
  transform: scale(1.8);
  opacity: 0.5;
}

/***social***/
.header-social {
  position: absolute;
  z-index: 20;
  width: auto;
  bottom: 17px;
  right: 90px;
  padding: 0;
  min-width: 140px;
  box-shadow: 3px 9px 16px rgb(0, 0, 0, 0.4), -3px -3px 10px rgba(255, 255, 255, 0.06),
    inset 14px 14px 26px rgb(0, 0, 0, 0.3), inset -3px -3px 15px rgba(255, 255, 255, 0.05);
  border-width: 1px 0px 0px 1px;
  border-style: solid;
  border-color: #2e344d;
}

.header-social:before {
  background: #00bcd4;
}

.header-social:before {
  content: "";
  position: absolute;
  left: 50%;
  top: -3px;
  width: 36px;
  margin-left: -18px;
  height: 6px;
}

.header-social li {
  display: block;
  float: left;
  margin-top: 0;
}

.header-social li a {
  width: 36px;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  font-size: 12px;
  border-style: solid;
  color: rgba(255, 255, 255, 0.41);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 300ms linear;
}

.header-social li a:hover {
  color: #00bcd4;
  cursor: pointer;
}

ul,
li {
  border: none;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
  text-decoration: none;
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

.main-header:before {
  content: "";
  position: absolute;
  left: 10px;
  width: 60px;
  height: 1px;
  bottom: 120px;
  background: rgba(255, 255, 255, 0.1);
}

/***end*****/

.card {
  border: none;
  border-radius: 30px;
  background-color: #14edaa;
}

.wow-bg {
  background-color: #141421;
  border: 1px solid #2e2e4c;
  box-shadow: 3px 9px 16px rgb(0, 0, 0, 0.4), -3px -3px 10px rgba(255, 255, 255, 0.06),
    inset 14px 14px 26px rgb(0, 0, 0, 0.3), inset -3px -3px 15px rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-top: 4px;
}

.starsec {
  content: " ";
  position: absolute;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 571px 173px #00bcd4, 1732px 143px #00bcd4, 1745px 454px #ff5722,
    234px 784px #00bcd4, 1793px 1123px #ff9800, 1076px 504px #03a9f4, 633px 601px #ff5722,
    350px 630px #ffeb3b, 1164px 782px #00bcd4, 76px 690px #3f51b5, 1825px 701px #cddc39,
    1646px 578px #ffeb3b, 544px 293px #2196f3, 445px 1061px #673ab7, 928px 47px #00bcd4,
    168px 1410px #8bc34a, 777px 782px #9c27b0, 1235px 1941px #9c27b0, 104px 1690px #8bc34a,
    1167px 1338px #e91e63, 345px 1652px #009688, 1682px 1196px #f44336,
    1995px 494px #8bc34a, 428px 798px #ff5722, 340px 1623px #f44336, 605px 349px #9c27b0,
    1339px 1344px #673ab7, 1102px 1745px #3f51b5, 1592px 1676px #2196f3,
    419px 1024px #ff9800, 630px 1033px #4caf50, 1995px 1644px #00bcd4,
    1092px 712px #9c27b0, 1355px 606px #f44336, 622px 1881px #cddc39, 1481px 621px #9e9e9e,
    19px 1348px #8bc34a, 864px 1780px #e91e63, 442px 1136px #2196f3, 67px 712px #ff5722,
    89px 1406px #f44336, 275px 321px #009688, 592px 630px #e91e63, 1012px 1690px #9c27b0,
    1749px 23px #673ab7, 94px 1542px #ffeb3b, 1201px 1657px #3f51b5, 1505px 692px #2196f3,
    1799px 601px #03a9f4, 656px 811px #00bcd4, 701px 597px #00bcd4, 1202px 46px #ff5722,
    890px 569px #ff5722, 1613px 813px #2196f3, 223px 252px #ff9800, 983px 1093px #f44336,
    726px 1029px #ffc107, 1764px 778px #cddc39, 622px 1643px #f44336, 174px 1559px #673ab7,
    212px 517px #00bcd4, 340px 505px #fff, 1700px 39px #fff, 1768px 516px #f44336,
    849px 391px #ff9800, 228px 1824px #fff, 1119px 1680px #ffc107, 812px 1480px #3f51b5,
    1438px 1585px #cddc39, 137px 1397px #fff, 1080px 456px #673ab7, 1208px 1437px #03a9f4,
    857px 281px #f44336, 1254px 1306px #cddc39, 987px 990px #4caf50, 1655px 911px #00bcd4,
    1102px 1216px #ff5722, 1807px 1044px #fff, 660px 435px #03a9f4, 299px 678px #4caf50,
    1193px 115px #ff9800, 918px 290px #cddc39, 1447px 1422px #ffeb3b, 91px 1273px #9c27b0,
    108px 223px #ffeb3b, 146px 754px #00bcd4, 461px 1446px #ff5722, 1004px 391px #673ab7,
    1529px 516px #f44336, 1206px 845px #cddc39, 347px 583px #009688, 1102px 1332px #f44336,
    709px 1756px #00bcd4, 1972px 248px #fff, 1669px 1344px #ff5722, 1132px 406px #f44336,
    320px 1076px #cddc39, 126px 943px #ffeb3b, 263px 604px #ff5722, 1546px 692px #f44336;
  animation: animStar 150s linear infinite;
}

.starthird {
  content: " ";
  position: absolute;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 571px 173px #00bcd4, 1732px 143px #00bcd4, 1745px 454px #ff5722,
    234px 784px #00bcd4, 1793px 1123px #ff9800, 1076px 504px #03a9f4, 633px 601px #ff5722,
    350px 630px #ffeb3b, 1164px 782px #00bcd4, 76px 690px #3f51b5, 1825px 701px #cddc39,
    1646px 578px #ffeb3b, 544px 293px #2196f3, 445px 1061px #673ab7, 928px 47px #00bcd4,
    168px 1410px #8bc34a, 777px 782px #9c27b0, 1235px 1941px #9c27b0, 104px 1690px #8bc34a,
    1167px 1338px #e91e63, 345px 1652px #009688, 1682px 1196px #f44336,
    1995px 494px #8bc34a, 428px 798px #ff5722, 340px 1623px #f44336, 605px 349px #9c27b0,
    1339px 1344px #673ab7, 1102px 1745px #3f51b5, 1592px 1676px #2196f3,
    419px 1024px #ff9800, 630px 1033px #4caf50, 1995px 1644px #00bcd4,
    1092px 712px #9c27b0, 1355px 606px #f44336, 622px 1881px #cddc39, 1481px 621px #9e9e9e,
    19px 1348px #8bc34a, 864px 1780px #e91e63, 442px 1136px #2196f3, 67px 712px #ff5722,
    89px 1406px #f44336, 275px 321px #009688, 592px 630px #e91e63, 1012px 1690px #9c27b0,
    1749px 23px #673ab7, 94px 1542px #ffeb3b, 1201px 1657px #3f51b5, 1505px 692px #2196f3,
    1799px 601px #03a9f4, 656px 811px #00bcd4, 701px 597px #00bcd4, 1202px 46px #ff5722,
    890px 569px #ff5722, 1613px 813px #2196f3, 223px 252px #ff9800, 983px 1093px #f44336,
    726px 1029px #ffc107, 1764px 778px #cddc39, 622px 1643px #f44336, 174px 1559px #673ab7,
    212px 517px #00bcd4, 340px 505px #fff, 1700px 39px #fff, 1768px 516px #f44336,
    849px 391px #ff9800, 228px 1824px #fff, 1119px 1680px #ffc107, 812px 1480px #3f51b5,
    1438px 1585px #cddc39, 137px 1397px #fff, 1080px 456px #673ab7, 1208px 1437px #03a9f4,
    857px 281px #f44336, 1254px 1306px #cddc39, 987px 990px #4caf50, 1655px 911px #00bcd4,
    1102px 1216px #ff5722, 1807px 1044px #fff, 660px 435px #03a9f4, 299px 678px #4caf50,
    1193px 115px #ff9800, 918px 290px #cddc39, 1447px 1422px #ffeb3b, 91px 1273px #9c27b0,
    108px 223px #ffeb3b, 146px 754px #00bcd4, 461px 1446px #ff5722, 1004px 391px #673ab7,
    1529px 516px #f44336, 1206px 845px #cddc39, 347px 583px #009688, 1102px 1332px #f44336,
    709px 1756px #00bcd4, 1972px 248px #fff, 1669px 1344px #ff5722, 1132px 406px #f44336,
    320px 1076px #cddc39, 126px 943px #ffeb3b, 263px 604px #ff5722, 1546px 692px #f44336;
  animation: animStar 10s linear infinite;
}

.starfourth {
  content: " ";
  position: absolute;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 571px 173px #00bcd4, 1732px 143px #00bcd4, 1745px 454px #ff5722,
    234px 784px #00bcd4, 1793px 1123px #ff9800, 1076px 504px #03a9f4, 633px 601px #ff5722,
    350px 630px #ffeb3b, 1164px 782px #00bcd4, 76px 690px #3f51b5, 1825px 701px #cddc39,
    1646px 578px #ffeb3b, 544px 293px #2196f3, 445px 1061px #673ab7, 928px 47px #00bcd4,
    168px 1410px #8bc34a, 777px 782px #9c27b0, 1235px 1941px #9c27b0, 104px 1690px #8bc34a,
    1167px 1338px #e91e63, 345px 1652px #009688, 1682px 1196px #f44336,
    1995px 494px #8bc34a, 428px 798px #ff5722, 340px 1623px #f44336, 605px 349px #9c27b0,
    1339px 1344px #673ab7, 1102px 1745px #3f51b5, 1592px 1676px #2196f3,
    419px 1024px #ff9800, 630px 1033px #4caf50, 1995px 1644px #00bcd4,
    1092px 712px #9c27b0, 1355px 606px #f44336, 622px 1881px #cddc39, 1481px 621px #9e9e9e,
    19px 1348px #8bc34a, 864px 1780px #e91e63, 442px 1136px #2196f3, 67px 712px #ff5722,
    89px 1406px #f44336, 275px 321px #009688, 592px 630px #e91e63, 1012px 1690px #9c27b0,
    1749px 23px #673ab7, 94px 1542px #ffeb3b, 1201px 1657px #3f51b5, 1505px 692px #2196f3,
    1799px 601px #03a9f4, 656px 811px #00bcd4, 701px 597px #00bcd4, 1202px 46px #ff5722,
    890px 569px #ff5722, 1613px 813px #2196f3, 223px 252px #ff9800, 983px 1093px #f44336,
    726px 1029px #ffc107, 1764px 778px #cddc39, 622px 1643px #f44336, 174px 1559px #673ab7,
    212px 517px #00bcd4, 340px 505px #fff, 1700px 39px #fff, 1768px 516px #f44336,
    849px 391px #ff9800, 228px 1824px #fff, 1119px 1680px #ffc107, 812px 1480px #3f51b5,
    1438px 1585px #cddc39, 137px 1397px #fff, 1080px 456px #673ab7, 1208px 1437px #03a9f4,
    857px 281px #f44336, 1254px 1306px #cddc39, 987px 990px #4caf50, 1655px 911px #00bcd4,
    1102px 1216px #ff5722, 1807px 1044px #fff, 660px 435px #03a9f4, 299px 678px #4caf50,
    1193px 115px #ff9800, 918px 290px #cddc39, 1447px 1422px #ffeb3b, 91px 1273px #9c27b0,
    108px 223px #ffeb3b, 146px 754px #00bcd4, 461px 1446px #ff5722, 1004px 391px #673ab7,
    1529px 516px #f44336, 1206px 845px #cddc39, 347px 583px #009688, 1102px 1332px #f44336,
    709px 1756px #00bcd4, 1972px 248px #fff, 1669px 1344px #ff5722, 1132px 406px #f44336,
    320px 1076px #cddc39, 126px 943px #ffeb3b, 263px 604px #ff5722, 1546px 692px #f44336;
  animation: animStar 50s linear infinite;
}

.starfifth {
  content: " ";
  position: absolute;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 571px 173px #00bcd4, 1732px 143px #00bcd4, 1745px 454px #ff5722,
    234px 784px #00bcd4, 1793px 1123px #ff9800, 1076px 504px #03a9f4, 633px 601px #ff5722,
    350px 630px #ffeb3b, 1164px 782px #00bcd4, 76px 690px #3f51b5, 1825px 701px #cddc39,
    1646px 578px #ffeb3b, 544px 293px #2196f3, 445px 1061px #673ab7, 928px 47px #00bcd4,
    168px 1410px #8bc34a, 777px 782px #9c27b0, 1235px 1941px #9c27b0, 104px 1690px #8bc34a,
    1167px 1338px #e91e63, 345px 1652px #009688, 1682px 1196px #f44336,
    1995px 494px #8bc34a, 428px 798px #ff5722, 340px 1623px #f44336, 605px 349px #9c27b0,
    1339px 1344px #673ab7, 1102px 1745px #3f51b5, 1592px 1676px #2196f3,
    419px 1024px #ff9800, 630px 1033px #4caf50, 1995px 1644px #00bcd4,
    1092px 712px #9c27b0, 1355px 606px #f44336, 622px 1881px #cddc39, 1481px 621px #9e9e9e,
    19px 1348px #8bc34a, 864px 1780px #e91e63, 442px 1136px #2196f3, 67px 712px #ff5722,
    89px 1406px #f44336, 275px 321px #009688, 592px 630px #e91e63, 1012px 1690px #9c27b0,
    1749px 23px #673ab7, 94px 1542px #ffeb3b, 1201px 1657px #3f51b5, 1505px 692px #2196f3,
    1799px 601px #03a9f4, 656px 811px #00bcd4, 701px 597px #00bcd4, 1202px 46px #ff5722,
    890px 569px #ff5722, 1613px 813px #2196f3, 223px 252px #ff9800, 983px 1093px #f44336,
    726px 1029px #ffc107, 1764px 778px #cddc39, 622px 1643px #f44336, 174px 1559px #673ab7,
    212px 517px #00bcd4, 340px 505px #fff, 1700px 39px #fff, 1768px 516px #f44336,
    849px 391px #ff9800, 228px 1824px #fff, 1119px 1680px #ffc107, 812px 1480px #3f51b5,
    1438px 1585px #cddc39, 137px 1397px #fff, 1080px 456px #673ab7, 1208px 1437px #03a9f4,
    857px 281px #f44336, 1254px 1306px #cddc39, 987px 990px #4caf50, 1655px 911px #00bcd4,
    1102px 1216px #ff5722, 1807px 1044px #fff, 660px 435px #03a9f4, 299px 678px #4caf50,
    1193px 115px #ff9800, 918px 290px #cddc39, 1447px 1422px #ffeb3b, 91px 1273px #9c27b0,
    108px 223px #ffeb3b, 146px 754px #00bcd4, 461px 1446px #ff5722, 1004px 391px #673ab7,
    1529px 516px #f44336, 1206px 845px #cddc39, 347px 583px #009688, 1102px 1332px #f44336,
    709px 1756px #00bcd4, 1972px 248px #fff, 1669px 1344px #ff5722, 1132px 406px #f44336,
    320px 1076px #cddc39, 126px 943px #ffeb3b, 263px 604px #ff5722, 1546px 692px #f44336;
  animation: animStar 80s linear infinite;
}

@keyframes animStar {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-2000px);
  }
}

.logn-btn {
  min-width: 140px;
  background: #1c1f2f;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid #2e344d;
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  /* box-shadow: 10px 10px 36px rgb(0,0,0,0.5), -13px -13px 23px rgba(255,255,255, 0.03), inset 14px 14px 70px rgb(0,0,0,0.2), inset -15px -15px 30px rgba(255,255,255, 0.04); */
  box-shadow: 0px 2px 26px rgb(0, 0, 0, 0.5), 0px 7px 13px rgba(255, 255, 255, 0.03);
  margin-top: 30px;
}

.logn-btn:hover {
  background-color: #1c1f2f;
  border-radius: 50px;
  min-width: 140px;
  /* box-shadow: 10px 10px 36px rgb(0,0,0,0.5), -13px -13px 23px rgba(255,255,255, 0.03), inset 14px 14px 70px rgb(0,0,0,0.2), inset -15px -15px 30px rgba(255,255,255, 0.04); */
  box-shadow: 3px 9px 16px rgb(0, 0, 0, 0.4), -3px -3px 10px rgba(255, 255, 255, 0.06),
    inset 14px 14px 26px rgb(0, 0, 0, 0.3), inset -3px -3px 15px rgba(255, 255, 255, 0.05);
  border-width: 1px 0px 0px 1px;
  border-style: solid;
  border-color: #2e344d;
}

.textbox-dg {
  background: rgba(28, 31, 47, 0.16);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #2e344d;
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  /* box-shadow: 10px 10px 36px rgb(0,0,0,0.5), -13px -13px 23px rgba(255,255,255, 0.03), inset 14px 14px 70px rgb(0,0,0,0.2), inset -15px -15px 30px rgba(255,255,255, 0.04); */
  box-shadow: 10px 10px 36px rgb(0, 0, 0, 0.5), -13px -13px 23px rgba(255, 255, 255, 0.03);
  border-width: 1px 0px 0 1px;
  margin-top: 15px;
}

.form-control:focus {
  border: 1px solid #344d2e;
  color: #495057;
  outline: 0;
  background: rgb(17, 20, 31);
  border-radius: 4px;
  transition: all 0.3s ease-in-out 0s;
  /* box-shadow: 10px 10px 36px rgb(0,0,0,0.5), -13px -13px 23px rgba(255,255,255, 0.03), inset 14px 14px 70px rgb(0,0,0,0.2), inset -15px -15px 30px rgba(255,255,255, 0.04); */
  box-shadow: 10px 10px 36px rgb(0, 0, 0, 0.5), -13px -13px 23px rgba(255, 255, 255, 0.03);
}

a.btn-link {
  color: #344d2e;
}

a.btn.btn-link:hover {
  color: #2b7a19;
  text-decoration: underline;
}

.btn-primary:not(:disabled):not(.disabled).active,
.btn-primary:not(:disabled):not(.disabled):active,
.show > .btn-primary.dropdown-toggle {
  color: #807f7f;
  background-color: transparent;
  border-color: #2b7a19;
}

.btn-primary.focus,
.btn-primary:focus {
  color: #fff;
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem rgba(0, 255, 110, 0.25);
}

.mt-6,
.my-6 {
  margin-top: 2rem !important;
}

button.socila-btn {
  height: 40px;
  border-radius: 10%;
  width: 40px;
  box-shadow: 3px 9px 16px rgb(0, 0, 0, 0.4), -3px -3px 10px rgba(255, 255, 255, 0.06),
    inset 14px 14px 26px rgb(0, 0, 0, 0.3), inset -3px -3px 15px rgba(255, 255, 255, 0.05);
  border-width: 1px 0px 0px 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.2);
  margin-right: 10px;
}

button.fb-color {
  color: #3b5998;
}

.incolor {
  color: #007bff;
}

.tweetcolor {
  color: #41a4f7;
}
.driblecolor {
  color: #e83e8c;
}

.colorboard {
  color: #00ffaaed;
}
</style>
