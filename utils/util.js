var utils = {
  formatTime: function (date) {
    if (!date) {
      return "";
    }
    var date = new Date(date);
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  getUrl: function () {
    // return "https://www.gpcmarket.cn/mini/dev/";
    // return "http://39.106.148.255/wechat";
    return "https://api.zhib.didaedu.com/wechat";
  },
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  //判断是否登录，如果没有就跳转到登录页面
  isLogin: function (url = '../index/index') {
    var userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
      this.toLoginIndex();
      return false;
    }
    return true;
  },
  //跳转到登录页面
  toLoginIndex: function (url = '../index/index') {
    wx.navigateTo({
      url: url,
    })
    return false;
  },
  //个人信息存储在本地
  saveUserInfo: function (key, data) {
    wx.setStorageSync(key, data);
  },
  //获取个人信息
  getUserInfo: function (key) {
    wx.getStorageSync(key) || "";
  },
  //删除个人信息
  deleteLocalInfo: function () {
    wx.clearStorageSync();
  },
  //是否是电话号码
  isPhone: function (val) {
    var valnew = this.trim(val);
    return valnew.match(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/) ? true : false;
  },
  isPassword: function (val) {
    var valnew = this.trim(val);
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(valnew) ? true : false;
    //注册密码：字母、数字、符合组成且不小于6位
  },
  trim: function (str) {
    if (str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  //格式化金钱
  formatCurrency: function (num) {
    var currentUnit = '';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
      num = "0";
    var sign = (num == (num = Math.abs(num)));
    if (num / 1E+5 > 0 && num / 1E+8 < 0){
      currentUnit = '万';
      num = num / 1E+5;
    } else if (num / 1E+8 >0){
      currentUnit = '亿';
      num = num / 1E+8;
    }
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10 && currentUnit == '' && cents != 0 ) {
      cents = '.1'
    }else if (currentUnit == '' && cents == 0) {
      cents = ''
    }else if (cents < 10 && currentUnit != '') {
      cents = '.1'
    } else if (cents > 10) {
      cents = '.'+cents.toString().charAt(0);
    }
      // cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    // return (((sign) ? '' : '-') + num + '.' + cents);
    return (((sign) ? '' : '-') + num + cents+currentUnit);
  },
  // 倒计时
  countDownTime: function (endTime, intervalTime, type = 1) {
    if (!endTime) {
      return 0;
    }
    intervalTime = intervalTime || 5;//默认五分钟
    let now = new Date().getTime();
    if (endTime - now <= 0) {
      return 0;
    }
    let d = new Date(endTime - now).getTime();
    let day = Math.floor(d / 1000 / 60 / 60 / 24);
    let hour = Math.floor(d / 1000 / 60 / 60 % 24);
    let minute = Math.floor(d / 1000 / 60 % 60);
    let second = Math.floor(d / 1000 % 60);
    if (type === 1) {
      return [hour, minute, second].map(this.formatNumber).join(':');
    } else {
      return day > 0 ? `${day}天${hour}小时${minute}分钟` : `${hour}小时${minute}分钟`
    }
    // return type === 1 ? [hour, minute, second].map(this.formatNumber).join(':') : `${day}天${hour}小时${minute}分钟`;
  }

}

module.exports = utils;
