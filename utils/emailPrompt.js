const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function getEmailAndPassword() {
    return new Promise((resolve, reject) => {
      readline.question('Enter your Gmail email: ', (email) => {
        readline.question('Enter your Gmail password: ', (password) => {
          readline.close();
          resolve({ email, password });
        });
      });
    });
  }
  
  module.exports = { getEmailAndPassword };