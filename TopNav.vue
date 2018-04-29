<template>
  <div data-bgimage id="top-nav">
    <Row>
      <!-- Small View -->
      <Col type="flex" :xs="24" :sm="0">
      <Dropdown class="icon-wrapper" :trigger="'hover'" :transfer="true" @on-click="handleSelectMenu" @on-visible-change="handleVisibleChange">
        <Icon type="navicon-round" :class="rotateIcon"></Icon>
        <DropdownMenu slot="list">
          <template v-for="item of userLinks">
            <!-- link -->
            <DropdownItem v-if="item.type === 'link'" :key="item.link || item.text" :name="item.link || item.text">
              <Icon v-if="item.icon" :type="item.icon"></Icon>
              {{ item.text }}
            </DropdownItem>
            <!-- links -->
            <!-- <Dropdown :transfer="true" v-if="item.type === 'links'" :key="item.link || item.text" placement="right-start">
              <DropdownItem>
                <Icon v-if="item.icon" :type="item.icon"></Icon>
                {{ item.text }}
                <Icon type="ios-arrow-right"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem v-for="subItem of item.items" :key="subItem.link || subItem.text">
                  <Icon v-if="subItem.icon" :type="subItem.icon"></Icon>
                  {{ subItem.text }}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> -->
          </template>
        </DropdownMenu>
      </Dropdown>
      </Col>

      <!-- Not Small View -->
      <Col :xs="0" :sm="24">
      <Menu mode="horizontal" :active-name="$route.path" @on-select="handleSelectMenu">
        <template v-for="item of userLinks">
          <MenuItem v-if="item.type === 'link'" :key="item.link || item.text" :name="item.link || item.text">
          <Icon v-if="item.icon" :type="item.icon"></Icon>
          {{ item.text }}
          </MenuItem>
        </template>
      </Menu>
      </Col>
    </Row>
  </div>
</template>

<script>
import Vue from "vue";
import { resolveNavLinkItem, isExternal } from "./util";
export default Vue.extend({
  name: "TopNavigator",
  data() {
    return {
      dropdownVisible: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.$data.dropdownVisible ? "rotate-icon" : ""];
    },
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },
    userLinks() {
      return this.userNav.map(link =>
        Object.assign({}, resolveNavLinkItem(link), {
          items: (link.items && link.items.map(resolveNavLinkItem)) || []
        })
      );
    },
    title() {
      return this.$title || this.$site.title;
    }
  },
  methods: {
    handleVisibleChange(visible) {
      this.$data.dropdownVisible = visible;
    },
    handleSelectMenu(linkOrText = "") {
      if (!isExternal(linkOrText)) {
        if (linkOrText.startsWith("/")) {
          this.$router.push(linkOrText);
        }
      } else if (window && window.open) {
        window.open(linkOrText);
      }
    }
  }
});
</script>


<style lang="less" scoped>
@import "./styles/helpers.less";

#top-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: @top-nav-height;
  text-shadow: @top-nav-text-shadow;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  .blurable(fixed, @top-nav-blur, @top-nav-blur-margin);
  z-index: 800;

  .icon-wrapper {
    margin-left: 1rem;
    height: @top-nav-height;
    line-height: @top-nav-height;
    &:hover {
      cursor: pointer;
    }
    .menu-icon {
      font-size: @top-nav-height * (24 / 60);
      transition: all 0.3s;
    }
    .rotate-icon {
      transform: rotate(-180deg);
    }
  }

  .title {
    font-weight: bold;
  }

  .ivu-menu-horizontal {
    height: @top-nav-height;
    line-height: @top-nav-height;
    background-color: transparent;
    display: flex;
    justify-content: center;
    &::after {
      background: initial;
    }
  }
}
</style>

