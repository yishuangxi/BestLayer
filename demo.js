/**
 * Created by yishuangxi on 2016/2/26.
 */
$(function(){
    var bestLayer = new BestLayer(".bs-layer");

    $("#open").click(function(){
        bestLayer.open();
    });
});