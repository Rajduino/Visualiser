function SelectionSortMax() {
   this.name = 'Selection sort (Max)';
   this.count = 40;
   this.representation = 1;
   this.sorter = function* (arr, colors) {
      for (let i = arr.length - 1; i >= 0; --i) {
         // Find maximum element
         let index = i;

         for (let j = 0; j <= i; ++j) {
            myDelay(100);
            colors[j] = color('red');
            colors[index] = color('blue');
            yield colors;
            colors[j] = color('white');
            colors[index] = color('white');
            if (arr[j] > arr[index]) {
               index = j;
            }
         }

         // Swap with current element
         if (index !== i) {
            swap(arr, i, index);
         }

         // Current element is correctly sorted
         colors[i] = color(128, 255, 51);
         yield colors;
      }

      return colors;
   }

}