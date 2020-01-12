﻿/* 控件管理，
可以认为是虚拟DOM，但没有做双向绑定；
*/
(function() {
    /* 用于记录对象时所需的一些属性 */
    var control = function(param) {
        this.id = 0; //控件的id
        this.type = null; //控件的类型，例如pagebox
        this.dom = null; //控件的html文档对象
        this.obj = null; //控件的对象
        this.events = {}; //控件的事件
        //将传入的参数赋给相应的属性
        if (typeof(param) == 'object') {
            for (var t in param)
                this[t] = param[t];
        }
    };
    /*  储存对象方法的键值对   */
    var controls = function() {
        this.muster = {}; //控件的集合
        this.add = function(param) {
            if (typeof(param) == 'object') {
                if (!(!!param['id'])) param.id = "random_" + new Date().getTime() + parseInt(Math.random() * 100);
                this.muster[param['id']] = new control(param);
            } else {
                this.muster[param] = arguments.length > 1 ? arguments[1] : null;
            }
            return this;
        };
        this.update = function(param) {
            if (!!this.muster[param['id']]) {
                var old = this.muster[param['id']];
                for (var key in param) {
                    if (!!param[key])
                        old[key] = param[key];
                }
            } else {
                return this.add(param);
            }
        };
        this.remove = function(key) {
            if (!!this.muster[key]) delete(this.muster[key]);
            return this;
        };
        this.clear = function() {
            for (var key in this.muster) delete(this.muster[key]);
            return this;
        };
        this.all = function() {
            return this.muster;
        };
        //返回control对象
        this.get = function(key) {
            if (!!this.muster[key]) return this.muster[key];
            return null;
        };
        //返回控件对象，例如pagebox对象
        this.obj = function(key) {
            var val = null;
            if (!!this.muster[key]) val = this.muster[key];
            if (val instanceof control) return val.obj;
            return null;
        };
        //返回dom，经过$dom封装的
        this.dom = function(key) {
            var val = null;
            if (!!this.muster[key]) val = this.muster[key];
            if (val instanceof control) return val.dom;
            return null;
        };
        this.size = function() {
            var i = 0;
            for (var key in this.muster) i++;
            return i;
        }
    };
    window.$contrl = control;
    //window.$muster = muster;
    window.$ctrls = new controls();
})();
/*
var t = window.$ctrls.add('ttt', new $contrl({ id: 5899, type: 'pagebox' }));
console.log(t.size());
$ctrls.remove('ttt');
console.log(t.size());
*/