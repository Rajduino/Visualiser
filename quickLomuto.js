function QuickSortLomuto() {
   this.name = 'Quick sort (Lomuto)';
   this.count = 40;
   this.representation = 1;
   this.sorter = function* (arr, colors, start = 0, end = arr.length - 1, self = this) {
      if (start < end) {
         // Partition list with pivot
         let ref = {};
         yield* self['helpers']['partition'](arr, colors, start, end, ref);
         let p = ref[''];

         // Sort parts recursively
         yield* self['sorter'](arr, colors, start, p - 1);
         yield* self['sorter'](arr, colors, p + 1, end);
      } else {
         colors[start] = color(128, 255, 51);
      }

      return colors;
   };
   this.helpers = {
      partition: function* (arr, colors, start, end, i) {
         let pivot = arr[end];
         i[''] = start;

         for (let j = i['']; j < end; ++j) {
            myDelay(100);
            passes++;
            compares++;
            if (arr[j] < pivot) {
               colors[i['']] = color('red');
               colors[j] = color('red');
               yield colors;
               colors[i['']] = color('white');
               colors[j] = color('white');
               swap(arr, i['']++, j);
               swaps++;
            }
         }

         swap(arr, i[''], end);
         swaps++;
         colors[i['']] = color(128, 255, 51);
      }
   }
}