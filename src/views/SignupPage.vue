<script setup>
import { ref } from 'vue'
const APIurl = 'https://todolist-api.hexschool.io'
const regData = ref({
  email: '',
  name: '',
  pwd: '',
  pwd2: ''
})
const userDatas = ref({
  email: '',
  password: '',
  nickname: ''
})
const todoSignUp = () => {
  fetch(`${APIurl}/users/sign_up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDatas.value)
  })
    .then((response) => response.json())
    .then((data) => {
      // signupResMes.value = data
      console.log(data)
      console.log(data.message)
      if (data.message === '用戶已存在') {
        alert('用戶已存在')
        return
      }
    })
    .catch((error) => console.error('Error:', error))
}
</script>
<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="userDatas.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            v-model="userDatas.nickname"
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="userDatas.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            v-model="regData.pwd2"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            @click="todoSignUp"
            value="註冊帳號"
          />
          <a class="formControls_btnLink" href="#loginPage">登入</a>
        </form>
      </div>
    </div>
  </div>
</template>
