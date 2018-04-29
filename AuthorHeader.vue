<template>
  <div data-bgimage id="author-header">
    <img v-if="avatarUrl" class="avatar" :src="avatarUrl" :alt="avatarUrl" />
    <p v-if="authorName" class="author-name">{{ authorName }}</p>
    <p v-if="shortDescription" class="short-description">{{ shortDescription }}</p>
  </div>
</template>

<script>
import Vue from "vue";
import { resolveThemeConfigField } from "./util";
export default Vue.extend({
  name: "AuthorHeader",
  computed: {
    avatarUrl() {
      const avatarPath = resolveThemeConfigField(this, "author")["avatarPath"];
      if (avatarPath && typeof avatarPath === "string") {
        return this.$withBase(avatarPath);
      }
    },
    authorName() {
      return resolveThemeConfigField(this, "author")["name"];
    },
    shortDescription() {
      return resolveThemeConfigField(this, "author")["shortDescription"];
    }
  }
});
</script>

<style lang="less" scoped>
@import "./styles/helpers.less";

#author-header {
  .column-flow(1.1rem);
  .top-radius;
  color: @author-header-font-color;
  text-shadow: @author-header-text-shadow;
  .blurable(relative, @author-header-blur, @author-header-blur-margin);

  .avatar {
    border-radius: 50%;
    box-shadow: @author-header-avatar-box-shadow;
    height: @author-header-avatar-size;
    width: @author-header-avatar-size;
  }

  .author-name {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }

  .short-description {
    font-size: 0.9rem;
  }
}
</style>

