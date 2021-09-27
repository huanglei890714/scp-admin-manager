<template>
    <div id="app">
        <transition
            name="fade"
            mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<style lang="scss">
@import "assets/css/comm.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $Cdefault;
    }
  }
}
</style>
