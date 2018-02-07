//index.js
//获取应用实例
var util = require('../../utils/util.js');
var interfaces = require('../../utils/interfaces.js');
var pageNum = 0;
var pageSize = 10;
var loadMore = true;
var totalPages;
const app = getApp();
let sliderWidth = 103; // 需要设置slider的宽度，用于计算中间位置
Page({
  /*
  *页面初始数据
  */
  data: {
    tabs:['我的自选','项目大全'],
    tabsContent: ['交易对/成交量', '最新价', '市值'],
    activeIndex:'1',
    sliderOffset: 0,
    sliderLeft: 0,
    scrollHeight:0,
    motto: 'Hello World',
    sortIndex:3,
    sortType:'down',
    dealQuanType: 'down',
    tradeQuanType: 'down',
    lastPriceType: 'down',
    markValeType: 'down',
    roseValeType: 'down',
    tabId:4,
    tabText:'市值',
    loadingDisplay:'block',
    list:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sliderLeft: ((res.windowWidth*0.50) / this.data.tabs.length),
          scrollHeight: res.windowHeight,
          sliderOffset: ((res.windowWidth * 0.50) / this.data.tabs.length)
        });

      }

    });

    this.getListData(true);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tabClick: function (e) {
    
    // loadMore = true;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,

    });
    status = e.currentTarget.id;
    this.goToTop();
    // this.fetchData(true);
  },
  changeSortType: function(e){
    if (this.data.sortIndex == e.currentTarget.id){
      this.setData({
        sortIndex: e.currentTarget.id == 4 ? 5 : 4,
        tabId: e.currentTarget.id == 4 ? 5 : 4,
        tabText: e.currentTarget.id == 4 ? '涨幅' : '市值'
      });
    }
    // this.setData({
    //   tabId: e.currentTarget.id==4?5:4,
    //   tabText: e.currentTarget.id == 4 ? '涨幅' :'市值',
    // });
    
  },
  sortClick:function(e){
    var sort = e.currentTarget.dataset.sort;
    var sortType = sort == 'up'?'down':'up';
    var currentId = e.currentTarget.id;
    switch (currentId){
      case '1':{
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
          markValeType: sortType
        });
      }
      case '5': {
        this.setData({
          sortIndex: e.currentTarget.id,
          markValeType: sortType
        });
      }

    }
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
      "orderField": 'jg_cny',
      "orderType":'DESC'
    }
    var jsonData = { "pagedata": [{ "guid": 238, "ordernum": 1, "name": "bitcoin", "name_zh": "BTC-比特币", "image_url": "http://static.feixiaohao.com/Coin/7033f2f2c2a16094bbb3bafc47205ba8_small.png", "biZf": -2.76, "biLtsl": 16840000, "ltsz_usd": 146895126672, "ltsz_cny": 926034223295, "ltsz_btc": 16839313, "jg_usd": 8.72E+5, "jg_cny": 54974, "jg_btc": 0.9997, "cje_usd": 7517351648.4123, "cje_cny": 47389860831.2035, "cje_btc": 862051.847696 }, { "guid": 263, "ordernum": 2, "name": "ethereum", "name_zh": "ETH-以太坊", "image_url": "http://static.feixiaohao.com/Coin/8cc736e4abd44c3d689eb1599a27edb_small.png", "biZf": -6.59, "biLtsl": 97410000, "ltsz_usd": 86994127454, "ltsz_cny": 548415329176, "ltsz_btc": 9879737, "jg_usd": 893, "jg_cny": 5.63E+3, "jg_btc": 0.1014, "cje_usd": 3399789046.53221, "cje_cny": 21432549544.2686, "cje_btc": 386882.264707 }, { "guid": 277, "ordernum": 3, "name": "ripple", "name_zh": "XRP-瑞波币", "image_url": "http://static.feixiaohao.com/Coin/c9eb965d2f25954f97cfd9d4d83fab6_small.png", "biZf": -2.54, "biLtsl": 39029010000, "ltsz_usd": 34427016877, "ltsz_cny": 217029635741, "ltsz_btc": 3947066, "jg_usd": 0.8821, "jg_cny": 5.56, "jg_btc": 0.000101, "cje_usd": 1549041082.25732, "cje_cny": 9765232434.59437, "cje_btc": 177488.362634 }, { "guid": 291, "ordernum": 4, "name": "bitcoin-cash", "name_zh": "BCH-比特现金", "image_url": "http://static.feixiaohao.com/Coin/3f557930868d6d6eb796adbd2a98a44a_small.png", "biZf": -3.4, "biLtsl": 16950000, "ltsz_usd": 20044620174, "ltsz_cny": 126362287807, "ltsz_btc": 2284583, "jg_usd": 1183, "jg_cny": 7455, "jg_btc": 0.1348, "cje_usd": 656613414.300229, "cje_cny": 4139323794.4193, "cje_btc": 74858.303182 }, { "guid": 311, "ordernum": 5, "name": "cardano", "name_zh": "ADA-艾达币", "image_url": "http://static.feixiaohao.com/Coin/c719fa95bfbd9fbe8188e6f5ab3c6dea_small.png", "biZf": 1.5, "biLtsl": 25927070000, "ltsz_usd": 10851256832, "ltsz_cny": 68406865632, "ltsz_btc": 1250463, "jg_usd": 0.4185, "jg_cny": 2.64, "jg_btc": 0.00004823, "cje_usd": 1.38641E+9, "cje_cny": 8860687424.60548, "cje_btc": 161609.449966 }, { "guid": 361, "ordernum": 6, "name": "litecoin", "name_zh": "LTC-莱特币", "image_url": "http://static.feixiaohao.com/Coin/21a647444a8feaa1db0c42cdc27974a_small.png", "biZf": 11.4, "biLtsl": 55060000, "ltsz_usd": 8694196311, "ltsz_cny": 54808648254, "ltsz_btc": 9.9513E+5, "jg_usd": 158, "jg_cny": 995, "jg_btc": 0.0181, "cje_usd": 1157031940.01656, "cje_cny": 7293986580.74439, "cje_btc": 132439.985383 }, { "guid": 339, "ordernum": 7, "name": "stellar", "name_zh": "XLM-恒星币", "image_url": "http://static.feixiaohao.com/Coin/5f9454a9f4e07c6c12824b6e7d8e7b9e_small.png", "biZf": -2.93, "biLtsl": 18431240000, "ltsz_usd": 7505033724, "ltsz_cny": 47312107848, "ltsz_btc": 864794, "jg_usd": 0.4072, "jg_cny": 2.57, "jg_btc": 0.00004692, "cje_usd": 3.42074E+8, "cje_cny": 2130980496.77627, "cje_btc": 38807.937906 }, { "guid": 414, "ordernum": 8, "name": "neo", "name_zh": "NEO-小蚁", "image_url": "http://static.feixiaohao.com/Coin/57de547cc82727fabf172eeccfc26a8_small.png", "biZf": -9.22, "biLtsl": 65000000, "ltsz_usd": 7.29235E+9, "ltsz_cny": 45971339018, "ltsz_btc": 8.4034E+5, "jg_usd": 112, "jg_cny": 707, "jg_btc": 0.0129, "cje_usd": 2.09007E+8, "cje_cny": 1371600022.72924, "cje_btc": 24822.729171 }, { "guid": 399, "ordernum": 9, "name": "eos", "name_zh": "EOS-柚子", "image_url": "http://static.feixiaohao.com/Coin/6f37de3906f7cfd3775a7161d71175_small.png", "biZf": -4.37, "biLtsl": 647530000, "ltsz_usd": 6066910798, "ltsz_cny": 38246109017, "ltsz_btc": 693904, "jg_usd": 9.37, "jg_cny": 59.06, "jg_btc": 0.001072, "cje_usd": 701061856.154701, "cje_cny": 4419561387.38236, "cje_btc": 80213.91288 }, { "guid": 438, "ordernum": 10, "name": "nem", "name_zh": "XEM-新经币", "image_url": "http://static.feixiaohao.com/Coin/6d96b5f526ae524035953a610f854cc_small.png", "biZf": -3.97, "biLtsl": 9000000000, "ltsz_usd": 5293430999, "ltsz_cny": 33370053689, "ltsz_btc": 6.1002E+5, "jg_usd": 0.5882, "jg_cny": 3.71, "jg_btc": 0.00006778, "cje_usd": 4.80904E+7, "cje_cny": 196462893.933138, "cje_btc": 3564.35718 }, { "guid": 455, "ordernum": 11, "name": "iota", "name_zh": "MIOTA-埃欧塔", "image_url": "http://static.feixiaohao.com/Coin/656d89f1ac5be1ad86c3ade1791cce4b_small.png", "biZf": -3.87, "biLtsl": 2779530000, "ltsz_usd": 5105607996, "ltsz_cny": 32186008087, "ltsz_btc": 588343, "jg_usd": 1.84, "jg_cny": 11.58, "jg_btc": 0.000212, "cje_usd": 6.23429E+7, "cje_cny": 389620671.598961, "cje_btc": 7079.284143 }, { "guid": 469, "ordernum": 12, "name": "dash", "name_zh": "DASH-达世币", "image_url": "http://static.feixiaohao.com/Coin/7fb0ef441241273db6a8e4b78f512f0_small.png", "biZf": -3.89, "biLtsl": 7860000, "ltsz_usd": 4750257217, "ltsz_cny": 29945859008, "ltsz_btc": 530453, "jg_usd": 604, "jg_cny": 3808, "jg_btc": 0.0675, "cje_usd": 170612743.414504, "cje_cny": 1075551265.12222, "cje_btc": 19063.481915 }, { "guid": 484, "ordernum": 13, "name": "monero", "name_zh": "XMR-门罗币", "image_url": "http://static.feixiaohao.com/Coin/ebac80e888627b30e5cce5a13151619_small.png", "biZf": -3.52, "biLtsl": 15680000, "ltsz_usd": 3650398588, "ltsz_cny": 23012295217, "ltsz_btc": 417781, "jg_usd": 233, "jg_cny": 1467, "jg_btc": 0.0266, "cje_usd": 47978386.840826, "cje_cny": 302458149.563911, "cje_btc": 5491.811382 }, { "guid": 506, "ordernum": 14, "name": "tron", "name_zh": "TRX-波场", "image_url": "http://static.feixiaohao.com/Coin/f0a3e16777ea7ed1e15fc80c1c74d56_small.png", "biZf": -6.93, "biLtsl": 65748190000, "ltsz_usd": 2674570722, "ltsz_cny": 1.686062756E+10, "ltsz_btc": 308359, "jg_usd": 0.0407, "jg_cny": 0.2564, "jg_btc": 0.00000469, "cje_usd": 2.14209E+8, "cje_cny": 1320048433.11454, "cje_btc": 24422.018542 }, { "guid": 607, "ordernum": 15, "name": "lisk", "name_zh": "LSK-应用链", "image_url": "http://static.feixiaohao.com/Coin/145799f91a9f1073712fd90dae2535_small.png", "biZf": -7.75, "biLtsl": 117710000, "ltsz_usd": 2434864153, "ltsz_cny": 15349505364, "ltsz_btc": 280584, "jg_usd": 20.68, "jg_cny": 1.3E+2, "jg_btc": 0.002384, "cje_usd": 4.01806E+7, "cje_cny": 267352453.649823, "cje_btc": 4890.86814 }], "success": 1000, "msg": "" };
    // this.parseData(jsonData.pagedata);
    // this.setData({
    //   list: this.data.list.concat(jsonData.pagedata),
    // });
    interfaces.cionList(params, (resp) => {
      if (resp.success === 1000) {
        totalPages = resp.data.data.totalPages;
        loadMore = pageNum < totalPages;
        this.parseData(resp.data.data.content);
        this.setData({
          list: this.data.list.concat(resp.pagedata),
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
})
