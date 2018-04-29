<template>
  <div data-bgimage id="site-footer">
    <div class="social-links">
      <template v-for="socialLink of socialLinks">
        <router-link :key="socialLink.key" :to="socialLink.link" v-if="!isExternal(socialLink.link)" :exact="socialLink.link === '/'">
          <Icon :type="socialLink.icon"></Icon>
        </router-link>
        <a :key="socialLink.key" v-else :href="socialLink.link" :target="isMailto(socialLink.link) ? null : '_blank'" :rel="isMailto(socialLink.link) ? null : 'noopener noreferrer'">
          <Icon :type="socialLink.icon"></Icon>
        </a>
      </template>
    </div>
    <router-link :exact="true" to="/" v-if="siteTitle" class="site-title" @click="handleClickTitle">{{ siteTitle }}</router-link>
    <p v-if="siteDescription" class="site-description">{{ siteDescription }}</p>
  </div>
</template>

<script>
import Vue from "vue";
import {
  resolveThemeConfigField,
  isExternal,
  isMailto,
  ensureExt
} from "./util";
export default Vue.extend({
  name: "SiteFooter",
  computed: {
    socialLinks() {
      return resolveThemeConfigField(this, "socialLinks", true);
    },
    siteTitle() {
      return (
        this.$siteTitle || this.$localeConfig.title || this.$site.title || ""
      );
    },
    siteDescription() {
      return (
        this.$description ||
        this.$localeConfig.description ||
        this.$site.description ||
        ""
      );
    }
  },
  methods: {
    isExternal,
    isMailto,
    handleClickTitle() {
      if (window && window.scrollTo) {
        window.scrollTo(0, 0);
      }
    }
  }
});
</script>

<style lang="less" scoped>
@import "./styles/helpers.less";
#site-footer {
  .column-flow(1.1rem);
  .bottom-radius;
  color: @site-footer-font-color;
  text-shadow: @site-footer-text-shadow;
  .blurable(relative, @site-footer-blur, @site-footer-blur-margin);

  a {
    color: @site-footer-font-color;
    &:hover {
      color: mix(@site-footer-font-color, black, 85%);
    }
  }

  .social-links {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    font-size: 1.1rem;
    margin-bottom: 0;

    > * {
      margin-right: 1rem;
      &:last-child {
        margin-right: initial;
      }
    }
  }

  .site-title {
    font-size: 1.2rem;
    margin-bottom: 0;
  }
}
</style>


