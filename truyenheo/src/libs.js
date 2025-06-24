// https://stackoverflow.com/a/4673436
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

String.prototype.append = function(w) {
    if (this.endsWith(w)) return this;
    return this + w;
}

String.prototype.prepend = function(w) {
    if (this.startsWith(w)) return this;
    return w + this;
}

String.prototype.rtrim = function(s) {
    if (s == undefined) s = '\\s';
    return this.replace(new RegExp("[" + s + "]*$"), '');
}

String.prototype.ltrim = function(s) {
    if (s == undefined) s = '\\s';
    return this.replace(new RegExp("^[" + s + "]*"), '');
}

String.prototype.mayBeFillHost = function(host) {
    var url = this.trim();
    if (!url) return '';
    if (url.startsWith(host)) return url;
    if (url.startsWith('//')) return host.split('//')[0] + url;

    return host.rtrim('/') + '/' + url.ltrim('/');
}

// --------------------------------------------------

var TypeChecker = {
    isString: function(o) {
        return typeof o == "string" || (typeof o == "object" && o.constructor === String);
    }, // https://stackoverflow.com/a/9729103
    isNumber: function(o) {
        return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
    }, // https://stackoverflow.com/a/9729103
    isArray: function(o) {
        return o instanceof Array;
    },
    isFunction: function(o) {
        return o && {}.toString.call(o) === '[object Function]';
    }, // https://stackoverflow.com/a/7356528
    isObject: function(o) {
        return typeof o === 'object' && o !== null;
    }, // https://stackoverflow.com/a/8511332
};

// --------------------------------------------------

function log(o, msg) {
    Console.log('___' + (msg || '') + '___');
    if (TypeChecker.isArray(o)) {
        Console.log(JSON.stringify(o, null, 2));
    }
    else {
        Console.log(o);
    }
}

function cleanHtml(html) {
  // trim br tags
  html = html.replace(/(^(<br>\s*)+|(<br>\s*)+$)/gm, '');
  // remove duplicate br tags
  html = html.replace(/(<br>\s*){2,}/gm, '<br>');
  // strip html comments
  html = html.replace(/<!--[^>]*-->/gm, '');
  // html decode
  html = html.replace(/&nbsp;/g, '');

  return html;
}


// --------------------------------------------------
var $ = {
    // Tạo wrapper object với các phương thức tiện ích
    _createWrapper: function(element) {
        if (!element || (element.size && element.size() == 0) || (!element.size && !element.text)) {
            return {
                text: function() { return ''; },
                attr: function() { return ''; },
                html: function() { return ''; },
                hasClass: function() { return false; },
                size: function() { return 0; },
                first: function() { return this; },
                last: function() { return this; },
                get: function() { return this; },
                select: function() { return this; },
                remove: function() { return this; }
            };
        }
        
        return {
            _element: element,
            
            text: function() {
                // Nếu là single element
                if (!this._element.size) {
                    return this._element.text ? this._element.text() : '';
                }
                // Nếu là Elements collection
                if (this._element.size() == 1) {
                    return this._element.text();
                }
                // Nếu có nhiều phần tử, lấy text của tất cả
                var result = [];
                for (var i = 0; i < this._element.size(); i++) {
                    var txt = this._element.get(i).text();
                    if (txt) result.push(txt);
                }
                return result.join(' ');
            },
            
            attr: function(name) {
                // Nếu là single element
                if (!this._element.size) {
                    return this._element.attr ? this._element.attr(name) : '';
                }
                // Nếu là Elements collection
                if (this._element.size() == 1) {
                    return this._element.attr(name);
                }
                // Nếu có nhiều phần tử, lấy attr của phần tử đầu tiên
                return this._element.first().attr(name);
            },
            
            html: function() {
                if (this._element.size() == 1) {
                    return this._element.html();
                }
                return this._element.first().html();
            },
            
            hasClass: function(className) {
                if (this._element.size() == 1) {
                    return this._element.hasClass(className);
                }
                return this._element.first().hasClass(className);
            },
            
            size: function() {
                return this._element.size ? this._element.size() : (this._element.text ? 1 : 0);
            },
            
            first: function() {
                return $._createWrapper(this._element.first());
            },
            
            last: function() {
                return $._createWrapper(this._element.last());
            },
            
            get: function(index) {
                return $._createWrapper(this._element.get(index));
            },
            
            select: function(selector) {
                return $._createWrapper(this._element.select(selector));
            },
            
            remove: function() {
                this._element.remove();
                return this;
            },
            
            // Thêm các phương thức để lấy tất cả giá trị
            allText: function(separator) {
                // Nếu là single element
                if (!this._element.size) {
                    var txt = this._element.text ? this._element.text() : '';
                    return separator ? [txt] : [txt];
                }
                // Nếu là Elements collection
                var result = [];
                for (var i = 0; i < this._element.size(); i++) {
                    var txt = this._element.get(i).text();
                    if (txt) result.push(txt);
                }
                return separator ? result.join(separator) : result;
            },
            
            allAttr: function(name) {
                // Nếu là single element
                if (!this._element.size) {
                    var attr = this._element.attr ? this._element.attr(name) : '';
                    return attr ? [attr] : [];
                }
                // Nếu là Elements collection
                var result = [];
                for (var i = 0; i < this._element.size(); i++) {
                    var attr = this._element.get(i).attr(name);
                    if (attr) result.push(attr);
                }
                return result;
            }
        };
    },

    Q: function(e, q, i) {
        var _empty = Html.parse('').select('body');
        var els = e.select(q);
        
        if (els == '' || els.size() == 0) {
            return this._createWrapper(_empty);
        }
        
        if (i == undefined) {
            return this._createWrapper(els.first());
        }
        
        if (typeof(i) == 'number') {
            if (i == -1) {
                return this._createWrapper(els.last());
            }
            if (i >= els.size()) {
                return this._createWrapper(_empty);
            }
            return this._createWrapper(els.get(i));
        } else {
            if (i.remove) {
                els.select(i.remove).remove();
            }
            return this._createWrapper(els);
        }
    },
    
    QA: function(e, q, o) {
        var arr = [];
        var els = e.select(q);
        o = o || {};
        
        if (els == '' || els.size() == 0) return o.j ? '' : arr;
        
        var processItem = function(item) {
            if (o.f) {
                if (o.f(item)) {
                    arr.push(o.m ? o.m(item) : item);
                }
            } else {
                arr.push(o.m ? o.m(item) : item);
            }
        };
        
        var count = els.size();
        
        if (o.reverse) {
            for (var i = count - 1; i >= 0; i--) {
                var item = els.get(i);
                processItem(item);
            }
        } else {
            for (var i = 0; i < count; i++) {
                var item = els.get(i);
                processItem(item);
            }
        }
        
        if (o.j && typeof(o.j) == 'string') return arr.join(o.j);
        return arr;
    },
    
    // Hàm tiện ích để lấy tất cả text
    QAllText: function(e, q, separator) {
        return this.Q(e, q).allText(separator);
    },
    
    // Hàm tiện ích để lấy tất cả attr
    QAllAttr: function(e, q, attrName) {
        return this.Q(e, q).allAttr(attrName);
    }
};

// Ví dụ sử dụng (giữ nguyên cách dùng cũ):

// $.Q(e, 'a').attr('href')           // Lấy href của thẻ a đầu tiên
// $.Q(e, 'span').text()              // Lấy text của span đầu tiên
// $.Q(e, 'div').html()               // Lấy html của div đầu tiên
// $.Q(e, 'p').hasClass('active')     // Kiểm tra class của p đầu tiên

// Các phương thức mới để lấy tất cả:
// $.Q(e, 'a').allAttr('href')        // Lấy tất cả href
// $.Q(e, 'span').allText()           // Lấy tất cả text thành array
// $.Q(e, 'span').allText(' | ')      // Lấy tất cả text nối bằng ' | '

// Hoặc dùng hàm tiện ích:
// $.QAllText(e, 'span', ', ')        // Lấy tất cả text nối bằng ', '
// $.QAllAttr(e, 'a', 'href')         // Lấy tất cả href thành array