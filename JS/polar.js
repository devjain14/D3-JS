d3.json("data.json", function (data) {
    var options;

    var defaults = $.extend({
        url: null,
        width: 1500,
        height: 800,
        radius: 300,
        radiusMax: 50,
        length:100,
        color: data.color,
        formatText: d3.format('.0%')
    }, options);
    
    var colors = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
               "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
               "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

    var canvas = d3.select("body").append("svg")
        .attr("width", defaults.width)
        .attr("height", defaults.height);

    var radiusScale = d3.scale.sqrt().range([0, defaults.radiusMax]);
    
    var colorScale = d3.scale.ordinal()
        .domain([0,20])
        .range(colors);

    var group = canvas.append("g")
        .attr("transform", "translate(650,300)");

    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function (d) {
            return radiusScale(d.data.age);
        });

    var pie = d3.layout.pie()
        .value(function () {
            return 1;
        });

    var arcs = group.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    //append the path of arc        
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d) {
            return colorScale(d.data.age);
        })
        .transition()
        .ease("linear")
        .duration(2000)
        .attrTween("d", pieTween);

    //append the path of text
    arcs.append("text")
        .transition()
        .ease("linear")
        .duration(2000)
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "1.4em")
        .text(function (d) {
            return d.data.name;
        });

    function pieTween(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({
            startAngle: 0,
            endAngle: 0
        }, b);
        return function (t) {
            return arc(i(t));
        };
    }
})
