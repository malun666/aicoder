<template>
  <div>
    <table class="table">
      <tr>
        <td>用户名：</td><td>{{ userInfo.UserName }}</td>
        <td>密码： </td><td>{{ userInfo.Password }}</td>
        <td>创建日期：</td><td>{{ userInfo.create_at }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'userinfo',
  created: function () {

  },
  data () {
    return {
      userInfo: {
        UserName: '',
        create_at: '',
        Password: ''
      }
    }
  },
  methods: {
    getUserInfo () {
    }
  },
  mounted: function () {          // 挂在完成后
    this.$nextTick(function () {
      if (!this.$route.params.userId) {
        return
      }

      var userId = this.$route.params.userId
      Axios.get('/api/getuserbyid/' + userId, {
        params: {
        }
      }).then(function (res) {
        this.userInfo = res.data
      }.bind(this))
    })
  }
}
</script>

<style>
</style>
