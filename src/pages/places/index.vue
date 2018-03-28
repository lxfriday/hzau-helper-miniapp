<template>
  <div class="container">
    <place-list-item
      v-for="(item, index) in list"
      :imgPath="item.images[0]"
      :name="item.name"
      :type="item.type"
      :info="item"
      :key="index" />
  </div>
</template>
<script>
import PlaceListItem from '../../components/places/PlaceListItem';
import PLACES_INFO from '../../config/placesInfo';


export default {
  data() {
    return {
      list: PLACES_INFO,
    };
  },
  components: {
    PlaceListItem,
  },
  methods: {
  },
  created() {
  },
};
</script>

<style scoped>

</style>
