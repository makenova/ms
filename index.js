/**
 * Helpers.
 */

var s = 1;
var ms = s * 0.001;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 10000) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 's').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n * ms;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(s) {
  if (s >= d) {
    return Math.round(s / d) + 'd';
  }
  if (s >= h) {
    return Math.round(s / h) + 'h';
  }
  if (s >= m) {
    return Math.round(s / m) + 'm';
  }
  return s + 's';
}

/**
 * Long format for `s`.
 *
 * @param {Number} s
 * @return {String}
 * @api private
 */

function fmtLong(s) {
  return (
    plural(s, d, 'day') ||
    plural(s, h, 'hour') ||
    plural(s, m, 'minute') ||
    plural(s, s, 'second')
  );
}

/**
 * Pluralization helper.
 */

function plural(s, n, name) {
  if (name === 'second') {
    return s > 1 ? s + ' seconds' : s + ' second';
  }

  if (s < n) {
    return;
  }

  if (s < n * 1.5) {
    return Math.floor(s / n) + ' ' + name;
  }
  return Math.ceil(s / n) + ' ' + name + 's';
}
