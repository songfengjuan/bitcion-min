var App = getApp();

Page({
  data: {
    showModalStatus: true,
    nowInitial: "", //  当前所选的字母索引
    isBack: false, //  是否显示右上角"返回省份选择"文字
  },
  //  关闭按钮
  closeFun: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.animationFun(currentStatu)
  },
  //  动画部分
  animationFun: function (currentStatu) {
    // 1创建动画实例   
    var animation = wx.createAnimation({
      duration: 300,  //  动画时长  
      timingFunction: "step-start", //  动画第一帧就跳至结束状态直到结束 
      delay: 0,  // 0则不延迟  
      opacity: 0 //  透明度，参数范围 0~1
    });

    // 2执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 3导出动画
    this.setData({
      animationData: animation.export(),
      showModalStatus: this.data.showModalStatus ? false : true
    })
  },
  //  "返回省份选择"点击
  backProvince(e) {
    let id = this.data.nowInitial;
    let data = "";
    if (id == "")
      data = App.cityObj.getProvinceList();
    else
      data = App.cityObj.getProvincesByInitial(id);

    this.setData({
      isBack: false, //  是否允许点击市区
      provinceList: data
    })
  },
  //  顶部字母列表点击
  getProvincesByInitial(e) {
    let initial = e.currentTarget.dataset.initial;
    let data = App.cityObj.getProvincesByInitial(initial);
    this.data.nowInitial = initial  //  修改当前所选的字母索引
    this.setData({
      isBack: false,  //  是否允许点击市区
      nowInitial: initial,
      provinceList: data
    })
  },
  //  省份点击
  getCitysByProvinceId(e) {

    if (!this.data.isBack) {
      let provinceId = e.currentTarget.dataset.provinceid;
      let data = App.cityObj.getCitysByProvinceId(provinceId);
      this.setData({
        isBack: true, //  是否允许点击市区
        provinceList: data
      })
    }

  },
  onLoad() {
    console.log(App.cityObj.getProvinceList())
    this.setData({
      searchLetter: App.cityObj.getSearchLetter(),
      provinceList: App.cityObj.getProvinceList()
    })

    // wx.showToast({
    //   title: '标题',
    //   icon: "success", // loading
    //   // image 自定义图标的本地路径，image 的优先级高于 icon
    //   duration: 3000,
    //   mask: true, // 是否显示透明蒙层，防止触摸穿透，默认：false
    //   success: function () {
    //     // wx.hideToast()  //  隐藏消息提示框
    //   }
    // })

    // //  显示加载框
    // wx.showLoading({
    //   title: 'loading标题',
    //   mask: true,
    //   success() {
    //     //  wx.hideLoading()
    //   }
    // })

    // //  显示模态弹窗
    // wx.showModal({
    //   title: '提示的标题',
    //   content: '提示的内容',

    //   showCancel: true,  //  是否显示取消按钮，默认为 true
    //   cancelText: "取消文字", //  取消按钮的文字，默认为"取消"，最多 4 个字符
    //   cancelColor: "#9966ff",

    //   confirmText: "确定按钮",  //  确定按钮的文字，默认为"确定"，最多 4 个字符
    //   confirmColor: "#cc0033",  //  确定按钮的文字颜色，默认为"#3CC51F"
    //   success() {
    //   }
    // })

    // // 显示操作菜单
    // wx.showActionSheet({
    //   itemList: ["123", "234", "345", "456"],
    //   itemColor: "#ff0033",
    //   success(res) {
    //     console.log(res.tapIndex) //  用户点击的按钮，从上到下的顺序，从0开始
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })
  }
})
