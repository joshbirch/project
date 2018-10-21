class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(rows).fill().map(() => Array(cols).fill(0));

  }

  static dot(a, b) {
    if (b instanceof Matrix) {
      if (a.cols != b.rows) {
        console.log("Incompatible matrix sizes!");
        return;
      }
      var result = new Matrix(a.rows, b.cols);
      for (var i = 0; i < a.rows; i++) {
        for (var j = 0; j < b.cols; j++) {
          var sum = 0;
          for (var k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }
      return result;
    } else {
      let result = Matrix.copy(a);
      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < a.cols; j++) {
          result.data[i][j] *= b
        }
      }
      return result;
    }
  }

  static toMatrix(a) {
    let returned = new Matrix(a.length, 1);
    for (let i = 0; i < a.length; i++) {
      returned.data[i][0] = a[i];
    }
    return returned;
  }

  static add(a, b) {
    let result = Matrix.copy(a);
    if (b instanceof Matrix) {
      if ((a.rows == b.rows) && (a.cols == b.cols)) {
        for (var i = 0; i < result.rows; i++) {
          for (var j = 0; j < result.cols; j++) {
            result.data[i][j] += result.data[i][j];
          }
        }
      } else {
        console.error('Matrix dimensions not equal for addition')
      }
    } else {
      for (var i = 0; i < result.rows; i++) {
        for (var j = 0; j < result.cols; j++) {
          result.data[i][j] += b;
        }
      }
    }
    return result;

  }




  multiply(other) {
    if (other instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= other.data[i][j];
        }
      }
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= other;
        }
      }
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

  static map(m, func) {
    if (m instanceof Matrix) {
      let a = Matrix.copy(m)
      for (var i = 0; i < a.rows; i++) {
        for (var j = 0; j < a.cols; j++) {
          a.data[i][j] = func(m.data[i][j]);
        }
      }
      return a
    } else {
      console.error(`${m} is not a matrix and cannot be mapped to`)
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
    this.map(Math.random)
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

  static subtract(a, b) {
    let m = Matrix.copy(a);
    m.subtract(b);
    return m;
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