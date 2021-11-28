<template>
  <div class="">
    <ul>
      <li>首先還是要取得路線名稱</li>
      <li>透過路線名稱來篩選票價</li>
    </ul>
    <hr>
    <button class="btn btn-success" @click="getRouteFareByName('幸福布袋1路')">go</button>
    <pre>{{ list }}</pre>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "FarePage",
  data() {
    return {}
  },
  methods : {
    ...mapActions('fare', {
      getRouteFareByName: 'getRouteFareByName'
    })
  },
  computed: {
    ...mapGetters('fare', {
      list: 'getData'
    })
  },
}
</script>

<style scoped>

</style>