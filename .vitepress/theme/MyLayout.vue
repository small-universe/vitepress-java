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
.logo {
  /* !important 进行属性覆盖 */
  height: 2.7rem !important; 
  width: 3rem;
  vertical-align: middle !important;
}
</style>