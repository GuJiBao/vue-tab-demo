const tabIdStr = "tab_"; // 标签的id前缀

const state = {
  tabs: [],
  tabMaxNum: 0
};

const getters = {
  getNavTabs: state => state.tabs
};

const actions = {
  /**
   * 添加标签
   * @param {Any} tabId tab的唯一id标识
   * @param {String} tabName tab的标题
   * @param {String} vName 对应router命名视图的名称
   * @param {Object} pParams 参数传递
   * @param {Boolean} initStatus 初始化状态
   */
  addTab({ commit, state }, { tabId, tabName, vName, pParams, initStatus = false }) {
    // 设置标签id
    let newTabId = tabIdStr + (tabId || 0); // 默认 0
    let opts = {
      tabName: "",
      vName: "default",
      pParams: {},
      active: true,
      ...{
        tabId: newTabId,
        tabName,
        vName,
        pParams
      }
    };

    // 初始化时，重置标签
    if (initStatus) {
      commit("resetTabs");
    }

    // 判断函数
    let hasTabId = item => {
      return item.tabId === newTabId;
    };
    // 判断新增标签是否已存在，如果存在直接激活，否则新增
    if (state.tabs.some(hasTabId)) {
      // 激活标签
      commit("activeTab", newTabId);
      return false;
    }

    // 添加标签
    commit("addTab", opts);
  },
  /**
   * 切换标签
   * @param {String} tabId tab的唯一id标识
   */
  changeTab({ commit }, { tabId }) {
    // 激活标签
    commit('activeTab', tabId);
  },
  /**
   * 更多标签处理
   * @param {Number} index tabs数组下标
   */
  handleMoreTab({ commit }, { index }) {
    commit('handleMoreTab', index);
  },
  /**
   * 删除标签
   * @param {Number} index tabs数组下标
   */
  deleteTab({ commit }, { index }) {
    commit('deleteTab', index);
  },
  /**
   * 删除其他标签
   */
  deleteOtherTab({ commit, state }) {
    // 保存第一个标签
    let firstTab = state.tabs[0];
    // 如果第一个当前标签是第一个，则直接删除全部
    if(firstTab.active) {
      commit('deleteAllTab');
    } else {
      commit('deleteOtherTab');
    }
  },
  /**
   * 删除全部标签
   */
  deleteAllTab({ commit }) {
    commit('deleteAllTab');
  }
};

const mutations = {
  /**
   * 添加标签
   */
  addTab(state, opts) {
    // 隐藏其他标签状态
    state.tabs.forEach(item => {
      item.active = false;
    });
    // 当tabs数量大于或等于标签的最大显示数，新添加的标签放在可显示的最后一位
    if(state.tabs.length >= state.tabMaxNum) {
      state.tabs.splice(state.tabMaxNum - 1, 0, opts);
    } else {
      state.tabs.push(opts);
    }
  },
  /**
   * 激活标签
   */
  activeTab(state, tabId) {
    state.tabs.forEach(item => {
      item.active = false;
      if (item.tabId === tabId) {
        item.active = true;
      }
    });
  },
  /**
   * 更多标签处理
   */
  handleMoreTab(state, index) {
    let tabs = state.tabs;
    let _index = state.tabMaxNum + index;
    // 激活点击标签
    tabs[_index].active = true;
    // 拷贝点击标签
    let copyTab = [tabs[_index]];
    // 删除点击标签
    tabs.splice(_index, 1);
    // 隐藏其他标签
    tabs.forEach(item => {
      item.active = false;
    });
    // 插入到可显示的标签最后一个位置
    tabs.splice([state.tabMaxNum - 1], 0, ...copyTab);
  },
  /**
   * 删除标签
   */
  deleteTab(state, index) {
    let tabs = state.tabs;
    // 判断删除的是当前标签，需激活上一个标签
    if(tabs[index].active && tabs.length > 0) {
      tabs[index -1].active = true;
    }
    tabs.splice(index, 1);
  },
  /**
   * 删除其他标签
   */
  deleteOtherTab(state) {
    // 解构第一个标签，其他标签
    let [firstTab, ...otherTabs] = state.tabs;
    // 获取当前标签
    let curTab = otherTabs.filter(item => item.active);
    state.tabs = [firstTab, ...curTab];
  },
  /**
   * 删除全部标签
   */
  deleteAllTab(state) {
    let tabs = state.tabs;
    // 除了第一个标签其他的都删除
    let firstTab = tabs[0];
    firstTab.active = true;
    state.tabs = [firstTab];
  },
  /**
   * 重置标签
   */
  resetTabs(state) {
    state.tabs = [];
  },
  /**
   * 设置显示标签最大值
   */
  setMaxTabVal(state, val) {
    state.tabMaxNum = parseInt(val);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};