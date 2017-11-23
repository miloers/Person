export class dynamicCreateData {
    constructor() {}
    /**
     *
     * @param {*arr} array
     * @param {*string} attr 数组的属性
     */
    reduceHTML(array, attr) {
      let todo = new dynamicCreateData();
      let html = array.reduce(function(prev, cur) {
        todo.regString(cur[attr]);
        let temp = Mustache.to_html(eval(cur[attr]), cur);
        return prev + temp;
      }, "");
      return html;
    }
    /**
     * 判断是否有特殊字符
     * @param {*string} value
     */
    regString(value) {
      let reg = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im;
      if (reg.test(value)) {
        alert("模板字符串有包含特殊字符，请处理");
        console.error(value + "包含特殊字符,请处理!");
        return false;
      }
    }
    /**
     * 数组根据权重值排序
     * demo见 demo 1.html
     * @param {*array} data
     * @param {*string} attr
     */
    dataSort(data, attr) {
      let newData = this.arrayClone(data);
      if (!this.isArray(newData) || !this.isString(attr)) {
        console.table([{ 原因: "传送的数据类型不对！", 来源: "dataSort" }]);
        return false;
      }
      newData = newData.sort(function(a, b) {
        return a[attr] - b[attr];
      });
      return newData;
    }
    /**
     * 通过查询数据的键值，像初始化数据里传送查询数据的值。
     * @param {*object} queryData   查询数据
     * @param {*array} originData 初始化数据
     * @param {*string} attr       查询数值的keys
     * @return {*array} 返回一个带value的初始化数据
     */
    dataFindValue(queryData, originData, attr) {
      if (
        !this.isObject(queryData) ||
        !this.isArray(originData) ||
        !this.isString(attr)
      ) {
        console.table([{ 原因: "传送的数据类型不对！", 来源: "dataFindValue" }]);
        return false;
      }
      let newData = this.arrayClone(originData);
  
      let keys = Object.keys(queryData);
  
      let keysLen = keys.length;
      let newDataLen = newData.length;
      keys.forEach(function(v, i) {
        newData.forEach(function(k, j) {
          if (k[attr] == v) {
            k.value = queryData[v];
          }
        });
      });
      return newData;
    }
    /**
     * 返回过滤的数据
     * @param {*array} data 源数据
     * @param {*array} filterData 需过滤的数据
     * @param {*string} attr 需要匹配过滤数据的源数据属性
     */
    filterValue(data, filterData, attr) {
      if (
        !this.isArray(data) ||
        !this.isArray(filterData) ||
        !this.isString(attr)
      ) {
        console.table([{ 原因: "传送的数据类型不对！", 来源: "filterValue" }]);
        return false;
      }
      let newData = this.arrayClone(data);
      let len = filterData.length;
      for (let i = 0; i < len; i++) {
        let a = newData.findIndex(v => v[attr] === filterData[i]);
        if (a != -1) {
          newData.splice(a, 1);
        }
      }
      return newData;
    }
    /**
     * 返回特定数组值
     * @param {*array} data  原数租
     * @param {*array} query 所需查询的数组
     * @param {*string} attr 查询值的属性条件
     * @param {*string} queryValue 返回查询值所需的属性
     */
    queryValue(data, query, attr, queryValue) {
      if (
        !this.isArray(query) ||
        !this.isArray(data) ||
        !this.isString(attr) ||
        !this.isString(queryValue)
      ) {
        console.table([{ 原因: "传送的数据类型不对！", 来源: "queryValue" }]);
        return false;
      }
      let newData = [];
      data.forEach(function(v, i) {
        query.forEach(function(k, j) {
          if (k == v[attr]) {
            newData.push(v[queryValue]);
          }
        });
      });
      return newData;
    }
    /**
     * 返回特定数组
     * @param {*array} data  原数租
     * @param {*array} query 所需查询的数组
     * @param {*string} attr 查询值的属性条件
     *
     */
    queryValueArr(data, query, attr) {
      if (!this.isArray(query) || !this.isArray(data) || !this.isString(attr)) {
        console.table([{ 原因: "传送的数据类型不对！", 来源: "queryValueArr" }]);
        return false;
      }
      let newData = [];
      data.forEach(function(v, i) {
        query.forEach(function(k, j) {
          if (k == v[attr]) {
            newData.push(v);
          }
        });
      });
      return newData;
    }
  
    /**
     * 配合select组件使用，自定义select的默认值
     * @param {*arr} data
     * @param {*string} query
     * @param {*string} attr
     */
    selectSort(data, queryString, attr) {
      if (
        !this.isArray(data) &&
        !this.isString(queryString) &&
        !this.isString(attr)
      ) {
        console.error("排序类型值不正确");
        return false;
      } else {
        let index = data.findIndex(v => v[attr] === queryString);
        if (index != -1) {
          let insertData = data[index];
          data.splice(index, 1);
          data.unshift(insertData);
        } else {
          console.warn("select组件没有排序");
        }
        return data;
      }
    }
    /**
     * 判断是否是数组类型
     * @param {*any} data
     */
    isArray(data) {
      if (Object.prototype.toString.call(data) === "[object Array]") {
        return true;
      } else {
        console.table([
          {
            原因: "非数组类型",
            数据: data,
            传输类型: Object.prototype.toString.call(data).toString()
          }
        ]);
        return false;
      }
    }
    /**
     * 判断是否是字符串
     * @param {*string} data
     */
    isString(data) {
      if (Object.prototype.toString.call(data) === "[object String]") {
        return true;
      } else {
        console.warn(Object.prototype.toString.call(data));
        return false;
      }
    }
    /**
     *判断是否是对象
     * @param {*object} data
     */
  
    isObject(data) {
      if (Object.prototype.toString.call(data) === "[object Object]") {
        return true;
      } else {
        console.warn(Object.prototype.toString.call(data));
        return false;
      }
    }
    /**
     * 数组克隆
     * @param {*array} data
     */
    arrayClone(data) {
      if (!this.isArray(data)) {
        console.warn(Object.prototype.toString.call(data));
        return false;
      }
      let newData = data.slice(0);
      return newData;
    }
  }
  