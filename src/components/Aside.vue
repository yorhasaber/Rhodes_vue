<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/luoddao2.png" alt="" style="width: 40px; position: relative; top: 5px; right: 5px">
      <b style="color: white" v-show="logoTextShow">罗德岛·后台管理系统</b>
    </div>

    <div v-for="item in menus" :key="item.id">
      <div v-if="item.path">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
      <div v-else>

        <el-submenu :index="item.id +''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>

          <div v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path">
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>
<!--    <el-menu-item index="/home">-->
<!--      <i class="el-icon-house"></i>-->
<!--      <span slot="title">主页</span>-->
<!--    </el-menu-item>-->
<!--    <el-submenu index="2">-->
<!--    <template slot="title">-->
<!--      <i class="el-icon-menu"></i>-->
<!--      <span slot="title">系统管理</span>-->
<!--    </template>-->
<!--    <el-menu-item index="/user">-->
<!--      <i class="el-icon-s-custom"></i>-->
<!--      <span slot="title">用户管理</span>-->
<!--    </el-menu-item>-->
<!--      <el-menu-item index="/menu">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">菜单管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/role">-->
<!--        <i class="el-icon-s-check"></i>-->
<!--        <span slot="title">角色管理</span>-->
<!--      </el-menu-item>-->
<!--    <el-menu-item index="/file">-->
<!--      <i class="el-icon-document"></i>-->
<!--      <span slot="title">文件管理</span>-->
<!--    </el-menu-item>-->
<!--      <el-menu-item index="/goods">-->
<!--        <i class="el-icon-cpu"></i>-->
<!--        <span slot="title">舰内保修</span>-->
<!--      </el-menu-item>-->
<!--  </el-submenu>-->

  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  data() {
    return {
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],
      opens: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")).map(v => v.id + '') : []
    }
  },
}
</script>

<style scoped>
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span{
  display: none;
}
/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow{
  display: none;
}
</style>
