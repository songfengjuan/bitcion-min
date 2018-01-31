//index.js
//获取应用实例
const app = getApp();
let loadMore = true;
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

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
          roseValeType: sortType
        });
      }

    }
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
})
