/* eslint-disable */

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldPrefixWithOne = shouldPrefixWithOne;
exports.shouldHyphenate = shouldHyphenate;
/**
 * Checks if a certain number should be prefixed by a one.
 * i.e. "100" should be written as "one hundred" while
 *      "10" should not be written as "one ten".
 *
 * Examples:
 * _shouldPrefixWithOne(10); // returns False
 * _shouldPrefixWithOne(100); // returns True
 *
 * @param {number] n placeholder to check
 * @returns {boolean}
 */
function shouldPrefixWithOne(n) {
  return n >= 100;
}
/**
 * Checks if a certain number should be joined with hyphens
 * e.g. "ninety-nine" versus "one hundred one"
 *
 * Examples:
 * _shouldHyphenate(10); // returns False
 * _shouldHyphenate(21); // returns True
 *
 * @param {number] n placeholder to check
 * @returns {boolean}
 */
function shouldHyphenate(n) {
  return n >= 20 && n <= 99;
}});

unwrapExports(util);
util.shouldPrefixWithOne;
util.shouldHyphenate;

var numbers_1$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbers = [{ number: 1000000000000, text: 'trillion' }, { number: 1000000000, text: 'billion' }, { number: 1000000, text: 'million' }, { number: 1000, text: 'thousand' }, { number: 100, text: 'hundred' }, { number: 90, text: 'ninety' }, { number: 80, text: 'eighty' }, { number: 70, text: 'seventy' }, { number: 60, text: 'sixty' }, { number: 50, text: 'fifty' }, { number: 40, text: 'forty' }, { number: 30, text: 'thirty' }, { number: 20, text: 'twenty' }, { number: 19, text: 'nineteen' }, { number: 18, text: 'eighteen' }, { number: 17, text: 'seventeen' }, { number: 16, text: 'sixteen' }, { number: 15, text: 'fifteen' }, { number: 14, text: 'fourteen' }, { number: 13, text: 'thirteen' }, { number: 12, text: 'twelve' }, { number: 11, text: 'eleven' }, { number: 10, text: 'ten' }, { number: 9, text: 'nine' }, { number: 8, text: 'eight' }, { number: 7, text: 'seven' }, { number: 6, text: 'six' }, { number: 5, text: 'five' }, { number: 4, text: 'four' }, { number: 3, text: 'three' }, { number: 2, text: 'two' }, { number: 1, text: 'one' }, { number: 0, text: 'zero' }];
});

unwrapExports(numbers_1$1);
numbers_1$1.numbers;

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numToWords = numToWords;





/**
 * Converts a number into the corresponding series of english words
 *
 * Examples:
 *  numToWords(0);    // returns 'zero'
 *  numToWords(10001);  // returns 'ten thousand one'
 *  numToWords(111);  // returns 'one hundred eleven'
 *
 * @param {number} numToConvert
 * @returns {string}
 */
/**
 * This is library provides a method for converting arbitrary integers into english text.
 * For example, it would convert the number '123456' to 'one hundred twenty-three thousand four hundred fifty-six'
 *
 * All positive and negative integers are supported. Floating point numbers are rounded to integers
 * before being converted to words.
 *
 *
 * Examples:
 *   numToWords(0);    // returns 'zero'
 *   numToWords(10001);  // returns 'ten thousand one'
 *   numToWords(111);  // returns 'one hundred eleven'
 *   numToWords(-77);  // returns 'negative seventy-seven'
 *
 * @author Clinton Morrison <contact@clintonmorrison.com>
 */
function numToWords(numToConvert) {
  var words = '';
  var prefixNum = void 0;
  var remainder = void 0;
  var closestSmallerNumber = void 0;
  var closestSmallerNumberText = void 0;

  numToConvert = parseInt(numToConvert, 10);

  if (isNaN(numToConvert)) {
    return 'not a number';
  }

  if (!isFinite(numToConvert)) {
    return 'infinity';
  }

  if (numToConvert < 0) {
    words += 'negative ';
    numToConvert *= -1;
  }

  // Search list of numbers for closest smaller number.
  // numToConvert will be written in terms of this number.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = numbers_1$1.numbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          number = _step$value.number,
          text = _step$value.text;

      if (numToConvert === number) {
        if ((0, util.shouldPrefixWithOne)(number)) {
          words += 'one ';
        }
        words += text;
        return words;
      }

      if (numToConvert > number) {
        closestSmallerNumber = number;
        closestSmallerNumberText = text;
        break;
      }
    }

    // How many 'closestSmallerNumber's can numToConvert be grouped into?
    // e.g. five 'thousand'.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  prefixNum = Math.floor(numToConvert / closestSmallerNumber);
  if (prefixNum !== 1 || (0, util.shouldPrefixWithOne)(closestSmallerNumber)) {
    words += numToWords(prefixNum) + ' ';
  }

  words += closestSmallerNumberText;

  remainder = numToConvert - prefixNum * closestSmallerNumber;
  if (remainder > 0 && (0, util.shouldHyphenate)(closestSmallerNumber)) {
    words += '-';
  } else {
    words += ' ';
  }

  if (remainder > 0) {
    words += numToWords(remainder);
  }

  return words.trim();
}
exports.default = numToWords;
});

unwrapExports(lib);
lib.numToWords;

var bignumber = createCommonjsModule(function (module) {
(function (globalObj) {

    /*
      bignumber.js v4.1.0
      A JavaScript library for arbitrary-precision arithmetic.
      https://github.com/MikeMcl/bignumber.js
      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */


    var BigNumber,
        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        mathceil = Math.ceil,
        mathfloor = Math.floor,
        notBool = ' not a boolean or binary digit',
        roundingMode = 'rounding mode',
        tooManyDigits = 'number type has more than 15 significant digits',
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        BASE = 1e14,
        LOG_BASE = 14,
        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        SQRT_BASE = 1e7,

        /*
         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
         * exception is thrown (if ERRORS is true).
         */
        MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function constructorFactory(config) {
        var div, parseNumeric,

            // id tracks the caller function, so its name can be included in error messages.
            id = 0,
            P = BigNumber.prototype,
            ONE = new BigNumber(1),


            /********************************* EDITABLE DEFAULTS **********************************/


            /*
             * The default values below must be integers within the inclusive ranges stated.
             * The values can also be changed at run-time using BigNumber.config.
             */

            // The maximum number of decimal places for operations involving division.
            DECIMAL_PLACES = 20,                     // 0 to MAX

            /*
             * The rounding mode used when rounding to the above decimal places, and when using
             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
             * UP         0 Away from zero.
             * DOWN       1 Towards zero.
             * CEIL       2 Towards +Infinity.
             * FLOOR      3 Towards -Infinity.
             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
             */
            ROUNDING_MODE = 4,                       // 0 to 8

            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

            // The exponent value at and beneath which toString returns exponential notation.
            // Number type: -7
            TO_EXP_NEG = -7,                         // 0 to -MAX

            // The exponent value at and above which toString returns exponential notation.
            // Number type: 21
            TO_EXP_POS = 21,                         // 0 to MAX

            // RANGE : [MIN_EXP, MAX_EXP]

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            MIN_EXP = -1e7,                          // -1 to -MAX

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
            MAX_EXP = 1e7,                           // 1 to MAX

            // Whether BigNumber Errors are ever thrown.
            ERRORS = true,                           // true or false

            // Change to intValidatorNoErrors if ERRORS is false.
            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

            // Whether to use cryptographically-secure random number generation, if available.
            CRYPTO = false,                          // true or false

            /*
             * The modulo mode used when calculating the modulus: a mod n.
             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             * The remainder (r) is calculated as: r = a - n * q.
             *
             * UP        0 The remainder is positive if the dividend is negative, else is negative.
             * DOWN      1 The remainder has the same sign as the dividend.
             *             This modulo mode is commonly known as 'truncated division' and is
             *             equivalent to (a % n) in JavaScript.
             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
             *             The remainder is always positive.
             *
             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
             * modes are commonly used for the modulus operation.
             * Although the other rounding modes can also be used, they may not give useful results.
             */
            MODULO_MODE = 1,                         // 0 to 9

            // The maximum number of significant digits of the result of the toPower operation.
            // If POW_PRECISION is 0, there will be unlimited significant digits.
            POW_PRECISION = 0,                       // 0 to MAX

            // The format specification used by the BigNumber.prototype.toFormat method.
            FORMAT = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',      // non-breaking space
                fractionGroupSize: 0
            };


        /******************************************************************************************/


        // CONSTRUCTOR


        /*
         * The BigNumber constructor and exported function.
         * Create and return a new instance of a BigNumber object.
         *
         * n {number|string|BigNumber} A numeric value.
         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
         */
        function BigNumber( n, b ) {
            var c, e, i, num, len, str,
                x = this;

            // Enable constructor usage without new.
            if ( !( x instanceof BigNumber ) ) {

                // 'BigNumber() constructor call without new: {n}'
                if (ERRORS) raise( 26, 'constructor call without new', n );
                return new BigNumber( n, b );
            }

            // 'new BigNumber() base not an integer: {b}'
            // 'new BigNumber() base out of range: {b}'
            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                // Duplicate.
                if ( n instanceof BigNumber ) {
                    x.s = n.s;
                    x.e = n.e;
                    x.c = ( n = n.c ) ? n.slice() : n;
                    id = 0;
                    return;
                }

                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                    // Fast path for integers.
                    if ( n === ~~n ) {
                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                        x.e = e;
                        x.c = [n];
                        id = 0;
                        return;
                    }

                    str = n + '';
                } else {
                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }
            } else {
                b = b | 0;
                str = n + '';

                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                // Allow exponential notation to be used with base 10 argument.
                if ( b == 10 ) {
                    x = new BigNumber( n instanceof BigNumber ? n : str );
                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                }

                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                // Any number in exponential form will fail due to the [Ee][+-].
                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                    return parseNumeric( x, str, num, b );
                }

                if (num) {
                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
                        raise( id, tooManyDigits, n );
                    }

                    // Prevent later check for length on converted number.
                    num = false;
                } else {
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }

                str = convertBase( str, 10, b, x.s );
            }

            // Decimal point?
            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

            // Exponential form?
            if ( ( i = str.search( /e/i ) ) > 0 ) {

                // Determine exponent.
                if ( e < 0 ) e = i;
                e += +str.slice( i + 1 );
                str = str.substring( 0, i );
            } else if ( e < 0 ) {

                // Integer.
                e = str.length;
            }

            // Determine leading zeros.
            for ( i = 0; str.charCodeAt(i) === 48; i++ );

            // Determine trailing zeros.
            for ( len = str.length; str.charCodeAt(--len) === 48; );
            str = str.slice( i, len + 1 );

            if (str) {
                len = str.length;

                // Disallow numbers with over 15 significant digits if number type.
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                    raise( id, tooManyDigits, x.s * n );
                }

                e = e - i - 1;

                 // Overflow?
                if ( e > MAX_EXP ) {

                    // Infinity.
                    x.c = x.e = null;

                // Underflow?
                } else if ( e < MIN_EXP ) {

                    // Zero.
                    x.c = [ x.e = 0 ];
                } else {
                    x.e = e;
                    x.c = [];

                    // Transform base

                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = ( e + 1 ) % LOG_BASE;
                    if ( e < 0 ) i += LOG_BASE;

                    if ( i < len ) {
                        if (i) x.c.push( +str.slice( 0, i ) );

                        for ( len -= LOG_BASE; i < len; ) {
                            x.c.push( +str.slice( i, i += LOG_BASE ) );
                        }

                        str = str.slice(i);
                        i = LOG_BASE - str.length;
                    } else {
                        i -= len;
                    }

                    for ( ; i--; str += '0' );
                    x.c.push( +str );
                }
            } else {

                // Zero.
                x.c = [ x.e = 0 ];
            }

            id = 0;
        }


        // CONSTRUCTOR PROPERTIES


        BigNumber.another = constructorFactory;

        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;


        /*
         * Configure infrequently-changing library-wide settings.
         *
         * Accept an object or an argument list, with one or many of the following properties or
         * parameters respectively:
         *
         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
         *   ERRORS          {boolean|number}   true, false, 1 or 0
         *   CRYPTO          {boolean|number}   true, false, 1 or 0
         *   MODULO_MODE     {number}           0 to 9 inclusive
         *   POW_PRECISION   {number}           0 to MAX inclusive
         *   FORMAT          {object}           See BigNumber.prototype.toFormat
         *      decimalSeparator       {string}
         *      groupSeparator         {string}
         *      groupSize              {number}
         *      secondaryGroupSize     {number}
         *      fractionGroupSeparator {string}
         *      fractionGroupSize      {number}
         *
         * (The values assigned to the above FORMAT object properties are not checked for validity.)
         *
         * E.g.
         * BigNumber.config(20, 4) is equivalent to
         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
         *
         * Ignore properties/parameters set to null or undefined.
         * Return an object with the properties current values.
         */
        BigNumber.config = BigNumber.set = function () {
            var v, p,
                i = 0,
                r = {},
                a = arguments,
                o = a[0],
                has = o && typeof o == 'object'
                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                DECIMAL_PLACES = v | 0;
            }
            r[p] = DECIMAL_PLACES;

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                ROUNDING_MODE = v | 0;
            }
            r[p] = ROUNDING_MODE;

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // 'config() EXPONENTIAL_AT not an integer: {v}'
            // 'config() EXPONENTIAL_AT out of range: {v}'
            if ( has( p = 'EXPONENTIAL_AT' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                        TO_EXP_NEG = v[0] | 0;
                        TO_EXP_POS = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                }
            }
            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // 'config() RANGE not an integer: {v}'
            // 'config() RANGE cannot be zero: {v}'
            // 'config() RANGE out of range: {v}'
            if ( has( p = 'RANGE' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                        MIN_EXP = v[0] | 0;
                        MAX_EXP = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                }
            }
            r[p] = [ MIN_EXP, MAX_EXP ];

            // ERRORS {boolean|number} true, false, 1 or 0.
            // 'config() ERRORS not a boolean or binary digit: {v}'
            if ( has( p = 'ERRORS' ) ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    id = 0;
                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = ERRORS;

            // CRYPTO {boolean|number} true, false, 1 or 0.
            // 'config() CRYPTO not a boolean or binary digit: {v}'
            // 'config() crypto unavailable: {crypto}'
            if ( has( p = 'CRYPTO' ) ) {

                if ( v === true || v === false || v === 1 || v === 0 ) {
                    if (v) {
                        v = typeof crypto == 'undefined';
                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            CRYPTO = true;
                        } else if (ERRORS) {
                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                        } else {
                            CRYPTO = false;
                        }
                    } else {
                        CRYPTO = false;
                    }
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = CRYPTO;

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // 'config() MODULO_MODE not an integer: {v}'
            // 'config() MODULO_MODE out of range: {v}'
            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                MODULO_MODE = v | 0;
            }
            r[p] = MODULO_MODE;

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // 'config() POW_PRECISION not an integer: {v}'
            // 'config() POW_PRECISION out of range: {v}'
            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                POW_PRECISION = v | 0;
            }
            r[p] = POW_PRECISION;

            // FORMAT {object}
            // 'config() FORMAT not an object: {v}'
            if ( has( p = 'FORMAT' ) ) {

                if ( typeof v == 'object' ) {
                    FORMAT = v;
                } else if (ERRORS) {
                    raise( 2, p + ' not an object', v );
                }
            }
            r[p] = FORMAT;

            return r;
        };


        /*
         * Return a new BigNumber whose value is the maximum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


        /*
         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
         * zeros are produced).
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         *
         * 'random() decimal places not an integer: {dp}'
         * 'random() decimal places out of range: {dp}'
         * 'random() crypto unavailable: {crypto}'
         */
        BigNumber.random = (function () {
            var pow2_53 = 0x20000000000000;

            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
              ? function () { return mathfloor( Math.random() * pow2_53 ); }
              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                  (Math.random() * 0x800000 | 0); };

            return function (dp) {
                var a, b, e, k, v,
                    i = 0,
                    c = [],
                    rand = new BigNumber(ONE);

                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                k = mathceil( dp / LOG_BASE );

                if (CRYPTO) {

                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {

                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                        for ( ; i < k; ) {

                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if ( v >= 9e15 ) {
                                b = crypto.getRandomValues( new Uint32Array(2) );
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {

                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 2;
                            }
                        }
                        i = k / 2;

                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {

                        // buffer
                        a = crypto.randomBytes( k *= 7 );

                        for ( ; i < k; ) {

                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                            if ( v >= 9e15 ) {
                                crypto.randomBytes(7).copy( a, i );
                            } else {

                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                    }
                }

                // Use Math.random.
                if (!CRYPTO) {

                    for ( ; i < k; ) {
                        v = random53bitInt();
                        if ( v < 9e15 ) c[i++] = v % 1e14;
                    }
                }

                k = c[--i];
                dp %= LOG_BASE;

                // Convert trailing digits to zeros according to dp.
                if ( k && dp ) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor( k / v ) * v;
                }

                // Remove trailing elements which are zero.
                for ( ; c[i] === 0; c.pop(), i-- );

                // Zero?
                if ( i < 0 ) {
                    c = [ e = 0 ];
                } else {

                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

                    // Count the digits of the first element of c to determine leading zeros, and...
                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                    // adjust the exponent accordingly.
                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
                }

                rand.e = e;
                rand.c = c;
                return rand;
            };
        })();


        // PRIVATE FUNCTIONS


        // Convert a numeric string of baseIn to a numeric string of baseOut.
        function convertBase( str, baseOut, baseIn, sign ) {
            var d, e, k, r, x, xc, y,
                i = str.indexOf( '.' ),
                dp = DECIMAL_PLACES,
                rm = ROUNDING_MODE;

            if ( baseIn < 37 ) str = str.toLowerCase();

            // Non-integer.
            if ( i >= 0 ) {
                k = POW_PRECISION;

                // Unlimited precision.
                POW_PRECISION = 0;
                str = str.replace( '.', '' );
                y = new BigNumber(baseIn);
                x = y.pow( str.length - i );
                POW_PRECISION = k;

                // Convert str as if an integer, then restore the fraction part by dividing the
                // result by its base raised to a power.
                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                y.e = y.c.length;
            }

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );
            e = k = xc.length;

            // Remove trailing zeros.
            for ( ; xc[--k] == 0; xc.pop() );
            if ( !xc[0] ) return '0';

            if ( i < 0 ) {
                --e;
            } else {
                x.c = xc;
                x.e = e;

                // sign is needed for correct rounding.
                x.s = sign;
                x = div( x, y, dp, rm, baseOut );
                xc = x.c;
                r = x.r;
                e = x.e;
            }

            d = e + dp + 1;

            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;

            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                         rm == ( x.s < 0 ? 8 : 7 ) );

            if ( d < 1 || !xc[0] ) {

                // 1^-dp or 0.
                str = r ? toFixedPoint( '1', -dp ) : '0';
            } else {
                xc.length = d;

                if (r) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for ( --baseOut; ++xc[--d] > baseOut; ) {
                        xc[d] = 0;

                        if ( !d ) {
                            ++e;
                            xc = [1].concat(xc);
                        }
                    }
                }

                // Determine trailing zeros.
                for ( k = xc.length; !xc[--k]; );

                // E.g. [4, 11, 15] becomes 4bf.
                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                str = toFixedPoint( str, e );
            }

            // The caller will add the sign.
            return str;
        }


        // Perform division in the specified base. Called by div and convertBase.
        div = (function () {

            // Assume non-zero x and k.
            function multiply( x, k, base ) {
                var m, temp, xlo, xhi,
                    carry = 0,
                    i = x.length,
                    klo = k % SQRT_BASE,
                    khi = k / SQRT_BASE | 0;

                for ( x = x.slice(); i--; ) {
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                    x[i] = temp % base;
                }

                if (carry) x = [carry].concat(x);

                return x;
            }

            function compare( a, b, aL, bL ) {
                var i, cmp;

                if ( aL != bL ) {
                    cmp = aL > bL ? 1 : -1;
                } else {

                    for ( i = cmp = 0; i < aL; i++ ) {

                        if ( a[i] != b[i] ) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }

            function subtract( a, b, aL, base ) {
                var i = 0;

                // Subtract b from a.
                for ( ; aL--; ) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }

                // Remove leading zeros.
                for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
            }

            // x: dividend, y: divisor.
            return function ( x, y, dp, rm, base ) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                    yL, yz,
                    s = x.s == y.s ? 1 : -1,
                    xc = x.c,
                    yc = y.c;

                // Either NaN, Infinity or 0?
                if ( !xc || !xc[0] || !yc || !yc[0] ) {

                    return new BigNumber(

                      // Return NaN if either NaN, or both Infinity or 0.
                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                    );
                }

                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;

                if ( !base ) {
                    base = BASE;
                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                    s = s / LOG_BASE | 0;
                }

                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                if ( yc[i] > ( xc[i] || 0 ) ) e--;

                if ( s < 0 ) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;

                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

                    n = mathfloor( base / ( yc[0] + 1 ) );

                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                    if ( n > 1 ) {
                        yc = multiply( yc, n, base );
                        xc = multiply( xc, n, base );
                        yL = yc.length;
                        xL = xc.length;
                    }

                    xi = yL;
                    rem = xc.slice( 0, yL );
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    for ( ; remL < yL; rem[remL++] = 0 );
                    yz = yc.slice();
                    yz = [0].concat(yz);
                    yc0 = yc[0];
                    if ( yc[1] >= base / 2 ) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                    do {
                        n = 0;

                        // Compare divisor and remainder.
                        cmp = compare( yc, rem, yL, remL );

                        // If divisor < remainder.
                        if ( cmp < 0 ) {

                            // Calculate trial digit, n.

                            rem0 = rem[0];
                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor( rem0 / yc0 );

                            //  Algorithm:
                            //  1. product = divisor * trial digit (n)
                            //  2. if product > remainder: product -= divisor, n--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, n++

                            if ( n > 1 ) {

                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;

                                // product = divisor * trial digit.
                                prod = multiply( yc, n, base );
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                // If product > remainder.
                                // Trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                    n--;

                                    // Subtract divisor from product.
                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {

                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if ( n == 0 ) {

                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }

                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }

                            if ( prodL < remL ) prod = [0].concat(prod);

                            // Subtract product from remainder.
                            subtract( rem, prod, remL, base );
                            remL = rem.length;

                             // If product was < remainder.
                            if ( cmp == -1 ) {

                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while ( compare( yc, rem, yL, remL ) < 1 ) {
                                    n++;

                                    // Subtract divisor from remainder.
                                    subtract( rem, yL < remL ? yz : yc, remL, base );
                                    remL = rem.length;
                                }
                            }
                        } else if ( cmp === 0 ) {
                            n++;
                            rem = [0];
                        } // else cmp === 1 and n will be 0

                        // Add the next digit, n, to the result array.
                        qc[i++] = n;

                        // Update the remainder.
                        if ( rem[0] ) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [ xc[xi] ];
                            remL = 1;
                        }
                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                    more = rem[0] != null;

                    // Leading zero?
                    if ( !qc[0] ) qc.splice(0, 1);
                }

                if ( base == BASE ) {

                    // To calculate q.e, first get the number of digits of qc[0].
                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }

                return q;
            };
        })();


        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */
        function format( n, i, rm, caller ) {
            var c0, e, ne, len, str;

            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
              ? rm | 0 : ROUNDING_MODE;

            if ( !n.c ) return n.toString();
            c0 = n.c[0];
            ne = n.e;

            if ( i == null ) {
                str = coeffToString( n.c );
                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                  ? toExponential( str, ne )
                  : toFixedPoint( str, ne );
            } else {
                n = round( new BigNumber(n), i, rm );

                // n.e may have changed if the value was rounded up.
                e = n.e;

                str = coeffToString( n.c );
                len = str.length;

                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.

                // Exponential notation.
                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                    // Append zeros?
                    for ( ; len < i; str += '0', len++ );
                    str = toExponential( str, e );

                // Fixed-point notation.
                } else {
                    i -= ne;
                    str = toFixedPoint( str, e );

                    // Append zeros?
                    if ( e + 1 > len ) {
                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                    } else {
                        i += e - len;
                        if ( i > 0 ) {
                            if ( e + 1 == len ) str += '.';
                            for ( ; i--; str += '0' );
                        }
                    }
                }
            }

            return n.s < 0 && c0 ? '-' + str : str;
        }


        // Handle BigNumber.max and BigNumber.min.
        function maxOrMin( args, method ) {
            var m, n,
                i = 0;

            if ( isArray( args[0] ) ) args = args[0];
            m = new BigNumber( args[0] );

            for ( ; ++i < args.length; ) {
                n = new BigNumber( args[i] );

                // If any number is NaN, return NaN.
                if ( !n.s ) {
                    m = n;
                    break;
                } else if ( method.call( m, n ) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */
        function intValidatorWithErrors( n, min, max, caller, name ) {
            if ( n < min || n > max || n != truncate(n) ) {
                raise( caller, ( name || 'decimal places' ) +
                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
            }

            return true;
        }


        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */
        function normalise( n, c, e ) {
            var i = 1,
                j = c.length;

             // Remove trailing zeros.
            for ( ; !c[--j]; c.pop() );

            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for ( j = c[0]; j >= 10; j /= 10, i++ );

            // Overflow?
            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                // Infinity.
                n.c = n.e = null;

            // Underflow?
            } else if ( e < MIN_EXP ) {

                // Zero.
                n.c = [ n.e = 0 ];
            } else {
                n.e = e;
                n.c = c;
            }

            return n;
        }


        // Handle values that fail the validity test in BigNumber.
        parseNumeric = (function () {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                dotAfter = /^([^.]+)\.$/,
                dotBefore = /^\.([^.]+)$/,
                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

            return function ( x, str, num, b ) {
                var base,
                    s = num ? str : str.replace( whitespaceOrPlus, '' );

                // No exception on ±Infinity or NaN.
                if ( isInfinityOrNaN.test(s) ) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if ( !num ) {

                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });

                        if (b) {
                            base = b;

                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                        }

                        if ( str != s ) return new BigNumber( s, base );
                    }

                    // 'new BigNumber() not a number: {n}'
                    // 'new BigNumber() not a base {b} number: {n}'
                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                    x.s = null;
                }

                x.c = x.e = null;
                id = 0;
            }
        })();


        // Throw a BigNumber Error.
        function raise( caller, msg, val ) {
            var error = new Error( [
                'new BigNumber',     // 0
                'cmp',               // 1
                'config',            // 2
                'div',               // 3
                'divToInt',          // 4
                'eq',                // 5
                'gt',                // 6
                'gte',               // 7
                'lt',                // 8
                'lte',               // 9
                'minus',             // 10
                'mod',               // 11
                'plus',              // 12
                'precision',         // 13
                'random',            // 14
                'round',             // 15
                'shift',             // 16
                'times',             // 17
                'toDigits',          // 18
                'toExponential',     // 19
                'toFixed',           // 20
                'toFormat',          // 21
                'toFraction',        // 22
                'pow',               // 23
                'toPrecision',       // 24
                'toString',          // 25
                'BigNumber'          // 26
            ][caller] + '() ' + msg + ': ' + val );

            error.name = 'BigNumber Error';
            id = 0;
            throw error;
        }


        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */
        function round( x, sd, rm, r ) {
            var d, i, j, k, n, ni, rd,
                xc = x.c,
                pows10 = POWS_TEN;

            // if x is not Infinity or NaN...
            if (xc) {

                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {

                    // Get the number of digits of the first element of xc.
                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                    i = sd - d;

                    // If the rounding digit is in the first element of xc...
                    if ( i < 0 ) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ ni = 0 ];

                        // Get the rounding digit at index j of n.
                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
                    } else {
                        ni = mathceil( ( i + 1 ) / LOG_BASE );

                        if ( ni >= xc.length ) {

                            if (r) {

                                // Needed by sqrt.
                                for ( ; xc.length <= ni; xc.push(0) );
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];

                            // Get the number of digits of n.
                            for ( d = 1; k >= 10; k /= 10, d++ );

                            // Get the index of rd within n.
                            i %= LOG_BASE;

                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;

                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                        }
                    }

                    r = r || sd < 0 ||

                    // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                    r = rm < 4
                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                          rm == ( x.s < 0 ? 8 : 7 ) );

                    if ( sd < 1 || !xc[0] ) {
                        xc.length = 0;

                        if (r) {

                            // Convert sd to decimal places.
                            sd -= x.e + 1;

                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                            x.e = -sd || 0;
                        } else {

                            // Zero.
                            xc[0] = x.e = 0;
                        }

                        return x;
                    }

                    // Remove excess digits.
                    if ( i == 0 ) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[ LOG_BASE - i ];

                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                    }

                    // Round up?
                    if (r) {

                        for ( ; ; ) {

                            // If the digit to be rounded up is in the first element of xc...
                            if ( ni == 0 ) {

                                // i will be the length of xc[0] before k is added.
                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                j = xc[0] += k;
                                for ( k = 1; j >= 10; j /= 10, k++ );

                                // if i != k the length has increased.
                                if ( i != k ) {
                                    x.e++;
                                    if ( xc[0] == BASE ) xc[0] = 1;
                                }

                                break;
                            } else {
                                xc[ni] += k;
                                if ( xc[ni] != BASE ) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }

                    // Remove trailing zeros.
                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
                }

                // Overflow? Infinity.
                if ( x.e > MAX_EXP ) {
                    x.c = x.e = null;

                // Underflow? Zero.
                } else if ( x.e < MIN_EXP ) {
                    x.c = [ x.e = 0 ];
                }
            }

            return x;
        }


        // PROTOTYPE/INSTANCE METHODS


        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */
        P.absoluteValue = P.abs = function () {
            var x = new BigNumber(this);
            if ( x.s < 0 ) x.s = 1;
            return x;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */
        P.ceil = function () {
            return round( new BigNumber(this), this.e + 1, 2 );
        };


        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */
        P.comparedTo = P.cmp = function ( y, b ) {
            id = 1;
            return compare( this, new BigNumber( y, b ) );
        };


        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */
        P.decimalPlaces = P.dp = function () {
            var n, v,
                c = this.c;

            if ( !c ) return null;
            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

            // Subtract the number of trailing zeros of the last number.
            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
            if ( n < 0 ) n = 0;

            return n;
        };


        /*
         *  n / 0 = I
         *  n / N = N
         *  n / I = 0
         *  0 / n = 0
         *  0 / 0 = N
         *  0 / N = N
         *  0 / I = 0
         *  N / n = N
         *  N / 0 = N
         *  N / N = N
         *  N / I = N
         *  I / n = I
         *  I / 0 = I
         *  I / N = N
         *  I / I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.dividedBy = P.div = function ( y, b ) {
            id = 3;
            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
        };


        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */
        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
            id = 4;
            return div( this, new BigNumber( y, b ), 0, 1 );
        };


        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.equals = P.eq = function ( y, b ) {
            id = 5;
            return compare( this, new BigNumber( y, b ) ) === 0;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */
        P.floor = function () {
            return round( new BigNumber(this), this.e + 1, 3 );
        };


        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.greaterThan = P.gt = function ( y, b ) {
            id = 6;
            return compare( this, new BigNumber( y, b ) ) > 0;
        };


        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
            id = 7;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

        };


        /*
         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
         */
        P.isFinite = function () {
            return !!this.c;
        };


        /*
         * Return true if the value of this BigNumber is an integer, otherwise return false.
         */
        P.isInteger = P.isInt = function () {
            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
        };


        /*
         * Return true if the value of this BigNumber is NaN, otherwise returns false.
         */
        P.isNaN = function () {
            return !this.s;
        };


        /*
         * Return true if the value of this BigNumber is negative, otherwise returns false.
         */
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };


        /*
         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
         */
        P.isZero = function () {
            return !!this.c && this.c[0] == 0;
        };


        /*
         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.lessThan = P.lt = function ( y, b ) {
            id = 8;
            return compare( this, new BigNumber( y, b ) ) < 0;
        };


        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
            id = 9;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
        };


        /*
         *  n - 0 = n
         *  n - N = N
         *  n - I = -I
         *  0 - n = -n
         *  0 - 0 = 0
         *  0 - N = N
         *  0 - I = -I
         *  N - n = N
         *  N - 0 = N
         *  N - N = N
         *  N - I = N
         *  I - n = I
         *  I - 0 = I
         *  I - N = N
         *  I - I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
         * BigNumber(y, b).
         */
        P.minus = P.sub = function ( y, b ) {
            var i, j, t, xLTy,
                x = this,
                a = x.s;

            id = 10;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
            if ( a != b ) {
                y.s = -b;
                return x.plus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Either Infinity?
                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                // Either zero?
                if ( !xc[0] || !yc[0] ) {

                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                      ROUNDING_MODE == 3 ? -0 : 0 );
                }
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Determine which is the bigger number.
            if ( a = xe - ye ) {

                if ( xLTy = a < 0 ) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }

                t.reverse();

                // Prepend zeros to equalise exponents.
                for ( b = a; b--; t.push(0) );
                t.reverse();
            } else {

                // Exponents equal. Check digit by digit.
                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                for ( a = b = 0; b < j; b++ ) {

                    if ( xc[b] != yc[b] ) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }

            // x < y? Point xc to the array of the bigger number.
            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

            b = ( j = yc.length ) - ( i = xc.length );

            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
            b = BASE - 1;

            // Subtract yc from xc.
            for ( ; j > a; ) {

                if ( xc[--j] < yc[j] ) {
                    for ( i = j; i && !xc[--i]; xc[i] = b );
                    --xc[i];
                    xc[j] += BASE;
                }

                xc[j] -= yc[j];
            }

            // Remove leading zeros and adjust exponent accordingly.
            for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

            // Zero?
            if ( !xc[0] ) {

                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [ y.e = 0 ];
                return y;
            }

            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise( y, xc, ye );
        };


        /*
         *   n % 0 =  N
         *   n % N =  N
         *   n % I =  n
         *   0 % n =  0
         *  -0 % n = -0
         *   0 % 0 =  N
         *   0 % N =  N
         *   0 % I =  0
         *   N % n =  N
         *   N % 0 =  N
         *   N % N =  N
         *   N % I =  N
         *   I % n =  N
         *   I % 0 =  N
         *   I % N =  N
         *   I % I =  N
         *
         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
         */
        P.modulo = P.mod = function ( y, b ) {
            var q, s,
                x = this;

            id = 11;
            y = new BigNumber( y, b );

            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if ( !x.c || !y.s || y.c && !y.c[0] ) {
                return new BigNumber(NaN);

            // Return x if y is Infinity or x is zero.
            } else if ( !y.c || x.c && !x.c[0] ) {
                return new BigNumber(x);
            }

            if ( MODULO_MODE == 9 ) {

                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div( x, y, 0, 3 );
                y.s = s;
                q.s *= s;
            } else {
                q = div( x, y, 0, MODULO_MODE );
            }

            return x.minus( q.times(y) );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber negated,
         * i.e. multiplied by -1.
         */
        P.negated = P.neg = function () {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };


        /*
         *  n + 0 = n
         *  n + N = N
         *  n + I = I
         *  0 + n = n
         *  0 + 0 = 0
         *  0 + N = N
         *  0 + I = I
         *  N + n = N
         *  N + 0 = N
         *  N + N = N
         *  N + I = N
         *  I + n = I
         *  I + 0 = I
         *  I + N = N
         *  I + I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
         * BigNumber(y, b).
         */
        P.plus = P.add = function ( y, b ) {
            var t,
                x = this,
                a = x.s;

            id = 12;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
             if ( a != b ) {
                y.s = -b;
                return x.minus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Return ±Infinity if either ±Infinity.
                if ( !xc || !yc ) return new BigNumber( a / 0 );

                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if ( a = xe - ye ) {
                if ( a > 0 ) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }

                t.reverse();
                for ( ; a--; t.push(0) );
                t.reverse();
            }

            a = xc.length;
            b = yc.length;

            // Point xc to the longer array, and b to the shorter length.
            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for ( a = 0; b; ) {
                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }

            if (a) {
                xc = [a].concat(xc);
                ++ye;
            }

            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise( y, xc, ye );
        };


        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */
        P.precision = P.sd = function (z) {
            var n, v,
                x = this,
                c = x.c;

            // 'precision() argument not a boolean or binary digit: {z}'
            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                if (ERRORS) raise( 13, 'argument' + notBool, z );
                if ( z != !!z ) z = null;
            }

            if ( !c ) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;

            if ( v = c[v] ) {

                // Subtract the number of trailing zeros of the last element.
                for ( ; v % 10 == 0; v /= 10, n-- );

                // Add the number of digits of the first element.
                for ( v = c[0]; v >= 10; v /= 10, n++ );
            }

            if ( z && x.e + 1 > n ) n = x.e + 1;

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
         * omitted.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'round() decimal places out of range: {dp}'
         * 'round() decimal places not an integer: {dp}'
         * 'round() rounding mode not an integer: {rm}'
         * 'round() rounding mode out of range: {rm}'
         */
        P.round = function ( dp, rm ) {
            var n = new BigNumber(this);

            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                round( n, ~~dp + this.e + 1, rm == null ||
                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
            }

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
         *
         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         *
         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
         * otherwise.
         *
         * 'shift() argument not an integer: {k}'
         * 'shift() argument out of range: {k}'
         */
        P.shift = function (k) {
            var n = this;
            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

              // k < 1e+21, or truncate(k) will produce exponential notation.
              ? n.times( '1e' + truncate(k) )
              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                ? n.s * ( k < 0 ? 0 : 1 / 0 )
                : n );
        };


        /*
         *  sqrt(-n) =  N
         *  sqrt( N) =  N
         *  sqrt(-I) =  N
         *  sqrt( I) =  I
         *  sqrt( 0) =  0
         *  sqrt(-0) = -0
         *
         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.squareRoot = P.sqrt = function () {
            var m, n, r, rep, t,
                x = this,
                c = x.c,
                s = x.s,
                e = x.e,
                dp = DECIMAL_PLACES + 4,
                half = new BigNumber('0.5');

            // Negative/NaN/Infinity/zero?
            if ( s !== 1 || !c || !c[0] ) {
                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
            }

            // Initial estimate.
            s = Math.sqrt( +x );

            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if ( s == 0 || s == 1 / 0 ) {
                n = coeffToString(c);
                if ( ( n.length + e ) % 2 == 0 ) n += '0';
                s = Math.sqrt(n);
                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                if ( s == 1 / 0 ) {
                    n = '1e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                }

                r = new BigNumber(n);
            } else {
                r = new BigNumber( s + '' );
            }

            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if ( r.c[0] ) {
                e = r.e;
                s = e + dp;
                if ( s < 3 ) s = 0;

                // Newton-Raphson iteration.
                for ( ; ; ) {
                    t = r;
                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                         coeffToString( r.c ) ).slice( 0, s ) ) {

                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if ( r.e < e ) --s;
                        n = n.slice( s - 3, s + 1 );

                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if ( n == '9999' || !rep && n == '4999' ) {

                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if ( !rep ) {
                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                if ( t.times(t).eq(x) ) {
                                    r = t;
                                    break;
                                }
                            }

                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {

                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                // Truncate to the first rounding digit.
                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                m = !r.times(r).eq(x);
                            }

                            break;
                        }
                    }
                }
            }

            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
        };


        /*
         *  n * 0 = 0
         *  n * N = N
         *  n * I = I
         *  0 * n = 0
         *  0 * 0 = 0
         *  0 * N = N
         *  0 * I = N
         *  N * n = N
         *  N * 0 = N
         *  N * N = N
         *  N * I = N
         *  I * n = I
         *  I * 0 = N
         *  I * N = N
         *  I * I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber times the value of
         * BigNumber(y, b).
         */
        P.times = P.mul = function ( y, b ) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                base, sqrtBase,
                x = this,
                xc = x.c,
                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

            // Either NaN, ±Infinity or ±0?
            if ( !xc || !yc || !xc[0] || !yc[0] ) {

                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;

                    // Return ±Infinity if either is ±Infinity.
                    if ( !xc || !yc ) {
                        y.c = y.e = null;

                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [0];
                        y.e = 0;
                    }
                }

                return y;
            }

            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;

            // Ensure xc points to longer array and xcL to its length.
            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

            // Initialise the result array with zeros.
            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

            base = BASE;
            sqrtBase = SQRT_BASE;

            for ( i = ycL; --i >= 0; ) {
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;

                for ( k = xcL, j = i + k; j > i; ) {
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                    zc[j--] = xlo % base;
                }

                zc[j] = c;
            }

            if (c) {
                ++e;
            } else {
                zc.splice(0, 1);
            }

            return normalise( y, zc, e );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toDigits() precision out of range: {sd}'
         * 'toDigits() precision not an integer: {sd}'
         * 'toDigits() rounding mode not an integer: {rm}'
         * 'toDigits() rounding mode out of range: {rm}'
         */
        P.toDigits = function ( sd, rm ) {
            var n = new BigNumber(this);
            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
            return sd ? round( n, sd, rm ) : n;
        };


        /*
         * Return a string representing the value of this BigNumber in exponential notation and
         * rounded using ROUNDING_MODE to dp fixed decimal places.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toExponential() decimal places not an integer: {dp}'
         * 'toExponential() decimal places out of range: {dp}'
         * 'toExponential() rounding mode not an integer: {rm}'
         * 'toExponential() rounding mode out of range: {rm}'
         */
        P.toExponential = function ( dp, rm ) {
            return format( this,
              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounding
         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
         * but e.g. (-0.00001).toFixed(0) is '-0'.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFixed() decimal places not an integer: {dp}'
         * 'toFixed() decimal places out of range: {dp}'
         * 'toFixed() rounding mode not an integer: {rm}'
         * 'toFixed() rounding mode out of range: {rm}'
         */
        P.toFixed = function ( dp, rm ) {
            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
              ? ~~dp + this.e + 1 : null, rm, 20 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounded
         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
         * of the FORMAT object (see BigNumber.config).
         *
         * FORMAT = {
         *      decimalSeparator : '.',
         *      groupSeparator : ',',
         *      groupSize : 3,
         *      secondaryGroupSize : 0,
         *      fractionGroupSeparator : '\xA0',    // non-breaking space
         *      fractionGroupSize : 0
         * };
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFormat() decimal places not an integer: {dp}'
         * 'toFormat() decimal places out of range: {dp}'
         * 'toFormat() rounding mode not an integer: {rm}'
         * 'toFormat() rounding mode out of range: {rm}'
         */
        P.toFormat = function ( dp, rm ) {
            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
              ? ~~dp + this.e + 1 : null, rm, 21 );

            if ( this.c ) {
                var i,
                    arr = str.split('.'),
                    g1 = +FORMAT.groupSize,
                    g2 = +FORMAT.secondaryGroupSize,
                    groupSeparator = FORMAT.groupSeparator,
                    intPart = arr[0],
                    fractionPart = arr[1],
                    isNeg = this.s < 0,
                    intDigits = isNeg ? intPart.slice(1) : intPart,
                    len = intDigits.length;

                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                if ( g1 > 0 && len > 0 ) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr( 0, i );

                    for ( ; i < len; i += g1 ) {
                        intPart += groupSeparator + intDigits.substr( i, g1 );
                    }

                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }

                str = fractionPart
                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                      '$&' + FORMAT.fractionGroupSeparator )
                    : fractionPart )
                  : intPart;
            }

            return str;
        };


        /*
         * Return a string array representing the value of this BigNumber as a simple fraction with
         * an integer numerator and an integer denominator. The denominator will be a positive
         * non-zero value less than or equal to the specified maximum denominator. If a maximum
         * denominator is not specified, the denominator will be the lowest value necessary to
         * represent the number exactly.
         *
         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
         *
         * 'toFraction() max denominator not an integer: {md}'
         * 'toFraction() max denominator out of range: {md}'
         */
        P.toFraction = function (md) {
            var arr, d0, d2, e, exp, n, n0, q, s,
                k = ERRORS,
                x = this,
                xc = x.c,
                d = new BigNumber(ONE),
                n1 = d0 = new BigNumber(ONE),
                d1 = n0 = new BigNumber(ONE);

            if ( md != null ) {
                ERRORS = false;
                n = new BigNumber(md);
                ERRORS = k;

                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                    if (ERRORS) {
                        raise( 22,
                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                    }

                    // ERRORS is false:
                    // If md is a finite non-integer >= 1, round it to an integer and use it.
                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                }
            }

            if ( !xc ) return x.toString();
            s = coeffToString(xc);

            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);

            // n0 = d1 = 0
            n0.c[0] = 0;

            for ( ; ; )  {
                q = div( n, d, 0, 1 );
                d2 = d0.plus( q.times(d1) );
                if ( d2.cmp(md) == 1 ) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus( q.times( d2 = n1 ) );
                n0 = d2;
                d = n.minus( q.times( d2 = d ) );
                n = d2;
            }

            d2 = div( md.minus(d0), d1, 0, 1 );
            n0 = n0.plus( d2.times(n1) );
            d0 = d0.plus( d2.times(d1) );
            n0.s = n1.s = x.s;
            e *= 2;

            // Determine which fraction is closer to x, n0/d0 or n1/d1
            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                    ? [ n1.toString(), d1.toString() ]
                    : [ n0.toString(), d0.toString() ];

            MAX_EXP = exp;
            return arr;
        };


        /*
         * Return the value of this BigNumber converted to a number primitive.
         */
        P.toNumber = function () {
            return +this;
        };


        /*
         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
         * If m is present, return the result modulo m.
         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
         * ROUNDING_MODE.
         *
         * The modular power operation works efficiently when x, n, and m are positive integers,
         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
         *
         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         * [m] {number|string|BigNumber} The modulus.
         *
         * 'pow() exponent not an integer: {n}'
         * 'pow() exponent out of range: {n}'
         *
         * Performs 54 loop iterations for n of 9007199254740991.
         */
        P.toPower = P.pow = function ( n, m ) {
            var k, y, z,
                i = mathfloor( n < 0 ? -n : +n ),
                x = this;

            if ( m != null ) {
                id = 23;
                m = new BigNumber(m);
            }

            // Pass ±Infinity to Math.pow if exponent is out of range.
            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                k = Math.pow( +x, n );
                return new BigNumber( m ? k % m : k );
            }

            if (m) {
                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                    x = x.mod(m);
                } else {
                    z = m;

                    // Nullify m so only a single mod operation is performed at the end.
                    m = null;
                }
            } else if (POW_PRECISION) {

                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                // (Using + 1.5 would give [9, 21] guard digits.)
                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
            }

            y = new BigNumber(ONE);

            for ( ; ; ) {
                if ( i % 2 ) {
                    y = y.times(x);
                    if ( !y.c ) break;
                    if (k) {
                        if ( y.c.length > k ) y.c.length = k;
                    } else if (m) {
                        y = y.mod(m);
                    }
                }

                i = mathfloor( i / 2 );
                if ( !i ) break;
                x = x.times(x);
                if (k) {
                    if ( x.c && x.c.length > k ) x.c.length = k;
                } else if (m) {
                    x = x.mod(m);
                }
            }

            if (m) return y;
            if ( n < 0 ) y = ONE.div(y);

            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
        };


        /*
         * Return a string representing the value of this BigNumber rounded to sd significant digits
         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
         * necessary to represent the integer part of the value in fixed-point notation, then use
         * exponential notation.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toPrecision() precision not an integer: {sd}'
         * 'toPrecision() precision out of range: {sd}'
         * 'toPrecision() rounding mode not an integer: {rm}'
         * 'toPrecision() rounding mode out of range: {rm}'
         */
        P.toPrecision = function ( sd, rm ) {
            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
              ? sd | 0 : null, rm, 24 );
        };


        /*
         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
         * TO_EXP_NEG, return exponential notation.
         *
         * [b] {number} Integer, 2 to 64 inclusive.
         *
         * 'toString() base not an integer: {b}'
         * 'toString() base out of range: {b}'
         */
        P.toString = function (b) {
            var str,
                n = this,
                s = n.s,
                e = n.e;

            // Infinity or NaN?
            if ( e === null ) {

                if (s) {
                    str = 'Infinity';
                    if ( s < 0 ) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                str = coeffToString( n.c );

                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                      ? toExponential( str, e )
                      : toFixedPoint( str, e );
                } else {
                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                }

                if ( s < 0 && n.c[0] ) str = '-' + str;
            }

            return str;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */
        P.truncated = P.trunc = function () {
            return round( new BigNumber(this), this.e + 1, 1 );
        };


        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */
        P.valueOf = P.toJSON = function () {
            var str,
                n = this,
                e = n.e;

            if ( e === null ) return n.toString();

            str = coeffToString( n.c );

            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                ? toExponential( str, e )
                : toFixedPoint( str, e );

            return n.s < 0 ? '-' + str : str;
        };


        P.isBigNumber = true;

        if ( config != null ) BigNumber.config(config);

        return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS


    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for ( ; i < j; ) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for ( ; z--; s = '0' + s );
            r += s;
        }

        // Determine trailing zeros.
        for ( j = r.length; r.charCodeAt(--j) === 48; );
        return r.slice( 0, j + 1 || 1 );
    }


    // Compare the value of BigNumbers x and y.
    function compare( x, y ) {
        var a, b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either NaN?
        if ( !i || !j ) return null;

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) return a ? b ? 0 : -j : i;

        // Signs differ?
        if ( i != j ) return i;

        a = i < 0;
        b = k == l;

        // Either Infinity?
        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

        // Compare exponents.
        if ( !b ) return k > l ^ a ? 1 : -1;

        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

        // Compare digit by digit.
        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Return true if n is a valid number in range, otherwise false.
     * Use for argument validation when ERRORS is false.
     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
     */
    function intValidatorNoErrors( n, min, max ) {
        return ( n = truncate(n) ) >= min && n <= max;
    }


    function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }


    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. convertBase('255', 10, 16) returns [15, 15].
     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut( str, baseIn, baseOut ) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for ( ; i < len; ) {
            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

            for ( ; j < arr.length; j++ ) {

                if ( arr[j] > baseOut - 1 ) {
                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }


    function toExponential( str, e ) {
        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
          ( e < 0 ? 'e' : 'e+' ) + e;
    }


    function toFixedPoint( str, e ) {
        var len, z;

        // Negative exponent?
        if ( e < 0 ) {

            // Prepend zeros.
            for ( z = '0.'; ++e; z += '0' );
            str = z + str;

        // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if ( ++e > len ) {
                for ( z = '0', e -= len; --e; z += '0' );
                str += z;
            } else if ( e < len ) {
                str = str.slice( 0, e ) + '.' + str.slice(e);
            }
        }

        return str;
    }


    function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
    }


    // EXPORT


    BigNumber = constructorFactory();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;


    // AMD.
    if ( module.exports ) {
        module.exports = BigNumber;

    // Browser.
    } else {
        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
    }
})(commonjsGlobal);
});

// this needs to be larger than our largest exponent
// currently largest is hundred millinillion, at 3005
bignumber.config({ EXPONENTIAL_AT: 3006 });

/*
	wordToNumber Class
		converts human readable word-numbers into (string) digits
*/

function WordToNumber() {

	/*
		(string) language
			current language
	*/
	this.language = "english";

	/*
		(array) validate_whitelist
		(array) validate_blacklist
			regexes to determine whether a string should be parsed
	*/
	this.validate_whitelist = [];
	this.validate_blacklist = [];

	/*
		(regex) side_char_regex
			characters not allowed at the start of a word-number
			useful for not matching word-numbers inside words like "attend",
			which would otherwise match the ten
	*/
	this.side_char_regex = /[a-z]/i;

	/*
		(regex) before_parse_strip_regex
			allowed delimiters for word-numbers, used to strip them
			leaving only word-numbers and non-allowed characters
			currently strips: spaces, periods, commas, dashes, and "and"s
	*/
	this.before_parse_strip_regex = /(\s+|\.|,|-|\s?and\s?)/ig;

	/*
		(int) max_delim_length
			max characters allowed between words
			if this is too high, we can match unrelated word-numbers
			that just so happen to fit the normal pattern like
			"one hundred pears, and six grean beans", would match as 106, not [ 100, 6 ]
	*/
	this.max_delim_length = 1;

	/*o
		(array) languages
			array of necessary number [ name => value ] pairs
				for single, tens, and place separators
				in the "large" category, the value for each key is
				the total number of digits, aka the number of zeros plus one
				so for exponents, just subtract one
	*/
	this.languages = {
		english: {
			single: {
				zero: 0,
				one: 1,
				two: 2,
				three: 3,
				four: 4,
				five: 5,
				six: 6,
				seven: 7,
				eight: 8,
				nine: 9,
			},
			tens: {
				ten: 10,
				eleven: 11,
				twelve: 12,
				thirteen: 13,
				fourteen: 14,
				fifteen: 15,
				sixteen: 16,
				seventeen: 17,
				eighteen: 18,
				nineteen: 19,
				twenty: 20,
				thirty: 30,
				forty: 40,
				fourty: 40,
				fifty: 50,
				sixty: 60,
				seventy: 70,
				eighty: 80,
				ninety: 90,
			},
			large: {
				thousand: 4,
				million: 7,
				billion: 10,
				trillion: 13,
				quadrillion: 16,
				quintillion: 19,
				sextillion: 22,
				septillion: 25,
				octillion: 28,
				nonillion: 31,
				decillion: 34,
				undecillion: 37,
				duodecillion: 40,
				tredecillion: 43,
				quattuordecillion: 46,
				quindecillion: 49,
				sexdecillion: 52,
				septendecillion: 55,
				octodecillion: 58,
				novemdecillion: 61,
				vigintillion: 64,
				unvigintillion: 67,
				duovigintillion: 70,
				tresvigintillion: 73,
				quattuorvigintillion: 76,
				quinquavigintillion: 79,
				sesvigintillion: 82,
				septemvigintillion: 85,
				octovigintillion: 88,
				novemvigintillion: 91,
				trigintillion: 94,
				untrigintillion: 97,
				duotrigintillion: 100,
				googol: 101,
				trestrigintillion: 103,
				quattuortrigintillion: 106,
				quinquatrigintillion: 110,
				sestrigintillion: 112,
				septentrigintillion: 115,
				octotrigintillion: 118,
				noventrigintillion: 121,
				quadragintillion: 124,
				quinquagintillion: 154,
				sexagintillion: 184,
				septuagintillion: 214,
				octogintillion: 244,
				nonagintillion: 274,
				centillion: 304,
				uncentillion: 307,
				duocentillion: 310,
				trescentillion: 313,
				decicentillion: 334,
				undecicentillion: 337,
				viginticentillion: 364,
				unviginticentillion: 367,
				trigintacentillion: 394,
				quadragintacentillion: 424,
				quinquagintacentillion: 454,
				sexagintacentillion: 484,
				septuagintacentillion: 514,
				octogintacentillion: 544,
				nonagintacentillion: 574,
				ducentillion: 604,
				trecentillion: 904,
				quadringentillion: 1204,
				quingentillion: 1504,
				sescentillion: 1804,
				septingentillion: 2104,
				octingentillion: 2404,
				nongentillion: 2704,
				millinillion: 3004
			}
		}
	};

	this.all_word_numbers = Object.keys( this.languages[ this.language ].single ).concat( Object.keys( this.languages[ this.language ].tens ), Object.keys( this.languages[ this.language ].large ) );

}

/*
	listLanguages
		return array of available languages
*/
WordToNumber.prototype.listLanguages = function() {

	return this.languages;
};

/*
	setLanguage (string)
		changes the default language
		returns FALSE if it doesn't exist
*/
WordToNumber.prototype.setLanguage = function( language ) {

	if ( ! this.languages[ language ] )
		return false;

	this.language = language;
	return true;
};

/*
	getLanguageData
		return a language's data
*/
WordToNumber.prototype.getLanguageData = function( language ) {

	return this.languages[ language ];
};

/*
	updateLanguageData
		create or replaces a language's data
*/
WordToNumber.prototype.updateLanguageData = function( language, data ) {

	this.languages[ language ] = data;
};

/*
	setValidatorWhitelist
		Takes a single, or array of regex strings
		to test numbers against before parsing.
		Only matching values will be included.
		This is run before setValidatorWhitelist.
		Passing a falsey value will clear thie list.
*/
WordToNumber.prototype.setValidatorWhitelist = function( list ) {

	if ( ! list.length )
		this.validate_whitelist = [];
	else if ( Array.isArray( list ) )
		this.validate_whitelist = list;
	else
		this.validate_whitelist = [ list ];
};

/*
	setValidatorBlacklist
		Takes a single, or array of regex strings
		to test numbers against before parsing.
		Matching values will be exluded.
		This is run before setValidatorWhitelist.
		Passing a falsey value will clear thie list.
*/
WordToNumber.prototype.setValidatorBlacklist = function( list ) {

	if ( ! list.length )
		this.validate_blacklist = [];
	else if ( Array.isArray( list ) )
		this.validate_blacklist = list;
	else
		this.validate_blacklist = [ list ];
};

/*
	validate
		Validates a string against the setValidatorBlacklist
		and then the setValidatorWhitelist to test numberstrings
		against before parsing
*/
WordToNumber.prototype.validate = function( string ) {

	if ( ! this.validate_blacklist.length )
		for ( let i = 0; i < this.validate_blacklist.length; i++ )
			if ( string.match( this.validate_blacklist[ i ] ) )
				return false;

	if ( ! this.validate_whitelist )
		return true;

	for ( let i = 0; i < this.validate_whitelist.length; i++ ) {
		if ( string.match( this.validate_whitelist[ i ] ) )
			return true;
	}

	return true;

};

/*
	parseSingle
		Attempts to parse a string as a single digit
*/
WordToNumber.prototype.parseSingle = function( text, is_invalid, pre_allow_invalid ) {

	if ( pre_allow_invalid )
		this.is_first = true;

	let singles = this.languages[ this.language ].single;
	let list = [];
	for ( let word in singles ) {

		if ( ! singles.hasOwnProperty( word ) )
			continue;

		let val = new bignumber( singles[ word ] );
		while ( ( pos = text.indexOf( word ) ) !== -1 ) {

			if ( this.is_first ) {

				if ( pos !== 0 && ! this.isValidSideChar( text.substring( 0, pos ), "start" ) )
					is_invalid = true;
				else if ( pos === 0 || pre_allow_invalid )
					is_invalid = false;

				pre_allow_invalid = true;
				this.is_first = false;
			}

			let break_pre = [];
			let parts = this.splitOne( text, word );
			let post;
			let pre_word;
			let post_word;

			if ( parts[0] && parts.length > 1 )
				pre_word = parts[0];
			else
				post_word = parts[0];

			if ( parts[1] )
				post_word = parts[1];

			// if we have a pre-word, and it parses, then it is a separate number
			if ( pre_word ) {
				break_pre = this.parseSingle( pre_word, is_invalid );
				if ( break_pre.length )
					list = list.concat( break_pre );
				text = text.replace( pre_word, "" );
			}

			if ( post_word ) {
				post = this.parseSingle( post_word, is_invalid );
				text = text.replace( post_word, "" );
			}

			if ( ! is_invalid )
				list.push( val.toString() );

			if ( post && post.length )
				list = list.concat( post );

			text = text.replace( word, "" );
		}
	}


	return list;

};

/*
	splitOne
		split the first occurrence of a string within a string
			this is different from string.split( needle, 1 ),
			because it returns the entire last half of the string,
			not just up to the next match
*/
WordToNumber.prototype.splitOne = function( haystack, string ) {
	let pos = haystack.indexOf( string );
	if ( pos !== -1 ) {
		let first_half = haystack.slice( 0, pos );
		let last_half = haystack.slice( ( pos + string.length ) );
		return [ first_half, last_half ];
	}
	return [];
};
WordToNumber.prototype.parseTens = function( text, is_invalid, pre_allow_invalid ) {

	if ( pre_allow_invalid )
		this.is_first = true;

	let original = ( " " + text ).slice( 1 );

	let tens = this.languages[ this.language ].tens;
	let list = [];
	for ( let word in tens ) {

		if ( ! tens.hasOwnProperty( word ) )
			continue;

		let val = new bignumber( tens[ word ] );
		while ( ( pos = text.indexOf( word ) ) !== -1 ) {


			if ( this.is_first ) {

				if ( pos !== 0 && ! this.isValidSideChar( text.substring( 0, pos ), "start" ) )
					is_invalid = true;
				else if ( pos === 0 || pre_allow_invalid )
					is_invalid = false;

				pre_allow_invalid = true;
				this.is_first = false;
			}

			let break_pre = [];
			let parts = this.splitOne( text, word );
			let post;
			let pre_word;
			let post_word;


			if ( parts[0] && parts.length > 1 )
				pre_word = parts[0];
			else
				post_word = parts[0];

			if ( parts[1] )
				post_word = parts[1];

			text = text.replace( word, "" );


			// if we have a pre-word, and it parses, then it is a separate number
			if ( pre_word ) {
				break_pre = this.parseTens( pre_word, is_invalid, pre_allow_invalid );
				if ( break_pre.list.length )
					list = list.concat( break_pre.list );
				text = this.splitOne( text, pre_word ).join( "" );
			}

			let break_post = false;
			if ( post_word ) {
				post = this.parseTens( post_word, is_invalid );
				if ( ! this.isValidSideChar( post_word, "end" ) )
					break_post = true;
				text = this.splitOne( text, post_word ).join( "" );
			}

			let post_push;
			if ( post && post.list && post.list.length && ! break_post ) {
				if ( post.list[0] <= 9 && val >= 20 ) {
					val = val.plus( post.list[0] );
					if ( post.list.length > 1 )
						post_push = post.list.splice( 1 );
				}
				else {
					post_push = post.list;
				}
			}

			if ( ! is_invalid )
				list.push( val.toString() );

			if ( post_push )
				list = list.concat( post_push );

		}
	}

	let singles = this.parseSingle( text, is_invalid, pre_allow_invalid );

	list = list.concat( singles );


	return {
		list: list,
		text: text,
		original: original,
	};
};

/*
	parseHundreds
		Attempts to parse a string for the hundreds
*/
WordToNumber.prototype.parseHundreds = function( text, hundred, is_invalid, pre_allow_invalid ) {

	if ( pre_allow_invalid )
		this.is_first = true;

	let original = ( " " + text ).slice( 1 );
	let list = [];

	let word = hundred || "hundred";
	while ( ( pos = text.indexOf( word ) ) !== -1 ) {

		if ( this.is_first ) {

			if ( pos !== 0 && ! this.isValidSideChar( text.substring( 0, pos ), "start" ) )
				is_invalid = true;
			else if ( pos === 0 || pre_allow_invalid )
				is_invalid = false;

			pre_allow_invalid = true;
			this.is_first = false;
		}

		let val = new bignumber( 100 );
		let break_pre = [];
		let parts = this.splitOne( text, word );
		let post;
		let pre_word;
		let post_word;

		if ( parts[0] && parts.length > 1 )
			pre_word = parts[0];
		else
			post_word = parts[0];

		if ( parts[1] )
			post_word = parts[1];

		if ( pre_word ) {
			break_pre = this.parseHundreds( pre_word, null, is_invalid, pre_allow_invalid ).list;
			if ( break_pre.length ) {

				if ( pre_allow_invalid )
					is_invalid = false;

				if ( break_pre.length > 1 ) {
					for ( let i = 0; i < ( break_pre.length - 1 ); i++ ) {
						list = list.concat( break_pre[ i ] );
					}
				}
				if ( break_pre[ break_pre.length - 1 ] > 9 ) {
					list = list.concat( break_pre[ break_pre.length - 1 ] );
				}
				else {
					val = val.times( break_pre[ break_pre.length - 1 ] );
				}
			}
			text = text.replace( pre_word, "" );
		}


		let break_post = false;
		if ( post_word ) {
			post = this.parseHundreds( post_word, null, is_invalid ).list;
			text = text.replace( post_word, "" );
			if ( ! this.isValidSideChar( post_word, "end" ) ) {
				break_post = true;
			}
		}

		if ( post && post.length && ! break_post ) {
			if ( post[0] <= 99 ) {
				val = val.plus( post[0] );
			}
		}
		else if ( break_post ) {
			post.unshift( "" );
		}

		if ( ! is_invalid )
			list.push( val.toString() );


		if ( post && post.length > 1 ) {
			post.splice( 0, 1 );
			list = list.concat( post );
		}

		text = text.replace( word, "" );
	}

	let tens = this.parseTens( text, is_invalid, pre_allow_invalid );

	list = list.concat( tens.list );


	return {
		list: list,
		text: text,
		original: original,
	};
};

/*
	isValidSideChar
		regex function for testing the characters surrounding the word-number
*/
WordToNumber.prototype.isValidSideChar = function( text, side ) {
	let valid = false;
	this.all_word_numbers.forEach( ( word ) => {
		if ( valid )
			return;
		let regex = ( side == "start" ) ? new RegExp( word + "$" ) : new RegExp( "^" + word );
		if ( regex.test( text ) )
			valid = true;
	});

	if ( ! valid ) {
		let char = ( side == "start" ) ? text[ text.length - 1 ] : text[0];
		valid = ! this.side_char_regex.test( char );
	}
	return valid;
};

/*
	setSideChars
		takes a regex of allowed characters surrounding the word-number
		this MUST include *at least* /a-z/i, so that you aren't matching words
		like "attend", or "tone", that would otherwise match as 10, and 1
*/
WordToNumber.prototype.setSideChars = function( regex ) {
	this.side_char_regex = regex;
};

/*
	setExponent
		takes a number that signifies the exponent at which scientific notation starts
*/
WordToNumber.prototype.setExponent = function( exponent ) {
	bignumber.config({ EXPONENTIAL_AT: exponent });
};

/*
	beforeParseStrip
		regex function to strip out allowed delimiters so we don't have to deal with them

		* we have to use a hacky reverse here because javascript doesn't have negative lookbehinds
*/
WordToNumber.prototype.beforeParseStrip = function( str ) {
	let placeholder = "{WORD_TO_NUMBER_PLACEHOLDER}";
	str = str.replace( /thousand/g, placeholder );
	str = str.replace( this.before_parse_strip_regex, "" );
	str = str.replace( new RegExp( placeholder, "g" ), "thousand" );
	return str;
};

WordToNumber.prototype.parseLarge = function( text, is_invalid, pre_allow_invalid ) {

	if ( pre_allow_invalid )
		this.is_first = true;

	let list = [];

	let large = this.languages[ this.language ].large;
	let large_keys = Object.keys( large ).sort( ( a, b ) => {
		return large[ b ] - large[ a ];
	});

	for ( let i = 0; i < large_keys.length; i++ ) {

		let word = large_keys[ i ];

		if ( ! large.hasOwnProperty( word ) )
			continue;

		while ( ( pos = text.indexOf( word ) ) !== -1 ) {

			if ( this.is_first ) {

				if ( pos !== 0 && ! this.isValidSideChar( text.substring( 0, pos ), "start" ) )
					is_invalid = true;
				else if ( pos === 0 || pre_allow_invalid )
					is_invalid = false;

				pre_allow_invalid = true;
				this.is_first = false;
			}

			let val = new bignumber( 10 ).toPower( ( large[ word ] - 1 ) );
			let break_pre = [];
			let parts = this.splitOne( text, word );
			let post;
			let pre_word;
			let post_word;

			if ( parts[0] && parts.length > 1 )
				pre_word = parts[0];
			else
				post_word = parts[0];

			if ( parts[1] )
				post_word = parts[1];

			if ( pre_word ) {
				break_pre = this.parseLarge( pre_word, is_invalid, pre_allow_invalid );
				if ( break_pre.length ) {

					if ( pre_allow_invalid )
						is_invalid = false;

					if ( break_pre.length > 1 )
						for ( let i = 0; i < ( break_pre.length - 1 ); i++ )
							list = list.concat( break_pre[ i ] );

					if ( break_pre[ break_pre.length - 1 ] > 999 )
						list = list.concat( break_pre[ break_pre.length - 1 ] );
					else
						val = val.times( break_pre[ break_pre.length - 1 ] );

				}
				text = text.replace( pre_word, "" );
			}

			if ( post_word ) {
				post = this.parseLarge( post_word, is_invalid );
				text = text.replace( post_word, "" );
			}

			if ( post && post.length ) {
				if ( post[0] <= ( val - 1 ) ) {
					val = val.plus( post[0] );
				}
			}

			if ( ! is_invalid )
				list.push( val.toString() );

			if ( post && post.length > 1 ) {
				post.splice( 0, 1 );
				list = list.concat( post );
			}

			text = text.replace( word, "" );
		}
	}

	let hundreds = this.parseHundreds( text, null, is_invalid, pre_allow_invalid );

	text = text.replace( hundreds.original, "" );

	list = list.concat( hundreds.list );

	return list;
};

/*
	parse
		Attempt to parse a string to an as many word-numbers as it can find
		or false
*/
WordToNumber.prototype.parse = function( text ) {

	if ( ! this.validate( text ) )
		return false;

	text = text.toLowerCase();

	this.is_first = true;

	let stripped_text = this.beforeParseStrip( text );
	let result = this.parseLarge( stripped_text, false );

	return ( ! result || result.length === 0 ) ? false : result;
};

var wordToNumberNode = WordToNumber;

const { numToWords } = lib;

// There is another package called words-to-numbers, which supports decimals
// but fails to convert "twenty-two thousand" properly (a bug in v1.5.1).

const wtn = new wordToNumberNode();

const DECIMAL_NUMBER_REGEX = /\d+[.]\d+/g;
const DECIMAL_NUMBER_WITH_DECIMAL_WORD = /\d+(?:\spoint\s|\sdecimal\s)\d+/gi; // e.g. "123 point 45"

/** For phrases like 3.5 million, 9.1 thousand */
const DECIMAL_WITH_MILLION_REGEX = /(?:eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|zero|one|two|three|four|five|six|seven|eight|nine|ten|and|[\s,-])+(?:point|decimal)(?:eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|zero|one|two|three|four|five|six|seven|eight|nine|ten|and|[\s,-])+(?:thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|nonillion|decillion|undecillion|duodecillion|tredecillion|quattuordecillion|quindecillion|sexdecillion|septendecillion|octodecillion|novemdecillion|vigintillion|unvigintillion|duovigintillion|tresvigintillion|quattuorvigintillion|quinquavigintillion|sesvigintillion|septemvigintillion|octovigintillion|novemvigintillion|trigintillion|untrigintillion|duotrigintillion|googol|trestrigintillion|quattuortrigintillion|quinquatrigintillion|sestrigintillion|septentrigintillion|octotrigintillion|noventrigintillion|quadragintillion|quinquagintillion|sexagintillion|septuagintillion|octogintillion|nonagintillion|centillion|uncentillion|duocentillion|trescentillion|decicentillion|undecicentillion|viginticentillion|unviginticentillion|trigintacentillion|quadragintacentillion|quinquagintacentillion|sexagintacentillion|septuagintacentillion|octogintacentillion|nonagintacentillion|ducentillion|trecentillion|quadringentillion|quingentillion|sescentillion|septingentillion|octingentillion|nongentillion|millinillion)/gi;
const NUMBERS_REGEX = /\b\d+/g; // \b because we want to avoid numbers inside words, like email0123@example.com
const NUMBER_IN_WORDS_REGEX = /(?:(?:\d+[.]\d+)|(?:\d+|\ba\s|(?:\b(?:hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|nonillion|decillion|undecillion|duodecillion|tredecillion|quattuordecillion|quindecillion|sexdecillion|septendecillion|octodecillion|novemdecillion|vigintillion|unvigintillion|duovigintillion|tresvigintillion|quattuorvigintillion|quinquavigintillion|sesvigintillion|septemvigintillion|octovigintillion|novemvigintillion|trigintillion|untrigintillion|duotrigintillion|googol|trestrigintillion|quattuortrigintillion|quinquatrigintillion|sestrigintillion|septentrigintillion|octotrigintillion|noventrigintillion|quadragintillion|quinquagintillion|sexagintillion|septuagintillion|octogintillion|nonagintillion|centillion|uncentillion|duocentillion|trescentillion|decicentillion|undecicentillion|viginticentillion|unviginticentillion|trigintacentillion|quadragintacentillion|quinquagintacentillion|sexagintacentillion|septuagintacentillion|octogintacentillion|nonagintacentillion|ducentillion|trecentillion|quadringentillion|quingentillion|sescentillion|septingentillion|octingentillion|nongentillion|millinillion|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|zero|one|two|three|four|five|six|seven|eight|nine)))|(?:and)|(?:[\s,-]))+/gi;
const SINGLE_DIGIT_REGEX = /\d/;

/** Matches double-digit numbers + "hundred" */
const TENS_HUNDREDS = /(?:(?:\d+[.]?\d+|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|one|two|three|four|five|six|seven|eight|nine|point|decimal)(?:[\s-])+)+(\bhundred\b)/gi;
const TRAILING_OR_LEADING_UNNECESSARY_CHARACTERS = /(^[,])|(^and\b)|(^[-])|([,]$)|(\band$)|(\ba$)|([-]$)/gi;

const DEFAULT_EXTRAS = [
  { id: 1, from: /(\d)\s*mil\b/gi, to: '$1 million' }, // 123 mil => 123 million
  { id: 2, from: /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)\s*mil\b/gi, to: '$1 million' }, // 123 mil => 123 million
  { id: 3, from: /(\d)\s*k\b/gi, to: '$1 thousand' }, // 123k => 123 thousand
  { id: 4, from: /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)\s*k\b/gi, to: '$1 thousand' }, // 123 k => 123 thousand
  { id: 5, from: /(\d)\s*grand\b/gi, to: '$1 thousand' }, // 123 grand => 123 thousand
  { id: 6, from: /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)\s*grand\b/gi, to: '$1 thousand' }, // 123 grand => 123 thousand
  { id: 7, from: /(\d)\s*bn\b/gi, to: '$1 billion' }, // 123 bn => 123 billion
  { id: 8, from: /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)\s*bn\b/gi, to: '$1 billion' }, // 123 bn => 123 billion

];

/**
 * Converts strings like "i need forty-five items" into "i need 45 items".
 * @param {string} text - Any English sentence.
 * @param {object} [options] - The options object.
 * @param {boolean} options.enableExtras - Whether to enable additional
 *  replacements which may result in false positives in some cases.
 * @param {object[]} options.extras - An array of objects containing additional
 *   replacements. Each object must have the 'from' and 'to' properties, e.g.
 *   { from: /\bmil\b/gi, to: 'million' }. Default list is in `DEFAULT_EXTRAS`.
 *   Setting `extras` overrides the `DEFAULT_EXTRAS`, so if you want to expand
 *   it, you need to append to that array. `from` must be a string or pattern,
 *   `to` must be a string. The string can contain references to regex match
 *   groups such as $1.
 * @returns {string} - The sentence with the number in words changed into
 * actual Arabic numbers.
 */
function englishWtn(text, options) {
  if (!text) {
    return text;
  }

  /** Extra replacements for cases like "2.7k" */
  let extras;
  options = options || {};
  if (options.enableExtras) {
    if (options.extras) {
      extras = options.extras;
    } else {
      extras = DEFAULT_EXTRAS;
    }
  }

  let textOnlyString = _preprocess(text, extras);
  let arabicNumbersString = textOnlyString;

  // Special case for decimal + million, e.g. 3.65 million, which is not
  // supported by the library.
  let decimalWithThousandsMatches = textOnlyString.match(DECIMAL_WITH_MILLION_REGEX);
  let stringModified = false;
  if (decimalWithThousandsMatches) {
    for (let match of decimalWithThousandsMatches) {
      // Split "three point five million" into "three point five" and "million"
      let splitAt = match.lastIndexOf(' ');
      let [firstPart, secondPart] = [match.substr(0, splitAt), match.substr(splitAt)];

      // Clean up for the case if the number start with ", and 17...". Match
      // has to be cleaned up too, otherwise we will discard the comma, "and"
      // and similar characters.
      [match] = _cleanUpNumberMatches([match]);
      [firstPart, secondPart] = _cleanUpNumberMatches([firstPart, secondPart]);

      let firstPartAsNumber = englishWtn(firstPart);
      let secondPartAsNumber = englishWtn(secondPart);
      if (firstPartAsNumber !== false && secondPartAsNumber !== false) {
        firstPartAsNumber = parseFloat(firstPartAsNumber);
        secondPartAsNumber = parseFloat(secondPartAsNumber);

        let multiplied = Math.round(firstPartAsNumber * secondPartAsNumber);
        arabicNumbersString = arabicNumbersString.replace(match, multiplied);
        stringModified = true;
      }
    }
  }

  // Normal, general case:
  textOnlyString = _preprocess(arabicNumbersString, extras);
  arabicNumbersString = textOnlyString;
  let textOnlyNumbers = _cleanUpNumberMatches(textOnlyString.match(NUMBER_IN_WORDS_REGEX));
  if (!textOnlyNumbers || !textOnlyNumbers.length) {
    // Nothing to do - return early:
    if (!stringModified) {
      return text;
    }
  } else {
    // Convert each number from words to Arabic separately:
    for (let textOnlyNumber of textOnlyNumbers) {
      let parseWhat = textOnlyNumber.replace(/\ba\b/i, '').trim(); // remove "a" from "a hundred thousand" or trash bits like ", and a"

      // Normal general case of replacement:
      let replacement = wtn.parse(parseWhat);
      // console.log('TRYING TO REPLACE: ', parseWhat, ' => ', replacement);
      if (replacement !== false) { // false means there was an error in words-to-numbers
        arabicNumbersString = arabicNumbersString.replace(textOnlyNumber, replacement);
      }
    }

    // If any decimals, convert the word " point " and " decimal " into a dot:
    let decimalMatches = arabicNumbersString.match(DECIMAL_NUMBER_WITH_DECIMAL_WORD);
    if (decimalMatches) {
      for (let decimalMatch of decimalMatches) {
        let replacement = decimalMatch.replace(/(\spoint\s|\sdecimal\s)/gi, '.');
        arabicNumbersString = arabicNumbersString.replace(decimalMatch, replacement);
      }
    }
  }

  return arabicNumbersString;
}

/**
 * Since our regex catches a lot of unnecessary stuff like single spaces and
 * single words "and", clean up those matches from the array:
 * @param {string[]} matches
 */
function _cleanUpNumberMatches(matches) {
  if (matches) {
    // Clean up empties:
    matches = matches.filter(m => {
      m = m.replace(/and/gi, ''); // technically should be \band\b
      m = m.replace(/^\s?a\s/i, '');
      m = m.replace(/[\s,-]/g, '');
      m = m.trim();
      return m;
    });

    // Trim leading/trailing trash like ", and" from matches:
    matches = matches.map(m => {
      let oldString;
      let newString = m;

      // We loop here because there could be multiple things to replace, like
      // in the case of the string ", and seventeen" - both comma and "and":
      while (oldString !== newString) {
        oldString = newString;
        newString = oldString
          .trim()
          .replace(TRAILING_OR_LEADING_UNNECESSARY_CHARACTERS, '')
          .trim();
      }

      return newString;
    });
  }

  return matches;
}

/**
 *
 * @param {string} text
 * @returns {string[]}
 */
function numbers(text) {
  if (!text) {
    return text;
  }

  let textOnlyString = _preprocess(text);

  let extractedNumbers = wtn.parse(textOnlyString) || [];

  return extractedNumbers;
}

function _fixCommonVariants(text, extras) {
  // change fourty into forty:
  text = text.replace(/\bfourty\b/g, 'forty');

  // convert "twelve hundred" into "one thousand two hundred"
  text = _convertTenHundred(text);

  // grand, half a million, dozen,
  if (extras) {
    for (let extra of extras) {
      text = text.replace(extra.from, extra.to);
    }
  }

  return text;
}

function _convertTenHundred(text) {
  const HUNDRED = 100;

  let matches = text.match(TENS_HUNDREDS); // "twelve hundred", "25 hundred"
  if (matches) {
    for (let match of matches) {
      let matchWithoutHundred = match.replace(/hundred$/i, '');
      let replacement = englishWtn(matchWithoutHundred);
      let cleanedUpReplacement = replacement.replace(/[^0-9.]/g, '');
      let product = Math.round(HUNDRED * parseFloat(cleanedUpReplacement));
      text = text.replace(match, product);
    }
  }

  return text;
}

/** Converts the mixed words and numbers input into uniform words-only input. */
function _preprocess(text, extras) {
  text = _fixCommonVariants(text, extras);

  // If the text contains Arabic numbers, preprocess them into words. This
  // is because we need to support cases like "23 million", and the word-to-number-node
  // package does not support that. It only supports "twenty-three million"
  if (text.match(SINGLE_DIGIT_REGEX)) {
    // First, check for numbers like "123.45" and replace them with "123 point 45",
    // because the third-party package does not support decimals in input:
    let decimals = text.match(DECIMAL_NUMBER_REGEX);
    if (decimals) {
      for (let decimal of decimals) {
        let replacement = decimal.replace('.', ' point ');
        text = text.replace(decimal, replacement);
      }
    }

    // We turned decimals into [number] "point" number, now convert all
    // numbers into words:
    let matches = text.match(NUMBERS_REGEX) || [];
    if (matches) {
      for (let match of matches) {
        let matchInWords = numToWords(match);
        text = text.replace(match, matchInWords);
      }
    }
  }

  return text;
}

var englishWordsToNumbers = englishWtn;
var numbers_1 = numbers;
englishWordsToNumbers.numbers = numbers_1;

/* eslint-disable */

const pPeriod = /a\.m\.|p\.m\.|e\.g\.|i\.e\.|B\.C\.|P\.E\.I\./i;

// 压缩空格 删除无效的[]或者[ ]  删除无效的{}或者{ }
function cleanSentence(line, icase = false) {
    let _line = line;
    _line = _line.replace(/\s+/gi, ' ').replace(/\[ *\]|\{ *\}/gi, '');
    if (icase) _line = _line.toLowerCase();
    return _line;
}
const ConstDef = Object.freeze({
    SPECIAL_CHAR_LEFT: '｛',
    SPECIAL_CHAR_RIGHT: '｝',
});

function isSign(ch) {
    return ch === ',' || ch === '.' || ch === ':' || ch === '?' || ch === '!' || ch === ';' || ch === '；' || ch === '，' || ch === '。' || ch === '！' || ch === '？' || ch === '、';
}

// 给关键词加上[]
function addBrace(_sentence) {
    let sentence = _sentence;
    let inbrace = false;
    for (let i = 0; i < sentence.length; i++) {
        const ch = sentence[i];
        if (ch === '[' || ch === '{') {
            inbrace = true;
        } else if (ch === ']' || ch === '}') {
            inbrace = false;
        } else if (ch === '/' && !inbrace) {
            let begin = -1;
            let end = sentence.length;
            for (let k = i - 1; k >= 0; k--) {
                const ch2 = sentence[k];
                if (/[^A-Za-z0-9'-_]/.test(ch2)) {
                    begin = k;
                    break;
                }
            }
            for (let k = i + 1; k < sentence.length; k++) {
                const ch2 = sentence[k];
                if (/[^A-Za-z0-9'/-_]/.test(ch2)) {
                    end = k;
                    break;
                }
            }
            if (end > begin) {
                sentence = `${sentence.substring(0, begin + 1)}[${sentence.substring(begin + 1, end)}]${sentence.substring(end)}`;
                i = end + 1;
            }
        }
    }
    return sentence;
}

class Position {
    constructor(start = 0, end = 0, extraFlag = false, text = '', matchPosition = 0) {
        this.start = start;
        this.end = end;
        this.startSen = 0;
        this.endSen = 0;
        this.textY = '';
        this.extraFlag = extraFlag;
        this.textX = text;
        this.matchPosition = matchPosition;
    }
}

// 切割单词
function splitWords(_sentence, _signList, forceKeyWordList, posList) {
    let sentence = _sentence;
    const signList = _signList;
    const list = [];
    sentence = cleanSentence(sentence, false);
    sentence = addBrace(sentence);
    let inbrace = false;

    let bbegin = 0;
    inbrace = false;
    let inBigKuohao = true;
    if (sentence.indexOf(ConstDef.SPECIAL_CHAR_LEFT) >= 0) {
        inBigKuohao = false;
    }
    let validStartIndex = -1;
    let word = '';
    for (let i = 0; i < sentence.length; i++) {
        let ch = sentence.charAt(i);
        if (ch === '[') {
            word = '';
            bbegin = i;
            inbrace = true;
        } else if (ch === ConstDef.SPECIAL_CHAR_LEFT) {
            if (word.length > 0) {
                list.push([word]);
                word = '';
            }

            inBigKuohao = true;
            validStartIndex = list.length;
        } else if (ch === ConstDef.SPECIAL_CHAR_RIGHT) {
            if (word.length > 0) {
                list.push([word]);
                word = '';
            }

            if (inBigKuohao) {
                const pos = new Position();
                pos.start = validStartIndex;
                pos.end = list.length - 1;
                posList.push(pos);
            }

            inBigKuohao = false;
        } else if (ch === ']') {
            inbrace = false;
            const substr = sentence.substring(bbegin + 1, i);
            const sublist = substr.split('/');
            // trim(sublist);
            if (sublist.length > 0) {
                list.push(sublist);
            }
            // exchangeSpaceWord(sublist);
        } else if (ch === '{') {
            word = '';
            bbegin = i;
            inbrace = true;
        } else if (ch === '}') {
            inbrace = false;
            const substr = sentence.substring(bbegin + 1, i);
            const sublist = substr.split('/');
            // trim(sublist);
            if (sublist.length > 0) {
                forceKeyWordList.push(list.length);
            }
            // 带{}表示强制关键词
            // exchangeSpaceWord(sublist);
            list.push(sublist);
        } else if (!inbrace) {
            if (ch === '.' && word.length === 1) {
                // check a.m. p.m. e.g. i.e. B.C. P.E.I.
                const m = pPeriod.exec(sentence.substring(i - 1));
                if (m != null && m.index === 0) {
                    [word] = m;
                    i = i + word.length - 2;
                    list.push([word]);
                    word = '';
                    // eslint-disable-next-line no-continue
                    continue;
                }
            }

            if (isSign(ch)) {
                if (word.length > 0) {
                    list.push([word]);
                    word = '';
                }

                let signs = `${ch}`;
                // end sign
                let k = i + 1;
                for (; k < sentence.length; k++) {
                    ch = sentence.charAt(k);
                    const reg = new RegExp(`[A-Za-z0-9%\\{\\}\\[\\]${ConstDef.SPECIAL_CHAR_LEFT}${ConstDef.SPECIAL_CHAR_RIGHT}]`);
                    if (reg.test(ch)) break;
                    else signs += ch;

                    i = k;
                }

                signList[list.length - 1] = { index: list.length - 1, text: signs.trim(), inScope: inBigKuohao };
            } else if (ch === ' ') {
                // one word
                if (word.length > 0) {
                    list.push([word]);
                    word = '';
                }
            } else if (i === sentence.length - 1) {
                // one word
                word += ch;
                if (word.length > 0) {
                    list.push([word]);
                    word = '';
                }
            } else {
                // append word
                word += ch;
            }
        }
    }

    list.forEach((_words) => {
        const words = _words;
        for (let i = 0; i < words.length; i++) {
            if (words[i].indexOf('\\') >= 0) {
                words[i] = words[i].replace(/\\/g, '/');
            }
        }
    });

    // for (let i=0;i<list.length;i++)
    // {
    //   const word = list[i][0];
    //   if (word && /^%.+%$/.test(word))
    //   {
    //     const v = word.replace('%','').split('#')
    //     const data = {token : v[0], default: v};
    //     list[i] = new_words;
    //   }
    // }
    return list;
}

function getSimpleStringList(srclist) {
    const list = [];
    for (const item of srclist) {
        const newitem = [];
        let count = 0;
        for (const s of item) {
            let str = '';
            if (s.startsWith('%')) {
                str = s;
            } else {
                const array = s.split(/ +/);
                for (const a of array) {
                    if (str.length > 0) {
                        str += ' +';
                    }
                    if (a.length > 3) {
                        str = `${str + a.substring(0, 3)}\\S*`;
                    } else {
                        str = `${str + a}\\S*`;
                    }
                }
            }
            newitem[count++] = str;
        }
        list.push(newitem);
    }
    return list;
}

function wordsToNumber(sen) {
    // eslint-disable-next-line no-restricted-globals
    window.pos = 0;
    return englishWordsToNumbers(sen)
    // return sen;
}

function getNumberWords(sen, useAnd = true) {
    let begin = null;
    let end = 0;
    const text = [];
    let word = '';
    for (let i = 0; i < sen.length; i++) {
        const ch = sen[i];
        let _isSign = isSign(ch);
        if (ch === '.' && /\d/.test(sen[i + 1])) _isSign = false;
        if ((ch === ' ' || _isSign || ch === '+')) {
            if (word === 'and' && text.length && !useAnd) {
                end = i - word.length;
                word = '';
                break;
            }
            const isNum = word.match(pattern_number);
            if (isNum && isNum[0] === word) {
                text.push(word);
                if (begin === null) begin = i - word.length;
            } else if (text.length) {
                end = i - word.length;
                word = '';
                break;
            }
            word = '';
        } else {
            word += ch;
        }

        if (_isSign && text.length) {
            end = i - word.length;
            break;
        }
    }

    if (word) {
        const isNum = word.match(pattern_number);
        if (isNum && isNum[0] == word) {
            text.push(word);
            if (begin === null) begin = sen.length - word.length;
            end = sen.length;
        } else {
            end = sen.length - word.length;
        }
    }

    if (/and|point|decimal/.test(text[0])) {
        begin += text[0].length + 1;
        text.splice(0, 1);
    }

    if (/a|and|point|decimal/.test(text[text.length - 1])) {
        end -= (text[text.length - 1].length + 2);
        text.splice(text.length - 1, 1);
    }
    const _text = text.join(' ');
    if (end == 0) return null;
    return new Position(begin, end, true, _text, 0);
}

function wordCountBetween(start, end, sen) {
    if (end <= start) { return 0; }
    sen = sen.substring(start, end).trim();
    const arr = sen.split(/ +/);
    return arr.length;
}

function isValidIndex(index, posList) {
    if (posList == null || posList.length <= 0) return true;

    for (const item of posList) {
        if (index >= item.start && index <= item.end) return true;
    }

    return false;
}

function hasAnyLetter(sen) {
    return /[a-zA-Z]+/.test(sen);
}

function getSentence(pathlist, words, signList, poslist, replaceList) {
    const sb = [];
    for (let i = 0; i < pathlist.length; i++) {
        if (!isValidIndex(i, poslist)) continue;

        const path = pathlist[i];
        if (sb.length > 0 && sb[sb.length - 1] != ':')
        // 增加：，考虑08:00这种情况
        { sb.push(' '); }
        if (replaceList[i]) { sb.push(replaceList[i]); } else { sb.push(words[i][path]); }

        const so = signList[i];
        if (so != null && so.inScope) sb.push(so.text);
    }
    return sb.join('');
}

function getKeyWordScore(sentence, words, signList, posList) {
    const orignalSen = sentence.toLowerCase();
    const simpleWords = getSimpleStringList(words);
    const hitlist = [];
    const hitPoslist = [];
    const pathlist = [];
    const foundlist = [];
    let lastUsePos = 0;
    const replaceList = {};

    for (let i = 0; i < words.length; i++) {
        if (!isValidIndex(i, posList)) {
            pathlist.push(0);
            continue;
        }

        const items = words[i];
        const isToken = items[0].startsWith('%');
        let tokenDefault = '';
        let token;
        if (isToken) {
            const tokenValues = items[0].replace(/%/g, '').split('#');
            token = config.tokenDefine[tokenValues[0]];
            if (!token) throw `未找到Token:${items[0]}`;
            tokenDefault = tokenValues[1] || token.default;
        }
        const foundlist2 = new Map();
        // let maxspace = 0;
        for (let k = 0; k < items.length; k++) {
            // Fix error http://jira.up366.com:8080/browse/YYFBSTS-7333
            let p;

            if (isToken) {
                if (token.min || token.max) { // 英文转数字再对比
                    const nextAnd = words[i + 1] && words[i + 1][0] == 'and';
                    const pos = getNumberWords(sentence, !nextAnd);
                    if (pos) {
                        const num = wordsToNumber(pos.textX).replaceAll(',', '');
                        foundlist2.set(k, pos);
                        if (new RegExp(`^(${token.regex})$`, 'ig').test(num) && parseFloat(num) >= token.min && parseFloat(num) <= token.max) {
                            replaceList[i] = pos.textX;
                        } else {
                            replaceList[i] = tokenDefault;
                        }
                    }
                }
                p = new RegExp(`\\b(${token.regex})( |\\b|$)`, 'ig');
            } else if (items[k].indexOf('.') > 0) { p = new RegExp(`\\b${items[k].replace(/\./g, '\\.')}(\\.|,| |\\b|$)`, 'ig'); } else { p = new RegExp(`\\b${items[k]}( |\\b|$)`, 'ig'); }

            let m;
            if (foundlist2.size <= 0) {
                if ((m = p.exec(sentence)) != null) {
                    const tempstr = m[0].trim();
                    const end = m.index + m[0].length;
                    if (tempstr.endsWith(' ')) {
                        if (tempstr == items[k]) { foundlist2.set(k, new Position(m.index, end - 1, true, tempstr, m.index)); } else { foundlist2.set(k, new Position(m.index, end - 1, false, tempstr, m.index)); }
                    } else if (tempstr == items[k]) { foundlist2.set(k, new Position(m.index, end, true, tempstr, m.index)); } else { foundlist2.set(k, new Position(m.index, end, false, tempstr, m.index)); }

                    if (isToken) {
                        if (token.upperFirst) {
                            replaceList[i] = tempstr.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2.toLowerCase());
                        } else { replaceList[i] = tempstr; }
                    }
                    // if (this.wordsSpace[i][k] > maxspace)
                    //   maxspace = this.wordsSpace[i][k];
                } else {
                    // if (this.wordsSpace[i][k] <= maxspace)
                    //   continue;
                    if (!isToken) {
                        const pp = new RegExp(`\\b${simpleWords[i][k]}\\b`, 'ig');
                        let mm;
                        if ((mm = pp.exec(sentence)) != null) {
                            const end = mm.index + mm[0].length;
                            foundlist2.set(k, new Position(mm.index, end, false, mm[0].trim()));
                            // if (this.wordsSpace[i][k] > maxspace)
                            //   maxspace = this.wordsSpace[i][k];
                        }
                    }
                }
            }
        }

        if (foundlist2.size <= 0) {
            // due to, to已经被用了， 变成了 due +
            // in the countryside, the 已经被用了，变成了in + countryside
            for (let k = 0; k < items.length; k++) {
                const array = items[k].split(' ');
                let tempstr = '';
                if (array.length >= 2) {
                    if (array.length == 2) { tempstr = `${array[0]} +`; }
                    if (array.length == 3) { tempstr = `${array[0]} + ${array[2]}`; }
                    if (array.length >= 4) { tempstr = `${array[0]} + + ${array[3]}`; }

                    if (orignalSen.indexOf(items[k]) >= 0) {
                        const tempindex = sentence.toLowerCase().indexOf(tempstr);
                        if (tempindex >= 0) {
                            foundlist2.set(k, new Position(tempindex, tempindex + tempstr.length, true, items[k],
                                tempindex));
                            hitlist.push(items[k]);
                            hitPoslist.push(tempindex);

                            break;
                        }
                    }
                }
            }
        }
        if (foundlist2.size <= 0) {
            pathlist.push(0);
        } else {
            const keys = [...foundlist2.keys()];
            let foundindex = keys[0];
            let p = foundlist2.get(keys[0]);
            if (keys.length == 1) {
                // all of the museums [all museums/the museums/all the museums]
                for (let mm = 0; mm < items.length; mm++) {
                    if (mm == foundindex) { continue; }
                    const tempindex = items[mm].indexOf(p.textX.trim());
                    if (tempindex > 0 && items[mm].length > p.textX.length) {
                        let tempstr = items[mm].substring(0, tempindex).trim();
                        tempstr = `${tempstr} +[a-zA-Z]+ +${p.textX.trim()}`;
                        const pp = new RegExp(`\\b${tempstr}( |\\b|$)`, 'ig');
                        let m;
                        if ((m = pp.exec(sentence)) != null) {
                            const end = m.index + m[0].length;
                            if (m[0].endsWith(' ')) { p = new Position(m.index, end - 1, true, m[0].trim()); } else { p = new Position(m.index, end, true, m[0]); }
                            foundindex = mm;
                            break;
                        }
                    }
                }
            } else {
                for (let mm = 1; mm < keys.length; mm++) {
                    const p2 = foundlist2.get(keys[mm]);
                    if (p.start > p2.start && p2.start >= lastUsePos
            && wordCountBetween(p2.end, p.start, sentence) >= 2) {
                        foundindex = keys[mm];
                        p = p2;
                    } else if (p2.start <= p.start && p2.end - p2.start > p.end - p.start) {
                        foundindex = keys[mm];
                        p = p2;
                    } else if (p2.start > p.start && wordCountBetween(p.end, p2.start, sentence) <= 2
            && ((p2.extraFlag && p2.end - p2.start > p.end - p.start)
                || (p2.extraFlag && !p.extraFlag && p2.end - p2.start == p.end - p.start))) {
                        foundindex = keys[mm];
                        p = p2;
                    }
                }
            }

            pathlist.push(foundindex);
            foundlist.push(i);
            sentence = `${sentence.substring(0, p.start)}+${sentence.substring(p.end)}`;
            lastUsePos = p.end;

            hitlist.push(p.textX);
            // System.out.println(p.start);
            hitPoslist.push(p.start);
        }
        if (isToken && !replaceList[i]) {
            // If can't find use default
            // %hour%08 get 08
            // %month%October get October
            // const index = items[0].lastIndexOf("%");
            // if (index > 0)
            // {
            replaceList[i] = tokenDefault; // items[0].substring(index+1);
            // }
        }
    }

    sentence = sentence.trim();

    sentence = sentence.replace(/\-/g, '');
    if (hasAnyLetter(sentence)) {
        for (let i = 0; i < simpleWords.length; i++) {
            if (foundlist.indexOf(i) > -1) { continue; }
            if (!isValidIndex(i, posList)) { continue; }

            const items = simpleWords[i];
            let s = 0;
            let e = 0;
            let index = -1;
            for (let k = 0; k < items.length; k++) {
                const p = new RegExp(`\\b${items[k]}\\b`, 'ig');
                let m;
                if ((m = p.exec(sentence)) != null) {
                    const end = m.index + m[0].length;
                    if (end - m.index > e - s && m.index <= s + 8) {
                        s = m.index;
                        e = end;
                        index = k;
                    }
                }
            }

            if (index >= 0) {
                pathlist[i] = index;
                sentence = `${sentence.substring(0, s)}+${sentence.substring(e)}`;
                foundlist.push(i);
            }
        }
    }

    if (hasAnyLetter(sentence)) {
        const missedwords = splitWords1(sentence);
        let p;
        for (let i = 0; i < words.length; i++) {
            if (foundlist.indexOf(i) > -1) { continue; }

            if (!isValidIndex(i, posList)) { continue; }

            const items = words[i];
            const hitcount = [];
            let found = false;
            const foundmissedwords = [];
            for (let k = 0; k < items.length; k++) {
                hitcount[k] = 0;
                for (const missedword of missedwords) {
                    if (/^\++$/g.test(missedword)) { continue; }
                    try {
                        p = new RegExp(`\\b${missedword.replace(/\++/g, '')}\\b`, 'ig');
                        if ((m = p.exec(items[k])) != null) {
                            found = true;
                            hitcount[k]++;
                            foundmissedwords.push(missedword);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }

            if (found) {
                for (const oundmissedword of foundmissedwords) {
                    missedwords.splice(missedwords.indexOf(oundmissedword), 1);
                }

                let maxhit = 0;
                let index = 0;
                for (let k = 0; k < hitcount.length; k++) {
                    if (hitcount[k] > maxhit) {
                        index = k;
                        maxhit = hitcount[k];
                    }
                }
                pathlist[i] = index;
            }
        }
    }

    const referText = getSentence(pathlist, words, signList, posList, replaceList);
    return referText;
}

function parseReference(content) {
    console.log(content, 'content');
    const refs = [];
    const forcekeyWordList = [];
    const posList = [];
    const signList = new Map();
    const words = splitWords(content.replace(/\/\//g, '\\').replace(/( |\t){2,}/g, ' ').replace(/‘|’/ig, "'"), signList, forcekeyWordList, posList);
    let ret = [[]];

    forcekeyWordList.forEach((i) => {
        words[i] = words[i].concat(['']);
    });

    for (let i = 0; i < words.length; i++) {
        const tarr = [];
        for (let j = 0; j < ret.length; j++) {
            for (let k = 0; k < words[i].length; k++) {
                let s = ret[j].concat(words[i][k]);
                if (signList[i]) s = s.concat(signList[i].text);
                tarr.push(s);
            }
        }
        ret = tarr;
    }
    ret.forEach((v) => {
        const content = v.join(' ');
        const _signList = [];
        const _forceKeyWordList = [];
        const _posList = [];
        const _words = splitWords(content, _signList, _forceKeyWordList, _posList);
        const newContent = getKeyWordScore(content, _words, _signList, _posList);
        refs.push(newContent);
    });
    return refs;
}


function validString(value) {
    return !!value && value.trim().length > 0;
}

function referenceData(refs) {
    let references = [];
    if (typeof refs === 'string') {
        refs.split(/\||(\r)?\n/).forEach((v) => {
            console.log(v, 1);
            if (v) {
                const r = parseReference(v);
                references = references.concat(r);
            }

        });
    } else {
        console.log('refs:', refs);
        refs.forEach((v) => {
            v.forEach((n) => {
                console.log(v, 2);
                const r = parseReference(n);
                references = references.concat(r);
            });
        });
    }
    return references;
}


function getReferenceList(references) {
    const referenceList = [];
    let t = new Date().getTime();
    const refs = referenceData(references);
    const _references = refs.join('|');
    console.log('references length', refs.length);
    const hasReference = validString(_references);
    if (hasReference) {
        let content = _references;
        content = content.replace(/\/\//g, '\\').replace(/( |\t){2,}/g, ' ').replace(/‘|’/ig, "'");
        let list = [];
        if (content.indexOf('|') > 0) {
            content = content.replace(/(\r)?\n/g, ' ');
        } else {
            content = content.replace(/(\r)?\n/g, '|');
        }
        list = content.split('|');
        for (let i = 0, l = list.length; i < l; i++) {
            let item = list[i];
            item = item.trim();
            if (item.length !== 0) {
                referenceList.push(item);
            }
        }
    }
    t = new Date().getTime() - t;
    console.log('parse time', t);
    // console.log('referenceList:', referenceList);
    return referenceList;
}

// export default getReferenceList;
