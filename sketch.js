let array,
  colors,
  sorter,
  representation,
  paused = true,
  w;
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

const algorithms = {
  bubbleSort,
  selectionSortMax,
  selectionSortMin,
  insertionSort,
  // heapSort: {
  //   name: 'Heap Sort (Max, coming soon)',
  //   count: 200,
  //   representation: LINE,
  //   sorter: function* (arr, colors) { }
  // },
  mergeSort,
  quickSortLomuto,
  quickSortHoare
}

function initialiseElements()
{
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
function landingPage()
{
  textAlign(CENTER,CENTER);
  fill(0);
  textSize(50);
  text('Algorithm Visualiser',windowWidth*0.1,windowHeight*0.2,windowWidth*0.8,windowHeight*0.2);
  textSize(20);
  text('Algorithms, from the first time we learnt in school till now as we are completing our engineering, we can\'t leave them. We may understand them but how is it like to watch them in action? The objective of this project is to visualise some of the common algorithms while they are in execution',windowWidth*0.2,windowHeight*0.3,windowWidth*0.6,windowHeight*0.4);
  fill(0,200,100);
  rect(windowWidth*0.4,windowHeight*0.6,windowWidth*0.2,windowHeight*0.1);
  fill(0);
  text('Let\'s get started',windowWidth*0.4,windowHeight*0.6,windowWidth*0.2,windowHeight*0.1);
}
// Sketch
function setup() {

  createCanvas(windowWidth, windowHeight);
  //initialiseElements();
  pageNo=0;
  landingPage();

}

function init(algo, length) {
  paused = true;
  w = width / length;

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
  background(120, 0, 200);
  // frameRate(2);
  noStroke();
  if(pageNo===0)
  {
    landingPage();
  }
  else{
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
    } else if (representation === DOT) {
      ellipse(i * w, height - array[i], w, w)
    }
    // stroke(colors[i]);
    // point(i * w,  height - array[i]);
  }
}
}

// Helper functions

// Swap to elements
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function mousePressed()
{
  if(pageNo===0)
  {
    if(mouseX>windowWidth*0.4 && mouseX<windowWidth*0.6 && mouseY>windowHeight*0.6 && mouseY< windowHeight*0.7)
      pageNo=1;
      initialiseElements();
  }
}

// Function init() is initialising the array .
// Every algorithm function has a property called 'count' which has the length of the array to be sorted by the function. The count value is called somewhere inside here.