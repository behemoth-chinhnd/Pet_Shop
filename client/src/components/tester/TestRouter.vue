<template>
    <div class="test">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <input type="text" v-model="name">
      <p>{{name}}</p>
      <p>{{number}} Years Old</p>
      <b-button @click="changeValue" variant="danger">Click</b-button>
      <b-button @dblclick="click" variant="success">DBLClick</b-button>
      <b-button @click="number++" variant="primary">Count + 1<b-icon-arrow-up></b-icon-arrow-up></b-button>
      <b-button @click="number--" variant="warning">Count - 1<b-icon-arrow-down></b-icon-arrow-down></b-button>

      <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>

      <button @click="(event) => warn('Form cannot be submitted yet.', event)">Submit</button>

      <a @click.stop="doThis"></a>

      <form @submit.prevent="onSubmit"></form>

      <a @click.stop.prevent="doThat"></a>

      <form @submit.prevent></form>
      <div @click.self="doThat">...</div>

    </div>
</template>
<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  methods: {
    changeValue () {
      this.name = 'Value Click'
    },
    click () {
      this.name = 'Value DBLClick'
    },
    clickup () {
      this.number += 1
    },
    clickdown () {
      this.number -= 1
    },
    say (message) {
      alert(message)
    },
    warn (message, event) {
      if (event) {
        event.preventDefault()
      }
      alert(message)
    }
  },
  data () {
    return {
      name: 'First Value',
      number: 27
    }
  },
  name: 'TestRouter',
  components: {
    // HelloWorld
  }
}
</script>
