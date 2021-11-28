<template>
  <div class="">
    <ul>
      <li>首先還是要取得路線名稱</li>
      <li>透過路線名稱來篩選票價</li>
    </ul>
    <hr>
    <select v-model="select_route_id">
      <option :key="route.RouteID" v-for="route in routes" :value="route.RouteID">{{ route.DepartureStopNameZh }}</option>
    </select>
    <hr>
    <button class="btn btn-success" @click="getRouteFareByName('幸福布袋1路')">取得「幸福布袋1路」</button>

    <pre>{{ select_route }}</pre>
    <pre>{{ list }}</pre>
    <pre>{{ routes }}</pre>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "FarePage",
  data() {
    return {
      select_route_id: null,
    }
  },
  methods : {
    ...mapActions("route", {
      resetRoute: 'resetRoute'
    }),
    ...mapActions('fare', {
      getRouteFareByName: 'getRouteFareByName',
      getRouteFareByID  : 'getRouteFareByID',
    })
  },
  computed: {
    ...mapGetters('route', {
      routes: "getRoute",
    }),
    ...mapGetters('fare', {
      list: 'getData'
    })
  },
  watch   : {
    list: {},

    routes: {
      immediate: true,
      handler(routes) {
        if (!routes) {
          this.resetRoute();
          return;
        }

        this.select_route = null;

        for (let i = 0; i < routes.length; i++) {
          let item = routes[i]
          console.log(item)

          if (!this.select_route)
            this.select_route = item.RouteID;
        }
      }
    }
  }
}
</script>

<style scoped>

</style>