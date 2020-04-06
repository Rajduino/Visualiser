function QuickSortHoare() {
   this.name = 'Quick sort (Hoare)';
   this.count = 40;
   this.representation = 1;
   this.sorter = function* quickSortHoare(arr, colors, start = 0, end = arr.length - 1, self = this) {
      if (start < end) {
         // Partition list with pivot
         let ref = {};
         yield* self['helpers']['partition'](arr, colors, start, end, ref);
         let p = ref[''];

         // Sort parts recursively
         yield* self['sorter'](arr, colors, start, p, self);
         yield* self['sorter'](arr, colors, p + 1, end, self);
      } else {
         colors[start] = color(128, 255, 51);
      }

      return colors;
   };
   this.helpers = {
      partition: function* (arr, colors, start, end, j) {
         let pivot = arr[start];
         let i = start - 1;
         j[''] = end + 1;

         while (true) {
            do {
               ++i;
               compares++;
            } while (arr[i] < pivot);


            do {
               --j[''];
               compares++;
            } while (arr[j['']] > pivot);

            colors[i] = color('red');
            colors[j['']] = color('red');
            yield colors;
            colors[i] = color('white');
            colors[j['']] = color('white');

            if (i >= j[''])
               break;

            swap(arr, i, j['']);
            swaps++;
            myDelay(100);
         }
      }
   }
}