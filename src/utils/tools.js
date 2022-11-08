// 设置cookie

/**
 * 设置cookie值
 *
 * @param {String} name cookie名称
 * @param {String} value cookie值
 * @param {Number} expiredays 过期时间，天数
 */
export function setCookie(name, value, expiredays) {
  let exdate = new Date();
  //setDate获取N天后的日期
  exdate.setDate(exdate.getDate() + expiredays); //getDate() 获取当前月份的日 + 过期天数
  document.cookie =
    name +
    "=" +
    encodeURI(value) +
    ";path=/;expires=" +
    exdate.toLocaleString();
}

/**
 * 获取cookie值
 * @param {String} name cookie名称
 */
export function getCookie(name) {
  var arr = document.cookie.split(";");
  //["_ga=GA1.1.1756734561.1561034020", " mobile=123" password=456"]
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("="); // ["_ga", "GA1.1.1756734561.1561034020"]
    if (arr2[0].trim() == name) {
      return arr2[1];
    }
  }
}

/**
 * 删除指定cookie值
 * @param {String} name cookie名称
 */
export function clearCookie(name) {
  this.setCookie(name, "", -1); //清除cookie
}

/**
 * 浏览器是否支持本地cookie
 */
export function isSupportLocalCookie() {
  let { name, value } = { name: "name", value: "mingze" };
  setCookie(name, value, 1); //设置cookie
  return getCookie(name).includes(value); //includes 判断数组name中是否含有当前value(返回true or false)
}
