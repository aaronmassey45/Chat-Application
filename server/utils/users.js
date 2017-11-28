class Users {
  constructor() {
    this.users = [];
  }

  addUser (id, name, room) {
    let user = { id, name, room };
    this.users = [...this.users, user];
    return user;
  }

  removeUser(id) {
    let removedUser = this.getUser(id);
    if (removedUser) {
      this.users = this.users.filter(user => user.id !== id);
    }  
    return removedUser;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    let users = this.users.filter(user => user.room === room);
    let namesArr = users.map(user => user.name);
    return namesArr;
  }
}

module.exports = { Users }
