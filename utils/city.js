//  省份
var provinceList = [{ "id": "11", "name": "北京", "initial": "B" }, { "id": "12", "name": "天津", "initial": "T" }, { "id": "13", "name": "河北", "initial": "H" }, { "id": "14", "name": "山西", "initial": "S" }, { "id": "15", "name": "内蒙", "initial": "N" }, { "id": "21", "name": "辽宁", "initial": "L" }, { "id": "22", "name": "吉林", "initial": "J" }, { "id": "23", "name": "黑龙江", "initial": "H" }, { "id": "31", "name": "上海", "initial": "S" }, { "id": "32", "name": "江苏", "initial": "J" }, { "id": "33", "name": "浙江", "initial": "Z" }, { "id": "34", "name": "安徽", "initial": "A" }, { "id": "35", "name": "福建", "initial": "F" }, { "id": "36", "name": "江西", "initial": "J" }, { "id": "37", "name": "山东", "initial": "S" }, { "id": "41", "name": "河南", "initial": "H" }, { "id": "42", "name": "湖北", "initial": "H" }, { "id": "43", "name": "湖南", "initial": "H" }, { "id": "44", "name": "广东", "initial": "G" }, { "id": "45", "name": "广西", "initial": "G" }, { "id": "46", "name": "海南", "initial": "H" }, { "id": "50", "name": "重庆", "initial": "C" }, { "id": "51", "name": "四川", "initial": "S" }, { "id": "52", "name": "贵州省", "initial": "G" }, { "id": "53", "name": "云南", "initial": "Y" }, { "id": "54", "name": "西藏", "initial": "X" }, { "id": "61", "name": "陕西", "initial": "S" }, { "id": "62", "name": "甘肃", "initial": "G" }, { "id": "63", "name": "青海", "initial": "Q" }, { "id": "64", "name": "宁夏", "initial": "N" }, { "id": "65", "name": "新疆", "initial": "X" }, { "id": "71", "name": "台湾", "initial": "T" }, { "id": "81", "name": "香港", "initial": "X" }, { "id": "82", "name": "澳门", "initial": "A" }, { "id": "83", "name": "钓鱼岛", "initial": "D" }];

var cityList = [
  {
    "provinceId": "11",
    "citys": [
      { "id": "1", "name": "昌平" },
      { "id": "2", "name": "朝阳" },
      { "id": "3", "name": "东城" },
      { "id": "4", "name": "大兴" },
      { "id": "5", "name": "房山" },
      { "id": "6", "name": "丰台" },
      { "id": "7", "name": "海淀" },
      { "id": "8", "name": "怀柔" },
      { "id": "9", "name": "门头沟" },
      { "id": "10", "name": "密云" },
      { "id": "11", "name": "平谷" },
      { "id": "12", "name": "石景山" },
      { "id": "13", "name": "顺义" },
      { "id": "14", "name": "通州" },
      { "id": "15", "name": "西城" },
      { "id": "16", "name": "延庆" }]
  },
  {
    "provinceId": "13",
    "citys": [
      { "id": "1", "name": "保定" },
      { "id": "2", "name": "承德" },
      { "id": "3", "name": "沧州" },
      { "id": "4", "name": "邯郸" },
      { "id": "5", "name": "衡水" },
      { "id": "6", "name": "廊坊" },
      { "id": "7", "name": "秦皇岛" },
      { "id": "8", "name": "石家庄" },
      { "id": "9", "name": "唐山" },
      { "id": "10", "name": "邢台" },
      { "id": "11", "name": "张家口" }]
  }
];

//城市检索的首字母
var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]

// 获取字母列表
function getSearchLetter() {
  return searchLetter;
}

//  对城市信息进行分组
function getProvinceList() {
  var tempObj = [];
  for (var x = 0; x < searchLetter.length; x++) {
    var initial = searchLetter[x];

    // 城市
    for (var y = 0; y < provinceList.length; y++) {
      if (initial == provinceList[y].initial) {
        tempObj.push(provinceList[y]);
      }
    }
  }
  return tempObj;
}

//  点击字母，获取省份
function getProvincesByInitial(initial) {
  var tempObj = [];
  for (let i = 0; i < provinceList.length; i++) {
    if (provinceList[i].initial == initial)
      tempObj.push(provinceList[i]);
  }
  return tempObj;
}

//  点击省份，获取城市列表
function getCitysByProvinceId(provinceId) {
  var tempObj = [];
  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].provinceId == provinceId) {
      tempObj = cityList[i].citys;
      break;
    }
  }
  return tempObj;
}

module.exports = {
  getSearchLetter: getSearchLetter, //  获取字母列表
  getProvinceList: getProvinceList, //  根据字母列表获取所有省份
  getProvincesByInitial: getProvincesByInitial, //  根据字母查询省份列表
  getCitysByProvinceId: getCitysByProvinceId  //  根据省份Id,获取市区
}