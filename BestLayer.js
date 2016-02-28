(function($){
    var supportedAnimation = {'fade':1};//私有变量，不能被外界修改
    /****
     * @param selector 绑定到目标dom的选择器
     * @param options 配置项，默认值请参考defaultOptions
     * @constructor
     */
    function BestLayer(selector, options){
        var defaultOptions = {
            animation:'fade',//目前仅支持fade效果
            speed:300,//动画速度
            width:500,
            height:400,
            closeCallback:function(layer){},//每次关闭结束的回调函数
            openCallback:function(layer){}//动画打开之后调用函数
        }
        this.options = $.extend({}, defaultOptions, options);
        this.selector = selector;
        this.layer = $(selector);

        this.init();
        this.bindEvents();
    }
    BestLayer.prototype._reset = function(){
        this.layer.css({
            top:($(window).height() - this.options.height)/2,
            left:($(window).width() - this.options.width)/2,
            width:this.options.width,
            height:this.options.height
        });
    }
    BestLayer.prototype.init = function(){
        if($('.bs-layer-shadow').length == 0){
            $('<div class="bs-layer-shadow"></div>').appendTo(document.body);
        }
        if(!this.shadow){
            this.shadow = $(".bs-layer-shadow");
        }
        this._reset();
    };

    BestLayer.prototype.open = function (options) {
        var self = this;
        var defaultOptions = {
            title:'',
            content:''
        };
        var options = $({},defaultOptions, options);
        if(options.title) this.layer.find('.bs-layer-title').text(options.title);
        if(options.content) this.layer.find('.bs-layer-content').text(options.content);
        this.layer.fadeIn(this.options.speed, function(){
            self.options.openCallback(self);
        });
        this.shadow.show();
    };
    BestLayer.prototype.close = function () {
        var self = this;
        this.layer.fadeOut(this.options.speed, function(){
            self.options.closeCallback(self);
        });
        this.shadow.hide();
    };

    BestLayer.prototype.bindEvents = function(){
        var self = this;
        //默认给bs-layer-close绑定关闭事件
        $(document).on("click", ".bs-layer-close", function(){
            self.close();
        });
        //默认给bs-layer-icon-close绑定关闭事件
        $(document).on("click", ".bs-layer-icon-close", function(){
            self.close();
        });
        //默认给bs-layer-close绑定打开事件
        $(document).on("click", ".bs-layer-open", function(){
            self.open();
        });

        $(window).resize(function(){
            self._reset();
        });
    };

    //把BestLayer作为全局变量暴露出去
    window.BestLayer = BestLayer;
})(jQuery);