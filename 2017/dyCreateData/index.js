import { dynamicCreateData } from "Common/dyCreateData.js";
import { DATA, transData } from "./dyConst.js";
let originData = DATA;
let queryData = JSON.parse(transData);
let todo = new dynamicCreateData();
//赋值
let processData = todo.dataFindValue(queryData[0], originData, "name");
//排序
let sortData = todo.dataSort(processData, "num");
//过滤
let filter = ["工程名称", "任务单号"];
let filterData = todo.filterValue(processData, filter, "name");

//返回特定数组值
let query = ["工程名称", "任务单号"];
let queryDataValue = todo.queryValue(processData, query, "name", "value");
//返回特定数组
let queryDataValueArr = todo.queryValueArr(processData, query, "name", "value");

//生成特定对象
let makeObj = todo.makeObj(processData, "id", "value");
