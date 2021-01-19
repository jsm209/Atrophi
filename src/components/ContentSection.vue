<template>
  <div>
    <h1>{{ content.heading }}</h1>
    <p> {{ content.body }} </p>
  </div>

</template>

<script>
  export default {
    name: "ContentSection",
    props: [
        "content"
    ]
  }
</script>

<style scoped>
h1 {
  font-family: 'Lato', sans-serif;
  color: black;
  font-size: 32px;
}

p {
  font-family: 'Lato', sans-serif;
  color: black;
  font-size: 16px;
}

div {
  width: 80%;
  margin: auto;
}

</style>