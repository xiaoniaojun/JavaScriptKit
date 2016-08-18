/**
 * Created by hackpoint on 16/8/15.
 * 转载请注明出处
 * qq:731931167
 * 使用jQuery库。
 */

/**
 * ClassName: SetForViewResponse
 *
 * features: 储存一个元素id集合(具备集合的唯一性), 其中的元素会在进入浏览器视野时触发调用,
 * 可以重写foreach()成员函数来实现不同的行为。
 *
 *
 * @addElems: 向集合中添加元素。
 * @removeElems: 删除集合中的元素。
 * @contains: 查找集合中是否已经存在某个元素。
 * @size: 返回集合中的元素数目。
 * @startDetection: 开启元素是否进入视野的检测。
 * @stopDetection: 关闭检测。
 */
function SetForViewResponse(){
    this.elems = {};
    this.n = 0;
    this.interval = 100;
    this.addElems.apply(this, arguments);

    var $self = this;
    this.h = setInterval(function () {$self.foreach()} , this.interval);

}

SetForViewResponse.prototype.addElems = function() {
    for(var i = 0, len = arguments.length; i < len; i++) {
        var val = arguments[i];
        var str = SetForViewResponse._v2s(val);
        if(!this.elems.hasOwnProperty(str)) {
            this.elems[str] = val;
            this.n++;
        }
    }
    return this;
};

SetForViewResponse.prototype.remove = function() {
    for(var i = 0, len = arguments.length; i < len; i++) {
        var str = SetForViewResponse._v2s(arguments[i]);
        console.log("remove:"+str);
        if(this.elems.hasOwnProperty(str)) {
            delete this.elems[str];
            this.n--;
        }
    }
    return this;
};

SetForViewResponse.prototype.contains = function(value) {
    return this.elems.hasOwnProperty(SetForViewResponse._v2s(value));
};

SetForViewResponse.prototype.size = function() {
    return this.n;
};

SetForViewResponse.prototype.startDetection = function () {
    this.h = setInterval(this.foreach, interval);
};

SetForViewResponse.prototype.stopDetection = function () {
    clearInterval(this.h);
};

/**
 * Traversing stored elems
 */
SetForViewResponse.prototype.foreach = function() {
    for (var s in this.elems) {
        // When elem in view
        if (this.elems.hasOwnProperty(s) && this.isScrolledIntoView(s)) {
            $(s).addClass("is-in-view");
        }else{
            $(s).removeClass("is-in-view");
        }
    }
};

/**
 * Pulibc
 * 检测元素是否进入视野。
 * @param elem
 * @returns {boolean}
 */
SetForViewResponse.prototype.isScrolledIntoView = function (elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((docViewBottom >= elemTop) && (docViewTop <= elemBottom));
};
SetForViewResponse["isScrolledIntoView"] = SetForViewResponse.prototype.isScrolledIntoView;


SetForViewResponse._v2s = function(val) {

    switch (typeof val) {
        case 'string':
            return '#' + val;
        default:
            return '@' + objectId(val);
    }
    function objectId(o) {
        var prop = "|**objectid**|";
        if (!o.hasOwnProperty(prop))
            o[prop] = this._v2s.next++;
        return o[prop];
    }
};

/**
 * 方便更改函数对象的属性
 * @type {number}
 */
SetForViewResponse._v2s.next = 100; //对象初始值
/*********************************************************/
/*********************************************************/

var s = new SetForViewResponse('test1','test2','test3');



