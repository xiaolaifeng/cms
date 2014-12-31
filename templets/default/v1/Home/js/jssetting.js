(function(d, c) {
	function e(j, h) {
		if (j instanceof Array) {
			for ( var g = 0, f = j.length; g < f; g++) {
				if (h.call(j[g], j[g], g) === false) {
					return
				}
			}
		} else {
			for ( var g in j) {
				if (j.hasOwnProperty(g)) {
					if (h.call(j[g], j[g], g) === false) {
						return
					}
				}
			}
		}
	}
	function b(g, f) {
		this.name = f;
		this.path = g;
		this.fn = null;
		this.exports = {};
		this._loaded = false;
		this._requiredStack = [];
		this._readyStack = [];
		b.cache[this.name] = this
	}
	b.loadedPaths = {};
	b.loadingPaths = {};
	b.cache = {};
	b.paths = {};
	b.moduleFileMap = {};
	b.requiredPaths = {};
	b.lazyLoadPaths = {};
	b.isPathsLoaded = function(g) {
		var f = true;
		e(g, function(h) {
			if (!(h in b.loadedPaths)) {
				return f = false
			}
		});
		return f
	};
	b.require = function(f) {
		var g = b.get(f);
		g.init();
		return g.exports
	};
	if (c && c.charAt(c.length - 1) == "/") {
		c = c.substr(0, c.length - 1)
	}
	b.getJsPath = function(f) {
		return c || "" + f
	};
	b.get = function(f) {
		var h = f.indexOf(":") > -1 ? f : b.getJsPath(f);
		if (f.indexOf("?") > -1) {
			var g = f.split("?");
			f = g[0];
			h = f.replace(/\.js$/, "_" + g[1] + ".js")
		}
		if (b.cache[f]) {
			return b.cache[f]
		}
		return new b(h, f)
	};
	b.prototype = {
		init : function() {
			if (!this._inited) {
				this._inited = true;
				if (!this.fn) {
					return
				}
				var f;
				if (f = this.fn.call(null, b.require, this.exports)) {
					this.exports = f
				}
			}
		},
		load : function() {
			b.loadingPaths[this.path] = true;
			var f = b.moduleFileMap[this.name] || this.path;
			a.create({
				src : f
			})
		},
		lazyLoad : function() {
			var f = this.name, g = this.path;
			if (b.lazyLoadPaths[f]) {
				this.define();
				delete b.lazyLoadPaths[f]
			} else {
				if (g in b.loadedPaths) {
					this.triggerStack()
				} else {
					if (g in b.loadingPaths) {
						return
					} else {
						b.requiredPaths[this.name] = true;
						this.load()
					}
				}
			}
		},
		ready : function(g, h) {
			var f = h ? this._requiredStack : this._readyStack;
			if (g) {
				if (this._loaded) {
					g()
				} else {
					f.push(g)
				}
			} else {
				this._loaded = true;
				b.loadedPaths[this.path] = true;
				delete b.loadingPaths[this.path];
				this.triggerStack()
			}
		},
		triggerStack : function() {
			if (this._readyStack.length > 0) {
				this.init();
				e(this._readyStack, function(f) {
					f()
				});
				this._readyStack = []
			}
			if (this._requiredStack.length > 0) {
				e(this._requiredStack, function(f) {
					f()
				});
				this._requiredStack = []
			}
		},
		define : function() {
			var h = this, f = this.deps, g = [];
			if (!f) {
				f = this.getDependents()
			}
			if (f.length) {
				e(f, function(j) {
					var i = b.get(j);
					g.push(i.path)
				});
				e(f, function(j) {
					var i = b.get(j);
					i.ready(function() {
						if (b.isPathsLoaded(g)) {
							h.ready()
						}
					}, true);
					i.lazyLoad()
				})
			} else {
				this.ready()
			}
		},
		getDependents : function() {
			var h = this;
			var g = this.fn.toString();
			var f = g.match(/require\(\s*('|")([a-zA-Z0-9_\/.]+)('|")\s*\)/g);
			if (f) {
				e(f, function(k, j) {
					f[j] = k.replace(/\s+/g, "").substr(9).slice(0, -2)
				});
				return f
			}
			return []
		}
	};
	var a = {
		create : function(h) {
			var i = h.src;
			if (i in this._paths) {
				return
			}
			this._paths[i] = true;
			e(this._rules, function(j) {
				i = j.call(null, i)
			});
			var g = document.getElementsByTagName("head")[0];
			var f = document.createElement("script");
			f.type = h.type || "text/javascript";
			f.src = i;
			f.onload = f.onreadystatechange = function() {
				if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
					h.loaded && h.loaded();
					f.onload = f.onreadystatechange = null
				}
			};
			g.insertBefore(f, g.firstChild)
		},
		_paths : {},
		_rules : [],
		addPathRule : function(f) {
			this._rules.push(f)
		}
	};
	d.version = "1.0";
	d.use = function(i, h) {
		if (typeof i === "string") {
			i = [ i ]
		}
		var g = [];
		var f = [];
		e(i, function(j, k) {
			f[k] = false
		});
		e(i, function(j, l) {
			var k = b.get(j);
			k.ready(function() {
				g[l] = k.exports;
				f[l] = true;
				var m = true;
				e(f, function(n) {
					if (n === false) {
						return m = false
					}
				});
				if (h && m) {
					h.apply(null, g)
				}
			});
			k.lazyLoad()
		})
	};
	d.module = function(f, h, i) {
		var g = b.get(f);
		g.fn = h;
		g.deps = i;
		if (b.requiredPaths[f]) {
			g.define()
		} else {
			b.lazyLoadPaths[f] = true
		}
	};
	d.pathRule = function(f) {
		a.addPathRule(f)
	};
	d._fileMap = function(g, f) {
		if (typeof g === "object") {
			e(g, function(h, i) {
				d._fileMap(i, h)
			})
		} else {
			if (typeof f === "string") {
				f = [ f ]
			}
			e(f, function(h) {
				b.moduleFileMap[h] = g
			})
		}
	}
})((function() {
	return window.F = {}
})());
F.module("util/binding", function(d, e) {
	var f = {}, c = 1000000;
	function a(n, h) {
		var l, g, k, j, m, o;
		if (h.nodeType === 1) {
			if (h.attributes.getNamedItem("data-bind")) {
				o = h.getAttribute("data-bind");
				o = o.split(":");
				j = baidu.string.trim(o[0]);
				m = baidu.string.trim(o[1]);
				b.call(n, j, m, h)
			}
			for (l = 0, k = h.childNodes, g = k.length; l < g; l++) {
				a(n, k[l])
			}
		}
	}
	function b(g, h, i) {
		this.bindingId = c++;
		if (!f[this.bindingId]) {
			f[this.bindingId] = {}
		}
		if (h in i && !(typeof i[h] === "function")) {
			f[this.bindingId][g] = i[h];
			this[g] = function(j) {
				if (!j) {
					return f[this.bindingId][g] || null
				} else {
					f[this.bindingId][g] = (i[h] = j);
					if (this.dispatchEvent
							&& typeof this.dispatchEvent == "function") {
						this.dispatchEvent("update" + g)
					}
					return this
				}
			}
		}
	}
	return {
		setBinding : a
	}
});
F.module("util/pagebar", function(b, c) {
	var a = function(m, d, k, g) {
		var o = m || 0;
		var j = [], e = '<a href="#" data-pn="#{0}">#{1}</a>';
		var f = g, l = Math.ceil(d / k);
		if (o > 1) {
			j.push(P.format(e, [ 1, "首页" ]));
			j.push(P.format(e, [ o - 1, "上一页" ]));
			if (o > f + 1) {
				j.push("<a>...</a>")
			}
			for ( var h = f; h > 0; h--) {
				if (o - h > 0) {
					j.push(P.format(e, [ o - h, o - h ]))
				}
			}
		}
		j.push("<b>" + o + "</b>");
		if (o < l) {
			for ( var h = 0; h < f && (h + o + 1 <= l); h++) {
				j.push(P.format(e, [ o + h + 1, o + h + 1 ]))
			}
		}
		if (o + f < l) {
			j.push("<span>...</span>")
		}
		if (o < l) {
			j.push(P.format(e, [ o + 1, "下一页" ]))
		}
		if (o < l) {
			j.push(P.format(e, [ l, "尾页" ]))
		}
		return j.join("")
	};
	return a
});
var T, baidu = T = baidu || {
	version : "1.3.9"
};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.json = baidu.json || {};
baidu.json.parse = function(b) {
	return (new Function("return (" + b + ")"))()
};
baidu.object = baidu.object || {};
baidu.extend = baidu.object.extend = function(f, e) {
	for ( var d in e) {
		if (e.hasOwnProperty(d)) {
			f[d] = e[d]
		}
	}
	return f
};
baidu.object.each = function(h, j) {
	var f, g, i;
	if ("function" == typeof j) {
		for (g in h) {
			if (h.hasOwnProperty(g)) {
				i = h[g];
				f = j.call(h, i, g);
				if (f === false) {
					break
				}
			}
		}
	}
	return h
};
baidu.fn = baidu.fn || {};
baidu.sio = baidu.sio || {};
baidu.sio._createScriptTag = function(d, e, f) {
	d.setAttribute("type", "text/javascript");
	f && d.setAttribute("charset", f);
	d.setAttribute("src", e);
	document.getElementsByTagName("head")[0].appendChild(d)
};
baidu.sio._removeScriptTag = function(c) {
	if (c.clearAttributes) {
		c.clearAttributes()
	} else {
		for ( var d in c) {
			if (c.hasOwnProperty(d)) {
				delete c[d]
			}
		}
	}
	if (c && c.parentNode) {
		c.parentNode.removeChild(c)
	}
	c = null
};
baidu.sio.callByBrowser = function(t, n, l) {
	var q = document.createElement("SCRIPT"), p = 0, k = l || {}, r = k.charset, m = n
			|| function() {
			}, o = k.timeOut || 0, s;
	q.onload = q.onreadystatechange = function() {
		if (p) {
			return
		}
		var a = q.readyState;
		if ("undefined" == typeof a || a == "loaded" || a == "complete") {
			p = 1;
			try {
				m();
				clearTimeout(s)
			} finally {
				q.onload = q.onreadystatechange = null;
				baidu.sio._removeScriptTag(q)
			}
		}
	};
	if (o) {
		s = setTimeout(function() {
			q.onload = q.onreadystatechange = null;
			baidu.sio._removeScriptTag(q);
			k.onfailure && k.onfailure()
		}, o)
	}
	baidu.sio._createScriptTag(q, t, r)
};
baidu.lang = baidu.lang || {};
baidu.lang.isFunction = function(b) {
	return "[object Function]" == Object.prototype.toString.call(b)
};
baidu.lang.isString = function(b) {
	return "[object String]" == Object.prototype.toString.call(b)
};
baidu.isString = baidu.lang.isString;
baidu.sio.callByServer = function(D, r, q) {
	var v = document.createElement("SCRIPT"), w = "bd__cbs__", t, z, p = q
			|| {}, A = p.charset, y = p.queryField || "callback", s = p.timeOut || 0, C, B = new RegExp(
			"(\\?|&)" + y + "=([^&]*)"), x;
	if (baidu.lang.isFunction(r)) {
		t = w + Math.floor(Math.random() * 2147483648).toString(36);
		window[t] = u(0)
	} else {
		if (baidu.lang.isString(r)) {
			t = r
		} else {
			if (x = B.exec(D)) {
				t = x[2]
			}
		}
	}
	if (s) {
		C = setTimeout(u(1), s)
	}
	D = D.replace(B, "\x241" + y + "=" + t);
	if (D.search(B) < 0) {
		D += (D.indexOf("?") < 0 ? "?" : "&") + y + "=" + t
	}
	baidu.sio._createScriptTag(v, D, A);
	function u(a) {
		return function() {
			try {
				if (a) {
					p.onfailure && p.onfailure()
				} else {
					r.apply(window, arguments);
					clearTimeout(C)
				}
				window[t] = null;
				delete window[t]
			} catch (b) {
			} finally {
				baidu.sio._removeScriptTag(v)
			}
		}
	}
};
baidu.string = baidu.string || {};
baidu.string.escapeReg = function(b) {
	return String(b).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"),
			"\\\x241")
};
baidu.string.format = function(h, f) {
	h = String(h);
	var e = Array.prototype.slice.call(arguments, 1), g = Object.prototype.toString;
	if (e.length) {
		e = e.length == 1 ? (f !== null
				&& (/\[object Array\]|\[object Object\]/.test(g.call(f))) ? f
				: e) : e;
		return h.replace(/#\{(.+?)\}/g, function(c, a) {
			var b = e[a];
			if ("[object Function]" == g.call(b)) {
				b = b(a)
			}
			return ("undefined" == typeof b ? "" : b)
		})
	}
	return h
};
baidu.format = baidu.string.format;
baidu.string.toCamelCase = function(b) {
	if (b.indexOf("-") < 0 && b.indexOf("_") < 0) {
		return b
	}
	return b.replace(/[-_][^-_]/g, function(a) {
		return a.charAt(1).toUpperCase()
	})
};
(function() {
	var b = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)",
			"g");
	baidu.string.trim = function(a) {
		return String(a).replace(b, "")
	}
})();
baidu.trim = baidu.string.trim;
baidu.cookie = baidu.cookie || {};
baidu.url = baidu.url || {};
(function() {
	var b = window[baidu.guid];
	baidu.lang.guid = function() {
		return "TANGRAM__" + (b._counter++).toString(36)
	};
	b._counter = b._counter || 1
})();
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class = function(b) {
	this.guid = b || baidu.lang.guid();
	window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function() {
	delete window[baidu.guid]._instances[this.guid];
	for ( var b in this) {
		if (!baidu.lang.isFunction(this[b])) {
			delete this[b]
		}
	}
	this.disposed = true
};
baidu.lang.Class.prototype.toString = function() {
	return "[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function(d, c) {
	this.type = d;
	this.returnValue = true;
	this.target = c || null;
	this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function(i, j, f) {
	if (!baidu.lang.isFunction(j)) {
		return
	}
	!this.__listeners && (this.__listeners = {});
	var g = this.__listeners, h;
	if (typeof f == "string" && f) {
		if (/[^\w\-]/.test(f)) {
			throw ("nonstandard key:" + f)
		} else {
			j.hashCode = f;
			h = f
		}
	}
	i.indexOf("on") != 0 && (i = "on" + i);
	typeof g[i] != "object" && (g[i] = {});
	h = h || baidu.lang.guid();
	j.hashCode = h;
	g[i][h] = j
};
baidu.lang.Class.prototype.removeEventListener = function(g, h) {
	if (typeof h != "undefined") {
		if ((baidu.lang.isFunction(h) && !(h = h.hashCode))
				|| (!baidu.lang.isString(h))) {
			return
		}
	}
	!this.__listeners && (this.__listeners = {});
	g.indexOf("on") != 0 && (g = "on" + g);
	var e = this.__listeners;
	if (!e[g]) {
		return
	}
	if (typeof h != "undefined") {
		e[g][h] && delete e[g][h]
	} else {
		for ( var f in e[g]) {
			delete e[g][f]
		}
	}
};
baidu.lang.Class.prototype.dispatchEvent = function(i, g) {
	if (baidu.lang.isString(i)) {
		i = new baidu.lang.Event(i)
	}
	!this.__listeners && (this.__listeners = {});
	g = g || {};
	for ( var j in g) {
		i[j] = g[j]
	}
	var j, f = this.__listeners, h = i.type;
	i.target = i.target || this;
	i.currentTarget = this;
	h.indexOf("on") != 0 && (h = "on" + h);
	baidu.lang.isFunction(this[h]) && this[h].apply(this, arguments);
	if (typeof f[h] == "object") {
		for (j in f[h]) {
			f[h][j].apply(this, arguments)
		}
	}
	return i.returnValue
};
baidu.lang.createClass = function(m, i) {
	i = i || {};
	var n = i.superClass || baidu.lang.Class;
	var o = function() {
		if (n != baidu.lang.Class) {
			n.apply(this, arguments)
		} else {
			n.call(this)
		}
		m.apply(this, arguments)
	};
	o.options = i.options || {};
	var k = function() {
	}, l = m.prototype;
	k.prototype = n.prototype;
	var j = o.prototype = new k();
	for ( var p in l) {
		j[p] = l[p]
	}
	typeof i.className == "string" && (j._className = i.className);
	j.constructor = l.constructor;
	o.extend = function(a) {
		for ( var b in a) {
			o.prototype[b] = a[b]
		}
		return o
	};
	return o
};
baidu.lang.isObject = function(b) {
	return "function" == typeof b || !!(b && "object" == typeof b)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.isArray = function(b) {
	return "[object Array]" == Object.prototype.toString.call(b)
};
baidu.lang.module = function(name, module, owner) {
	var packages = name.split("."), len = packages.length - 1, packageName, i = 0;
	if (!owner) {
		try {
			if (!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24"))
					.test(packages[0])) {
				throw ""
			}
			owner = eval(packages[0]);
			i = 1
		} catch (e) {
			owner = window
		}
	}
	for (; i < len; i++) {
		packageName = packages[i];
		if (!owner[packageName]) {
			owner[packageName] = {}
		}
		owner = owner[packageName]
	}
	if (!owner[packages[len]]) {
		owner[packages[len]] = module
	}
};
baidu.url.getQueryValue = function(e, h) {
	var g = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(h)
			+ "=([^&#]*)(&|\x24|#)", "");
	var f = e.match(g);
	if (f) {
		return f[2]
	}
	return null
};
baidu.url.escapeSymbol = function(b) {
	return String(b).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g,
			"%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g,
			"%23").replace(/\=/g, "%3D")
};
baidu.url.jsonToQuery = function(j, h) {
	var g = [], i, f = h || function(a) {
		return baidu.url.escapeSymbol(a)
	};
	baidu.object.each(j, function(a, b) {
		if (baidu.lang.isArray(a)) {
			i = a.length;
			while (i--) {
				g.push(b + "=" + f(a[i], b))
			}
		} else {
			g.push(b + "=" + f(a, b))
		}
	});
	return g.join("&")
};
baidu.browser = baidu.browser || {};
baidu.ajax = baidu.ajax || {};
baidu.page = baidu.page || {};
baidu.dom = baidu.dom || {};
baidu.dom.g = function(b) {
	if ("string" == typeof b || b instanceof String) {
		return document.getElementById(b)
	} else {
		if (b && b.nodeName && (b.nodeType == 1 || b.nodeType == 9)) {
			return b
		}
	}
	return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.removeClass = function(m, l) {
	m = baidu.dom.g(m);
	var o = m.className.split(/\s+/), k = l.split(/\s+/), i, j = k.length, p, n = 0;
	for (; n < j; ++n) {
		for (p = 0, i = o.length; p < i; ++p) {
			if (o[p] == k[n]) {
				o.splice(p, 1);
				break
			}
		}
	}
	m.className = o.join(" ");
	return m
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._g = function(b) {
	if (baidu.lang.isString(b)) {
		return document.getElementById(b)
	}
	return b
};
baidu._g = baidu.dom._g;
baidu.dom.contains = function(e, d) {
	var f = baidu.dom._g;
	e = f(e);
	d = f(d);
	return e.contains ? e != d && e.contains(d) : !!(e
			.compareDocumentPosition(d) & 16)
};
baidu.dom.hasAttr = function(f, d) {
	f = baidu.g(f);
	var e = f.attributes.getNamedItem(d);
	return !!(e && e.specified)
};
baidu.dom.addClass = function(k, j) {
	k = baidu.dom.g(k);
	var h = j.split(/\s+/), i = k.className, l = " " + i + " ", m = 0, n = h.length;
	for (; m < n; m++) {
		if (l.indexOf(" " + h[m] + " ") < 0) {
			i += (i ? " " : "") + h[m]
		}
	}
	k.className = i;
	return k
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.getAncestorByClass = function(d, c) {
	d = baidu.dom.g(d);
	c = new RegExp("(^|\\s)" + baidu.string.trim(c) + "(\\s|\x24)");
	while ((d = d.parentNode) && d.nodeType == 1) {
		if (c.test(d.className)) {
			return d
		}
	}
	return null
};
baidu.dom._matchNode = function(f, h, g) {
	f = baidu.dom.g(f);
	for ( var e = f[g]; e; e = e[h]) {
		if (e.nodeType == 1) {
			return e
		}
	}
	return null
};
baidu.dom.hasClass = function(h, g) {
	h = baidu.dom.g(h);
	var e = baidu.string.trim(g).split(/\s+/), f = e.length;
	g = h.className.split(/\s+/).join(" ");
	while (f--) {
		if (!(new RegExp("(^| )" + e[f] + "( |\x24)")).test(g)) {
			return false
		}
	}
	return true
};
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
	baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["\x241"]
}
baidu.dom._NAME_ATTRS = (function() {
	var b = {
		cellpadding : "cellPadding",
		cellspacing : "cellSpacing",
		colspan : "colSpan",
		rowspan : "rowSpan",
		valign : "vAlign",
		usemap : "useMap",
		frameborder : "frameBorder"
	};
	if (baidu.browser.ie < 8) {
		b["for"] = "htmlFor";
		b["class"] = "className"
	} else {
		b.htmlFor = "for";
		b.className = "class"
	}
	return b
})();
baidu.dom.setAttr = function(d, e, f) {
	d = baidu.dom.g(d);
	if ("style" == e) {
		d.style.cssText = f
	} else {
		e = baidu.dom._NAME_ATTRS[e] || e;
		d.setAttribute(e, f)
	}
	return d
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function(f, e) {
	f = baidu.dom.g(f);
	for ( var d in e) {
		baidu.dom.setAttr(f, d, e[d])
	}
	return f
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.create = function(h, f) {
	var g = document.createElement(h), e = f || {};
	return baidu.dom.setAttrs(g, e)
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFilter.filter = function(g, j, i) {
	for ( var h = 0, k = baidu.dom._styleFilter, l; l = k[h]; h++) {
		if (l = l[i]) {
			j = l(g, j)
		}
	}
	return j
};
baidu.dom.setStyle = function(j, f, i) {
	var h = baidu.dom, g;
	j = h.g(j);
	f = baidu.string.toCamelCase(f);
	if (g = h._styleFilter) {
		i = g.filter(f, i, "set")
	}
	g = h._styleFixer[f];
	(g && g.set) ? g.set(j, i) : (j.style[g || f] = i);
	return j
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.getAttr = function(c, d) {
	c = baidu.dom.g(c);
	if ("style" == d) {
		return c.style.cssText
	}
	d = baidu.dom._NAME_ATTRS[d] || d;
	return c.getAttribute(d)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom.getAncestorByTag = function(c, d) {
	c = baidu.dom.g(c);
	d = d.toUpperCase();
	while ((c = c.parentNode) && c.nodeType == 1) {
		if (c.tagName == d) {
			return c
		}
	}
	return null
};
baidu.dom.getDocument = function(b) {
	b = baidu.dom.g(b);
	return b.nodeType == 9 ? b : b.ownerDocument || b.document
};
baidu.dom.getComputedStyle = function(e, f) {
	e = baidu.dom._g(e);
	var g = baidu.dom.getDocument(e), h;
	if (g.defaultView && g.defaultView.getComputedStyle) {
		h = g.defaultView.getComputedStyle(e, null);
		if (h) {
			return h[f] || h.getPropertyValue(f)
		}
	}
	return ""
};
baidu.dom.getStyle = function(j, f) {
	var h = baidu.dom;
	j = h.g(j);
	f = baidu.string.toCamelCase(f);
	var i = j.style[f] || (j.currentStyle ? j.currentStyle[f] : "")
			|| h.getComputedStyle(j, f);
	if (!i) {
		var g = h._styleFixer[f];
		if (g) {
			i = g.get ? g.get(j) : baidu.dom.getStyle(j, g)
		}
	}
	if (g = h._styleFilter) {
		i = g.filter(f, i, "get")
	}
	return i
};
baidu.getStyle = baidu.dom.getStyle;
baidu.dom.setStyles = function(d, f) {
	d = baidu.dom.g(d);
	for ( var e in f) {
		baidu.dom.setStyle(d, e, f[e])
	}
	return d
};
baidu.setStyles = baidu.dom.setStyles;
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
	baidu.browser.opera = +RegExp["\x241"]
}
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent)
		&& !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.dom.getPosition = function(x) {
	x = baidu.dom.g(x);
	var o = baidu.dom.getDocument(x), u = baidu.browser, r = baidu.dom.getStyle, v = u.isGecko > 0
			&& o.getBoxObjectFor
			&& r(x, "position") == "absolute"
			&& (x.style.top === "" || x.style.left === ""), q = {
		left : 0,
		top : 0
	}, s = (u.ie && !u.isStrict) ? o.body : o.documentElement, n, w;
	if (x == s) {
		return q
	}
	if (x.getBoundingClientRect) {
		w = x.getBoundingClientRect();
		q.left = Math.floor(w.left)
				+ Math.max(o.documentElement.scrollLeft, o.body.scrollLeft);
		q.top = Math.floor(w.top)
				+ Math.max(o.documentElement.scrollTop, o.body.scrollTop);
		q.left -= o.documentElement.clientLeft;
		q.top -= o.documentElement.clientTop;
		var p = o.body, m = parseInt(r(p, "borderLeftWidth")), t = parseInt(r(
				p, "borderTopWidth"));
		if (u.ie && !u.isStrict) {
			q.left -= isNaN(m) ? 2 : m;
			q.top -= isNaN(t) ? 2 : t
		}
	} else {
		n = x;
		do {
			q.left += n.offsetLeft;
			q.top += n.offsetTop;
			if (u.isWebkit > 0 && r(n, "position") == "fixed") {
				q.left += o.body.scrollLeft;
				q.top += o.body.scrollTop;
				break
			}
			n = n.offsetParent
		} while (n && n != x);
		if (u.opera > 0 || (u.isWebkit > 0 && r(x, "position") == "absolute")) {
			q.top -= o.body.offsetTop
		}
		n = x.offsetParent;
		while (n && n != o.body) {
			q.left -= n.scrollLeft;
			if (!u.opera || n.tagName != "TR") {
				q.top -= n.scrollTop
			}
			n = n.offsetParent
		}
	}
	return q
};
baidu.dom.remove = function(d) {
	d = baidu.dom._g(d);
	var c = d.parentNode;
	c && c.removeChild(d)
};
baidu.dom.insertHTML = function(i, g, j) {
	i = baidu.dom.g(i);
	var f, h;
	if (i.insertAdjacentHTML) {
		i.insertAdjacentHTML(g, j)
	} else {
		f = i.ownerDocument.createRange();
		g = g.toUpperCase();
		if (g == "AFTERBEGIN" || g == "BEFOREEND") {
			f.selectNodeContents(i);
			f.collapse(g == "AFTERBEGIN")
		} else {
			h = g == "BEFOREBEGIN";
			f[h ? "setStartBefore" : "setEndAfter"](i);
			f.collapse(h)
		}
		f.insertNode(f.createContextualFragment(j))
	}
	return i
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.prev = function(b) {
	return baidu.dom._matchNode(b, "previousSibling", "previousSibling")
};
baidu.dom.q = function(k, n, q) {
	var i = [], o = baidu.string.trim, l, m, r, p;
	if (!(k = o(k))) {
		return i
	}
	if ("undefined" == typeof n) {
		n = document
	} else {
		n = baidu.dom.g(n);
		if (!n) {
			return i
		}
	}
	q && (q = o(q).toUpperCase());
	if (n.getElementsByClassName) {
		r = n.getElementsByClassName(k);
		l = r.length;
		for (m = 0; m < l; m++) {
			p = r[m];
			if (q && p.tagName != q) {
				continue
			}
			i[i.length] = p
		}
	} else {
		k = new RegExp("(^|\\s)" + baidu.string.escapeReg(k) + "(\\s|\x24)");
		r = q ? n.getElementsByTagName(q) : (n.all || n
				.getElementsByTagName("*"));
		l = r.length;
		for (m = 0; m < l; m++) {
			p = r[m];
			k.test(p.className) && (i[i.length] = p)
		}
	}
	return i
};
baidu.q = baidu.Q = baidu.dom.q;
baidu.dom.next = function(b) {
	return baidu.dom._matchNode(b, "nextSibling", "nextSibling")
};
(function() {
	var b = navigator.userAgent;
	if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(b)
			&& !/chrome/i.test(b)) {
		baidu.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
	}
})();
(function() {
	var b = baidu.dom.ready = function() {
		var h = false, i = [], l;
		if (document.addEventListener) {
			l = function() {
				document.removeEventListener("DOMContentLoaded", l, false);
				k()
			}
		} else {
			if (document.attachEvent) {
				l = function() {
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange", l);
						k()
					}
				}
			}
		}
		function k() {
			if (!k.isReady) {
				k.isReady = true;
				for ( var c = 0, d = i.length; c < d; c++) {
					i[c]()
				}
			}
		}
		function a() {
			try {
				document.documentElement.doScroll("left")
			} catch (c) {
				setTimeout(a, 1);
				return
			}
			k()
		}
		function j() {
			if (h) {
				return
			}
			h = true;
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", l, false);
				window.addEventListener("load", k, false)
			} else {
				if (document.attachEvent) {
					document.attachEvent("onreadystatechange", l);
					window.attachEvent("onload", k);
					var d = false;
					try {
						d = window.frameElement == null
					} catch (c) {
					}
					if (document.documentElement.doScroll && d) {
						a()
					}
				}
			}
		}
		j();
		return function(c) {
			k.isReady ? c() : (i[i.length] = c)
		}
	}();
	b.isReady = false
})();
baidu.event = baidu.event || {};
baidu.event.stopPropagation = function(b) {
	if (b.stopPropagation) {
		b.stopPropagation()
	} else {
		b.cancelBubble = true
	}
};
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.getKeyCode = function(b) {
	return b.which || b.keyCode
};
baidu.event.getTarget = function(b) {
	return b.target || b.srcElement
};
baidu.event._eventFilter = baidu.event._eventFilter || {};
baidu.event.on = function(i, n, l) {
	n = n.replace(/^on/i, "");
	i = baidu.dom._g(i);
	var m = function(a) {
		l.call(i, a)
	}, j = baidu.event._listeners, o = baidu.event._eventFilter, k, p = n;
	n = n.toLowerCase();
	if (o && o[n]) {
		k = o[n](i, n, m);
		p = k.type;
		m = k.listener
	}
	if (i.addEventListener) {
		i.addEventListener(p, m, false)
	} else {
		if (i.attachEvent) {
			i.attachEvent("on" + p, m)
		}
	}
	j[j.length] = [ i, n, l, m, p ];
	return i
};
baidu.on = baidu.event.on;
baidu.event.un = function(p, m, q) {
	p = baidu.dom._g(p);
	m = m.replace(/^on/i, "").toLowerCase();
	var j = baidu.event._listeners, o = j.length, n = !q, k, l, r;
	while (o--) {
		k = j[o];
		if (k[1] === m && k[0] === p && (n || k[2] === q)) {
			l = k[4];
			r = k[3];
			if (p.removeEventListener) {
				p.removeEventListener(l, r, false)
			} else {
				if (p.detachEvent) {
					p.detachEvent("on" + l, r)
				}
			}
			j.splice(o, 1)
		}
	}
	return p
};
baidu.un = baidu.event.un;
baidu.event.once = function(f, e, h) {
	f = baidu.dom._g(f);
	function g(a) {
		h.call(f, a);
		baidu.event.un(f, e, g)
	}
	baidu.event.on(f, e, g);
	return f
};
baidu.event.preventDefault = function(b) {
	if (b.preventDefault) {
		b.preventDefault()
	} else {
		b.returnValue = false
	}
};
baidu.event.stop = function(d) {
	var c = baidu.event;
	c.stopPropagation(d);
	c.preventDefault(d)
};
baidu.array = baidu.array || {};
baidu.each = baidu.array.forEach = baidu.array.each = function(j, l, h) {
	var m, k, n, i = j.length;
	if ("function" == typeof l) {
		for (n = 0; n < i; n++) {
			k = j[n];
			m = l.call(h || j, k, n);
			if (m === false) {
				break
			}
		}
	}
	return j
};
baidu.array.remove = function(f, d) {
	var e = f.length;
	while (e--) {
		if (e in f && f[e] === d) {
			f.splice(e, 1)
		}
	}
	return f
};
baidu.cookie._isValidKey = function(b) {
	return (new RegExp(
			'^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
			.test(b)
};
baidu.cookie.setRaw = function(h, g, e) {
	if (!baidu.cookie._isValidKey(h)) {
		return
	}
	e = e || {};
	var f = e.expires;
	if ("number" == typeof e.expires) {
		f = new Date();
		f.setTime(f.getTime() + e.expires)
	}
	document.cookie = h + "=" + g + (e.path ? "; path=" + e.path : "")
			+ (f ? "; expires=" + f.toGMTString() : "")
			+ (e.domain ? "; domain=" + e.domain : "")
			+ (e.secure ? "; secure" : "")
};
baidu.cookie.set = function(d, f, e) {
	baidu.cookie.setRaw(d, encodeURIComponent(f), e)
};
baidu.cookie.getRaw = function(d) {
	if (baidu.cookie._isValidKey(d)) {
		var f = new RegExp("(^| )" + d + "=([^;]*)(;|\x24)"), e = f
				.exec(document.cookie);
		if (e) {
			return e[2] || null
		}
	}
	return null
};
baidu.cookie.get = function(d) {
	var c = baidu.cookie.getRaw(d);
	if ("string" == typeof c) {
		c = decodeURIComponent(c);
		return c
	}
	return null
};
baidu.page.getWidth = function() {
	var g = document, f = g.body, h = g.documentElement, e = g.compatMode == "BackCompat" ? f
			: g.documentElement;
	return Math.max(h.scrollWidth, f.scrollWidth, e.clientWidth)
};
baidu.page.getViewWidth = function() {
	var c = document, d = c.compatMode == "BackCompat" ? c.body
			: c.documentElement;
	return d.clientWidth
};
baidu.page.getScrollLeft = function() {
	var b = document;
	return window.pageXOffset || b.documentElement.scrollLeft
			|| b.body.scrollLeft
};
baidu.page.getHeight = function() {
	var g = document, f = g.body, h = g.documentElement, e = g.compatMode == "BackCompat" ? f
			: g.documentElement;
	return Math.max(h.scrollHeight, f.scrollHeight, e.clientHeight)
};
baidu.page.getViewHeight = function() {
	var c = document, d = c.compatMode == "BackCompat" ? c.body
			: c.documentElement;
	return d.clientHeight
};
baidu.page.getScrollTop = function() {
	var b = document;
	return window.pageYOffset || b.documentElement.scrollTop
			|| b.body.scrollTop
};
baidu.fn.blank = function() {
};
baidu.ajax.request = function(E, r) {
	r = r || {};
	var z = r.data || "", B = !(r.async === false), A = r.username || "", t = r.password
			|| "", I = (r.method || "GET").toUpperCase(), C = r.headers || {}, v = r.timeout || 0, G = {}, x, u, s;
	function y() {
		if (s.readyState == 4) {
			try {
				var a = s.status
			} catch (b) {
				D("failure");
				return
			}
			D(a);
			if ((a >= 200 && a < 300) || a == 304 || a == 1223) {
				D("success")
			} else {
				D("failure")
			}
			window.setTimeout(function() {
				s.onreadystatechange = baidu.fn.blank;
				if (B) {
					s = null
				}
			}, 0)
		}
	}
	function H() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP")
			} catch (a) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP")
				} catch (a) {
				}
			}
		}
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest()
		}
	}
	function D(b) {
		b = "on" + b;
		var c = G[b], a = baidu.ajax[b];
		if (c) {
			if (x) {
				clearTimeout(x)
			}
			if (b != "onsuccess") {
				c(s)
			} else {
				try {
					s.responseText
				} catch (d) {
					return c(s)
				}
				c(s, s.responseText)
			}
		} else {
			if (a) {
				if (b == "onsuccess") {
					return
				}
				a(s)
			}
		}
	}
	for (u in r) {
		G[u] = r[u]
	}
	C["X-Requested-With"] = "XMLHttpRequest";
	try {
		s = H();
		if (I == "GET") {
			if (z) {
				E += (E.indexOf("?") >= 0 ? "&" : "?") + z;
				z = null
			}
			if (r.noCache) {
				E += (E.indexOf("?") >= 0 ? "&" : "?") + "b" + (+new Date)
						+ "=1"
			}
		}
		if (A) {
			s.open(I, E, B, A, t)
		} else {
			s.open(I, E, B)
		}
		if (B) {
			s.onreadystatechange = y
		}
		if (I == "POST") {
			s.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded")
		}
		for (u in C) {
			if (C.hasOwnProperty(u)) {
				s.setRequestHeader(u, C[u])
			}
		}
		D("beforerequest");
		if (v) {
			x = setTimeout(function() {
				s.onreadystatechange = baidu.fn.blank;
				s.abort();
				D("timeout")
			}, v)
		}
		s.send(z);
		if (!B) {
			y()
		}
	} catch (w) {
		D("failure")
	}
	return s
};
baidu.ajax.get = function(c, d) {
	return baidu.ajax.request(c, {
		onsuccess : d
	})
};
baidu.page.load = function(r, k, p) {
	k = k || {};
	var m = baidu.page.load, t = m._cache = m._cache || {}, n = m._loadingCache = m._loadingCache
			|| {}, o = k.parallel;
	function q() {
		for ( var a = 0, b = r.length; a < b; ++a) {
			if (!t[r[a].url]) {
				setTimeout(arguments.callee, 10);
				return
			}
		}
		k.onload()
	}
	function s(a, d) {
		var e, b, c;
		switch (a.type.toLowerCase()) {
		case "css":
			e = document.createElement("link");
			e.setAttribute("rel", "stylesheet");
			e.setAttribute("type", "text/css");
			break;
		case "js":
			e = document.createElement("script");
			e.setAttribute("type", "text/javascript");
			e.setAttribute("charset", a.charset || m.charset);
			break;
		case "html":
			e = document.createElement("iframe");
			e.frameBorder = "none";
			break;
		default:
			return
		}
		c = function() {
			if (!b
					&& (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				b = true;
				baidu.un(e, "load", c);
				baidu.un(e, "readystatechange", c);
				d.call(window, e)
			}
		};
		baidu.on(e, "load", c);
		baidu.on(e, "readystatechange", c);
		if (a.type == "css") {
			(function() {
				if (b) {
					return
				}
				try {
					e.sheet.cssRule
				} catch (f) {
					setTimeout(arguments.callee, 20);
					return
				}
				b = true;
				d.call(window, e)
			})()
		}
		e.href = e.src = a.url;
		document.getElementsByTagName("head")[0].appendChild(e)
	}
	baidu.lang.isString(r) && (r = [ {
		url : r
	} ]);
	if (!(r && r.length)) {
		return
	}
	function l(a) {
		var b = a.url, e = !!o, c, d = function(f) {
			t[a.url] = f;
			delete n[a.url];
			if (baidu.lang.isFunction(a.onload)) {
				if (false === a.onload.call(window, f)) {
					return
				}
			}
			!o && m(r.slice(1), k, true);
			if ((!p) && baidu.lang.isFunction(k.onload)) {
				q()
			}
		};
		a.type = a.type || b.substr(b.lastIndexOf(".") + 1);
		a.requestType = a.requestType || (a.type == "html" ? "ajax" : "dom");
		if (c = t[a.url]) {
			d(c);
			return e
		}
		if (!k.refresh && n[a.url]) {
			setTimeout(function() {
				l(a)
			}, 10);
			return e
		}
		n[a.url] = true;
		if (a.requestType.toLowerCase() == "dom") {
			s(a, d)
		} else {
			baidu.ajax.get(a.url, function(f, g) {
				d(g)
			})
		}
		return e
	}
	baidu.each(r, l)
};
baidu.page.load.charset = "UTF8";
baidu.ajax.post = function(d, f, e) {
	return baidu.ajax.request(d, {
		onsuccess : e,
		method : "POST",
		data : f
	})
};
function unit() {
}
F.module("base/genericview", function(c, d) {
	var b = c("base/view");
	function a(e, f) {
		this.model = e;
		this.el = f;
		this.init()
	}
	a.prototype = P.extend(b);
	return a
});
F
		.module(
				"base/base",
				function(a, b) {
					(function(f, c, d) {
						f.g = f.G = c.g;
						f.q = f.Q = c.q;
						f.getPosition = c.dom.getPosition;
						f.hasAttr = c.dom.hasAttr;
						f.getAttr = c.dom.getAttr;
						f.setAttr = c.dom.setAttr;
						f.removeNode = c.dom.remove;
						f.removeClass = c.dom.removeClass;
						f.addClass = c.dom.addClass;
						f.hasClass = c.dom.hasClass;
						f.insertHTML = c.dom.insertHTML;
						f.domReady = c.dom.ready;
						f.createNode = c.dom.create;
						f.getAncestorByClass = c.dom.getAncestorByClass;
						f.getAncestorByTag = c.dom.getAncestorByTag;
						f.nextNode = c.dom.next;
						f.getScrollTop = c.page.getScrollTop;
						f.getScrollLeft = c.page.getScrollLeft;
						f.getWidth = c.page.getWidth;
						f.getHeight = c.page.getHeight;
						f.getViewHeight = c.page.getViewHeight;
						f.getViewWidth = c.page.getViewWidth;
						f.trim = c.trim;
						f.setStyles = c.dom.setStyles;
						f.getCookie = c.cookie.get;
						f.setCookie = c.cookie.set;
						f.createClass = c.lang.createClass;
						f.format = c.string.format;
						f.extend = function(j, h, i) {
							var e;
							if (!h) {
								h = j;
								j = {}
							}
							c.extend(j, h);
							if (i) {
								for (e in i) {
									if (!j[e] && i.hasOwnProperty(e)) {
										j[e] = i[e]
									}
								}
							}
							return j
						};
						f.isArray = c.lang.isArray;
						f.isString = c.lang.isString;
						f.isObject = c.lang.isObject;
						f.isFunction = c.lang.isFunction;
						f.arrayPrepend = function(e, i) {
							var h = [ i ];
							return h.concat(e)
						};
						f.preventDefault = c.event.preventDefault;
						f.stopPropagation = c.event.stopPropagation;
						f.jsonToQuery = c.url.jsonToQuery;
						f.getQueryValue = c.url.getQueryValue;
						f.each = c.each;
						f.objeach = c.object.each;
						f.on = c.on;
						f.un = c.event.un;
						f.getTarget = c.event.getTarget;
						f.stopEvent = c.event.stop;
						f.getKeyCode = c.event.getKeyCode;
						f.eacapeUrl = c.url.escapeSymbol;
						f.callByBws = c.sio.callByBrowser;
						f.callBySrv = c.sio.callByServer;
						f.empty = c.fn.blank;
						f.ie = c.browser.ie;
						f.ie6 = f.ie === 6;
						f.getType = function(e) {
							return Object.prototype.toString.call(e)
									.toLowerCase()
						};
						f.resizeImg = function(n, i) {
							var h, k, j, e;
							var l = function() {
								h = n.offsetWidth;
								k = n.offsetHeight
							};
							var m = "pic-small";
							if (!i || !i.notResizeDimension) {
								f.addClass(n, m)
							}
							if (!f.ie6) {
								return false
							}
							if (i.maxwidth) {
								l();
								if (h > i.maxwidth) {
									n.style.width = i.maxwidth + "px"
								}
							}
							if (i.maxheight) {
								l();
								if (k > i.maxheight) {
									n.style.height = i.maxheight + "px"
								}
							}
							if (i.minwidth) {
								l();
								if (h < i.minwidth) {
									n.style.width = i.minwidth + "px"
								}
							}
							if (i.minheight) {
								l();
								if (k < i.minheight) {
									n.style.height = i.minheight + "px"
								}
							}
							if (i.callback && typeof i.callback == "function") {
								i.callback()
							}
						};
						f.resizeDimension = function(r, i) {
							var o, l, q, m, n, e, k, p, j, h = 3;
							o = {
								width : r.scrollWidth,
								height : r.scrollHeight
							};
							l = i;
							m = o.width > o.height ? "height" : "width";
							n = m == "height" ? "width" : "height";
							if (l) {
								q = {};
								q[m] = i[m] + "px"
							}
							k = Math.floor(l[m] / (o[m] / o[n]));
							j = k >> h;
							if (l[n] && l[n] + j * 2 < k) {
								p = n == "height" ? "margin-top"
										: "margin-left";
								q[p] = (0 - j) + "px"
							}
							f.setStyles(r, q)
						};
						if (f.ie6) {
							try {
								document.execCommand("BackgroundImageCache",
										false, true)
							} catch (g) {
							}
						}
						f.ajax = (function() {
							var h = function(n, p, j) {
								var o = function(q) {
									if (j && j.onError) {
										j.onError(q)
									}
								};
								var k;
								if (n) {
									if (j && j.noParse) {
										p && p(n)
									} else {
										n = n.replace(/\r/g, "");
										var l = {};
										try {
											l = c.json.parse(n)
										} catch (m) {
											l.errNo = -999
										}
										if (l.errNo == 0) {
											p && p(l.data)
										} else {
											p && p(l)
										}
									}
								} else {
									k = {
										errNo : -998
									};
									o(k)
								}
							};
							var i = function(k, l, j) {
								if (k.indexOf(/asyn=1/) < 0) {
									k += k.indexOf("?") >= 0 ? "&" : "?";
									k += "asyn=1&t=" + +new Date()
								}
								c.ajax.get(k, function(n, m) {
									h(m, l, j)
								})
							};
							var e = function(k, l, m, j) {
								if (typeof l != "string") {
									l = c.url.jsonToQuery(l)
								}
								l += "&t=" + +new Date();
								c.ajax.post(k, l, function(o, n) {
									h(n, m, j)
								})
							};
							return {
								get : i,
								post : e
							}
						})();
						f.url = {
							getUrl : function(e, h) {
								var i = f.jsonToQuery(h);
								if (e.indexOf("?") > -1) {
									return e + "&" + i
								} else {
									return e + "?" + i
								}
							}
						};
						f.remote = (function() {
							function h(i, k) {
								var j = i.method.toUpperCase();
								url = i.url;
								i.data = f.jsonToQuery(i.data);
								i.onsuccess = i.onfailure = function(o, m) {
									var l = '{"errNo":-998}', n;
									if (m) {
										n = m.replace(/\r/g, "");
										k(n)
									} else {
										if (o.status == 200 && o.readState == 4) {
											k('{"errNo": 999, "msg":"no return value"}')
										} else {
											e();
											k(l)
										}
									}
								};
								c.ajax.request(url, i)
							}
							function e() {
								var k = "imglog__" + f.getGuid(), i = window[k] = new Image(), j;
								i.onload = (i.onerror = function() {
									window[k] = null
								});
								j = "http://nsclick.baidu.com/v.gif?pid=320&type=2011&evt=ajaxerr";
								if (App.router.global
										&& App.router.global.page_userInfo) {
									j += "&page_portrait="
											+ App.router.global.page_userInfo.portrait
								}
								i.src = j;
								i = null
							}
							return {
								request : h,
								log : e
							}
						})();
						f.isInView = function(j) {
							if (typeof j == "string") {
								j = f.g(j)
							}
							if (!j) {
								return false
							}
							if (j.offsetWidth == 0 || j.offsetHeight == 0) {
								return false
							}
							var h = f.getScrollTop() + f.getViewHeight(), i = f
									.getScrollLeft()
									+ f.getViewWidth();
							var e = f.getPosition(j);
							return e.top < h && e.left < i
						};
						f.addRefer = function(h) {
							if (!h || h === "#" || /[\?\&]from=./.test(h)) {
								return h
							}
							var e = h.indexOf("?"), i = h.indexOf("#"), k = "from=prin";
							k = (e < 0 ? "?" : "&") + k;
							if (i > -1) {
								var j = h.substr(i);
								h = h.replace(j, k) + j;
								return h
							} else {
								return h + k
							}
						};
						f.preloadImg = (function() {
							var j = [];
							var h = function() {
								if (j.length > 0) {
									try {
										e(j.shift(), h)
									} catch (k) {
										h()
									}
								}
							};
							var i = function(l) {
								var k = j.length;
								j = j.concat(l);
								if (k === 0) {
									h()
								}
							};
							var e = function(m, n) {
								var k = new Image(), l = "image_preload_"
										+ (+new Date());
								window[l] = k;
								k.onload = k.onerror = k.onabort = function() {
									k.onload = k.onerror = k.onabort = null;
									window[l] = null;
									k = null;
									n && n()
								};
								k.src = m
							};
							return {
								add : i
							}
						})();
						f.getGuid = (function() {
							var e = 1000000;
							return function() {
								return e++
							}
						})();
						f.parse = c.json.parse;
						f.array = {
							indexOf : function(e, i) {
								var h = Array.prototype.indexOf || function(l) {
									var j, k = false;
									if (!f.isArray(this)) {
										return -1
									}
									j = this.length;
									while (j--) {
										if (this[j] === l) {
											k = true;
											break
										}
									}
									return k ? j : -1
								};
								return h.call(e, i)
							}
						};
						f.event = function(e) {
							return f.extend(e, c.lang.Class.prototype)
						};
						if (!Function.prototype.bind) {
							Function.prototype.bind = function(i) {
								var j = this, k = Array.prototype.slice;
								if (typeof j != "function") {
									throw new TypeError(
											"Function.prototype.bind called on incompatible "
													+ j)
								}
								var e = k.call(arguments, 1);
								var h = function() {
									if (this instanceof h) {
										var n = function() {
										};
										n.prototype = j.prototype;
										var m = new n;
										var l = j.apply(m, e.concat(k
												.call(arguments)));
										if (Object(l) === l) {
											return l
										}
										return m
									} else {
										return j.apply(i, e.concat(k
												.call(arguments)))
									}
								};
								return h
							}
						}
						if (!window.JSON) {
							window.JSON = {
								parse : c.json.parse
							}
						}
						if (this.T === this.baidu) {
							this.T = d
						}
						(function() {
							var j = c.browser, q = {
								keydown : 1,
								keyup : 1,
								keypress : 1
							}, e = {
								click : 1,
								dblclick : 1,
								mousedown : 1,
								mousemove : 1,
								mouseup : 1,
								mouseover : 1,
								mouseout : 1
							}, n = {
								abort : 1,
								blur : 1,
								change : 1,
								error : 1,
								focus : 1,
								load : j.ie ? 0 : 1,
								reset : 1,
								resize : 1,
								scroll : 1,
								select : 1,
								submit : 1,
								unload : j.ie ? 0 : 1
							}, l = {
								scroll : 1,
								resize : 1,
								reset : 1,
								submit : 1,
								change : 1,
								select : 1,
								error : 1,
								abort : 1
							}, p = {
								KeyEvents : [ "bubbles", "cancelable", "view",
										"ctrlKey", "altKey", "shiftKey",
										"metaKey", "keyCode", "charCode" ],
								MouseEvents : [ "bubbles", "cancelable",
										"view", "detail", "screenX", "screenY",
										"clientX", "clientY", "ctrlKey",
										"altKey", "shiftKey", "metaKey",
										"button", "relatedTarget" ],
								HTMLEvents : [ "bubbles", "cancelable" ],
								UIEvents : [ "bubbles", "cancelable", "view",
										"detail" ],
								Events : [ "bubbles", "cancelable" ]
							};
							c.object.values = function(v) {
								var s = [], u = 0, t;
								for (t in v) {
									if (v.hasOwnProperty(t)) {
										s[u++] = v[t]
									}
								}
								return s
							};
							c.object.extend(l, q);
							c.object.extend(l, e);
							function i(w, u) {
								var t = 0, s = w.length, v = {};
								for (; t < s; t++) {
									v[w[t]] = u[w[t]];
									delete u[w[t]]
								}
								return v
							}
							function k(u, t, s) {
								s = c.object.extend({}, s);
								var v = c.object.values(i(p[t], s)), w = document
										.createEvent(t);
								v.unshift(u);
								if ("KeyEvents" == t) {
									w.initKeyEvent.apply(w, v)
								} else {
									if ("MouseEvents" == t) {
										w.initMouseEvent.apply(w, v)
									} else {
										if ("UIEvents" == t) {
											w.initUIEvent.apply(w, v)
										} else {
											w.initEvent.apply(w, v)
										}
									}
								}
								c.object.extend(w, s);
								return w
							}
							function h(s) {
								var t;
								if (document.createEventObject) {
									t = document.createEventObject();
									c.object.extend(t, s)
								}
								return t
							}
							function m(v, s) {
								s = i(p.KeyEvents, s);
								var w;
								if (document.createEvent) {
									try {
										w = k(v, "KeyEvents", s)
									} catch (u) {
										try {
											w = k(v, "Events", s)
										} catch (t) {
											w = k(v, "UIEvents", s)
										}
									}
								} else {
									s.keyCode = s.charCode > 0 ? s.charCode
											: s.keyCode;
									w = h(s)
								}
								return w
							}
							function r(t, s) {
								s = i(p.MouseEvents, s);
								var u;
								if (document.createEvent) {
									u = k(t, "MouseEvents", s);
									if (s.relatedTarget && !u.relatedTarget) {
										if ("mouseout" == t.toLowerCase()) {
											u.toElement = s.relatedTarget
										} else {
											if ("mouseover" == t.toLowerCase()) {
												u.fromElement = s.relatedTarget
											}
										}
									}
								} else {
									s.button = s.button == 0 ? 1
											: s.button == 1 ? 4
													: c.lang.isNumber(s.button) ? s.button
															: 0;
									u = h(s)
								}
								return u
							}
							function o(u, s) {
								s.bubbles = l.hasOwnProperty(u);
								s = i(p.HTMLEvents, s);
								var w;
								if (document.createEvent) {
									try {
										w = k(u, "HTMLEvents", s)
									} catch (v) {
										try {
											w = k(u, "UIEvents", s)
										} catch (t) {
											w = k(u, "Events", s)
										}
									}
								} else {
									w = h(s)
								}
								return w
							}
							c.event.fire = function(t, u, s) {
								var v;
								u = u.replace(/^on/i, "");
								t = c.dom._g(t);
								s = c.object.extend({
									bubbles : true,
									cancelable : true,
									view : window,
									detail : 1,
									screenX : 0,
									screenY : 0,
									clientX : 0,
									clientY : 0,
									ctrlKey : false,
									altKey : false,
									shiftKey : false,
									metaKey : false,
									keyCode : 0,
									charCode : 0,
									button : 0,
									relatedTarget : null
								}, s);
								if (q[u]) {
									v = m(u, s)
								} else {
									if (e[u]) {
										v = r(u, s)
									} else {
										if (n[u]) {
											v = o(u, s)
										} else {
											throw (new Error(u
													+ " is not support!"))
										}
									}
								}
								if (v) {
									if (t.dispatchEvent) {
										t.dispatchEvent(v)
									} else {
										if (t.fireEvent) {
											t.fireEvent("on" + u, v)
										}
									}
								}
							}
						})();
						f.fire = c.event.fire
					})(b, window.baidu)
				});
F.use("base/base", function(a) {
	window.P = a
});
F.module("base/view", function(a, d) {
	var e = function(f) {
		var g = false;
		while (f) {
			if (f.nodeName == "#document" && f.childNodes.length > 1) {
				g = true;
				break
			}
			f = f.parentNode
		}
		return g
	};
	var b = function(g, h) {
		var f = g.length;
		while (f--) {
			if (f in g && g[f] === h) {
				g.splice(f, 1)
			}
		}
		return g
	};
	var c = {
		hide : function() {
			if (!this.visible) {
				return
			}
			this.el.style.display = "none";
			this.visible = false
		},
		show : function() {
			if (this.visible) {
				return
			}
			if (!this.isInDom) {
				this.__parent ? (this.__parent.appendChildView(this))
						: (document.appendChild(this.el));
				this.setDomReady()
			}
			if (this.el) {
				this.el.style.display = "block";
				this.visible = true
			}
		},
		appendTo : function(f) {
			f.getChild(this);
			this.__parent = f
		},
		remove : function() {
			var f;
			this.__parent.removeChild(this);
			this.__parent = null;
			if (this.el) {
				f = this.el.parentNode;
				f.removeChild(this.el)
			}
			this.el = null
		},
		removeChild : function(f) {
			var g;
			if (f) {
				g = f.model.id;
				if (g) {
					b(this.__childrenViews, f)
				}
			}
		},
		getChild : function(f) {
			if (!this.__childrenViews) {
				this.__childrenViews = []
			}
			this.__childrenViews.push(f)
		},
		init : function() {
			this.isInDom = e(this.el);
			if (this.isInDom) {
				this.show()
			}
			this.model.addEventListener("change:visible", (function(f) {
				if (f.visible) {
					this.show()
				} else {
					this.hide()
				}
			}).bind(this))
		},
		setData : function() {
		},
		appendChildView : function(f) {
		},
		setDomReady : function() {
			var g, f;
			for (g in this.__childrenViews) {
				if (this.__childrenViews.hasOwnProperty(g)) {
					f = this.__childrenViews[g];
					if (!f.isInDom) {
						f.setDomReady()
					}
				}
			}
			this.isInDom = true;
			this.visible = true;
			this.dispatchEvent("update:viewready", {
				ready : this.isInDom
			})
		}
	};
	P.event(c);
	return c
});
F.module("base/genericmodel", function(d, e) {
	var c = d("base/model");
	function a(h, f, g) {
		this.id = h;
		this.router = f;
		if (g && typeof g.init == "function") {
			g.init.call(this)
		}
	}
	var b = a.prototype = P.extend(c);
	return a
});
F.module("base/model", function(a, c) {
	var b = {
		getChild : function(d) {
			if (!this.__children) {
				this.__children = {}
			}
			this.__children[d.id] = d
		},
		appendTo : function(d) {
			if (this.__parent == d) {
				return
			}
			d.getChild(this);
			this.__parent = d
		},
		remove : function() {
			this.__parent.removeChild(this);
			this.__parent = null;
			this.dispose()
		},
		removeChild : function(d) {
			if (d) {
				delete this.__children[d.id]
			}
		},
		setData : function() {
		},
		getData : function() {
		},
		dispose : function() {
			if (this.__parent) {
				this.__parent.removeChild(this)
			}
			if (this.__listeners) {
				this.__listeners = null
			}
		},
		visible : function(d) {
			if (!arguments.length) {
				return this.__visible
			} else {
				this.__visible = d;
				this.dispatchEvent("change:visible", {
					visible : d
				})
			}
		}
	};
	P.event(b);
	return b
});
F
		.module(
				"bigpipe/bigpipe",
				function(b, d) {
					function c(g) {
						var e = P.g(g), f = e.firstChild;
						while (f.nodeType != 8) {
							f = f.firstChild;
							if (!f) {
								throw "cannot get the content from contentHolder"
							}
						}
						return f.nodeValue
					}
					function a(k, h) {
						var j = document.createElement("div"), g, f, e;
						j.innerHTML = k;
						g = j.childNodes;
						for (f = 0, e = g.length; g[f].nodeType != 1; f++) {
						}
						if (f === e) {
							throw "Create Template Error bigpipe.js"
						}
						P.setAttr(g[f], "id", h);
						return g[f]
					}
					onPageletArrive = function(l) {
						if (!l) {
							return
						}
						var n = l.targetId, f = l.viewValue, g = l.tplId, j = l.viewType, i = l.tplContent, e = l.viewReady, o = l.options, h = l.modelValue, m, k;
						if (!n) {
							throw "targetId must be passed in"
						} else {
							if (g) {
								k = c(g)
							} else {
								if (i) {
									k = i;
									if (l.assignedId) {
										g = l.assignedId
									} else {
										g = P.getGuid()
									}
								} else {
									throw "templateId or templateContent must be passed in"
								}
							}
						}
						m = [ n, f, j, a(k, g), g, h, o, e ];
						this.pageLetArrive.apply(this, m)
					};
					return onPageletArrive
				});
F.module("userpanel/userpanel", function(b, g) {
	var a = false;
	var h;
	var e = (function() {
		var i;
		return {
			show : function() {
				if (i) {
					clearTimeout(i)
				}
				if (!a) {
					i = setTimeout(h, 250)
				}
			},
			hide : function() {
				if (i) {
					clearTimeout(i)
				}
				if (a) {
					i = setTimeout(h, 250)
				}
			}
		}
	})();
	var f = function(j) {
		var i = [ "inactive", "active" ];
		return function() {
			if (a) {
				P.removeClass(j, i[1]);
				P.addClass(j, i[0]);
				a = false
			} else {
				P.removeClass(j, i[0]);
				P.addClass(j, i[1]);
				a = true
			}
		}
	};
	var d = function(i, j) {
		P.on(i, "click", function(k) {
			P.preventDefault(k)
		});
		P.on(i, "mouseover", e.show);
		P.on(i, "mouseout", e.hide);
		P.on(j, "mouseover", e.show);
		P.on(j, "mouseout", e.hide)
	};
	var c = function() {
		var i = P.g("pUserInfo"), j = P.g("pUserNamePopup");
		if (i) {
			h = f(j);
			d(i, j)
		}
	};
	g.init = c
});
F.module("userpanel/userpanelview", function(c, e) {
	var b = c("base/view");
	var f = function() {
		F.use("userpanel/userpanel", function(i) {
			i.init()
		});
		if (this.model.router.global.isLoginUserNoName) {
			var h = P.q("no-home", this.el)[0];
			h && P.on(h, "click", function() {
				var i = c("no_username/no_username");
				i.hasUsername()
			})
		}
		var g = c("tracking/trackmanager");
		g.userPanel(this.el)
	};
	function d(g, h) {
		this.model = g;
		this.el = h;
		this.init();
		this.addEventListener("update:viewready", f.bind(this))
	}
	var a = d.prototype = P.extend(b);
	return d
});
F.module("content_holder/holderview", function(d, e) {
	var c = d("base/view");
	function b(g, h, f) {
		this.el = h;
		this.model = g;
		this.init();
		if (f && typeof f.init == "function") {
			f.init.call(this)
		}
	}
	var a = b.prototype = P.extend(c);
	a.appendChildView = function(g) {
		var l = P.q("plzhld", this.el), h, f, j = g.holderTab, k;
		for (h = 0, f = l.length; h < f; h++) {
			k = l[h];
			if (j == P.getAttr(k, "data-fill") || j == "plzhld") {
				k.appendChild(g.el);
				break
			}
		}
	};
	a.setData = function(f, g) {
		f.holderTab = g || "plzhld";
		f.appendTo(this)
	};
	return b
});
F.module("content_holder/holdermodel", function(d, e) {
	var b = d("base/model");
	function c(i, f, g) {
		var h = {
			tab : "none",
			part : "none"
		};
		this.id = i;
		this.router = f;
		this.__children = {};
		this.__viewparts = {};
		this.setCurrentView = function(k, j) {
			h.tab = k;
			h.part = j
		};
		this.tab = function(j) {
			if (j) {
				this.dispatchEvent("change:tab", {
					tab : j.tab,
					part : j.part
				});
				return this
			}
			return h
		};
		this.addEventListener("change:tab", function(r) {
			var m = this.__children;
			if (!m) {
				return
			}
			var l, p, n, k, q = r.tab, j = r.part, o;
			k = this.__viewparts[q];
			for (n in k) {
				if (k.hasOwnProperty(n)) {
					if (n == "all" || n == j) {
						this.updateChildrenVisible(k[n], true)
					} else {
						if (j != "all") {
							this.updateChildrenVisible(k[n], false)
						}
					}
				}
			}
			k = this.__viewparts;
			for (o in k) {
				if (k.hasOwnProperty(o) && o != q) {
					for (n in k[o]) {
						if (k[o].hasOwnProperty(n)) {
							this.updateChildrenVisible(k[o][n], false)
						}
					}
				}
			}
			if (q != "all" && j != "all") {
				this.setCurrentView(q, j)
			}
		});
		if (g && typeof g.init == "function") {
			g.init.call(this)
		}
	}
	var a = c.prototype = P.extend(b);
	a.updateChildrenVisible = function(h, j) {
		var g, f = h.length, k;
		for (g = 0; g < f; g++) {
			k = h[g];
			if (this.__children[k]) {
				this.__children[k].visible(j)
			}
		}
	};
	a.setData = function(h, f) {
		var i, g;
		if (!f) {
			i = "all";
			g = "all"
		} else {
			i = f.tab || "all";
			g = f.part || "all"
		}
		if (h && !this.__children[h.id]) {
			h.appendTo(this);
			if (!this.__viewparts[i]) {
				this.__viewparts[i] = {}
			}
			if (!this.__viewparts[i][g]) {
				this.__viewparts[i][g] = []
			}
			this.__viewparts[i][g].push(h.id)
		}
		if ((!this.requestTab || i == this.requestTab || i == "all")
				&& (!this.requestPart || g == this.requestPart || g == "all")) {
			this.tab({
				tab : i,
				part : g
			})
		}
	};
	a.getData = function(g) {
		var h = g.tab, f = g.part || "index";
		this.requestTab = h;
		this.requestPart = f;
		this.dispatchEvent("change:getdata");
		if (this.__viewparts[h] && this.__viewparts[h][f]) {
			this.setData(null, {
				tab : h,
				part : f
			})
		} else {
			if (g.options) {
				this.router.getData(this, h + "-" + f, g.options)
			} else {
				this.router.getData(this, h + "-" + f)
			}
		}
	};
	return c
});
F.module("dialog/commonConfirm", function(f, h) {
	var c = f("dialog/dialog"), e, b = P.createClass(function() {
		var i = d(this);
		g.call(this, this.context, i);
		this.addEventListener("hidden", function() {
			if (this.bgObj) {
				this.bgObj.hide()
			}
			this.dispose()
		})
	}, {
		superClass : c
	});
	e = b.prototype;
	function a(i, j) {
		this.config = {};
		this.bgObj = i.bgObj;
		this.config.okStatus = i.okStatus;
		this.config.cancelStatus = i.cancelStatus;
		if (typeof j == "function") {
			this._callback = j
		} else {
			this._callback = null
		}
		if (typeof i.oncancel == "function") {
			this._cancelCallback = i.oncancel
		} else {
			this._cancelCallback = null
		}
		if (this.bgObj) {
			this.bgObj.show()
		}
		return this.show(i)
	}
	function g(k, o) {
		var n, m, l, j;
		if (k.nodeType == 1) {
			if (k.attributes.getNamedItem("data-click")) {
				P.on(k, "click", o)
			}
			for (m = 0, l = k.childNodes, j = l.length; m < j; m++) {
				g.call(this, l[m], o)
			}
		}
	}
	function d(i) {
		return function(j) {
			var k = P.getTarget(j).getAttribute("data-click");
			var l = false;
			if (k == i.config.okStatus) {
				if (i._callback) {
					l = i._callback()
				}
			} else {
				if (k == i.config.cancelStatus) {
					i._cancelCallback && i._cancelCallback()
				}
			}
			if (!l) {
				i.hide()
			}
		}
	}
	e.confirm = a;
	return b
}, [ "dialog/dialog" ]);
F.module("dialog/alert", function(f, h) {
	var a = f("dialog/dialog"), e, d = P.createClass(function() {
		var i = b(this);
		g.call(this, this.context, i);
		this.addEventListener("hidden", function() {
			if (this.bgObj) {
				this.bgObj.hide()
			}
		})
	}, {
		superClass : a
	});
	e = d.prototype;
	function c(i, j) {
		this.bgObj = i.bgObj;
		this.config = {};
		this.config.okStatus = i.okStatus;
		if (j && (typeof j == "function")) {
			this._callback = j
		} else {
			this._callback = null
		}
		if (this.bgObj) {
			this.bgObj.show()
		}
		return this.show(i)
	}
	function g(i, j) {
		P.on(i, "click", j)
	}
	function b(i) {
		return function(j) {
			var k = P.getTarget(j).getAttribute("data-click");
			if (k) {
				if (k == i.config.okStatus) {
					if (i._callback) {
						i._callback()
					}
				}
				i.hide()
			}
		}
	}
	e.alert = c;
	return d
}, [ "dialog/dialog" ]);
F.module("dialog/overlayer", function(b, d) {
	var c = P.q("mod-dialog-bg")[0], e, a;
	e = function() {
		if (!c) {
			c = document.createElement("div");
			c.className = "mod-overlayer";
			document.body.appendChild(c)
		}
		c.style.width = P.getWidth(document.body) + "px";
		c.style.height = P.getHeight(document.body) + "px";
		c.style.display = "block"
	};
	a = function() {
		if (c) {
			c.style.display = "none"
		}
	};
	return {
		show : e,
		hide : a
	}
});
F
		.module(
				"dialog/dialogmanager",
				function(a, j) {
					var h = a("dialog/dialog"), u = a("dialog/confirm"), g = a("dialog/commonConfirm"), m = a("dialog/alert"), d, n, i, s, q, p, l, v = [
							'<div class="dialog-main #{txtClass}">',
							'<div class="dialog-content">',
							'<div class="dialog-txt" data-bind="text:innerHTML">',
							"#{txt}", "</div>", "</div>",
							'<div class="dialog-console">#{btnConfirm}#{btnCancel}</div>' ]
							.join("");
					function k() {
						if (n && d) {
							n.addEventListener("preshow", function() {
								d.hide()
							});
							d.addEventListener("preshow", function() {
								n.hide()
							});
							d.addEventListener("preshow", function() {
								l.hide()
							})
						}
					}
					function f(w, z) {
						var x, y;
						if (!z) {
							z = w;
							if (!z) {
								return
							}
						}
						if (!d) {
							x = document.createElement("div");
							x.innerHTML = P.format(v, {
								txtClass : "dialog-normal",
								txt : z
							});
							x.className = "mod-dialog dialog-floating";
							document.body.appendChild(x);
							d = new h(x);
							k()
						}
						y = z;
						return d.show(y)
					}
					function c(z, x) {
						var C, D, B, w, A, E, y;
						if (x) {
							C = x.text;
							y = x.hide || false
						}
						if (!C || !z) {
							return
						}
						if (!d) {
							E = document.createElement("div");
							E.innerHTML = P.format(v, {
								txtClass : "dialog-tick",
								txt : C
							});
							E.className = "mod-dialog dialog-tip";
							document.body.appendChild(E);
							d = new h(E);
							k()
						}
						A = P.getPosition(z);
						B = A.top - 55;
						w = A.left - 36;
						D = {
							text : C,
							top : B,
							left : w,
							hide : y
						};
						d.show(D)
					}
					function r(w, B, D) {
						var y, z, C, A, x;
						if (!n) {
							y = document.createElement("div");
							y.innerHTML = P
									.format(
											v,
											{
												txtClass : "dialog-confirm",
												txt : B,
												btnConfirm : '<a href="#" onclick="return false;" class="dialog-ok" data-click="ok">确定</a>',
												btnCancel : '<a href="#" onclick="return false;" class="dialog-cancel" data-click="cancel">取消</a>'
											});
							y.className = "mod-dialog dialog-floating";
							document.body.appendChild(y);
							n = new u(y);
							k()
						}
						z = {};
						z.text = B;
						C = P.getPosition(P.getTarget(w));
						if (C.top - P.getScrollTop() > 118) {
							z.top = C.top - 118
						} else {
							if (P.getTarget(w).offsetHeight) {
								A = P.getTarget(w).offsetHeight
							}
							z.top = C.top + A
						}
						x = P.getTarget(w).offsetWidth || 0;
						z.left = C.left - 87 + x / 2;
						z.okStatus = "ok";
						n.confirm(z, D)
					}
					function e(D, y) {
						var E, A, C, x, z;
						var w = a("dialog/overlayer"), B = [
								'<div class="dialog-topbar">',
								'<div class="dialog-title">#{title}</div>',
								'<a class="close" href="#" onclick="return false;" data-click="cancel"></a>',
								"</div>",
								'<div class="dialog-main #{txtClass}">',
								'<div class="dialog-content #{cntClass} #{cntAlignClass}">',
								'<div class="dialog-txt" data-bind="text:innerHTML">',
								"#{txt}",
								"</div>",
								"</div>",
								'<div class="dialog-console #{cnsClass}">#{btnConfirm}#{btnCancel}</div>',
								"</div>" ].join("");
						E = document.createElement("div");
						E.innerHTML = P
								.format(
										B,
										P
												.extend(
														{
															txtClass : "dialog-confirm",
															txt : D,
															btnConfirm : '<a href="#" onclick="return false;" class="dialog-ok" data-click="ok">确定</a>',
															btnCancel : '<a href="#" onclick="return false;" class="dialog-cancel" data-click="cancel">取消</a>',
															cntClass : "cnt-normal",
															cnsClass : "cns-one",
															cntAlignClass : "cnt-left",
															title : "提示"
														}, y));
						E.className = "mod-dialog dialog-popup "
								+ (y.mainClassName || "");
						document.body.appendChild(E);
						l = new g(E);
						k();
						A = {};
						A.text = D;
						A.bgObj = w;
						A.okStatus = "ok";
						A.cancelStatus = "cancel";
						A.oncancel = y.oncancel;
						return l.confirm(A, y.callback)
					}
					function t(w, x, y) {
					}
					function b() {
						if (d && d.isShow) {
							d.hide()
						}
						if (n && n.isShow) {
							n.hide()
						}
						if (i && i.isShow) {
							i.hide()
						}
						if (l && l.isShow) {
							l.hide()
						}
					}
					function o(K, z) {
						var I, J, G, x, D, w, y, M, R, S, A, C = z
								&& z.callback, E = a("dialog/overlayer"), N = [
								'<div class="dialog-topbar">',
								'<div class="dialog-title">#{title}</div>',
								'<a class="close" href="#" onclick="return false;" data-click="close"></a>',
								"</div>",
								'<div class="dialog-main #{txtClass}">',
								'<div class="dialog-content #{cntClass} #{cntAlignClass}">',
								'<div class="dialog-txt" data-bind="text:innerHTML">',
								"#{txt}",
								"</div>",
								"</div>",
								'<div class="dialog-console #{cnsClass}">#{btnConfirm}#{btnCancel}</div>',
								"</div>" ].join(""), B = "#{btnConfirm}#{btnCancel}", O, L, Q, H = {
							txtClass : "dialog-alert",
							cntClass : "cnt-normal",
							cnsClass : "cns-one",
							cntAlignClass : "cnt-left",
							txt : K,
							btnConfirm : '<a href="#" onclick="return false;" class="dialog-ok" data-click="ok">确定</a>',
							title : "提示"
						};
						if (!i) {
							I = document.createElement("div");
							I.innerHTML = baidu.string
									.format(N, P.extend(H, z));
							I.className = z && z.nousername ? "mod-dialog dialog-popup dialog-nousername"
									: "mod-dialog dialog-popup";
							document.body.appendChild(I);
							i = new m(I)
						}
						if (z) {
							y = z.cntClass;
							M = z.cntAlignClass;
							S = z.cnsClass;
							O = z.btnConfirm;
							L = z.btnCancel;
							A = z.txtClass;
							mainClassName = z.mainClassName
						}
						if (y || M) {
							w = P.q("dialog-content", I)[0];
							if (y && s && y != s) {
								P.addClass(w, y);
								P.removeClass(w, s);
								s = y
							} else {
								if (y) {
									s = y
								}
							}
							if (M && q && M != q) {
								P.addClass(w, M);
								P.removeClass(w, q);
								q = M
							} else {
								if (M) {
									q = M
								}
							}
						}
						if (S) {
							R = P.q("dialog-console", I)[0];
							if (p && p != S) {
								P.addClass(R, S);
								P.removeClass(R, p);
								p = S
							} else {
								p = S
							}
							if (O || L) {
								Q = P.format(B, {
									btnConfirm : O,
									btnCancel : L
								});
								R.innerHTML = Q;
								Q = null
							}
						}
						txtEle = P.q("dialog-main")[0];
						txtEle.className = "dialog-main";
						P.addClass(txtEle, A ? A : "dialog-alert");
						s = s || "cnt-normal";
						q = q || "cnt-left";
						p = p || "cns-one";
						J = {};
						J.text = K;
						J.okStatus = "ok";
						J.bgObj = E;
						return i.alert(J, C)
					}
					return {
						show : f,
						showAt : c,
						confirm : r,
						alert : o,
						hide : b,
						commConfirm : e
					}
				});
F.module("dialog/confirm", function(f, h) {
	var c = f("dialog/dialog"), e, b = P.createClass(function() {
		var i = d(this);
		g.call(this, this.context, i);
		this.addEventListener("hidden", function() {
			if (this.bgObj) {
				this.bgObj.hide()
			}
		})
	}, {
		superClass : c
	});
	e = b.prototype;
	function a(i, j) {
		this.config = {};
		this.bgObj = i.bgObj;
		this.config.okStatus = i.okStatus;
		this.config.cancelStatus = i.cancelStatus;
		if (typeof j == "function") {
			this._callback = j
		} else {
			this._callback = null
		}
		if (typeof i.oncancel == "function") {
			this._cancelCallback = i.oncancel
		} else {
			this._cancelCallback = null
		}
		if (this.bgObj) {
			this.bgObj.show()
		}
		return this.show(i)
	}
	function g(k, o) {
		var n, m, l, j;
		if (k.nodeType == 1) {
			if (k.attributes.getNamedItem("data-click")) {
				P.on(k, "click", o)
			}
			for (m = 0, l = k.childNodes, j = l.length; m < j; m++) {
				g.call(this, l[m], o)
			}
		}
	}
	function d(i) {
		return function(j) {
			var k = P.getTarget(j).getAttribute("data-click");
			var l = false;
			if (k == i.config.okStatus) {
				if (i._callback) {
					l = i._callback()
				}
			} else {
				if (k == i.config.cancelStatus) {
					i._cancelCallback && i._cancelCallback()
				}
			}
			if (!l) {
				i.hide()
			}
		}
	}
	e.confirm = a;
	return b
}, [ "dialog/dialog" ]);
F.module("dialog/dialog", function(e, g) {
	var d, b = P.createClass(function(i) {
		var j = e("util/binding");
		if (i && i.nodeType != 1) {
			throw "cannot create Dialog, the constructor must has element node"
		}
		this.context = i;
		j.setBinding(this, this.context)
	});
	d = b.prototype;
	function h(j, i, l, k) {
		this.context.style.display = "block";
		if (j == "center" || i == "center") {
			j = (P.getViewHeight() - this.context.offsetHeight) / 2
					+ P.getScrollTop();
			i = (P.getViewWidth() - this.context.offsetWidth) / 2
					+ P.getScrollLeft()
		}
		if (this.isShow) {
			if ((this.context.style.top == j + "px")
					&& (this.context.style.left == i + "px")) {
				return
			}
		}
		this.dispatchEvent("preshow");
		this.text(l);
		this.context.style.top = j + "px";
		this.context.style.left = i + "px";
		this.isShow = true;
		this.dispatchEvent("showed");
		if (this._hideTimer) {
			clearTimeout(this._hideTimer)
		}
		if (k) {
			this._hideTimer = setTimeout(this.hide.bind(this), 1000)
		}
	}
	function a(i) {
		var l = "center", k = "center", n, j, m = false;
		j = P.getType(i);
		if (j == "[object string]") {
			n = i
		} else {
			if (j == "[object object]" && i.text) {
				l = i.top || "center";
				k = i.left || "center";
				n = i.text;
				m = i.hide || false
			} else {
				return
			}
		}
		h.call(this, l, k, n, m);
		return this.context
	}
	function c() {
		this.context.style.display = "none";
		this.isShow = false;
		this.dispatchEvent("hidden");
		if (this._hideTimer) {
			clearTimeout(this._hideTimer)
		}
	}
	function f() {
		this.context.parentNode.removeChild(this.context);
		this.isShow = false;
		this.dispatchEvent("disposed")
	}
	d.show = a;
	d.hide = c;
	d.dispose = f;
	return b
});
F
		.module(
				"custom_input/model",
				function(d, a) {
					var c = baidu, g = {
						textExtension : "%EF%BB%BF"
					}, b, e;
					function f(h) {
						var i = {};
						c.extend(c.extend(i, g), h && !h.tagName ? h : null);
						this._options = i;
						this._errno = 0;
						this._name = this._options.name;
						this._value = this._options.value;
						this._validations = [];
						this._defaultsText = this._options.defaultsText ? (this._options.defaultsText + decodeURI(g.textExtension))
								: "";
						i = null;
						this._init()
					}
					b = c.lang.createClass(f);
					e = b.prototype;
					e._init = function() {
						this.addValidation(this._options.valdation)
					};
					e.getName = function() {
						return this._name
					};
					e.addValidation = function(h) {
						if (Object.prototype.toString.call(h) == "[object Function]") {
							this._validations.push(h)
						}
					};
					e._validate = function() {
						len = this._validations.length;
						while (len--) {
							var h = this._validations[len].call(this,
									this._value);
							this.setErrno(h.errNo);
							if (h.errNo) {
								this.dispatchEvent("error", {
									data : h.msg
								});
								break
							} else {
								this.dispatchEvent("ok")
							}
						}
					};
					e._addDefaultsMsg = function() {
						if (!this.getValue()) {
							this.dispatchEvent("_addDefaultsMsg", {
								data : this._defaultsText
							})
						}
					};
					e._delDefaultsMsg = function(h) {
						if (h == this._defaultsText) {
							this.dispatchEvent("_deldefaultsMsg")
						}
					};
					e.getErrno = function() {
						return this._errno
					};
					e.setErrno = function(h) {
						this._errno = h
					};
					e.getValue = function() {
						return this._value
					};
					e.setValue = function(h) {
						if (h == this._value) {
							return
						}
						this._value = h;
						this.dispatchEvent("valueupdated", {
							data : this._value
						});
						this._validate()
					};
					e.getData = function() {
						return {
							name : this.getName(),
							value : this.getValue(),
							errno : this.getErrno()
						}
					};
					e.submit = function() {
						return this.getData()
					};
					return b
				});
F
		.module(
				"custom_input/controller",
				function(c, a) {
					var b = baidu, e = {
						hoverClass : "mod-cus-input-hover",
						focusClass : "mod-cus-input-focus",
						errorClass : "mod-cus-input-error",
						tipClass : "mod-cus-input-tip"
					};
					function d(g, i, f) {
						var h = {};
						b.extend(b.extend(h, e), f && !f.tagName ? f : null);
						this.model = g;
						this.el = i;
						this._className = this.el.className;
						this._info = h;
						this._tipElement = [];
						this._time = null;
						this._time2 = null;
						this._init();
						h = null
					}
					InputController = b.lang.createClass(d);
					fn = InputController.prototype;
					fn._init = function() {
						var f = this;
						this.eventHandlers = {
							mouseover : function() {
								b.addClass(f.el, f._info.hoverClass)
							},
							mouseout : function() {
								b.removeClass(f.el, f._info.hoverClass)
							},
							focus : function() {
								b.addClass(f.el, f._info.focusClass);
								f.model._defaultsText
										&& f.model._delDefaultsMsg(f.el.value);
								f.dispatchEvent("focus")
							},
							blur : function() {
								b.removeClass(f.el, f._info.focusClass);
								f.model.setValue(f.el.value);
								f.model._defaultsText
										&& f.model._addDefaultsMsg()
							},
							keyup : function() {
								clearTimeout(f._time);
								f._time = setTimeout(function() {
									f.model.setValue(f.el.value)
								}, 200)
							}
						};
						this.actions = {
							erronupdated : function(g) {
								f.model.setErrno(g)
							},
							handleError : function(g) {
								f._tipElement.innerHTML = g.data;
								f._tipElement.style.display = "block";
								b.addClass(f.el, f._info.errorClass)
							},
							handleOk : function(g) {
								f._tipElement.style.display = "none";
								b.removeClass(f.el, f._info.errorClass)
							},
							showDefaultsMsg : function(g) {
								f.el.value = g.data;
								f.el.style.color = "#cccccc";
								if (f.model._options.autoHeight) {
									f.el.style.height = f.model._options.autoHeight.min
											+ "px"
								}
							},
							hideDefaultsMsg : function(g) {
								f.el.value = "";
								f.el.style.cssText = "";
								if (f.model._options.autoHeight) {
									f.el.style.height = f.model._options.autoHeight.max
											+ "px"
								}
							},
							autoHeight : function() {
								var h, l = f.el, k = l.style, j = f.model._options.autoHeight.min, g = f.model._options.autoHeight.max, i;
								k.height = j + "px";
								i = l.scrollHeight - 10;
								if (i > j) {
									if (i > g) {
										h = g;
										k.overflowY = "scroll"
									} else {
										h = i;
										k.overflowY = "hidden"
									}
									k.height = h + "px"
								}
							},
							valueupdated : function(g) {
								f.el.value = g.data;
								f.el.style.cssText = "";
								if (g.data && f.model._options.autoHeight) {
									f.el.style.height = f.model._options.autoHeight.max
											+ "px"
								}
							}
						};
						this._bindObjectEvents();
						if (f.model._validations.length) {
							this._createTip(this.el)
						}
						this.dispatchEvent("viewready")
					};
					fn._bindObjectEvents = function() {
						this.addEventListener("viewready", function() {
							this._bindUIEvents();
							if (this.model._defaultsText) {
								this.model._addDefaultsMsg()
							}
						});
						this.model.addEventListener("_addDefaultsMsg",
								this.actions.showDefaultsMsg);
						this.model.addEventListener("_deldefaultsMsg",
								this.actions.hideDefaultsMsg);
						this.model.addEventListener("valueupdated",
								this.actions.valueupdated);
						this.model.addEventListener("error",
								this.actions.handleError);
						this.model
								.addEventListener("ok", this.actions.handleOk)
					};
					fn._bindUIEvents = function() {
						var f = this;
						b.each([ "mouseover", "mouseout", "focus", "blur",
								"keyup" ], function(g) {
							b.on(f.el, g, f.eventHandlers[g])
						})
					};
					fn._createTip = function(f) {
						this._tipElement = document.createElement("span");
						this._tipElement.className = this._info.tipClass;
						f.parentNode.appendChild(this._tipElement)
					};
					return InputController
				});
F
		.module(
				"custom_input/main",
				function(c, a) {
					var b = window.baidu, e = c("custom_input/model"), d = c("custom_input/controller");
					return {
						initInput : function(i, g) {
							var k, h, f, j = {};
							if (baidu.isString(i)) {
								k = b.g(i)
							} else {
								if (i.tagName) {
									k = i
								}
							}
							j.name = k.name;
							j.value = k.value;
							b.extend(j, g);
							value = k.value;
							h = new e(j);
							InputController = new d(h, k, g);
							return h
						}
					}
				});
F
		.module(
				"custom_select/controller",
				function(a, d) {
					var c = baidu, b = {
						optionPanelTmpl : '<div class="cus-sel-opt-panel">#{txt}</div>',
						optionTmpl : '<li class="cus-sel-opt #{cls}"><a class="#{optCls}" data-value="#{val}" href="#">#{txt}</a></li>',
						optionsContainerTmpl : '<ol class="cus-sel-opt-ctn">#{cnt}</ol>',
						selectTmpl : '<div class="mod-cus-sel #{selCls}" id="#{id}"></div>',
						optCls : "cus-sel-opt-txt",
						selCls : ""
					}, i, g, e, f = "cus-sel-active";
					e = (function(j) {
						var k = "cussel";
						return function() {
							return k + j++
						}
					})(1000000);
					function h(k, m, j) {
						var l = {}, n = e();
						this.el;
						this._show;
						this._expanded;
						this._selectedIndex = 0;
						this._groupContainer = {};
						this.id = n;
						this.model = k;
						this._curGroup;
						this._resetFunc = {};
						if (arguments.length < 3) {
							j = m;
							m = undefined
						}
						c.extend(c.extend(l, b), j && !j.tagName ? j : null);
						this._tmpl = l;
						this._init();
						if (m && m.tagName
								&& m.tagName.toUppercase() === "SELECT") {
							this._setInitValue(m)
						}
						l = null;
						j = null
					}
					i = c.lang.createClass(h);
					g = i.prototype;
					g._init = function() {
						var j = this;
						this.eventHandlers = {
							click : function(k) {
								var m = c.event.getTarget(k), l;
								if (m && c.dom.hasClass(m, j._tmpl.optCls)) {
									l = c.dom.getAttr(m, "data-value");
									if (l) {
										j.dispatchEvent("indexupdated", {
											data : l
										})
									}
									c.event.preventDefault(k)
								}
								if (!j._expanded) {
									j.dispatchEvent("expanded")
								} else {
									j.dispatchEvent("unexpanded")
								}
							},
							globalClick : function() {
								j.dispatchEvent("unexpanded")
							}
						};
						this.actions = {
							bindGlobalClick : function() {
								c.on(document, "click",
										j.eventHandlers.globalClick)
							},
							unBindGlobalClick : function() {
								c.un(document, "click",
										j.eventHandlers.globalClick)
							},
							expanded : function() {
								j._expanded = true;
								c.addClass(j.el, f);
								setTimeout(j.actions.bindGlobalClick, 0)
							},
							unexpanded : function() {
								j._expanded = false;
								c.removeClass(j.el, f);
								j.actions.unBindGlobalClick()
							},
							indexUpdated : function(l) {
								var k = l.data;
								if (k != j._selectedIndex) {
									j.model.setValueByIndex(k)
								}
							},
							valueUpdated : function(l) {
								var k = l.data.idx, o = l.data.val, n = j._selectedIndex, m = c
										.q("cus-sel-opt", j.el);
								c.removeClass(m[n], "cus-sel-opt-selected");
								c.addClass(m[k], "cus-sel-opt-selected");
								j._selectedIndex = k;
								j._updateOptionPanel(o);
								m = null
							},
							dataupdated : function() {
								j.el.innerHTML = "";
								if (j.model.hasData()) {
									j._createOptionPanel();
									j._createOptionContainer()
								}
							},
							onvalidated : function(k) {
								k.data ? c.addClass(j.el, "cus-sel-error") : c
										.removeClass(j.el, "cus-sel-error")
							}
						};
						this._render()._bindObjectEvents();
						if (this.model.hasData()) {
							this._createOptionPanel();
							this._createOptionContainer()
						}
					};
					g._bindObjectEvents = function() {
						this.addEventListener("viewready", function() {
							this._bindUIEvents()
						});
						this
								.addEventListener("expanded",
										this.actions.expanded);
						this.addEventListener("unexpanded",
								this.actions.unexpanded);
						this.addEventListener("indexupdated",
								this.actions.indexUpdated);
						this.model.addEventListener("valueupdated",
								this.actions.valueUpdated);
						this.model.addEventListener("dataupdated",
								this.actions.dataupdated);
						this.model.addEventListener("validated",
								this.actions.onvalidated)
					};
					g._bindUIEvents = function() {
						var j = this;
						c.each([ "click" ], function(k) {
							c.on(j.el, k, j.eventHandlers[k])
						})
					};
					g.getSelectIndex = function() {
						return this._selectedIndex
					};
					g.setVisible = function(j) {
						j ? this.show() : this.hide();
						return this
					};
					g.show = function() {
						if (!this._show) {
							c.removeClass(this.el, "cus-sel-inactive");
							this._show = true;
							this.dispatchEvent("visibleupdated", {
								data : true
							});
							this._executeResetFunc("show")
						}
					};
					g.hide = function() {
						if (this._show) {
							c.addClass(this.el, "cus-sel-inactive");
							this._show = false;
							this.dispatchEvent("visibleupdated", {
								data : false
							})
						}
					};
					g.appendToDom = function(j, k) {
						if (k) {
							this._insertBefore(j, k)
						} else {
							this._appendChild(j)
						}
						this._show = true;
						this.dispatchEvent("viewready");
						return this
					};
					g._insertBefore = function(j, k) {
						j.insertBefore(this.el, k);
						return this
					};
					g._appendChild = function(j) {
						j.appendChild(this.el);
						j = null;
						return this
					};
					g._render = function() {
						this.el = this._createElement(this._tmpl.selectTmpl, {
							id : this.id,
							selCls : this._tmpl.selCls
						});
						return this
					};
					g._createElement = function(j, m) {
						var l = document.createElement("div"), k;
						l.innerHTML = c.string.format(j, m);
						k = this._getFirstElement(l);
						l = null;
						return k
					};
					g._getFirstElement = function(k) {
						var j = k.firstChild;
						while (j && j.nodeType !== 1) {
							j = j.nextSibling
						}
						k = null;
						return j
					};
					g._createOptionContainer = function() {
						var n = "", k = this.model.getData(), p = this.model
								.getValue(), l, j, m, o;
						for (l = 0, j = k.length; l < j; l++) {
							o = k[l];
							n += c.string.format(this._tmpl.optionTmpl, {
								optCls : this._tmpl.optCls,
								txt : o.txt,
								val : l,
								cls : p == o.val ? "cus-sel-opt-selected" : ""
							})
						}
						m = this._createElement(
								this._tmpl.optionsContainerTmpl, {
									cnt : n
								});
						this.el.appendChild(m);
						if (c.browser.ie == 6) {
							if (j > 11) {
								c.addClass(this.el, "cus-sel-ie6-maxheight")
							} else {
								c.removeClass(this.el, "cus-sel-ie6-maxheight")
							}
						}
						m = null;
						o = null
					};
					g._createOptionPanel = function() {
						this._optionPanel = this._createElement(
								this._tmpl.optionPanelTmpl, {
									txt : this.model.getText()
								});
						this.el.appendChild(this._optionPanel)
					};
					g._updateOptionPanel = function(j) {
						this._optionPanel.innerHTML = this.model.getText(j)
					};
					g.addResetFunc = function(j, k) {
						if (!this._resetFunc[j]) {
							this._resetFunc[j] = []
						}
						this._resetFunc[j].push(k)
					};
					g._executeResetFunc = function(k) {
						var j;
						if (this._resetFunc[k]) {
							j = this._resetFunc[k].length;
							while (j--) {
								this._resetFunc[k][j].call(this)
							}
						}
					};
					return i
				});
F
		.module(
				"custom_select/main",
				function(c, a) {
					var b = window.baidu, f = c("custom_select/model"), d = c("custom_select/controller");
					function e(k, i) {
						var j, h, m, g, l;
						g = i.selectName || "passport_default";
						l = i.optionData;
						j = new f(g);
						j.addOptions(l);
						h = new d(j);
						h.appendToDom(k);
						return j
					}
					a.init = e
				});
F.module("custom_select/model", function(d, a) {
	var c = baidu, g = {}, b, e;
	function f(i, h) {
		var j = {};
		this._name = i;
		this._data = [];
		c.extend(c.extend(j, g), h);
		this._value;
		this._text;
		this._name;
		this._valueTxtMap = {};
		this._defaultValue;
		this._validations = []
	}
	b = c.lang.createClass(f);
	e = b.prototype;
	e.addOptions = function(k) {
		var l, j = k.length, m, h;
		if (typeof this._value == "undefined" && j) {
			this._value = k[0].value || k[0].name;
			this._text = k[0].name
		}
		for (l = 0; l < j; l++) {
			h = k[l].name;
			m = k[l].value || k[l].name;
			this._data.push({
				txt : h,
				val : m
			});
			this._valueTxtMap[m] = h
		}
		k = null;
		return this
	};
	e.updateOptions = function(h) {
		this._data = [];
		this.addOptions(h);
		this.setValueByIndex(0);
		this.dispatchEvent("dataupdated")
	};
	e.getValue = function() {
		return this._value
	};
	e.setValueByIndex = function(h) {
		var i;
		if (this._value != this._data[h]) {
			this._value = this._data[h]["val"];
			this._text = this._data[h]["txt"];
			this.dispatchEvent("valueupdated", {
				data : {
					val : this._value,
					idx : h
				}
			})
		}
		if (this._err && (i = this._validate()) == 0) {
			this.dispatchEvent("validated", {
				data : i
			})
		}
		return this
	};
	e.getText = function(h) {
		h = h || this.getValue();
		return this._valueTxtMap[h]
	};
	e.hasData = function(h) {
		return this._data.length > 0
	};
	e.getData = function() {
		return this._data
	};
	e.setValue = function(j) {
		var i = -1, h;
		if (!j) {
			return this
		}
		h = this._data.length;
		while (h--) {
			if (this._data[h]["val"] === j) {
				i = h;
				break
			}
		}
		if (i > -1) {
			this.setValueByIndex(i)
		}
		return this
	};
	e.submit = function() {
		var h = this._validate();
		this.dispatchEvent("validated", {
			data : h
		});
		return {
			errNo : h,
			name : this._name,
			value : this._value
		}
	};
	e._validate = function() {
		var h = this._validations.length, i = 0;
		while (h--) {
			if (i = this._validations[h].call(null, this._value)) {
				this._err = true;
				break
			}
		}
		if (i == 0 && this._err) {
			this._err = false
		}
		return i
	};
	e.addValidation = function(h) {
		if (c.lang.isFunction(h)) {
			this._validations.push(h)
		}
		return this
	};
	e.setName = function(h) {
		this._name = h
	};
	return b
});
F.module("setting_common_profile/model", function(c, a) {
	var e = c("base/model"), d;
	function b(h, f, g) {
		this.id = h;
		this.router = f;
		if (g && typeof g.init == "function") {
			g.init.call(this)
		}
	}
	d = b.prototype = P.extend(e);
	d.postData = function(f) {
		this.router.postData(f.postType, f.actionObj)
	};
	return b
});
F.module("setting_common_profile/view", function(b, a) {
	var e = b("base/view"), d;
	function c(f, g) {
		this.model = f;
		this.el = g;
		this.init()
	}
	d = c.prototype = P.extend(e);
	return c
});
F.module("setting_tieba/settingtiebamodel", function(c, e) {
	var b = c("base/model");
	function d(h, f, g) {
		this.id = h;
		this.router = f;
		if (g && typeof g.init == "function") {
			g.init.call(this)
		}
	}
	var a = d.prototype = P.extend(b);
	a.doPost = function(f) {
		this.router.postData(f.postType, f.actionObj)
	};
	return d
});
F
		.module(
				"setting_tieba/settingtiebaview",
				function(i, c) {
					var g = i("base/view");
					var e = function() {
						var j = this;
						P
								.on(
										"tiebaSaveBtn",
										"click",
										function() {
											var m = b();
											var l = f();
											var k = {
												postType : "setting-tieba",
												actionObj : {
													postData : {
														hide_id : m,
														privated : l,
														portrait : j.model.router.global.login_userInfo.portrait
													},
													callback : d
												}
											};
											j.model.doPost(k)
										});
						P.each(P.q("check-tieba"), function(k) {
							P.each([ "change", "focus", "blur", "click" ],
									function(l) {
										P.on(k, l, function(n) {
											var m = P.getTarget(n);
											if (m.checked) {
												P.removeClass(m.parentNode,
														"uncheck")
											} else {
												P.addClass(m.parentNode,
														"uncheck")
											}
										})
									})
						})
					};
					var d = function(m) {
						var k = m.errNo || 0;
						if (k == 0) {
							var l = P.g("tiebaSaveOkMsg");
							l.style.display = "block";
							setTimeout(function() {
								l.style.display = "none"
							}, 5000)
						} else {
							if (k == -101) {
								var j = i("dialog/dialogmanager");
								j
										.alert(
												"登录超时，请重新登录。",
												{
													callback : function() {
														location.href = "/p/sys/redirect?login=1&uname="
																+ App.router.global.login_userInfo.uname
													}
												})
							} else {
								var j = i("dialog/dialogmanager");
								j.alert("服务器出错，提交失败。")
							}
						}
					};
					var b = function() {
						var j = [];
						P.each(P.q("check-tieba"), function(k) {
							if (!k.checked) {
								j.push(k.name)
							}
						});
						return j.join(",")
					};
					var f = function() {
						return P.g("tiebaPrivateCheckbox").checked ? 1 : 0
					};
					function a(j, k) {
						this.model = j;
						this.el = k;
						this.init();
						this.addEventListener("update:viewready", e.bind(this))
					}
					var h = a.prototype = P.extend(g);
					return a
				});
F.module("setting_privacy/settingprivacymodel", function(d, e) {
	var b = d("base/model");
	function c(h, f, g) {
		this.id = h;
		this.router = f;
		if (g && typeof g.init == "function") {
			g.init.call(this)
		}
	}
	var a = c.prototype = P.extend(b);
	a.doPost = function(f) {
		this.router.postData(f.postType, f.actionObj)
	};
	return c
});
F.module("setting_privacy/settingprivacyview", function(f, h) {
	var e = f("base/view");
	var c = function() {
		var i = this;
		P.on("privacySaveBtn", "click", function() {
			var k = P.getAttr(this, "data-click");
			var m = a();
			var j = {
				postData : {
					portrait : i.model.router.global.login_userInfo.portrait
				},
				callback : g
			};
			j.postData[k] = m;
			var l = {
				postType : "setting-privacy",
				actionObj : j
			};
			i.model.doPost(l)
		})
	};
	var g = function(l) {
		var j = l.errNo || 0;
		if (j == 0) {
			var k = P.g("privacySaveOkMsg");
			k.style.display = "block";
			setTimeout(function() {
				k.style.display = "none"
			}, 5000)
		} else {
			if (j == -101) {
				var i = f("dialog/dialogmanager");
				i.alert("登录超时，请重新登录。", {
					callback : function() {
						location.href = "/p/sys/redirect?login=1&uname="
								+ App.router.global.login_userInfo.uname
					}
				})
			} else {
				var i = f("dialog/dialogmanager");
				i.alert("服务器出错，提交失败。")
			}
		}
	};
	var a = function() {
		return P.g("privacyCheckbox").checked ? 1 : 0
	};
	function b(i, j) {
		this.model = i;
		this.el = j;
		this.init();
		this.addEventListener("update:viewready", c.bind(this))
	}
	var d = b.prototype = P.extend(e);
	return b
});
F
		.module(
				"setting_proxy/proxy",
				function(c, a) {
					var b = baidu, d, e;
					a.init = function(g, i) {
						var h = {
							"0" : {
								target : "sys",
								msg : "succeed"
							},
							"100005" : {
								target : "sys",
								msg : "系统错误"
							},
							"119998" : {
								target : "sys",
								msg : "bdstoken错误"
							},
							"160103" : {
								target : "sys",
								msg : "用户不在线"
							},
							"230001" : {
								target : "passport_sex",
								msg : "格式不正确"
							},
							"230002" : {
								target : "passport_blood",
								msg : "格式不正确"
							},
							"230003" : {
								target : "passport_marriage",
								msg : "格式不正确"
							},
							"230004" : {
								target : "passport_income",
								msg : "格式不正确"
							},
							"230005" : {
								target : "passport_education",
								msg : "格式不正确"
							},
							"230006" : {
								target : "passport_trade",
								msg : "格式不正确"
							},
							"230007" : {
								target : "passport_job",
								msg : "格式不正确"
							},
							"230008" : {
								target : "passport_figure",
								msg : "格式不正确"
							},
							"230009" : {
								target : "passport_character",
								msg : "格式不正确"
							},
							"230010" : {
								target : "passport_smoke",
								msg : "格式不正确"
							},
							"230011" : {
								target : "passport_drink",
								msg : "格式不正确"
							},
							"230012" : {
								target : "passport_rest",
								msg : "格式不正确"
							},
							"230013" : {
								target : "passport_fibook",
								msg : "格式不正确"
							},
							"230014" : {
								target : "passport_fibook",
								msg : "违禁词"
							},
							"230015" : {
								target : "passport_fimusic",
								msg : "格式不正确"
							},
							"230016" : {
								target : "passport_fimusic",
								msg : "违禁词"
							},
							"230017" : {
								target : "passport_fimovie",
								msg : "格式不正确"
							},
							"230018" : {
								target : "passport_fimovie",
								msg : "违禁词"
							},
							"230019" : {
								target : "passport_fisport",
								msg : "格式不正确"
							},
							"230020" : {
								target : "passport_fisport",
								msg : "违禁词"
							},
							"230021" : {
								target : "passport_fibrand",
								msg : "格式不正确"
							},
							"230022" : {
								target : "passport_fibrand",
								msg : "违禁词"
							},
							"230023" : {
								target : "passport_fiperson",
								msg : "格式不正确"
							},
							"230024" : {
								target : "passport_fiperson",
								msg : "违禁词"
							},
							"230025" : {
								target : "passport_fiother",
								msg : "格式不正确"
							},
							"230026" : {
								target : "passport_fiother",
								msg : "违禁词"
							},
							"230027" : {
								target : "passport_hometown_province;passport_hometown_city;passport_hometown_district;passport_hometown_else",
								msg : "格式不正确"
							},
							"230028" : {
								target : "passport_hometown_province;passport_hometown_city;passport_hometown_district;passport_hometown_else",
								msg : "违禁词"
							},
							"230029" : {
								target : "passport_reside_province;passport_reside_city;passport_reside_district;passport_reside_else",
								msg : "格式不正确"
							},
							"230030" : {
								target : "passport_reside_province;passport_reside_city;passport_reside_district;passport_reside_else",
								msg : "违禁词"
							},
							"230043" : {
								target : "passport_birthday_year;passport_birthday_month;passport_birthday_day",
								msg : "生日填写格式不正确"
							}
						};
						g.proxy = g.proxy || {};
						d = g.proxy;
						d._requestData = null;
						d._handlers = {};
						d._loading = false;
						if (i && i.nodeName
								&& i.nodeName.toLowerCase() === "iframe") {
							e = i
						}
						function f(k, l, m) {
							var j;
							if (d._handlers[k]) {
								j = d._handlers[k].length;
								while (j--) {
									d._handlers[k][j].call(null, l, m)
								}
							}
						}
						d.done = function(j) {
							d._loading = false;
							f("done", j, h[j])
						};
						d.ready = function() {
							d._ready = true
						};
						d.loading = function() {
							d._loading = true;
							f("loading")
						};
						d._sendRequest = function(j) {
							if (d._loading) {
								return
							}
							if (!d._ready) {
								d._requestData = j;
								setTimeout(d._sendRequest, 100)
							} else {
								j = j || d._requestData;
								e.contentWindow.App.sendRequest(j);
								d.loading()
							}
						}
					};
					a._addCallback = function(f, g) {
						if (!d._handlers[f]) {
							d._handlers[f] = []
						}
						if (Object.prototype.toString.call(g).toLowerCase() === "[object function]") {
							d._handlers[f].push(g)
						}
					};
					a.addDoneCallback = function(f) {
						a._addCallback("done", f)
					};
					a.addLoadingCallback = function(f) {
						a._addCallback("loading", f)
					};
					a.sendRequest = function(f) {
						d._sendRequest(f)
					}
				});
F.module("tracking/track", function(req, exp) {
	var defaults = {
		baseUrl : "http://nsclick.baidu.com/v.gif"
	};
	function ctor() {
		this.baseUrl = defaults.baseUrl;
		this.isBubble = true
	}
	function _sendRequest(baseUrl, trackParams) {
		var n = "imglog__" + P.getGuid(), img = window[n] = new Image();
		img.onload = (img.onerror = function() {
			window[n] = null
		});
		img.src = _generatingUrl(baseUrl, trackParams);
		img = null
	}
	function _generatingUrl(baseUrl, params) {
		params._t = new Date - 0;
		if (params) {
			baseUrl += baseUrl.indexOf("?") > -1 ? "&" : "?"
		}
		return baseUrl + P.jsonToQuery(params)
	}
	var F = P.createClass(ctor), fn = F.prototype, getValueMaps = {
		text : function(ele) {
			return ele.text || ele.innerText
		},
		id : function(ele) {
			return P.getAttr(ele, "id")
		},
		parent : function(ele) {
			var parent = P.getAncestorByTag(ele, "div");
			if (!parent) {
				return
			}
			if (parent.id) {
				return "id:" + parent.id
			} else {
				if (parent.className) {
					return "class:" + parent.className
				}
			}
		}
	};
	fn._getValue = function(method, ele) {
		var attr = method.indexOf("attr:") > -1 ? method.split(":") : null;
		var eValue = method.indexOf("eval:") > -1 ? method.split(":") : null;
		if (attr && attr.length == 2) {
			return P.getAttr(ele, attr[1])
		} else {
			if (eValue && eValue.length == 2) {
				return window.eval(eValue[1])
			} else {
				if (getValueMaps[method]) {
					return getValueMaps[method](ele)
				} else {
					return ele[method]
				}
			}
		}
	};
	fn.sendRequest = function(ele) {
		var validObj, trackParams = {}, trackObj = {
			login_portrait : App.router.global.login_userInfo.portrait,
			page_portrait : App.router.global.page_userInfo.portrait,
			baidu_id : P.getCookie("BAIDUID")
		}, trackType, trackValue, additionalParams, from;
		if (from = P.getQueryValue(location.href, "from")) {
			trackObj.url_from = from
		}
		if (this.validateElement) {
			validObj = this.validateElement(ele)
		}
		if (validObj.valid) {
			additionalParams = validObj.params;
			for (trackType in additionalParams) {
				if (additionalParams.hasOwnProperty(trackType)) {
					trackValue = this._getValue(additionalParams[trackType],
							ele);
					if (trackValue) {
						trackParams[trackType] = trackValue
					}
				}
			}
			P.extend(trackObj, this.params);
			P.extend(trackObj, trackParams);
			_sendRequest(this.baseUrl, trackObj)
		}
	};
	F.sendRequest = function(options) {
		var trackParams, baseUrl;
		baseUrl = options.baseUrl || defaults.baseUrl;
		trackParams = options.trackParams || {};
		_sendRequest(baseUrl, trackParams)
	};
	return F
});
F.module("tracking/clicktrack", function(e, g) {
	var f = e("tracking/track");
	function a(i) {
		var h = i;
		return function(k) {
			var j = P.getTarget(k);
			h.sendRequest(j);
			if (!this.isBubble) {
				P.stopPropagation(k)
			}
		}
	}
	function d(i, l) {
		var h = {
			pid : "320",
			type : "2011",
			evt : "click"
		}, k = l ? P.extend(h, l) : h;
		this.element = i;
		this.rules = [];
		this.params = k;
		var j = {
			params : {
				id : "id",
				cn : "className",
				parent : "parent",
				data_click : "attr:data-click",
				data_pn : "attr:data-pn",
				data_tab : "attr:data-tab"
			},
			validate : function(m) {
				return m.nodeName.toLowerCase() == "a" ? 1 : 0
			}
		};
		this.newRule(j);
		i && P.on(i, "click", a(this))
	}
	var c = P.createClass(d, {
		superClass : f
	}), b = c.prototype;
	b.validateElement = function(l) {
		var k, j, m, h;
		for (m = this.rules, k = 0, j = m.length; k < j; k++) {
			h = m[k].validate.call(this, l);
			if (h == 1) {
				return {
					valid : true,
					params : m[k].params
				}
			} else {
				if (h == 2) {
					break
				}
			}
		}
		return {
			valid : false
		}
	};
	b.newRule = function(h) {
		if (P.isFunction(h.validate)) {
			this.rules.push(h)
		}
	};
	return c
});
F.module("tracking/trackmanager",
		function(c, m) {
			var I = c("tracking/clicktrack"), D = c("tracking/track"), w;
			var y = {
				id : "id",
				cn : "className",
				parent : "parent",
				data_click : "attr:data-click",
				data_pn : "attr:data-pn",
				data_tab : "attr:data-tab"
			};
			var o = {
				params : y,
				validate : function(J) {
					return J.nodeName.toLowerCase() == "img"
							&& J.parentNode.nodeName.toLowerCase() == "a" ? 1
							: 0
				}
			};
			var E = {
				params : y,
				validate : function(J) {
					return J.nodeName.toLowerCase() == "span"
							&& J.parentNode.nodeName.toLowerCase() == "a" ? 1
							: 0
				}
			};
			var j = {
				params : y,
				validate : function(J) {
					return J.nodeName.toLowerCase() == "img"
							&& P.hasAttr(J, "data-index") ? 1 : 0
				}
			};
			var C = {
				params : y,
				validate : function(J) {
					return J.nodeName.toLowerCase() == "div"
							&& J.className.toLowerCase() == "video" ? 1 : 0
				}
			};
			var e = {
				params : y,
				validate : function(J) {
					return J.nodeName.toLowerCase() == "li"
							&& P.hasAttr(J, "data-tab") ? 1 : 0
				}
			};
			var q = {
				params : y,
				validate : function(J) {
					return !!P.getAncestorByTag(J, "a")
				}
			};
			var H = {
				params : y,
				validate : function(J) {
					return J.nodeName.toLowerCase() == "i"
							&& J.parentNode.nodeName.toLowerCase() == "a" ? 1
							: 0
				}
			};
			var n = function(K) {
				var J = new I(K, {
					module : "userpanel"
				});
				J.newRule(E)
			};
			var t = function(K) {
				var J = new I(K, {
					module : "basicinfo"
				})
			};
			var x = function(K) {
				var J = new I(K, {
					module : "tabswitch"
				})
			};
			var r = function(K) {
				var J = new I(K, {
					module : "tiebahonor"
				});
				J.newRule(q)
			};
			var d = function(K) {
				var J = new I(K, {
					module : "tiebafeed"
				});
				J.newRule(e)
			};
			var s = function(K) {
				var J = new I(K, {
					module : "tiebarelation"
				});
				J.newRule(o)
			};
			var b = function(K) {
				var J = new I(K, {
					module : "tiebauserlist"
				});
				J.newRule(o)
			};
			var G = function(K) {
				var J = new I(K, {
					module : "zhidaoprofile"
				});
				J.newRule(o);
				J.newRule(E)
			};
			var v = function(K) {
				var J = new I(K, {
					module : "zhidaoanswerlist"
				})
			};
			var f = function(K) {
				var J = new I(K, {
					module : "spacealbum"
				});
				J.newRule(o);
				J.newRule(j)
			};
			var z = function(K) {
				var J = new I(K, {
					module : "spacearticle"
				});
				J.newRule(E);
				J.newRule(C)
			};
			var h = function(K) {
				var J = new I(K, {
					module : "spacerelation"
				});
				J.newRule(o)
			};
			var a = function(K) {
				var J = new I(K, {
					module : "spacefriend"
				});
				J.newRule(o)
			};
			var A = function(K) {
				var J = new I(K, {
					module : "tipbar"
				});
				J.newRule(o)
			};
			var B = function(K) {
				var J = new I(K, {
					module : "rightnav"
				});
				J.newRule(E)
			};
			var g = function(K) {
				var J = new I(K, {
					module : "skinchange"
				});
				J.newRule(H)
			};
			var i = function(K) {
				var J = new I(K, {
					module : "timeline"
				});
				J.newRule(o)
			};
			var p = function(K) {
				var J = new I(K, {
					module : "timelinenav"
				})
			};
			var k = function(K) {
				var J = new I(K, {
					module : "summary"
				})
			};
			var u = function(K) {
				var J = new I(K, {
					module : "rewardlist"
				})
			};
			var l = function(K) {
				var J = new I(K, {
					module : "rewardholder"
				})
			};
			return {
				userPanel : n,
				basicInfo : t,
				tiebaHonor : r,
				contentHolder : x,
				tiebaFeed : d,
				tiebaRelation : s,
				tiebaFriend : b,
				zhidaoProfile : G,
				zhidaoAnswerlist : v,
				spaceAlbum : f,
				spaceArticle : z,
				spaceRelation : h,
				spaceFriend : a,
				tipBar : A,
				rightNav : B,
				skinChange : g,
				timeline : i,
				timelineNav : p,
				summary : k,
				rewardList : u,
				rewardHolder : l,
				sendLogRequest : function(J) {
					var K = {
						pid : "320",
						type : "2011"
					};
					J = J || {};
					J.trackParams = P.extend(K, J.trackParams);
					D.sendRequest(J)
				}
			}
		});
F
		.module(
				"router_settings/router",
				function(f, s) {
					var j = f("base/genericmodel"), r = f("base/view"), o = f("content_holder/holdermodel"), d = f("content_holder/holderview"), g = f("setting_tieba/settingtiebamodel"), k = f("setting_tieba/settingtiebaview"), m = f("setting_privacy/settingprivacymodel"), b = f("setting_privacy/settingprivacyview"), p = f("setting_common_profile/model"), e = f("setting_common_profile/view"), h = f("userpanel/userpanelview"), q = f("bigpipe/bigpipe"), i, a, c, l, n;
					window.App = window.App || {};
					n = window.App;
					SettingPrivacy = {
						model : m,
						view : b
					}, SettingTieba = {
						model : g,
						view : k
					}, c = {
						model : j,
						view : h
					};
					l = {
						model : p,
						view : e
					};
					a = {
						models : {},
						views : {},
						types : {
							Userpanel : c,
							SettingPrivacy : SettingPrivacy,
							SettingTieba : SettingTieba,
							SettingProfile : l
						},
						onLoadingList : {},
						addModel : function(u, t) {
							if (t) {
								u.appendTo(t)
							}
							this.models[u.id] = u
						},
						addView : function(t) {
							this.views[t.model.id] = t
						},
						global : {},
						updateGlobal : function(t) {
							this.global = P.extend({}, t, this.global);
							this.dispatchEvent("update:global", {
								global : this.global
							})
						},
						updateLoginUserData : P.empty,
						createModule : function(B, y, t, E, I) {
							var G = true, v, C, u, D, E = E || "all", A, x, H, w;
							try {
								v = new this.types[B]["model"](t, this, I);
								C = new this.types[B]["view"](v, y, E);
								this.models[t] = v;
								this.views[t] = C;
								this.addModel(v);
								this.addView(C)
							} catch (z) {
								throw z;
								G = false
							}
							return G
						},
						pageLetArrive : function(C, v, A, z, w, x, D) {
							var B, y, u = this.models[C], t = this.views[C];
							if (this.createModule(A, z, w, x, D)) {
								y = this.models[w];
								B = this.views[w];
								t.setData(B, v);
								u.setData(y, x)
							}
						},
						postData : function(A, u) {
							var w = this.global.token, z = [], x = [], y = u.callback;
							switch (A) {
							case "setting-tieba":
								z.push("/p/sys/submit/privacy/tieba");
								x.push(P.extend({
									token : w
								}, u.postData));
								break;
							case "setting-privacy":
								z.push("/p/sys/submit/privacy/all");
								x.push(P.extend({
									token : w
								}, u.postData));
								break
							}
							for ( var v = 0, t = z.length; v < t; v++) {
								P.ajax.post(z[v], P.jsonToQuery(x[v]), y)
							}
						}
					};
					P.event(a);
					n.onPageletArrive = q;
					n.router = a;
					n.pageLetArrive = a.pageLetArrive.bind(a);
					return a
				});
F.use([ "router_settings/router", "content_holder/holdermodel",
		"content_holder/holderview" ], function(i, g, h) {
	var e = P.g("stthld"), c, d, f = P.g("banhld"), b, a;
	if (e) {
		c = new g("stthld", i);
		d = new h(c, e);
		i.addModel(c);
		i.addView(d)
	}
	if (f) {
		b = new g("banhld", i);
		a = new h(b, f);
		i.addModel(b);
		i.addView(a)
	}
});
F
		.module(
				"no_username/no_username",
				function(a, d) {
					var c = function() {
						if (App.router.global.isLoginUserNoName) {
							b();
							return false
						} else {
							return true
						}
					};
					var b = function() {
						var g = a("dialog/dialogmanager");
						var f = '<div><p class="nousername-tips">没有用户名，无法使用“我的主页”，先给自己起个名字吧!</p><div id="nousername"></div></div>';
						var h = function() {
						};
						var e = {
							btnConfirm : '<a href="/p/sys/redirect?nousername=1" class="dialog-ok" data-click="cancel">马上填写</a>',
							txtClass : "mod-nousername",
							cntClass : "cnt-long",
							cntAlignClass : "cnt-left",
							cnsClass : "dialog-console-none",
							nousername : true
						};
						g.alert(f, e);
						bdPass.api.fillinusername
								.init({
									outerDomId : "nousername",
									staticpage : "http://www.baidu.com/p/sys/fillusername/jump",
									u : window.location.href
								})
					};
					d.hasUsername = c
				});