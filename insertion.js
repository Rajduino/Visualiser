function InsertionSort() {
   this.name = 'Insertion sort';
   this.count = 20;
   this.representation = 1;
   this.sorter = function* (arr, colors) {
      for (let i = 1; i < arr.length; ++i) {
         passes++;
         let j = i - 1;

         while (j >= 0 && arr[j] > arr[i]) {
            myDelay(100);
            colors[i] = color('red');
            yield colors;
            colors[i] = color('white');
            swap(arr, i, j);
            swaps++;
            compares++;
            swap(colors, i--, j--);
         }
      }

      //Converting white to green
      for (let key in colors)
         colors[key] = color(128, 255, 51);

      return colors;
   }
}