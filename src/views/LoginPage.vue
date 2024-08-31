<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const APIurl = 'https://todolist-api.hexschool.io'
const userDatasSingIn = ref({
  email: '',
  password: ''
})
const signinResMes = ref('')
const checkLoginData = ref({
  Authorization: ''
})
const todoSignIn = () => {
  fetch(`${APIurl}/users/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDatasSingIn.value)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      signinResMes.value = data
      checkLoginData.value.Authorization = data.token
      document.cookie = `token=${checkLoginData.value.Authorization}`
      console.log(checkLoginData.value.Authorization)
      router.push('/TodoPage')
    })
    .catch((error) => console.error('Error:', error))
}
</script>
<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="userDatasSingIn.email"
            required
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="userDatasSingIn.password"
            required
          />

          <input class="formControls_btnSubmit" type="button" @click="todoSignIn" value="登入" />
          <RouterLink to="signUpPage"><a class="formControls_btnLink"> 註冊帳號</a></RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
