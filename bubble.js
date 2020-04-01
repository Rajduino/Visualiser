
function BubbleSort() {
   this.name = 'Bubble sort';
   this.count = 20;
   this.representation = 1;
   this.sorter =
      function* (arr, colors) {
         for (let n = arr.length; n > 0; --n) {
            for (let i = 0; i < n - 1; ++i) {
               // Select two elements and swap if in wrong order
               myDelay(100);
               colors[i] = color('red');
               colors[i + 1] = color('red');
               yield colors;
               colors[i] = color('white');
               colors[i + 1] = color('white');
               if (arr[i] > arr[i + 1]) {
                  swap(arr, i, i + 1);
               }
            }
            colors[n - 1] = color(128, 255, 51);
         }

         return colors;

      }
}