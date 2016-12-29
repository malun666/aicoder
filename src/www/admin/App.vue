<template>
  <div>
    <nav class="navbar navbar-dark navbar-fixed-top">
      <h3 class="main-title">老马博客后台管理系统</h3>
      <p class="sub-title">生命在于分享，技术源于生命</p>
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
$top-nav-height: 50px;

ul, li {
  list-style: none;
}
.router-link-active {
  background-color: #f6f6f6;
}

.navbar {
  height: $top-nav-height;
  background-color: #303030;
  color: #f9f9f9;
}
.navbar .main-title {
  float: left;
}
.navbar .sub-title {
  float: left;
  margin-left: 20%;
  margin-top: 20px;
}
.content {
  margin-top: $top-nav-height;
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
    top: $top-nav-height + 1;
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
