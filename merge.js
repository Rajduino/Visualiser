function MergeSort() {
   this.name = 'Merge sort (in-place)';
   this.count = 40;
   this.representation = 1;
   this.sorter = function* (arr, colors, start = 0, end = arr.length - 1, self = this) {
      if (start < end) {
         // Split array into two parts
         let middle = floor((start + end) / 2);

         // Sort parts recursively
         yield* self['sorter'](arr, colors, start, middle, self);
         yield* self['sorter'](arr, colors, middle + 1, end, self);

         // Merge sorted parts
         yield* self['helpers']['merge'](arr, colors, start, middle, end);
      }

      return colors;
   };
   this.helpers = {
      merge: function* (arr, colors, start, middle, end) {
         let i = start;
         let j = middle + 1;

         while (i <= middle && j <= end) {
            passes++;
            myDelay(100);
            colors[i] = color('red');
            colors[j] = color('red');
            yield colors;
            colors[i] = color(128, 255, 51);
            colors[j] = color(128, 255, 51);
            compares++;
            if (arr[i] > arr[j]) {
               for (let k = i; k <= j; ++k) {
                  swap(arr, k, j);
                  swaps++;
                  swap(colors, k, j);
               }

               ++j;
               ++middle;
            }
            ++i;
         }
      }
   }
}