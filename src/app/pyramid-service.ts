import { Injectable } from '@angular/core';
 
 @Injectable()
 export class PyramidService {
   
   height: number;
   elems : number;
  
   init(pyr) {
      pyr =  [ ];
      for (let i = 0; i < this.elems; i++) {
              pyr.push(NaN);
      }
  
  
  }
  
  
  is_empty(pyr) {
      for (let i = 0; i < this.elems; i++) {
          if (!isNaN(pyr[i]))
              return false;
      }
  
      return true;
  }
  
  copy_pyramid(pyr_src, pyr_dst) {
      for (let i = 0; i < this.elems; i++) {
          pyr_dst[i] = pyr_src[i];
      }
  }
  
  is_full(pyr) {
      for (let i = 0; i < this.elems; i++) {
          if (isNaN(pyr[i]))
              return false;
      }
  
      return true;
  }
  
  is_neg(pyr) {
      for (let i = 0; i < this.elems; i++) {
          if (pyr[i] < 0)
              return true;
      }
  
      return false;
  }
  
  
  remove_one(pyr) {
  
      if (this.is_empty(pyr))
          return -1;
  
      let p = 0;
      do {
          p = Math.floor(Math.random()*this.elems);
  
      } while (isNaN(pyr[p]));
  
      let pos = this.get_pos(p);
  
      let val = pyr[p];
  
      pyr[p] = NaN;
  
      return { pos: p, val: val} ;
  }
  
  
  add_one(pyr) {
  
      if (this.is_full(pyr))
          return -1;
  
      let p = 0;
      do {
          p = Math.floor(Math.random()*this.elems);
  
      } while (!isNaN(pyr[p]));
  
      let pos = this.get_pos(p);
  
      let val = Math.floor(Math.random()*(this.height-pos.row)*5 );
  
      pyr[p] = val;
  
      return 0;
  }
  
  get_pos(idx) {
  
      let row = 0;
      let col = 0;
  
      let x = Math.floor(Math.sqrt(2*idx));
  
      let b = (x+1)*(x+1) + x - 1;
      let a = (x+1)*(x+1) - x - 1;
  
      if ( (2*idx >= a) && (2*idx <= b) )
          row = x;
      else
          row = x-1;
  
      col = idx - row*(row+1)/2;
      
      return { row: row, col: col };
  
  }
  
  get_idx(pos) {
      return pos.row*(pos.row+1)/2 + pos.col;
  }
  
  solve_basic(pyr, idx) {
      let pos = this.get_pos(idx);
  
      if (pos.row >= (this.height - 1))
          return 0;
  
      let top_idx = idx;
      let top = pyr[idx];
      pos.row++;
      let left_idx = this.get_idx(pos);
      let left = pyr[left_idx];
      pos.col++;
      let right_idx = this.get_idx(pos);
      let right = pyr[right_idx];
  
      if (isNaN(top)) {
          if (isNaN(left) || isNaN(right))
              return -1;
          else {
              top = left + right;
              pyr[top_idx] = top;
              return 1;
          }
      } else {
          
          if (isNaN(left) && isNaN(right)) 
              return -1;
  
          if (isNaN(left)) {
              left = top - right;
              pyr[left_idx] = left;
              return 1;
          }
          if (isNaN(right)) {
              right = top - left;
              pyr[right_idx] = right;
              return 1;
          }
      }
      return 0;
  
  }
  
  solve(pyr) {
      let finished = true;
      let i = 0;
      while (i < (this.elems-this.height)) {
          let res = this.solve_basic(pyr, i);
  
          // if something was inserted
          if  (res == 1) {
              i = 0;
              finished = true;
          }
          else if (res == -1) {  // Cannot do anything
              finished = false;
              i++;
          }
          else {
              i++;
          }
  
      }
      return finished;
  }
  
  generate(height) {
    console.log("height: "  + height);
    this.height = height;

    var pyramid = [  ]; 
    var pyramid2 = [  ];

    this.elems = height*(height+1)/2;

    this.init(pyramid);
    this.init(pyramid2);

    // Just initialize last row
    for (let i = (this.elems-height); i < this.elems; i++) {
        let val = Math.floor(Math.random()*5 );
        pyramid[i] = val;
    }
  
  
    this.solve(pyramid);
  
      let s = true;
  
      do {
          let x : any;
          x = this.remove_one(pyramid);
          this.copy_pyramid(pyramid, pyramid2);
  
          s = this.solve(pyramid2);
          if (!s) {
              pyramid[x.pos] = x.val;
              break;
          }
  
      } while (s);

      for (let i = 0; i < this.elems; i++) {
          if (isNaN(pyramid[i]))
            pyramid2[i] = '*';
          else
            pyramid2[i] = pyramid[i].toString();
      }

      console.log(pyramid2);

      // return array of array
      var rows = [ ];

      for (let i = 0; i < height; i++) {
        rows.push( pyramid2.slice(i*(i+1)/2, i*(i+1)/2 + i+1) );
      }

      return rows;
  
  }
    
 }
