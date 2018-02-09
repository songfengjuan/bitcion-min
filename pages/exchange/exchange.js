// pages/exchange/exchange.js
var util = require('../../utils/util.js');
var interfaces = require('../../utils/interfaces.js');
var pageNum = 0;
var pageSize = 10;
var loadMore = true;
var totalPages;
const app = getApp();
let animationShowHeight = 300;
let sliderWidth = 103; // 需要设置slider的宽度，用于计算中间位置
Page({
  /*
  *页面初始数据
  */
  data: {
    tabs:[],
    tabsContent: ['交易对/成交量', '最新价', '市值'],
    activeIndex: '1',
    sliderOffset: 0,
    sliderLeft: 0,
    scrollHeight: 0,
    motto: 'Hello World',
    sortIndex: 2,
    sortType: 'down',
    dealQuanType: 'down',
    tradeQuanType: 'down',
    lastPriceType: 'down',
    markValeType: 'down',
    markorderField: 'ltsz_usd',
    roseValeType: 'down',
    tabId: 4,
    tabText: '市值',
    loadingDisplay: 'block',
    currentTab: 'all',
    orderType: 'DESC',
    orderField: 'cje_usd',
    animationData: "",
    showModalStatus: false,
    list: [],

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sliderLeft: (((res.windowWidth-20) * 0.85) / 4),
          scrollHeight: res.windowHeight,
          sliderOffset: (((res.windowWidth - 20) * 0.85) / 4),
        });

      }

    });

    this.getListData(true);
    this.getBourseInfo(true);
  },
  getBourseInfo: function (isRefresh) {
    var that = this;
    that.setData({
      loadingDisplay: 'block'
    });
    if (isRefresh) {
      that.data.list.length = 0;
      pageNum = 0;
    }
    pageNum++;
    if (totalPages) {
      loadMore = pageNum < totalPages;
    }
    var params = {
      "currentPageForApp": pageNum,
      "showCount": pageSize
    }
    interfaces.bourse(params, (resp) => {
      if (resp.data.success === 1000) {
        this.parseData(resp.data.pagedata);
        this.setData({
          tabs: this.data.tabs.concat(resp.data.pagedata),
        });
        if (!this.data.list.length) {
          wx.showToast({
            title: '没有查询到相关内容',
          })
        }
      } else {
        wx.showToast({
          title: resp.data.exception,
        })
      }
    }, (resp) => {

      wx.showToast({
        title: resp.msg,
      })
    }, (resp) => {
      this.setData({
        loadingDisplay: 'none'
      });
    });
  },
  tabClick: function (e) {
    var currentTab = this.data.currentTab;
  
    // loadMore = true;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,

    });
    status = e.currentTarget.id;
    this.goToTop();
    // this.fetchData(true);
  },
  changeSortType: function (e) {
    if (this.data.sortIndex == e.currentTarget.id) {
      this.setData({
        sortIndex: e.currentTarget.id == 4 ? 5 : 4,
        tabId: e.currentTarget.id == 4 ? 5 : 4,
        tabText: e.currentTarget.id == 4 ? '涨幅' : '市值',
        markorderField: e.currentTarget.id == 4 ? 'biZf' : 'ltsz_usd'
      });
    }

  },
  sortClick: function (e) {
    var sort = e.currentTarget.dataset.sort;
    var sortType = sort == 'up' ? 'down' : 'up';
    var currentId = e.currentTarget.id;
    var orderType = sortType == 'up' ? 'ASC' : 'DESC';
    var orderField = e.currentTarget.dataset.orderfield
    this.setData({
      orderType: orderType,
      orderField: orderField
    });
    switch (currentId) {
      case '1': {
        this.setData({
          sortIndex: e.currentTarget.id,
          dealQuanType: sortType
        });
      }
      case '2': {
        this.setData({
          sortIndex: e.currentTarget.id,
          tradeQuanType: sortType
        });
      }
      case '3': {
        this.setData({
          sortIndex: e.currentTarget.id,
          lastPriceType: sortType
        });
      }
      case '4': {
        this.setData({
          sortIndex: e.currentTarget.id,
          markValeType: sortType,
          markorderField: 'ltsz_usd'
        });
      }
      case '5': {
        this.setData({
          sortIndex: e.currentTarget.id,
          markValeType: sortType,
          markorderField: 'biZf'
        });
      }

    }
    this.getListData(true);
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
  loadMore: function (e) {
    if (loadMore) {
      this.getListData(false);
    }
  },
  /*
  *获取条件查询的排行榜单数据
  **/
  getListData: function (isRefresh, callBack) {
    var that = this;
    that.setData({
      loadingDisplay: 'block'
    });
    if (isRefresh) {
      that.data.list.length = 0;
      pageNum = 0;
    }
    pageNum++;
    if (totalPages) {
      loadMore = pageNum < totalPages;
    }
    var params = {
      "currentPageForApp": pageNum,
      "showCount": pageSize,
      "orderField": that.data.orderField,
      "orderType": that.data.orderType
    }
    interfaces.cionList(params, (resp) => {
      if (resp.data.success === 1000) {
        // totalPages = resp.data.data.totalPages;
        // loadMore = pageNum < totalPages;
        this.parseData(resp.data.pagedata);
        this.setData({
          list: this.data.list.concat(resp.data.pagedata),
        });
        if (!this.data.list.length) {
          wx.showToast({
            title: '没有查询到相关内容',
          })
        }
      } else {
        wx.showToast({
          title: resp.data.exception,
        })
      }
    }, (resp) => {

      wx.showToast({
        title: resp.msg,
      })
    }, (resp) => {
      this.setData({
        loadingDisplay: 'none'
      });
    });
  },
  /** 
 * 解析数据
 */
  parseData: function (data) {
    data.forEach((item) => {
      if (item['ltsz_usd'] != null) {
        item['ltsz_usd'] = util.formatCurrency(item['ltsz_usd']);
      } else {
        item['ltsz_usd'] = '';
      }
      if (item['ltsz_cny'] != null) {
        item['ltsz_cny'] = util.formatCurrency(item['ltsz_cny']);
      } else {
        item['ltsz_cny'] = '';
      }
      if (item['ltsz_btc'] != null) {
        item['ltsz_btc'] = util.formatCurrency(item['ltsz_btc']);
      } else {
        item['ltsz_btc'] = '';
      }
      if (item['ltsl'] != null) {
        item['ltsl'] = util.formatCurrency(item['ltsl']);
      } else {
        item['ltsl'] = '';
      }
      if (item['cje_usd'] != null) {
        item['cje_usd'] = util.formatCurrency(item['cje_usd']);
      } else {
        item['cje_usd'] = '';
      }
      if (item['cje_cny'] != null) {
        item['cje_cny'] = util.formatCurrency(item['cje_cny']);
      } else {
        item['cje_cny'] = '';
      }
      if (item['cje_btc'] != null) {
        item['cje_btc'] = util.formatCurrency(item['cje_btc']);
      } else {
        item['cje_btc'] = '';
      }
    });
  },
  showModal: function () {
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        animationShowHeight = res.windowHeight;
      }
    })
  },
})
