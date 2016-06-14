#就是note啊
1.user-modify

    user-modify: read-only;
    user-modify: read-write;
    user-modify: write-only; 支持富文本
    user-modify: read-write-plaintext-only; 纯文本
目前只有webkit内核浏览器才支持read-write-plaintext-only这个值。
2.location.search
   $(function() {
            var url = decodeURI(location.search);
            if (url.indexOf("?") != -1) {　　
                var str = url.substr(1)　
                strs = str.split("&");　　
                var HSCode = strs[0];
                var HSCode = HSCode.substr(7);
                alert(HSCode);
                var HSName = strs[1];
                var CargoName = HSName.substr(7);
                alert(CargoName);
            }
        });


