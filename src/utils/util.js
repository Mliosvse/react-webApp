/**
 * Created by Administrator on 2017/8/25 0025.
 */
    /*获取到距离今天的时间天数，
     *默认天数是15天
     *num表示时间间隔的天数,返回的是一个数组，第一个是今天，第二个是num天前，
     *返回的时间格式是YYYY-MM-DD
     */
     function myTimeIntervals(days){
        var num = days ? days : 15;
        var todayDate = new Date();
        var timestamp = todayDate.getTime();//今天的时间戳
        var timestamp2 = timestamp - ((num - 1) * 24 * 60 * 60 * 1000);//num天之前的时间戳
        var daysBefore = new Date(timestamp2);
        /*获取今天年月日*/
        var todayYear = todayDate.getFullYear().toString();//转化成字符串方便处理
        var todayMonth = (todayDate.getMonth() + 1).toString();//转化成字符串方便处理
        todayMonth = todayMonth.length === 1 ? ("0" + todayMonth) : todayMonth;
        var todayDay = todayDate.getDate().toString();//转化成字符串方便处理
        todayDay = todayDay.length === 1 ? ("0" + todayDay) : todayDay;
        /*获取几天之前的年月日*/
        var daysBeforeYear = daysBefore.getFullYear().toString();//转化成字符串方便处理
        var daysBeforeMonth = (daysBefore.getMonth() + 1).toString();//转化成字符串方便处理
        daysBeforeMonth = daysBeforeMonth.length === 1 ? ("0" + daysBeforeMonth) : daysBeforeMonth;
        var daysBeforeDay = daysBefore.getDate().toString();//转化成字符串方便处理
        daysBeforeDay = daysBeforeDay.length === 1 ? ("0" + daysBeforeDay) : daysBeforeDay;
        /*拼接时间*/
        todayDate = todayYear + '-' + todayMonth + "-" + todayDay;
        daysBefore = daysBeforeYear + '-' + daysBeforeMonth + "-" + daysBeforeDay;
        var theTimeArray = [daysBefore, todayDate];
        return theTimeArray;
    }
    function toQueryString(obj){
        function toQueryPair(key, value) {
            if (typeof value === 'undefined') {
                return key;
            }
            return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        };
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor === Array) {//数组
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    //时间戳转化为时间
    function getLocalTime(num){
        var timestamp4 = new Date(num);//直接用 new Date(时间戳) 格式转化获得当前时间
        return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
    }
    function getCreatetime(num){//去除时间中时区符号
        return num.split('.')[0].replace('T', ' ');//t替换成空格
    }
    /*
     功能： 截取小数位
     @money:number|string 		金额
     @num:number 				小数位数
     @hasDot:boolean  			是否有逗号
     */
    function fmoney(money, num, hasDot){
        var _money = money;
        num = typeof num === "undefined" ? 2 : num;
        hasDot = typeof hasDot === "undefined" ? true : hasDot;
        if (isNaN(_money)) {//不是数字 直接返回
            console.log("is not a num");
            return _money;
        }
        _money += "";// 转化为字符串
        hasDot = hasDot && _money.replace(/\.\d*/, '').length > 3;//判断是否要自动加千分位
        var index = _money.indexOf("."),//找到小数点
            i = 0;
        if (index === -1) {
            index = _money.length;
            _money += '.';
        }
        while (i++ < num)_money += "0";//补零
        _money = _money.substring(0, index) + _money.substr(index, num + 1);//此时包含小数点
        _money = num === 0 ? +_money : _money;//得到截取后的字符串
        return hasDot ? addDot(_money) : _money;
    }
    function formatDateTime(inputTime, time){
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (time === false) {
            return y + '-' + m + '-' + d;
        } else {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
    }

//为金额添加逗号；功能:1000->1,000
function addDot(money){
    //先找到小数点
    var start = money.indexOf(".");
    var result = "", j = 0;
    for (var i = money.length - 1; i >= 0; i--) {
        if (i >= start) {
            result = money[i] + result;
        }
        else {
            if (j >= 3) {
                result = money[i] + result;
                j = 1;
            }
            else {
                result = money[i] + result;
                j++;
            }
        }
    }
    return result;
}

window.$util = { myTimeIntervals,toQueryString,getLocalTime,getCreatetime,fmoney,formatDateTime };