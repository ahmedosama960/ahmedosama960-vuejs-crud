<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  mounted(){
    
  }
}
</script>

<style>

body{
  height: 100vh;
  background-image:url('./assets/images/background.jpg') ;
  background-size: cover;
  background-position: center;
}
#app{
  margin-bottom: 20px;
}
#nav{
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
  color:aquamarine;
  text-decoration: none;
}
table{
  background-color:white;
  overflow: auto;
}
.card{
  overflow: auto;
}
</style>