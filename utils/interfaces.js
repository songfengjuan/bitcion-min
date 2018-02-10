let utils = require('./util.js');
function ajax_general(obj, params, success, error, complete) {
  // let token = wx.getStorageSync("token") || "";
  // if (!token || !obj) {
  //   return;
  // }
  let url = utils.getUrl() + obj.action;
  let data = params || "";
  let method = obj.type && (obj.type.toLocaleUpperCase() || "POST");
  const requestTask = wx.request({
    url: url,
    method: method,
    // header: {
    //   "X-Access-Auth-Token": token,
    //   "content-type": "application/json"
    // },
    data: data,
    dataType: 'json',
    // jsonp: 'jsonpCall',
    success: (resp) => {
      //未登录跳至登陆页面
      if (resp.data.code==401) {
        utils.toLoginIndex();
        return ;
      } 
      success.call(this, resp);
    },
    fail: (resp) => {
      error.call(this, resp);
    },
    complete: (resp) => {
      complete ? complete.call(this, resp) : "";
    }
  })
  return requestTask;
}
let interfaces = {
  clientManager: function (success, error) {
    ajax_general({ action: 'clientManager/info', type: 'get' }, null, success, error, null);
  },
  //项目大全
  cionList: function (params, success, error, complete) {
    ajax_general({ action: '/often/data/list', type: 'POST' }, params, success, error, complete);
  },
  tradeDataList: function (params, success, error, complete) {
    ajax_general({ action: '/often/data/trade', type: 'POST' }, params, success, error, complete);
  },
  //获取交易所信息
  bourse: function (params, success, error, complete) {
    ajax_general({ action: '/often/data/bourse', type: 'POST' }, params, success, error, complete);
  },
}

module.exports = interfaces;