d3.json("data.json", function (data) {
    var options;

    var defaults = $.extend({
        url: null,
        width: 1000,
        height: 700,
        formatText: d3.format('.0%')
    }, options);

    var widthScale = d3.scale.linear()
        .domain([0, 60])
        .range([0, defaults.width]);

    var colors = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
               "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63",
               "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

    var colorScale = d3.scale.ordinal()
        .domain([0, 20])
        .range(colors);

    //    var color = d3.scaleLinear()
    //    .domain([0,60])
    //    .range(["red","blue"]);

    var canvas = d3.select("body")
        .append("svg")
        .attr("width", defaults.width)
        .attr("height", defaults.height)
        .append("g")
        .attr("transform", "translate(350,30)");

    var bars = canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 70)
        .attr("height", function (d) {
            return d.age * 10;
        })
        .transition()
        .duration(2000)
        .attr("fill", function (d) {
            return colorScale(d.age);
        })
        .attr("x", function (d, i) {
            return i * 100;
        })
        .attr("y", function (d, i) {
            return 500 - d.age * 10;
        });

    canvas.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "1.4em")
        .text(function (d) {
            return defaults.formatText(d.age);
        })
        .transition()
        .duration(2000)
        .attr("x", function (d, i) {
            return i * 100;
        })
        .attr("y", function (d, i) {
            return 500 - d.age * 10;
        })
        .attr("transform", "translate(35,30)");

    canvas.append("g")
        .attr("transform", "translate(0,500)")
        .call(d3.svg.axis().scale(widthScale).ticks(30));


    //var defaults = $.extend({
    //url: null,
    //radius: 100,
    //start: 0,
    //end: 0,
    //trackColor: "#DDDDDD",
    //fillColor: "#00C0FF",
    //textColor: "#00C0FF",
    //strokeColor: "#FFFFFF",
    //trackWidth: 20,
    //strokeSpacing: "0px",
    //endAngle: Math.PI * 2,
    //formatText: d3.format('.0%')
    //}, options);

})
