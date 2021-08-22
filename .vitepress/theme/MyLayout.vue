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
  margin-right: 0.75rem;
  height: 2.7rem;
  width: 3rem;
  vertical-align: middle;
}
</style>