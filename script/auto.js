function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function step(api) {
    var start = api.completeContentsSeqList.length;
    var max = api.GetValue("cmi.objectives._count");
    console.log("total count : " + max);
    for (var i = start; i < max; i++) {
        console.log("start:" + i);
        api.SetValue("cmi.objectives." + i + ".completion_status", "completed");
        var next = i + 1;
        api.SetValue("cmi.progress_measure", next / max);
        api.SetValue("cmi.suspend_data", next + "/" + max);
        api.SetValue("cmi.location", ("00" + next).slice(-3) + ".html");
        // var ms = 1000 * 60 * 2 + (Math.random() * 10) * 1000;
        var ms = 1000 * 60;
        console.log("sleep ms:" + ms);
        await sleep(ms);
    }
}

//step(/* getAPI() or API */)
step(API)