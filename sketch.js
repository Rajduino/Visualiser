let array,
  colors,
  sorter,
  representation,
  paused = true,
  w,
  passes,
  swaps,
  compares;
let pageNo;
const bubbleSort = new BubbleSort();
const selectionSortMax = new SelectionSortMax();
const selectionSortMin = new SelectionSortMin();
const insertionSort = new InsertionSort();
const mergeSort = new MergeSort();
const quickSortLomuto = new QuickSortLomuto();
const quickSortHoare = new QuickSortHoare();
const DOT = 0,
  LINE = 1;

const col = {
  r: 250,
  g: 0,
  b: 190
};

const spot = {
  x: 0,
  y: 0
};


const algorithms = {
  bubbleSort,
  selectionSortMax,
  selectionSortMin,
  insertionSort,
  mergeSort,
  quickSortLomuto,
  quickSortHoare,
  auxualary: {
    name: 'And a lot more coming soon!!',
    count: 0,
    representation: LINE,
    sorter: function* (arr, colors) { }
  }
}

function initialiseElements() {
  if (pageNo === 1) {
    let select_algorithm = createSelect();
    select_algorithm.position(10, 10);

    for (let algo in algorithms) {
      select_algorithm.option(algorithms[algo]['name'], algo);
    }

    select_algorithm.changed(() => {
      let algorithm = algorithms[select_algorithm.value()];
      input_count.value(algorithm['count']);
      init(algorithm, algorithm['count']);
      shuffle(array, true);
    });

    let input_count = createInput(algorithms[select_algorithm.value()]['count'].toString());
    input_count.position(10, 60);
    input_count.attribute('type', 'number');
    input_count.attribute('min', '10');
    input_count.attribute('max', '1000');

    let button_range = createButton('Ordered');
    button_range.position(10, 80);
    button_range.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
    });

    let button_reversed = createButton('Reversed');
    button_reversed.position(10, 100);
    button_reversed.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
      reverse(array);
    });

    let button_shuffled = createButton('Shuffled');
    button_shuffled.position(10, 120);
    button_shuffled.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
      shuffle(array, true);
    });

    /*
    let button_random = createButton('Random');
    button_random.position(10, 140);
    button_random.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
  
      let maximum = max(array);
      let minimum = min(array);
  
      for (let i in array) {
        array[i] = random(minimum, maximum);
      }
    });
  
    let button_noise = createButton('Noise');
    button_noise.position(10, 160);
    button_noise.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
    });
    */

    // let button_back = createButton('Back');
    // button_back.position(width - 200, 10);
    // button_back.mousePressed(() => {
    //   pageNo = 0;
    //   // colors = null;
    //   // sorter = null;
    //   // representation = 0;
    //   // paused = true;
    //   // w = 0;
    //   // noLoop();
    //   // clear();
    //   background(0);
    //   // loop();
    // });

    let button_pause = createButton('Pause');
    button_pause.position(10, 35);
    button_pause.mousePressed(() => {
      paused = true
    });

    let button_next = createButton('Next');
    button_next.position(60, 35);
    button_next.mousePressed(() => {
      if (paused) {
        paused = false;
        redraw();
        paused = true;
      }
    });

    let button_sort = createButton('Sort!');
    button_sort.position(110, 35);
    button_sort.mousePressed(() => {
      if (!paused) {
        init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
        shuffle(array, true);
      }

      paused = false;
    });

    init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
    shuffle(array, true);
  }
}
function landingPage() {

  textAlign(CENTER, CENTER);
  fill('#A8A8A8');
  textSize(50);
  text('Algorithm Visualiser', windowWidth * 0.1, windowHeight * 0.2, windowWidth * 0.8, windowHeight * 0.2);
  textSize(18);
  text('Algorithms, from the first time we learnt them in school till now as we are completing our engineering, we can\'t leave them. We may understand them but how is it like to watch them in action? The objective of this project is to visualise some of the common algorithms while they are in execution.', windowWidth * 0.2, windowHeight * 0.3, windowWidth * 0.6, windowHeight * 0.4);
  fill(0, 200, 100);
  rect(windowWidth * 0.4, windowHeight * 0.6, windowWidth * 0.2, windowHeight * 0.1);
  fill(0);
  text('Let\'s get started !', windowWidth * 0.4, windowHeight * 0.6, windowWidth * 0.2, windowHeight * 0.1);
}
// Sketch
function setup() {

  createCanvas(windowWidth, windowHeight);
  //initialiseElements();
  pageNo = 0;
  background(0);

}

function init(algo, length) {
  paused = true;
  w = width / length;
  passes=0;
  swaps=0;
  compares=0;
  representation = algo['representation'];

  // Generation of array
  // Array.from()method creates a new, shallow-copied Array instance from an array-like object.
  // as a 2nd argument a call back function is sent which contains a Map object.

  array = Array.from({
    length
  }, (v, i) => map(i, 0, length - 1, height / length, height));
  colors = Array(length).fill(color('white'));
  sorter = algo['sorter'](array, colors);
}




function draw() {

  if (pageNo === 0) {

    col.r = random(70, 170);
    col.b = random(70, 140);
    spot.x = random(0, width);
    spot.y = random(0, height);


    fill(col.r, col.g, col.b, 70);
    noStroke();
    ellipse(spot.x, spot.y, 30, 30);
    landingPage();
  }
  else if (pageNo === 1) {
    // background(160, 0, 180);
    background('#353966');
    // frameRate(2);
    noStroke();
    if (!paused) {
      let next = sorter.next();

      colors = next.value;
      paused = next.done;
    }
    for (let i = 0; i < array.length; ++i) {
      fill(colors[i]);
      if (representation === LINE) {
        stroke(0);
        rect(i * w, height - array[i], w, array[i]);
        textAlign(LEFT, TOP);
        textSize(map(array.length,1,100,40,12));
        fill(0);
        text(int(array[i]/10),(i+0.1)*w,height-array[i]+(height*.005));
      } else if (representation === DOT) {
        ellipse(i * w, height - array[i], w, w)
      }
      // stroke(colors[i]);
      // point(i * w,  height - array[i]);
    }
    stroke(0);
    fill(255);
    textSize(40);
    text("Passes="+passes+" Swaps="+swaps+" Compares="+compares,width*0.2,50);
  }
}

// Helper functions

// Swap to elements
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function mousePressed() {
  if (pageNo === 0) {
    if (mouseX > windowWidth * 0.4 && mouseX < windowWidth * 0.6 && mouseY > windowHeight * 0.6 && mouseY < windowHeight * 0.7)
      pageNo = 1;
    initialiseElements();
  }
}

// Function init() is initialising the array .
// Every algorithm function has a property called 'count' which has the length of the array to be sorted by the function. The count value is called somewhere inside here.