<template>
  <div>
    <nav class="navbar navbar-dark navbar-fixed-top">
    </nav>
     <div class="col-md-3 sidebar">
      <ul>
        <li v-for="item in list" >
          <router-link :to="{ path: item.url }">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="container-fluid content">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>

<script>
// 这里怎么回事
import Axios from 'axios'
export default {
  name: 'app',
  components: {
  },
  data: function () {
    return {
      list: []
    }
  },
  mounted: function () {          // 挂在完成后
    this.$nextTick(function () {
      Axios.get('/api/menulist', {
        params: {
        }
      }).then(function (res) {
        this.list = res.data
      }.bind(this))
    })
  }
}
</script>

<style>
ul, li {
  list-style: none;
}
.router-link-active {
  background-color: #f6f6f6;
}

.navbar {
  height: 50px;
  background-color: #303030;
}
.content {
  margin-top: 50px;
  padding-left: 210px;
}

.sidebar {
  background-color: #f5f5f5;
  border-right: 1px solid #eee;
  width: 200px;
}

@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 51px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    background-color: #f5f5f5;
    border-right: 1px solid #eee;
  }
}
</style>
