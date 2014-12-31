 /** 处理过长的字符串，截取并添加省略号
 * 注：半角长度为1，全角长度为2
 * 
 * pStr:字符串
 * pLen:截取长度
 * 
 * return: 截取后的字符串
 */
function autoAddEllipsis(pStr, pLen) {
	var _ret = cutString(pStr, pLen);
	var _cutFlag = _ret.cutflag;
	var _cutStringn = _ret.cutstring;
	if ("1" == _cutFlag) {
		return _cutStringn;;
	} else {
		return _cutStringn;
	}
}
/*
 *  * 取得指定长度的字符串
 * 注：半角长度为1，全角长度为2
 * 
 * pStr:字符串
 * pLen:截取长度
 * 
 * return: 截取后的字符串
 */
function cutString(pStr, pLen) {

	// 原字符串长度
	var _strLen = pStr.length;

	var _tmpCode;

	var _cutString;

	// 默认情况下，返回的字符串是原字符串的一部分
	var _cutFlag = "1";

	var _lenCount = 0;

	var _ret = false;

	if (_strLen <= pLen / 2) {
		_cutString = pStr;
		_ret = true;
	}

	if (!_ret) {
		for ( var i = 0; i < _strLen; i++) {
			if (isFull(pStr.charAt(i))) {
				_lenCount += 2;
			} else {
				_lenCount += 1;
			}

			if (_lenCount > pLen) {
				_cutString = pStr.substring(0, i);
				_ret = true;
				break;
			} else if (_lenCount == pLen) {
				_cutString = pStr.substring(0, i + 1);
				_ret = true;
				break;
			}
		}
	}

	if (!_ret) {
		_cutString = pStr;
		_ret = true;
	}

	if (_cutString.length == _strLen) {
		_cutFlag = "0";
	}

	return {
		"cutstring" : _cutString,
		"cutflag" : _cutFlag
	};
}

/**
 * 计算字符串的字节数
 * 
 * @param {Object}
 *            str
 */
function getByteLen(str) {
	var l = str.length;
	var n = l;
	for ( var i = 0; i < l; i++) {
		if (str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255) {
			n++;
		}
	}
	return n;
}

/*
 * 判断是否为全角
 * 
 * pChar:长度为1的字符串
 * return: tbtrue:全角
 *          false:半角
 */
function isFull(pChar) {
	for ( var i = 0; i < pChar.strLen; i++) {
		if ((pChar.charCodeAt(i) > 128)) {
			return true;
		} else {
			return false;
		}
	}
}