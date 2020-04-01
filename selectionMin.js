function SelectionSortMin() {
   this.name = 'Selection sort (Min)';
   this.count = 40;
   this.representation = 1;
   this.sorter = function* (arr, colors) {
      for (let i = 0; i < arr.length; ++i) {
         // Find minimum element
         let index = i;

         for (let j = i; j < arr.length; ++j) {
            myDelay(100);
            colors[j] = color('red');
            colors[index] = color('blue');
            yield colors;
            colors[j] = color('white');
            colors[index] = color('white');
            if (arr[j] < arr[index]) {
               index = j;
            }
         }

         // Swap with current element
         if (index !== i) {
            swap(arr, i, index);
         }

         // Current element is correctly sorted
         colors[i] = color(108, 255, 51);
         yield colors;
      }

      return colors;
   }
}