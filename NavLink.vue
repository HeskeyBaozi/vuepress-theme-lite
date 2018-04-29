<template>
  <router-link class="nav-link" :to="link" v-if="!isExternal(link)" :exact="link === '/'">
    <Icon v-if="item.icon" :type="item.icon"></Icon>
    {{ item.text }}
  </router-link>
  <a v-else :href="link" class="nav-link" :target="isMailto(link) ? null : '_blank'" :rel="isMailto(link) ? null : 'noopener noreferrer'">
    <Icon v-if="item.icon" :type="item.icon"></Icon>
    {{ item.text }}
  </a>
</template>

<script>
import Vue from "vue";
import { isExternal, isMailto, ensureExt } from "./util";

export default Vue.extend({
  props: {
    item: {
      required: true
    }
  },
  computed: {
    link() {
      return ensureExt(this.item.link);
    }
  },
  methods: {
    isExternal,
    isMailto
  }
});
</script>
