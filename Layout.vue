<template>
  <div data-bgimage id="app">
    <TopNav></TopNav>
    <div v-show="!isCollapsed" class="sidebar-mask" @click="toggleSidebar(true)"></div>
    <LiteSider v-if="!disableSider" v-show="sidebarItems && sidebarItems.length" :value="isCollapsed" :items="sidebarItems"></LiteSider>
    <Row type="flex" justify="center">
      <Col class="flex-col" :span="23">
      <div class="offset-top"></div>
      <AuthorHeader v-if="!disableAuthorHeader"></AuthorHeader>
      <div class="custom-layout" v-if="$page.frontmatter.layout">
        <component :is="$page.frontmatter.layout" />
      </div>
      <main v-else :class="mainContainerClass">
        <h1 class="page-title" v-if="$page.title">{{ $page.title || $page.frontmatter.title || 'Untitled' }}</h1>
        <LiteArchives v-if="$page.frontmatter.archives"></LiteArchives>
        <Content :custom="true"></Content>
      </main>
      <SiteFooter v-if="!disableSiteFooter"></SiteFooter>
      <div class="offset-bottom"></div>
      </Col>
    </Row>
    <BackTop></BackTop>
    <div v-if="!disableSider" v-show="sidebarItems && sidebarItems.length" @mouseenter="toggleSidebar" id="sider-trigger" class="ivu-back-top ivu-back-top-show">
      <div class="ivu-back-top-inner">
        <Icon :class="rotateIcon" type="arrow-left-c"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import "./assets/FiraCode-Regular.css";
import "./assets/proximanova.css";
import Vue from "vue";
import TopNav from "./TopNav.vue";
import AuthorHeader from "./AuthorHeader.vue";
import SiteFooter from "./SiteFooter.vue";
import LiteSider from "./LiteSider.vue";
import LiteArchives from "./LiteArchives.vue";
import { resolveThemeConfigField, resolveSidebarItems } from "./util";
import { pathToComponentName } from "@app/util";
export default Vue.extend({
  components: { TopNav, AuthorHeader, SiteFooter, LiteSider, LiteArchives },
  data() {
    return {
      isCollapsed: true
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    disableAuthorHeader() {
      return !(
        resolveThemeConfigField(this, "author") &&
        !resolveThemeConfigField(this, "layout")["disableAuthorHeader"]
      );
    },
    disableSiteFooter() {
      return resolveThemeConfigField(this, "layout")["disableAuthorHeader"];
    },
    disableSider() {
      return resolveThemeConfigField(this, "layout")["disableSider"];
    },
    mainContainerClass() {
      return [
        "container",
        !this.disableAuthorHeader ? "" : "container-top-radius"
      ];
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    }
  },
  methods: {
    toggleSidebar(to) {
      this.isCollapsed = typeof to === "boolean" ? to : !this.isCollapsed;
    }
  },
  created() {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title;
      this.$ssrContext.lang = this.$lang;
      this.$ssrContext.description =
        this.$page.description || this.$description;
    }
  },
  beforeMount() {
    // setting background image
    const imagePath = resolveThemeConfigField(this, "background")["imagePath"];
    if (document && imagePath && typeof imagePath === "string") {
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerText = `div[data-bgimage]::after {background-image: url(${imagePath}) !important;}`;
      document.head.appendChild(style);
    }
  },
  mounted() {
    // update title / meta tags
    this.currentMetaTags = [];
    const updateMeta = () => {
      document.title = this.$title;
      document.documentElement.lang = this.$lang;
      const meta = [
        {
          name: "description",
          content: this.$description
        },
        ...(this.$page.frontmatter.meta || [])
      ];
      this.currentMetaTags = updateMetaTags(meta, this.currentMetaTags);
    };
    this.$watch("$page", updateMeta);
    updateMeta();

    // configure progress bar
    this.$router.beforeEach((to, from, next) => {
      if (
        to.path !== from.path &&
        !Vue.component(pathToComponentName(to.path))
      ) {
        this.$Loading.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      this.$Loading.finish();
    });
  },
  beforeDestroy() {
    updateMetaTags(null, this.currentMetaTags);
  }
});

function updateMetaTags(meta, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c);
    });
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement("meta");
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key]);
      });
      document.head.appendChild(tag);
      return tag;
    });
  }
}
</script>


<style src="normalize.css"></style>
<style src="prismjs/themes/prism.css"></style>
<style lang="less" src="./styles/entry.less"/>

<style lang="less" scoped>
@import "./styles/helpers.less";

#app {
  min-height: 100vh;
  .set-theme-background;

  .blurable(relative, 0, 0);

  .offset-top {
    height: @theme-offset-top;
  }

  .offset-bottom {
    height: @theme-offset-bottom;
  }

  .flex-col {
    max-width: @container-max-width;
  }

  .container {
    padding: 2rem 2.5rem;
    background-color: @container-background-color;
  }

  .container-top-radius {
    .top-radius;
  }

  .page-title {
    font-size: 2.1rem;
    text-align: center;
  }

  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100vw;
    height: 100vh;
  }
}

#sider-trigger {
  left: 30px;
  bottom: 30px;
  z-index: 701;
  .menu-icon {
    transition: all 0.3s;
  }
  .rotate-icon {
    transform: rotate(180deg);
  }
}
</style>

