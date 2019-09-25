/**
 * 获取当前标签的传递参数
 * @param {Array} tabs 标签数据
 */
export const getCurTabParams = (tabs) => {
    if(!tabs || !Array.isArray(tabs)) return {};
    // 查找当前标签
    let curTab = tabs.filter(item => {
        return item.active;
    });
    return curTab.length > 0 ? curTab[0].pParams : {};
}