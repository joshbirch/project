class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(rows).fill().map(() => Array(cols).fill(0));

  }

  /*
      Required functions
      -Addition *       static
      -Subtraction *    static
      -Multiply {Hadamard or scalar dependant on data type of variable passed in}
      -Randomise *
      -Map  *
      -Transpose
      -copy
  */
  print() {
    console.table(this.data);
  }

  map(func) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }

  }

  static copy(mat) {
    let returned = new Matrix(mat.rows, mat.cols);
    for (var i = 0; i < mat.rows; i++) {
      for (var j = 0; j < mat.cols; j++) {
        returned.data[i][j] = mat.data[i][j];
      }
    }
    return returned;
  }

  randomise() {
    this.map(() => Math.floor(Math.random() * 10 - 5))
  }

  add(n) {
    if (n instanceof Matrix) {
      if ((n.rows == this.rows) && (this.cols == n.cols)) {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.cols; j++) {
            this.data[i][j] += n.data[i][j];
          }
        }
      } else {
        console.error('Matrix dimensions not equal');
      }


    } else if (!isNaN(n)) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    } else {
      console.error('Unexpected input type')
    }
  }

  subtract(n) {
    if (n instanceof Matrix) {
      if ((n.rows == this.rows) && (this.cols == n.cols)) {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.cols; j++) {
            this.data[i][j] -= n.data[i][j];
          }
        }
      } else {
        console.error('Matrix dimensions not equal');
      }


    } else if (!isNaN(n)) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] -= n;
        }
      }
    } else {
      console.error('Unexpected input type')
    }
  }

  static transpose(mat) {
    let n = new Matrix(mat.cols, mat.rows);
    for (var i = 0; i < n.rows; i++) {
      for (var j = 0; j < n.cols; j++) {
        n.data[i][j] = mat.data[j][i]
      }
    }
    return n;
  }

  static arrToMatrix(n) {
    let matr = new Matrix(n.length, 1);
    for (let i = 0; i < n.length; i++) {
      console.log(n[i])
      matr.data[i][0] = n[i];
    }
    matr.print();
    return matr;
  }


}