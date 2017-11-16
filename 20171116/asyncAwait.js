function getPromise(code, url) {
  return new Promise(resolve => {
    $.dbsetsql(code, url, data => {
      resolve(data);
    });
  });
}

async function doItChain() {
  let userUrl = "common/13";
  let userCode = {
    userid: "000940"
  };
  let user = await getPromise(userCode, userUrl);
  let deptUrl = "common/28";
  let deptCode = {
    id: user[0].bm
  };
  let dept = await getPromise(deptCode, deptUrl);
}

doItChain();

// 避免回调地狱，在async函数中处理多个异步对象，
// 通过await 使得整个async环境具有 类似的同步属性~。
