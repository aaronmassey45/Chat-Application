const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Aaron',
        room: 'Naruto'
      },
      {
        id: '2',
        name: 'Baron',
        room: 'Boruto'
      },
      {
        id: '3',
        name: 'Caron',
        room: 'Naruto'
      }
    ]
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Aaron',
      room: 'Naruto'
    };

    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for Naruto room', () => {
    let userList = users.getUserList('Naruto');
    expect(userList).toEqual(['Aaron', 'Caron'])
  });

  it('should return names for Boruto room', () => {
    let userList = users.getUserList('Boruto');
    expect(userList).toEqual(['Baron'])
  });

  it('should remove a user', () => {
    let user = users.removeUser('1');
    expect(users.users.length).toBe(2);
    expect(user.id).toBe('1');
  });

  it('should not remove a user', () => {
    let user =  users.removeUser('100');
    expect(users.users.length).toBe(3);
    expect(user).toNotExist();
  });

  it('should find user', () => {
    let user = users.getUser('2');
    expect(user.id).toBe('2');
  });

  it('should not find user', () => {
    let user = users.getUser('432');
    expect(user).toNotExist();
  });
});
