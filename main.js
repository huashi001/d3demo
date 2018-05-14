// 交换函数
function change(arr) {
    function rand(a, b, i) {
      let random = Math.floor((b - a + 1) * Math.random() + a);
      while (random === i) {
        random = Math.floor((b - a + 1) * Math.random() + a);
      }
      return random;
    }
    for (let k = 0; k < 50; k++) {
      for (let i = 0; i < arr.length; i++) {
        let p = rand(0, 99, i);
        arr[i]--;
        arr[p]++;
      }
    }
    return arr;
  }

let arr = [];
for (let i = 0; i < 100; i++) {
  arr[i] = 100;
}
const width = 1100;
const height = 640;
let svg = d3.select("#wrap")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
//画坐标轴
function drawAxis() {
  // x轴比例尺
  let xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 1000]);
  // 定义x坐标轴
  const xAxis = d3.axisBottom().scale(xScale);
  const gAxis = svg.append("g").attr("transform", "translate(50,320)");
  xAxis(gAxis);
  // y轴比例尺
  let yScale = d3
    .scaleLinear()
    .domain([300, -300])
    .range([0, 600]);
  // 定义y坐标轴
  const yAxis = d3.axisLeft().scale(yScale);
  const g2Axis = svg.append("g").attr("transform", "translate(50,20)");
  yAxis(g2Axis);
}
const padding = { top: 20, right: 50, bottom: 20, left: 50 };
const rectStep = 10;
const rectWidth = 7;
const initColor = "#789";
const highColor = "red";
const lowColor = "lime";
let timer = null;
function draw(array, isSorted) {
  let updateRect;
  if (isSorted) {
    updateRect = svg.selectAll("rect").data(array.sort(d3.ascending));
  } else {
    updateRect = svg.selectAll("rect").data(array);
  }
  let enterRect = updateRect.enter();
  let exitRect = updateRect.exit();
  updateRect
    .attr("x", (d, i) => padding.left + i * rectStep)
    .attr("y", (d, i) => {
      if (d >= 0) {
        if (d >= 300) {
          return 20;
        }
        return 320 - d;
      } else {
        return 320;
      }
    })
    .attr("fill", (d, i) => {
      if (d > 300) {
        return highColor;
      } else if (d < -300) {
        return lowColor;
      } else {
        return initColor;
      }
    })
    .attr("width", rectWidth)
    .attr("height", d => {
      if (d >= 0) {
        return d > 300 ? 300 : d;
      } else {
        return d < -300 ? 300 : -d;
      }
    });
  enterRect
    .append("rect")
    .attr("fill", initColor)
    .attr("x", (d, i) => padding.left + i * rectStep)
    .attr("y", (d, i) => 220)
    .attr("width", rectWidth)
    .attr("height", d => d);
}
drawAxis();
draw(arr);
const aBtn = document.getElementsByTagName("button");
aBtn[0].onclick = function() {
  clearInterval(timer);
  timer = setInterval(function() {
    draw(change(arr), false);
  }, 20);
};
aBtn[1].onclick = function() {
  clearInterval(timer);
  timer = setInterval(function() {
    draw(change(arr), true);
  }, 20);
};
aBtn[2].onclick = function() {
  clearInterval(timer);
};
aBtn[3].onclick = function() {
  clearInterval(timer);
  for (let i = 0; i < 100; i++) {
    arr[i] = 100;
  }
  draw(arr);
};
