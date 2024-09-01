const sectionData = [];
const step = 1;
const start = -10;
const end = 10;

function shouldBeHighlighted(section) {
  // console.log("Info: " + condition + " " + section.midpoint);
  // console.log(sectionData.length);
  console.log(
    condition + " " + mediaPoblacional + " " + xValue1 + " " + xValue2
  );

  if (condition === "mayor") {
    return section.midpoint >= xValue1;
  } else if (condition === "menor") {
    return section.midpoint < xValue1;
  } else if (condition === "entre") {
    return section.midpoint >= xValue1 && section.midpoint < xValue2;
  }

  return false;
}

for (let i = start; i < end; i += step) {
  sectionData.push({ start: i, end: i + step, midpoint: 0 });
}

const barData = [];
const mean = 0;
const sigma = 1;
for (let i = 0; i < sectionData.length; i++) {
  const x = (sectionData[i].start + sectionData[i].end) / 2;
  const y =
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.3 * ((x - mean) / sigma) ** 2);
  barData.push({ x: x, y: y, midpoint: 0 });
}

const width = 800;
const height = 300;

const xScale = d3
  .scaleLinear()
  .domain([-5, 5])
  .range([100, width - 100]);

const spaceBetweenSections = (xScale(1) - xScale(0)) * 15;
const barWidth = spaceBetweenSections / sectionData.length;

const yScale = d3
  .scaleLinear()
  .domain([0, 0.4])
  .range([height - 50, 50]);

function generateChart(include) {
  document.getElementById("grafica").innerHTML = "";
  mediaPoblacional = parseInt(mediaPoblacional);

  const svg = d3
    .select("#grafica")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "img");

  generateBaseLine(svg);

  switch (include) {
    case "bars":
      generateBars(svg);
      break;
    case "gaussian":
      generateGaussian(svg);
      break;
    case "both":
      generateGaussian(svg);
      generateBars(svg);
      break;
  }
}

// function generateBaseLine(svg) {
//   const domainValues = [];
//   const displayValues = [];
//   console.log("Valor de mediaPoblacional:", mediaPoblacional);
//   for (let i = -10, j = 0; i <= 10; i++, j++) {
//     if (j < 20) {
//       sectionData[i + 10].midpoint = mediaPoblacional + i;
//       barData[i + 10].midpoint = mediaPoblacional + i;
//     }
//     const value = mediaPoblacional + i;
//     domainValues.push(value.toFixed(0));
//     displayValues.push(value.toFixed(0));
//   }

//   console.log("domainValues:", domainValues);
//   console.log("displayValues:", displayValues);

//   const xScaleBase = d3
//     .scaleBand()
//     .domain(domainValues.map(String))
//     .range([125, width - 125])
//     .padding(0.1);

//   const xAxis = d3.axisBottom(xScaleBase).tickValues(displayValues.map(String));

//   svg
//     .append("g")
//     .attr("class", "x axis")
//     .attr("transform", `translate(0, ${height - 50})`)
//     .call(xAxis);

//   // Descomentar pa explicar algo
//   sectionData.forEach((d, i) => {
//     svg
//       .append("line")
//       .attr("x1", xScaleBase(d.start))
//       .attr("y1", height - 50)
//       .attr("x2", xScaleBase(d.start))
//       .attr("y2", 0)
//       .style("stroke", "black")
//       .style("stroke-width", 1);

//     svg
//       .append("line")
//       .attr("x1", xScaleBase(d.end))
//       .attr("y1", height - 50)
//       .attr("x2", xScaleBase(d.end))
//       .attr("y2", 0)
//       .style("stroke", "black")
//       .style("stroke-width", 1);
//   });
// }

function generateBaseLine(svg, mediaPoblacional = 159) {
  const domainValues = [];
  for (let i = -10, j = 0; i <= 10; i++, j++) {

      if(j < 20){
          sectionData[i + 10].midpoint = mediaPoblacional + i;
          barData[i + 10].midpoint = mediaPoblacional + i;
      }
      
      domainValues.push((mediaPoblacional + i).toFixed(0));
  }

  const xScaleBase = d3
    .scaleBand()
    .domain(domainValues.map(String))
    .range([125, width - 125])
    .padding(0.1);

  const xAxis = d3.axisBottom(xScaleBase).tickValues(domainValues);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - 50})`)
    .call(xAxis);

  //Descomentar pa explicar algo
  // sectionData.forEach((d, i) => {
  //   svg
  //     .append("line")
  //     .attr("x1", xScale(d.start))
  //     .attr("y1", height - 50)
  //     .attr("x2", xScale(d.start))
  //     .attr("y2", 0)
  //     .style("stroke", "black")
  //     .style("stroke-width", 1);

  //   svg
  //     .append("line")
  //     .attr("x1", xScale(d.end))
  //     .attr("y1", height - 50)
  //     .attr("x2", xScale(d.end))
  //     .attr("y2", 0)
  //     .style("stroke", "black")
  //     .style("stroke-width", 1);
  // });
}

function generateBars(svg) {
  svg
    .selectAll(".bar")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.x) - barWidth / 2)
    .attr("y", (d) => yScale(d.y))
    .attr("width", barWidth)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .attr("fill", (d) => (shouldBeHighlighted(d) ? "red" : "#FFBBBB"))
    .attr("opacity", 0.5);
}

function generateGaussian(svg) {
  sectionData.forEach((d, i) => {
    const sectionPoints = d3.range(d.start, d.end + 0.01, 0.01).map((x) => {
      const y =
        (1 / Math.sqrt(2 * Math.PI * 1)) *
        Math.exp((-1 * (x - 0) ** 2) / (3 * 1 ** 2));
      return { x, y };
    });

    sectionPoints.unshift({ x: d.start, y: 0 });
    sectionPoints.push({ x: d.end, y: 0 });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svg
      .append("path")
      .datum(sectionPoints)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", shouldBeHighlighted(d) ? "red" : "#FFBBBB")
      .attr("opacity", 0.5);
  });
}
