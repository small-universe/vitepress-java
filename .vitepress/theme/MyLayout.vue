<!-- 布局重定义 -->
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 使用默认主题预留的插槽 -->
    <template #page-top>
      
    </template>
  </Layout>
</template>

<style>
/** 导航栏左侧的logo样式 */
.logo {
  height: 2.7rem !important;   /* !important 进行属性覆盖 */
  width: 3rem;
  vertical-align: middle !important;
}

/** 首页h1标签设置单独样式 */
h1[id='main-title'] {
  color: black;
}

/** 文章内容设置统一的一级标题样式 */
h1 {
  text-align: center;    /* 居中 */
  color: #8f5668f2;  /* 颜色 */
  font-weight: bold;     /* 加粗 */
}
</style>