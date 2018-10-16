class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(rows).fill().map(() => Array(cols).fill(0));

  }


  static multiply(a, b) {
   // Won't work if columns of A don't equal columns of B
   if (a.cols != b.rows) {
    console.log("Incompatible matrix sizes!");
    return;
  }
  // Make a new matrix
  var result = new Matrix(a.rows, b.cols);
  for (var i = 0; i < a.rows; i++) {
    for (var j = 0; j < b.cols; j++) {
      // Sum all the rows of A times columns of B
      var sum = 0;
      for (var k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }
      // New value
      result.data[i][j] = sum;
    }
  }
  return result;
}

  static toMatrix(a) {
    let returned = new Matrix(a.length, 1);
    for (let i = 0; i < a.length; i++) {
      returned.data[i][0] = a[i];
    }
    return returned;
  }




  multiply(n) {
    if (isNaN(n)) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    } else {
      console.error('Invalid multiplication input');
    }

  }

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
    // let num = Math.random();
    // console.log(`Random ${num}`);
    this.map(() => Math.random())
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

  static fromArray(n) {
    let mat = new Matrix(n.length, 1);
    for (let i = 0; i < n.length; i++) {
      mat.data[i][0] = n[i];
    }

    return mat;
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      arr.push(this.data[i][0])
    }
    return arr;
  }


}