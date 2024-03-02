import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


// Declare the chart dimensions and margins.
const width = 500;
const height = 500;
const marginTop = 40;
const marginRight = 40;
const marginBottom = 40;
const marginLeft = 40;
const width2 = 900;
const height2 = 700;
const lines2 = 20


// Declare the slider dimensions
const sliderMin = 0.1;
const sliderMax = 1/sliderMin;
const sliderStep = 0.1;
const sliderValue = 1;


// Create a div for the first slider and label
const sliderXDiv = document.createElement("div");
const sliderYDiv = document.createElement("div");


//create a slider for the distance between nodes on the x axis with a label "x"
const sliderx = document.createElement("input");
sliderx.type = "range";
sliderx.min = sliderMin;
sliderx.max = sliderMax;
sliderx.step = sliderStep;
sliderx.value = sliderValue;

// add a label to the slider
const labelX = document.createElement("label");
labelX.innerHTML = "x: ";

// Append the slider and label to the div
sliderXDiv.appendChild(sliderx);
sliderXDiv.appendChild(labelX);

// Append the div to the slider container
document.getElementById("slider").appendChild(sliderXDiv);

//create a slider for the distance between nodes on the y axis
const sliderY = document.createElement("input");
sliderY.type = "range";
sliderY.min = sliderMin;
sliderY.max = sliderMax;
sliderY.step = sliderStep;
sliderY.value = sliderValue;


// add a label to the slider
const labelY = document.createElement("label");
labelY.innerHTML = "y: ";
// Append the slider and label to the div
sliderYDiv.appendChild(sliderY);
sliderYDiv.appendChild(labelY);

// Append the div to the slider container
document.getElementById("slider").appendChild(sliderYDiv);


const valueX = document.createElement("span");
sliderXDiv.appendChild(valueX);
valueX.innerHTML = sliderx.value;

const valueY = document.createElement("span");
sliderYDiv.appendChild(valueY);
valueY.innerHTML = sliderY.value;

const svg2 = d3.select("#container2")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2);

// make grid lines for the x axis
svg2.selectAll("line.x")
    .data(d3.range(lines2))
    .enter()
    .append("line")
    .attr("class", "x")
    .attr("x1", function(d) {
        return d * 50 + 25;
    })
    .attr("y1", 0)
    .attr("x2", function(d) {
        return d * 50 + 25;
    })
    .attr("y2", height2)
    .style("stroke", "red")
    .style("stroke-width", 3);

// make grid lines for the y axis
svg2.selectAll("line.y")
    .data(d3.range(lines2))
    .enter()
    .append("line")
    .attr("class", "y")
    .attr("x1", 0)
    .attr("y1", function(d) {
        return d * 50 + 25;
    })
    .attr("x2", width2)
    .attr("y2", function(d) {
        return d * 50 + 25;
    })
    .style("stroke", "red")
    .style("stroke-width", 3);

// create a svg element of 10x10 nodes
// the difference between the x and y coordinates of the nodes is 
// the value of the sliders

const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("transform", "rotate(-135deg)");

const nodes = d3.range(100).map(function(d) {
    return {
        x: d % 10,
        y: Math.floor(d / 10)
    };
});

svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return d.x * 50 + 25;
    })
    .attr("cy", function(d) {
        return d.y * 50 + 25;
    })
    .attr("r", 10)
    .attr("fill", "#69b3a2");

// make grid lines for the x axis
svg.selectAll("line.x")
    .data(d3.range(11))
    .enter()
    .append("line")
    .attr("class", "x")
    .attr("x1", function(d) {
        return d * 50 + 25;
    })
    .attr("y1", 0)
    .attr("x2", function(d) {
        return d * 50 + 25;
    })
    .attr("y2", 500)
    .style("stroke", "black")
    .style("stroke-width", 1);

// make grid lines for the y axis
svg.selectAll("line.y")
    .data(d3.range(11))
    .enter()
    .append("line")
    .attr("class", "y")
    .attr("x1", 0)
    .attr("y1", function(d) {
        return d * 50 + 25;
    })
    .attr("x2", 500)
    .attr("y2", function(d) {
        return d * 50 + 25;
    })
    .style("stroke", "black")
    .style("stroke-width", 1);

// update the position of the nodes when the sliders are moved
sliderx.oninput = function() {
    
    sliderY.value = 1 / sliderx.value;
    valueX.innerHTML = this.value;
    valueY.innerHTML = sliderY.value;

    svg.selectAll("circle")
        .data(nodes)
        .attr("cx", function(d) {
            return (d.x*sliderx.value) * 50 + 25;
        })
        .attr("cy", function(d) {
            return (d.y/sliderx.value) * 50 + 25;
        });
}

sliderY.oninput = function() {

    sliderx.value = 1 / sliderY.value;
    valueY.innerHTML = this.value;
    valueX.innerHTML = sliderx.value;

    svg.selectAll("circle")
        .data(nodes)
        .attr("cx", function(d) {
            return (d.x/sliderY.value) * 50 + 25;
        })
        .attr("cy", function(d) {
            return (d.y*sliderY.value) * 50 + 25;
        });
}
