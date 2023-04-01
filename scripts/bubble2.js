let width = 1000,
height = 450;

const radius = 18;   // distance between bubbles 
let margin = 3;

let svg = d3.select("#bubble-chart")
.append("svg")
.attr("width", width)
.attr("height", height);


// Handmade legend
svg.append("circle").attr("cx",600).attr("cy",130).attr("r", 6).style("fill", "black")
svg.append("circle").attr("cx",600).attr("cy",160).attr("r", 6).style("fill", "gold")
svg.append("circle").attr("cx",600).attr("cy",190).attr("r", 6).style("fill", "maroon")
svg.append("circle").attr("cx",600).attr("cy",220).attr("r", 6).style("fill", "green")
svg.append("text").attr("x", 620).attr("y", 135).text("$").style("font-size", "15px").attr("alignment-baseline","right")
svg.append("text").attr("x", 620).attr("y", 165).text("$$").style("font-size", "15px").attr("alignment-baseline","right")
svg.append("text").attr("x", 620).attr("y", 195).text("$$$").style("font-size", "15px").attr("alignment-baseline","right")
svg.append("text").attr("x", 620).attr("y", 225).text("$$$$").style("font-size", "15px").attr("alignment-baseline","right")


d3.csv("bubble.csv").then(data => {

    let result = d3.group(data, d => d.Category);

    let rScale = d3.scaleLinear()
        .range([8,18]) //Change size of circles 
        .domain(d3.extent(data, d => d.Count));

    let colors = d3.scaleOrdinal()
        .range(['gold', 'maroon', 'black', 'green']) // change colors here 
        .domain(d3.map(data, d => d.Price));

    let simulation = d3.forceSimulation(data)
        .force("charge", d3.forceManyBody().strength(500)) //strength
        .force('x', d3.forceX().x(300))
        // .force('x', d3.forceX().x(width/2))

        .force('y', d3.forceY().y(height/2))
        .force("collision", d3.forceCollide().radius(radius));
        // .force("collision", d3.forceCollide().radius(20));  // check this code in class github 


    let g = svg.append("g")
        .attr("class", "group");

    simulation.on("tick", () => {
        g.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("r", d => (rScale(d.Count)))
        .attr("fill", d => colors(d.Price))
        .attr("opacity", 1.0)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .on("mouseover", function (event, d) {
            d3.select(this).attr("opacity", 1);

    tooltip
    .style("visibility", "visible")
    .html(`${d.Category}<br />${d.Count}`);
        })
        .on("mousemove", function (event) {
            tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).attr("opacity", 0.75);
            tooltip.style("visibility", "hidden");
        })
    })

    for (let i = 0; i < 100; i++) {
        simulation.tick()
    }
    });

    const tooltip = d3.select("body").append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");
