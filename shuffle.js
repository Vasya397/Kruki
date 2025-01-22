const shuffle = (array) => {
  if(array.length > 5) return array.length
    let m = array.length, t, i;
    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  export default shuffle;