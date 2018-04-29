<template>
	<div data-bgimage id="lite-sidebar">
		<Sider hide-trigger collapsible :collapsed-width="0" :value="value">
			<Menu accordion width="auto" @on-select="handleSelect" :active-name="$route.path">
				<template v-for="item of items">
					<MenuGroup class="lite-menu-group" v-if="item.type === 'group'" :key="item.title" :title="item.title">
						<MenuItem v-for="subItem of item.children" :key="subItem.path" :name="subItem.path"> {{ subItem.title }}
						</MenuItem>
					</MenuGroup>
				</template>
			</Menu>
		</Sider>
	</div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "LiteSider",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleSelect(link) {
      if (typeof link === "string" && link.startsWith("/")) {
        this.$router.push(link);
      }
    }
  }
});
</script>

<style lang="less" scoped>
@import "./styles/helpers.less";
#lite-sidebar {
  position: fixed;
  left: 0;
  height: 100vh;
  text-shadow: @sider-text-shadow;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
	.blurable(fixed, @sider-blur, @sider-blur-margin);
  z-index: 700;
  .ivu-layout-sider {
    height: 100%;
    padding-top: @theme-offset-top;
    background-color: transparent;
    overflow-y: auto;
  }
  .ivu-menu-vertical {
    background-color: transparent;
    &::after {
      background-color: initial;
    }
    .ivu-menu-item:hover {
      background-color: transparent;
    }
    .ivu-menu-item-selected {
      font-weight: bold;
    }
  }
  .lite-menu-group {
    div {
      background-color: @primary-color !important;
    }
  }

  .ivu-menu-item {
    padding: 0.3rem 0 0.3rem 28px;
  }
  .ivu-layout-sider {
    width: @sider-width !important;
    min-width: @sider-width !important;
    max-width: @sider-width !important;
    flex: 0 0 @sider-width !important;
  }

  .ivu-layout-sider-collapsed {
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    flex: 0 0 0 !important;
  }
}
</style>


