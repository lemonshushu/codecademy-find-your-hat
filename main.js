const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field;
    this._currX = 0;
    this._currY = 0;
    this._width = field[0].length;
    this._height = field.length;
  }

  print() {
    this._field.forEach(row => {
      let outp = '';
      row.forEach(c => outp = outp + c + ' ');
      console.log(outp+'\n');
    });
  }

  checkContinue(command) {
    let nextX = this._currX;
    let nextY = this._currY;

    switch(command) {
      case 'u':
        nextY--;
        break;
      case 'd':
        nextY++;
        break;
      case 'l':
        nextX--;
        break;
      case 'r':
        nextX++;
        break;
      default:
        console.log('Invalid input.')
        return false;
    }

    if (nextX < 0 || nextX >= this._width || nextY < 0 || nextY >= this._height) {
      console.log('Out of bounds instruction');
      return false;
    } else if (this._field[nextY][nextX] === hole) {
      console.log('Sorry, you fell down a hole!');
      return false;
    } else if (this._field[nextY][nextX] === hat) {
      this._currX = nextX;
      this._currY  = nextY;
      this._field[this._currY][this._currX] = pathCharacter;
      this.print();
      console.log('Congrats, you found your hat!');
      return false;
    } else {
      this._currX = nextX;
      this._currY  = nextY;
      this._field[this._currY][this._currX] = pathCharacter;
      return true;
    }
  }

}

let gameOver = false;

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

while(!gameOver) {
  myField.print();
  let command = prompt('Which Way?');
  gameOver = !myField.checkContinue(command);
}