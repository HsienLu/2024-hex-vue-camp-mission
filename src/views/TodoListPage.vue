<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useNameStore } from '@/stores/name'
import { storeToRefs } from 'pinia'
const nameStore = useNameStore()
const { name = 'guest' } = storeToRefs(nameStore)
const APIurl = 'https://todolist-api.hexschool.io'
const router = useRouter()
const TodoToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexToken='))
  ?.split('=')[1]
const todoToken = ref('')
const todosData = ref([])
const newTodo = ref({
  content: ''
})
const isTodoList = ref(false)
const filterStatus = ref('全部')
const todoDoneCount = computed(() => {
  return todosData.value.filter((todo) => !todo.status).length
})
console.log(todosData.value)
//讀取
const getTodos = () => {
  fetch(`${APIurl}/todos`, {
    headers: {
      Authorization: todoToken.value
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    })
    .then((data) => {
      todosData.value = data.data
      console.log(todosData.value.length)
      if (todosData.value.length > 0) {
        isTodoList.value = true
      } else {
        isTodoList.value = false
      }
      // todos.value.forEach((todo) => {
      //   todo.tmpContent = todo.content
      //   todo.editState = false
      // })
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
}
//新增
const addTodo = () => {
  if (true) {
    fetch(APIurl + '/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: todoToken.value
      },
      body: JSON.stringify(newTodo.value)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(() => {
        getTodos()
        newTodo.value.content = ''
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
//刪除
const todoDelete = (id) => {
  fetch(`${APIurl}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: todoToken.value
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((mes) => {
      console.log(mes)
      getTodos()
    })
}
//修改
const changeState = (id) => {
  fetch(`${APIurl}/todos/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: todoToken.value
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((mes) => {
      console.log(mes)
      getTodos()
    })
}
//切換標籤
const filteredTodos = computed(() => {
  switch (filterStatus.value) {
    case '全部':
      return todosData.value
    case '待完成':
      return todosData.value.filter((todo) => !todo.status)
    case '已完成':
      return todosData.value.filter((todo) => todo.status)
    default:
      return todosData.value
  }
})
const setFilterStatus = (status) => {
  filterStatus.value = status
}
const isFilterActive = (status) => {
  return filterStatus.value === status
}
const logout = () => {
  document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  router.push('/LoginPage')
}
const test = () => {
  console.log(todosData.value)
}
onMounted(() => {
  if (TodoToken) {
    todoToken.value = TodoToken
    getTodos()
  } else {
    router.push('/LoginPage')
  }
})
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1>ONLINE TODO LIST</h1>
      <ul>
        <li class="todo_sm">
          <a
            ><span>{{ name }}的代辦</span></a
          >
        </li>
        <li><a href="#loginPage" @click.prevent="logout">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodo.content" />
          <a @click="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <h2 v-if="!isTodoList">目前尚無代辦事項</h2>
        <div v-else class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                @click.prevent="setFilterStatus('全部')"
                :class="{ active: isFilterActive('全部') }"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="setFilterStatus('待完成')"
                :class="{ active: isFilterActive('待完成') }"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="setFilterStatus('已完成')"
                :class="{ active: isFilterActive('已完成') }"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="(todo, index) in filteredTodos" :key="index">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    value="true"
                    @click="changeState(todo.id, todo.content)"
                    :checked="todo.status"
                  />
                  <span>{{ todo.content }}</span>
                </label>
                <a @click="todoDelete(todo.id)">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ todoDoneCount }} 個待完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
