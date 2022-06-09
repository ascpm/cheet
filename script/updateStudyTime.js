function myAjax() {
    var o = new Object();
    o.url = window.location.href;

    o.onBegin = null;
    o.onSuccess = null;
    o.onError = null;

    o.method = "GET";
    o.data = null;
    o.responseText = null;
    o.responseXML = null;

    //XMLHTTP 의 생성 메소드
    o.getXmlHttp = function () {
        var req;
        if (window.XMLHttpRequest) {
            //FF 계열, IE7 을 위한 XMLHTTP 생성
            req = new XMLHttpRequest();
        } else {
            //IE6 이하를 위한 XMLHTTP 생성
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }

        req.onreadystatechange = function () {
            switch (req.readyState) {
                case 1:
                    o.onLoading();
                    break;
                case 4:
                    o.onComplete();
                    break;
            }
        }
        return req;
    }

    o.xhr = o.getXmlHttp();

    o.onLoading = function () {
        o.raiseEvent("Begin");
    }

    o.onComplete = function () {
        o.responseText = o.xhr.responseText;
        o.responseXML = o.xhr.responseXML;
        if (o.xhr.status == 200) o.raiseEvent("Success"); else o.raiseEvent("Error");
    }

    o.raiseEvent = function (ev) {
        if (typeof o["on" + ev] == "function") o["on" + ev].call(this, o);
    }

    //request 메소드로 호출된 파라메터를 myAjax에 설정
    o.handleArgs = function (args) {
        for (param in args) {
            o[param] = args[param];
        }
    }

    //요청을 보냄
    o.run = function () {
        if (o.xhr == null) return false;
        o.xhr.open(o.method, o.url, false);
        o.xhr.send(o.data);
    }

    return o;
}

myAjax.handleRequest = function (args) {
    //파라메터가 유효한 지 검사
    if (typeof args == "undefined" || args == null) return -1;
    var request = new myAjax();
    // 설정된 파라메터로 myAjax의 속성과 콜백 핸들러를 설정.
    request.handleArgs(args);
    return request.run();
}

myAjax.request = function (args) {
    //Ajax 요청의 시작점
    return myAjax.handleRequest(args);
}

function pad2(n) {
    return n < 10 ? '0' + n : n
}

function getTime(date) {
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}

function getStartTime() {
    var date = new Date();
    date.setMinutes(date.getMinutes() - 100);
    return getTime(date)
}

function getOriStartTime() {
    var date = new Date();
    date.setMinutes(date.getMinutes() - 100);
    return getTime(date)
}

function updateStudyTime(sukang_serial, sub_info_serial) {
    // var data = new FormData();
    // data.append("sukang_serial", sukang_serial);
    // data.append("sub_info_serial", sub_info_serial);
    // data.append("start_ymdhis", getStartTime());
    // data.append("cal_type", "close_form");
    // data.append("session_no", "1028570301");
    // data.append("iis_session_id", "1028570301");
    myAjax.request({
        // url: "https://www.in.or.kr/main/classroom/study/studyTimeUpdate.do",
        // method: "POST",
        // data: data,
        url: "https://www.in.or.kr/main/classroom/study/studyTimeUpdateAJAX.do?sukang_serial=" + sukang_serial + "&sub_info_serial=" + sub_info_serial + "&start_ymdhis=" + getStartTime() + "&ori_start_ymdhis=" + getOriStartTime() + "&cal_type=XMLHTTP",
        // onBegin : function () { alert ("학습시간을 저장중입니다."); },
        onSuccess: function (result) {
            console.log(result.responseText);
        },
        onError: function () {
        }
    });
}

setInterval(function() {
    updateStudyTime('6655344', '210803FU142246371');
    updateStudyTime('6655344', '210803QB142246402');
    updateStudyTime('6655344', '210803SG142246418');
    updateStudyTime('6655344', '210803FJ142246433');
    updateStudyTime('6655344', '210803RK142246449');
    updateStudyTime('6655344', '210803AH142246465');
}, 60 * 1000);
