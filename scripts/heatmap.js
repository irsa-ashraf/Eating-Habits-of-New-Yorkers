(function() {

// set the dimensions and margins of the graph
const margin = { top: 70, right: 70, bottom: 70, left: 70 },
width = 800 - margin.left - margin.right,
height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#heatmap")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Labels of row and columns
const myGroups = ["American (New)", "Chinese", "Cocktail Bars", "French", "Italian", "Japanese", "Korean", "Mexican", "Seafood", "Thai"]
const myVars = ["$", "$$", "$$$", "$$$$"]

// Build X scales and axis:
const x = d3.scaleBand()
.range([0, width])
.domain(myGroups)
.padding(0.001);
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x))
.selectAll("text")
.attr("dx", "-1.3em")
.attr("dy", ".85em")
.attr("transform", "rotate(-45)")

// Build X scales and axis:
const y = d3.scaleBand()
.range([height, 0])
.domain(myVars)
.padding(0.001);
svg.append("g")
.call(d3.axisLeft(y));


// Build color scale (advanced heatmap)
const myColor = d3.scaleSequential()
.interpolator(d3.interpolateInferno)
// .interpolator(d3.interpolateGreens)
// .range(["#fff5f0","#fee3d6","#fdc9b4","#fcaa8e","#fc8a6b","#f9694c","#ef4533","#d92723","#bb151a","#970b13","#67000d"])
// .range(["red", "violet"])

.domain([1, 5])

// The tooltips are added in the advanced version 
// create a tooltip
const tooltip = d3.select("#heatmap")
.append("div")
.style("opacity", 10)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")
.style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function (event, d) {
tooltip
    .style("opacity", 1)
d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}
const mousemove = function (event, d) {
tooltip
    .html("The average yelp rating of<br> this price and category is: " + d.Rating)
    .style("left", (event.x) / 2 + "px")
    .style("top", (event.y) / 2 + "px")
}
const mouseleave = function (event, d) {
tooltip
    .style("opacity", 0)
d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.8)
}

//Read the data
d3.csv("stacked_bar_.csv").then(function (data) {

// For advanced heatmap: add the squares
svg.selectAll()
    .data(data, function (d) { return d.Category + ':' + d.Price; })
    .join("rect")
    .attr("x", function (d) { return x(d.Category) })
    .attr("y", function (d) { return y(d.Price) })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) { return myColor(d.Rating) })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

})();