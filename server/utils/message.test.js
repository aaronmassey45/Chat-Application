const expect = require('expect');

let {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message', () => {
    let from = 'Me';
    let text = 'Some message';

    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});
