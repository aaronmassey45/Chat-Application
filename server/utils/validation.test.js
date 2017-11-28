const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let number = isRealString(123)
    expect(number).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    let empty = isRealString('      ')
    expect(empty).toBeFalsy();
  });

  it('should allow strings with length > 0', () => {
    let correct = isRealString('Ya moms a hoe')
    expect(correct).toBeTruthy();
  });
});
