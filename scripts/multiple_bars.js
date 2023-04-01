(function() {

d3.csv("Cat_price_pcnt.csv").then(results => {

    const group = d3.group(results, (d) => d.Category);

    for (var g of group) {
        createChart(g[1])
    }

    function createChart(data) {
        for (let d of data) {
            d.Percentage = +d.Percentage; //force a number
        };

        data.sort((a, b) => b.Percentage - a.Percentage); 

        const height = 280,
            width = 600,
            margin = ({ top: 20, right: 50, bottom: 100, left: 100 });

        let svg = d3.select("#horizontal-chart")
            .append("svg")
            .attr("viewBox", [0, -10, width, height]); // for resizing element in browser

        let x = d3.scaleLinear()
            // .domain([0, d3.max(data, d => d.Percentage)]).nice()
            .domain([0, 91]).nice()
            .range([margin.left, width - margin.right]);
        
        let y = d3.scaleBand()
            .domain(['$', '$$', '$$$', '$$$$'])
            .range([margin.top, height - margin.bottom])
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
            .call(d3.axisBottom(x));
        
        svg.append("g")
            .attr("transform", `translate(${margin.left - 5},0)`)
            .call(d3.axisLeft(y));

        let bar = svg.selectAll(".bar") // create bar groups
            .append("g")
            .data(data)
            .join("g")
            .attr("class", "bar");

        bar.append("rect") // add rect to bar group
            .attr("fill", "orange")
            .attr("x", margin.left)
            .attr("width", d => x(d.Percentage) - margin.left)
            .attr("y", d => y(d.Price))
            .attr("height", y.bandwidth());
        
        bar.append('text') // add labels
            .text(d => d.Percentage)
            .attr('x', d => x(d.Percentage) + 25) // change this for font 
            .attr('y', d => y(d.Price) + (y.bandwidth()/2))
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'middle')
            .style('fill', 'black');

            // change title for each graph 
        svg.selectAll(".title")
        .data(data).join("text")
        .text(d => d.Category)
        .attr("class", "title")
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'middle')

        svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "0.5em") // dx and dy can be used for shifting position
        .attr("dy", "-2.5em") // see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy 

        .text("Percentage");
        
        svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.left/2)
        .attr("y", 50)
        .attr("transform", "rotate(-90)")
        .text("Price Label");
}
});
})();














// **************************************** OLD CODE USING A LOOP AND GROUPBY *************************************************

// d3.csv("cat_price_pcnt.csv").then((data) => {
  
    // const group = d3.group(data, (d) => d.Category);
    // for (var g of group) {
//         console.log(g);
//         console.log(g[1][1].Percentage);
//         // createBar(g);
//     }
//     });

//     function createBar({data}) {
    
//         for (let d of data) {
//             console.log(d);
//             d.Percentage = +d.Percentage; //force a number
//         };

//         data.sort((a, b) => b.Percentage - a.Percentage); // sort cases by number, largest first
//         // data.sort((a, b) => d3.ascending(a.country, b.country)); // alphabatize by country

//         const height = 600,
//             width = 800,
//             margin = ({ top: 25, right: 100, bottom: 55, left: 65 });

//         let svg = d3.select("#horizontal-chart")
//             .append("svg")
//             .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

//         let x = d3.scaleLinear()
//             .domain([0, d3.max(data, d => d.Percentage)]).nice()
//             .range([margin.left, width - margin.right]);
        
//         let y = d3.scaleBand()
//             .domain(data.map(d => d.Price))
//             .range([margin.top, height - margin.bottom])
//             .padding(0.2);

//         svg.append("g")
//             .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
//             .call(d3.axisBottom(x));
        
//         svg.append("g")
//             .attr("transform", `translate(${margin.left - 5},0)`)
//             .call(d3.axisLeft(y));

//         let bar = svg.selectAll(".bar") // create bar groups
//             .append("g")
//             .data(data)
//             .join("g")
//             .attr("class", "bar");

//         bar.append("rect") // add rect to bar group
//             .attr("fill", "steelblue")
//             .attr("x", margin.left)
//             .attr("width", d => x(d.Percentage))
//             .attr("y", d => y(d.Price))
//             .attr("height", y.bandwidth());
        
//         bar.append('text') // add labels
//             .text(d => d.Percentage)
//             .attr('x', d => margin.left + x(d.Percentage) - 10)
//             .attr('y', d => y(d.Price) + (y.bandwidth()/2))
//             .attr('text-anchor', 'end')
//             .attr('dominant-baseline', 'middle')
//             .style('fill', 'white');

//         svg.append("text")
//         .attr("class", "x-label")
//         .attr("text-anchor", "end")
//         .attr("x", width - margin.right)
//         .attr("y", height)
//         .attr("dx", "0.5em") // dx and dy can be used for shifting position
//         .attr("dy", "-0.5em") // see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy 
//         .text("Country Code");
        
//         svg.append("text")
//         .attr("class", "y-label")
//         .attr("text-anchor", "end")
//         .attr("x", -margin.left/2)
//         .attr("y", 15)
//         .attr("transform", "rotate(-90)")
//         .text("COVID cases per 100,000");
//     }


