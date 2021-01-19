<template>
  <div>
    <ContentSection v-bind:content="content1"/>
  </div>

</template>

<script>
import ContentSection from './components/ContentSection';

export default {
  name: "AboutPage",
  components: {
    ContentSection
  },
  data() {
    return {
      content1: {
        heading: "Description",
        body: "The purpose of this project is to create a todo list that maintains and prioritizes itself. " +
            "Because it needs to prioritize itself, I'm imparting values on it as an engineer and designer to suit " +
            "my personal needs. For that reason, this application may or may not work for everyone's lives. Therefore " +
            "the app needs to have some level of customization to be useful."
      }
    }
  }
}
</script>

<style scoped>

</style>