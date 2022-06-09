function retry_set(_val) {
    if (_val) {
        clickSnd(4);
        $("#munje_" + thisMunjeNum).find(".relPop").find(".tit3").show();
        $("#munje_" + thisMunjeNum).find(".relPop").find(".pop_retryBtn").hide();
        $("#munje_" + thisMunjeNum).find(".relPop").fadeIn(function () {
            retry_c = 0;
            clearInterval(retry_timer);
            $("#munje_" + thisMunjeNum).find(".relPop").find(".tit3").fadeOut();
            $("#munje_" + thisMunjeNum).find(".relPop").find(".pop_retryBtn").fadeIn();
            clickSnd(3);
        });
    } else {
        clearInterval(retry_timer);
        $("#munje_" + thisMunjeNum).find(".relPop").fadeOut();
        $("#munje_" + thisMunjeNum).find(".relPop").find(".time").html(0);
    }
}

function initQuiz() {
    // parent.$('#replayBtn').attr('disabled', false);
    // parent.$('#replayBtn').removeClass("disable");
    var _quizDap = [];
    $(".munPannel").each(function (idx) {
        var _id = $(this).attr("id").split("_");
        var _idn = parseInt(_id[1]);
        var _nid = idx + 1;
        _quizDap[(idx + 1)] = quizDap[_idn];
        $(this).attr("id", "munje_" + _nid);
        $(this).find(".JiMun_con").find(".cell").html($(this).find(".JiMun_con").find(".cell").html() + "_" + quizDap[_idn]);		//### for dev
        if ($(this).find(".JiMun_con").find(".tb.dev").lenfth == 0) {
            $(this).find(".JiMun_con").append('<button class="tb dev">관련 학습 보기</button>');
        }
        $(this).find(".JiMun_con").find(".tb").click(function () {
            //console.log(thisMunjeNum);
            clickSnd();
            retry_set(true);
        });

        if (_nid > 1) {
            $(this).find(".quizBtnSet").html('<button id="prevQ_' + _nid + '" class="preQBtn">이전문제</button>');
        }

        var _str = '';
        _str += '<div id="quest_' + _nid + '" class="qQuest">Q' + _nid + '<div class="qOx"></div></div>';
        for (var i = 1; i <= totalMunjeNum; i++) {
            if (i == _nid) {
            } else {
                _str += '<button id="go_' + _nid + '_' + i + '" class="goDBtn">Q' + i + '</button>';
            }
        }
        $(this).find(".qn_box").html(_str);

    });
    quizDap = _quizDap;
}

initQuiz();