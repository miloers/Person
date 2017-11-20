class dynamicCreateData {
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
      if (!this.isArray(data) && !this.isString(attr)) {
        console.error("排序类型不对");
        return false;
      }
      let newData = data.sort(function(a, b) {
        return a[attr] - b[attr];
      });
    }
    /**
     * 根据返回的值再插入到生成的数组里
     * 注意：返回的值的keys和 旧的生成数组的驱动数据的id必须是相对应的
     * @param {*array} returnData 
     * @param {*array} wrapData
     * @return {*array} wrapData
     * 返回一个包装数组，把wrapData的value数据加上
     * demo见 demo 1.html
     * 具有定制行,id相同即可
     */
    dataFindValue(returnData, wrapData) {
      //给旧容器增加value属性
      $.each(wrapData, function(i, v) {
        wrapData[i].value = "";
      });
      var keys = Object.keys(returnData);
  
      $.each(keys, function(i, v) {
        $.each(wrapData, function(j, k) {
          if (k.id == v) {
            k.value = returnData[v];
          }
        });
      });
      return wrapData;
    }
    /**
     * 返回过滤的数据
     * @param {*array} data 源数据
     * @param {*array} filterData 需过滤的数据 
     */
    filterValue(data, filterData) {
      var newData = [];
      $.each(data, function(i, v) {
        newData.push(v);
      });
      var len = filterData.length;
  
      for (var i = 0; i < len; i++) {
        var a = newData.findIndex(v => v.name === filterData[i]);
        if (a != -1) {
          newData.splice(a, 1);
        }
      }
      return newData;
    }
    /**
     * 查询对应的值 返回一个数组值
     * @param {*array} data 
     * @param {*array} query 
     */
    queryValue(data, query) {
      if (!this.isArray(query) && !this.isArray(data)) {
        console.error("查询值必须是数组类型！");
        return false;
      }
      var newData = [];
      var len = query.length;
      $.each(data, function(i, v) {
        $.each(query, function(j, k) {
          if (k == v.name) {
            newData.push(v.value);
          }
        });
      });
      return newData;
    }
    /**
     * 查询对应的值 返回一个数组
     * @param {*array} data 
     * @param {*array} query 
     */
    queryValueArr(data, query) {
      if (!this.isArray(query) && !this.isArray(data)) {
        console.error("查询值必须是数组类型！");
        return false;
      }
      var newData = [];
      var len = query.length;
      $.each(data, function(i, v) {
        $.each(query, function(j, k) {
          if (k == v.name) {
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
        console.warn(Object.prototype.toString.call(data));
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
  }
  