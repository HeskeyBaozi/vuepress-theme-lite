<template>
  <div id="lite-archives">
    <Timeline :pending="true">
      <TimelineItem v-for="year of postsByYear.keys" :key="year">
        <p class="time">{{ year }}</p>
        <div class="content" v-for="post of postsByYear.entities[year]" :key="post.title + post.date.getTime()">
          <div class="moon">
            {{ post.date.getMonth() + 1 }}/{{ post.date.getDate() }}
          </div>
          <div class="title">
            <router-link :to="post.path">
              {{ post.title }}
            </router-link>
          </div>
        </div>
      </TimelineItem>
    </Timeline>
    <Page class="page" :total="posts.length" :page-size="pageSize" :current.sync="current" size="small"></Page>
  </div>
</template>

<script>
import Vue from "vue";
import { resolveThemeConfigField } from "./util";
import chunk from "lodash.chunk";
export default Vue.extend({
  name: "LiteArchives",
  data() {
    return {
      current: 1
    };
  },
  computed: {
    testReg() {
      const test = resolveThemeConfigField(this, "archives")["testPath"];
      return test && new RegExp(test);
    },
    pageSize() {
      return resolveThemeConfigField(this, "archives")["paginationSize"] || 15;
    },
    posts() {
      return this.$site.pages
        .filter(
          ({ path, birthtimeMs, frontmatter }) =>
            this.testReg &&
            this.testReg.test(path) &&
            (birthtimeMs || frontmatter.date)
        )
        .map(({ path, birthtimeMs, frontmatter, excerpt, title }) => ({
          date: new Date(birthtimeMs || frontmatter.date),
          title: title || frontmatter.title || "Untitled",
          excerpt,
          path
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    },
    chunkedPosts() {
      return chunk(this.posts, this.pageSize);
    },
    currentPosts() {
      return this.chunkedPosts[this.current - 1];
    },
    postsByYear() {
      const result = {};
      for (let i = 0; i < this.currentPosts.length; i++) {
        const post = this.currentPosts[i];
        const year = post.date.getFullYear();
        if (result[year]) {
          result[year].push(post);
        } else {
          result[year] = [post];
        }
      }
      return {
        keys: Object.keys(result).sort((a, b) => Number(b) - Number(a)),
        entities: result
      };
    }
  }
});
</script>

<style lang="less" scoped>
#lite-archives {
  padding: 0.5rem 2rem 0 2rem;
  .page {
    text-align: center;
  }

  .time {
    font-size: 1.65rem;
    margin: 0 0 1rem 0;
    transform: translateY(-25%);
  }

  .content {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 1rem;
    .moon {
      margin-right: 1rem;
    }

    .title {
      font-size: 1.1rem;
    }
  }
}
</style>
