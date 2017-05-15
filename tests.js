/* eslint-disable no-undef */
/**
 * Dependencies.
 */

if (typeof require !== 'undefined') {
  expect = require('expect.js');
  seconds = require('./');
}

// strings

describe('seconds(string)', function() {
  it('should not throw an error', function() {
    expect(function() {
      seconds('1m');
    }).to.not.throwError();
  });

  it('should preserve seconds', function() {
    expect(seconds('100')).to.be(100);
  });

  it('should convert from ms to seconds', function() {
    expect(seconds('1000ms')).to.be(1);
  });

  it('should convert from m to seconds', function() {
    expect(seconds('1m')).to.be(60);
  });

  it('should convert from h to seconds', function() {
    expect(seconds('1h')).to.be(3600);
  });

  it('should convert d to seconds', function() {
    expect(seconds('2d')).to.be(172800);
  });

  it('should work with decimals', function() {
    expect(seconds('1.5h')).to.be(5400);
  });

  it('should work with multiple spaces', function() {
    expect(seconds('1   s')).to.be(1);
  });

  it('should return NaN if invalid', function() {
    expect(isNaN(seconds('☃'))).to.be(true);
  });

  it('should be case-insensitive', function() {
    expect(seconds('1.5H')).to.be(5400);
  });

  it('should work with numbers starting with .', function() {
    expect(seconds('.5ms')).to.be(0.0005);
  });
});

// long strings

describe('seconds(long string)', function() {
  it('should not throw an error', function() {
    expect(function() {
      seconds('53 milliseconds');
    }).to.not.throwError();
  });

  it('should convert milliseconds to seconds', function() {
    expect(seconds('53 milliseconds')).to.be(0.053);
  });

  it('should convert msecs to seconds', function() {
    expect(seconds('17 msecs')).to.be(0.017);
  });

  it('should convert sec to seconds', function() {
    expect(seconds('1 sec')).to.be(1);
  });

  it('should convert from min to seconds', function() {
    expect(seconds('1 min')).to.be(60);
  });

  it('should convert from hr to seconds', function() {
    expect(seconds('1 hr')).to.be(3600);
  });

  it('should convert days to seconds', function() {
    expect(seconds('2 days')).to.be(172800);
  });

  it('should work with decimals', function() {
    expect(seconds('1.5 hours')).to.be(5400);
  });
});

// numbers

describe('seconds(number, { long: true })', function() {
  it('should not throw an error', function() {
    expect(function() {
      seconds(500, { long: true });
    }).to.not.throwError();
  });

  it('should support seconds', function() {
    expect(seconds(1, { long: true })).to.be('1 second');
    expect(seconds(35, { long: true })).to.be('35 seconds');
  });

  it('should support minutes', function() {
    expect(seconds(60, { long: true })).to.be('1 minute');
    expect(seconds(600, { long: true })).to.be('10 minutes');
  });

  it('should support hours', function() {
    expect(seconds(60 * 60, { long: true })).to.be('1 hour');
    expect(seconds(60 * 1000, { long: true })).to.be('17 hours');
    expect(seconds(60 * 1200, { long: true })).to.be('20 hours');
  });
  //
  it('should support days', function() {
    expect(seconds(24 * 60 * 60, { long: true })).to.be('1 day');
    expect(seconds(24 * 60 * 60 * 1.2, { long: true })).to.be('1 day');
    expect(seconds(60 * 10000, { long: true })).to.be('7 days');
    expect(seconds(24 * 60 * 60 * 10, { long: true })).to.be('10 days');
  });

  it('should round', function() {
    expect(seconds(234234, { long: true })).to.be('3 days');
  });
});

// numbers

describe('seconds(number)', function() {
  it('should not throw an error', function() {
    expect(function() {
      seconds(500);
    }).to.not.throwError();
  });

  it('should support seconds', function() {
    expect(seconds(10)).to.be('10s');
    expect(seconds(59)).to.be('59s');
  });

  it('should support minutes', function() {
    expect(seconds(60 * 1)).to.be('1m');
    expect(seconds(60 * 10)).to.be('10m');
  });

  it('should support hours', function() {
    expect(seconds(60 * 60)).to.be('1h');
    expect(seconds(60 * 60 * 10)).to.be('10h');
  });

  it('should support days', function() {
    expect(seconds(24 * 60 * 60)).to.be('1d');
    expect(seconds(24 * 60 * 60 * 10)).to.be('10d');
  });

  it('should round', function() {
    expect(seconds(234234)).to.be('3d');
  });
});

// invalid inputs

describe('seconds(invalid inputs)', function() {
  it('should throw an error, when seconds("")', function() {
    expect(function() {
      seconds('');
    }).to.throwError();
  });

  it('should throw an error, when seconds(undefined)', function() {
    expect(function() {
      seconds(undefined);
    }).to.throwError();
  });

  it('should throw an error, when seconds(null)', function() {
    expect(function() {
      seconds(null);
    }).to.throwError();
  });

  it('should throw an error, when seconds([])', function() {
    expect(function() {
      seconds([]);
    }).to.throwError();
  });

  it('should throw an error, when seconds({})', function() {
    expect(function() {
      seconds({});
    }).to.throwError();
  });

  it('should throw an error, when seconds(NaN)', function() {
    expect(function() {
      seconds(NaN);
    }).to.throwError();
  });
});
