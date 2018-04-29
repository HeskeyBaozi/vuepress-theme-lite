import Menu from 'iview/src/components/menu';
import Row from 'iview/src/components/row';
import Col from 'iview/src/components/col';
import Icon from 'iview/src/components/icon';
import Button from 'iview/src/components/Button';
import Dropdown from 'iview/src/components/dropdown';
import Layout from 'iview/src/components/Layout';
import BackTop from 'iview/src/components/back-top';
import Timeline from 'iview/src/components/timeline';
import Page from 'iview/src/components/page';
import LoadingBarInstance from 'iview/src/components/loading-bar';


// i18n
import locale from 'iview/src/components/locale';
import lang from 'iview/dist/locale/en-US';


locale(lang);

export default ({
    Vue,
    options,
    router,
    siteData
}) => {
    Vue.component('Menu', Menu);
    Vue.component('MenuItem', Menu.Item);
    Vue.component('MenuGroup', Menu.Group);
    Vue.component('Submenu', Menu.Sub);
    Vue.component('Row', Row);
    Vue.component('Col', Col);
    Vue.component('Icon', Icon);
    Vue.component('Button', Button);
    Vue.component('Dropdown', Dropdown);
    Vue.component('DropdownMenu', Dropdown.Menu);
    Vue.component('DropdownItem', Dropdown.Item);
    Vue.component('Layout', Layout);
    Vue.component('Sider', Layout.Sider);
    Vue.component('Header', Layout.Header);
    Vue.component('BackTop', BackTop);
    Vue.component('Timeline', Timeline);
    Vue.component('TimelineItem', Timeline.Item);
    Vue.component('Page', Page);
    Vue.prototype.$Loading = LoadingBarInstance;
    // Vue.use(IView);
}