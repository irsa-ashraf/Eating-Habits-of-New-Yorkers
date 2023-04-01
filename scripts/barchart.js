d3.csv("barchart.csv").then(data => {

    for (let d of data) {
        d.Count = +d.Count; // this forces a number
    };

    const height = 300,
          width = 550,
          margin = ({ top: 50, right: 100, bottom: 80, left: 100 });

    // create svg 
    let svg = d3.select("#barchart")
        .append("svg")
        .attr("viewBox", [1, 1, width, height]); // for resizing element in browser
    
    // set 'Category' column as x-axis 
    let x = d3.scaleBand()
        .domain(data.map(d => d.Category)) // data, returns array
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);

    svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("font-size", "10px")
    .attr("dx", "-3.5em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)")
    
    // set 'Count' column as y-axis 
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count)]).nice() // nice rounds the top num
        .range([height - margin.bottom, margin.top]); // reverse svgs 
    
    // axes     
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "11px")

    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.left)
      .attr("y", 50)
      .attr("transform", "rotate(-90)")
      .text("Count");

    // create bar groups
    let bar = svg.selectAll(".bar") 
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    // add rect to bar group
    bar.append("rect") 
        .attr("fill", "orange") // choose color of rectangles 
        .attr("x", d => x(d.Category)) // x position attribute
        .attr("width", x.bandwidth()-2) // this width is the width attr on the element
        .attr("y", d => y(d.Count)) // y position attribute
        .attr("height", d => y(0) - y(d.Count)); // this height is the height attr on element
    
    // add labels
    bar.append('text') 
        .text(d => d.Count)
        .attr('x', d => x(d.Category) + (x.bandwidth()/2))
        .attr('y', d => y(d.Count) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .style("font-size", "11px");
        ;

});