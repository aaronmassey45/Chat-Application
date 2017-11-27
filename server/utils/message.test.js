const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message', () => {
    let from = 'Me';
    let text = 'Some message';

    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    let from = 'Me';
    let lat = 1, lng = 1;

    let message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      url: 'https://www.google.com/maps?q=1,1'
    });
  });
});
