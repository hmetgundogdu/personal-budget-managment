<template>
  <div>
    ...
  </div>
</template>

<script>
// This page redirects Login page or Overview page by login informations.
export default {
  name: "Home",
  mounted() {
    const s = this;
    console.log("mounted");
    s.$store.dispatch("user/initFromLocalStorage").then((isLogin) => {
      s.$router.push(isLogin ? "Overview" : "Login");
    });
  },
};
</script>
