import Vue from "vue";
import Router from "vue-router";
import store from '../store';

Vue.use(Router);
// layout页面
const Layout = () =>
  import(/* webpackChunkName: "layout" */ "@/views/layout/Layout.vue");

// 产品相关页面
const Product = () =>
  import(/* webpackChunkName: "product" */ "@/views/product/Index.vue");
const ProductDetail = () =>
  import(/* webpackChunkName: "productDetail" */ "@/views/product/Detail.vue");

// 新闻相关页面
const News = () =>
  import(/* webpackChunkName: "news" */ "@/views/news/Index.vue");
const NewsDetail = () =>
  import(/* webpackChunkName: "newsDetail" */ "@/views/news/Detail.vue");

const rotuer = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      redirect: "/product",
      children: [
        {
          path: "/product",
          name: "product",
          meta: {
            title: "产品",
            tabName: "产品列表"
          },
          components: {
            default: Product,
            detail: ProductDetail
          }
        },
        {
          path: "/news",
          name: "news",
          meta: {
            title: "新闻",
            tabName: "新闻列表"
          },
          components: {
            default: News,
            detail: NewsDetail
          }
        }
      ]
    }
  ]
});

rotuer.afterEach(to => {
  // 初始化navTag标签
  if (to.meta && to.meta.tabName) {
    store.dispatch('navTab/addTab', {
      tabName: to.meta.tabName,
      initStatus: true
    })
  }
});

export default rotuer;
