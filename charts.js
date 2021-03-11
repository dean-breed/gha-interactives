var pal = {
    "orange1": "#EC652B",
    "orange2": "#F6BB9E",
    "orange3": "#F28E5F",
    "orange4": "#D85C32",
	 "orange5": "#9D3915"
  };

function draw_area_figure1(data, chart_id, margin, width, height,chart_config){

var dateParse = d3.timeParse("%d/%m/%Y");
data.forEach(function(d){d.dd = dateParse(d.date);
                        d.day_month = d3.timeFormat("%d %b")(d.dd);

});

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.dd; }))
    .range([ 0, width ])

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.south_america_c/1000000; })])
  .range([ height, 0 ]).nice();
  
var svg = d3.select("#"+chart_id)
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

svg.append("g")
    .attr("class", "axis")  
    .call(d3.axisLeft(y));
	
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x",0 - (height / 1.8))
    .attr("dy", "1em")
    .attr('class','yaxistitle')
    .style("text-anchor", "middle")
    .text("Regional COVID-19 cases");

 // Add the area
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange5)
		.attr("stroke", pal.orange5)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.south_america_c/1000000) })
		  )  

svg.append("path")
    .datum(data)
		.attr("fill", pal.orange4)
		.attr("stroke", pal.orange4)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.north_america_c/1000000) })
		  ) 
		  
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange3)
		.attr("stroke", pal.orange3)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.europe_c/1000000) })
		  ) 
  
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange2)
		.attr("stroke", pal.orange2)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.asia_c/1000000) })
		  ) 	

svg.append("path")
    .datum(data)
		.attr("fill", pal.orange1)
		.attr("stroke", pal.orange1)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.africa_c/1000000) })
		  )
		  
}

function draw_area_figure2a(data, chart_id, margin, width, height,chart_config){

var dateParse = d3.timeParse("%d/%m/%Y");
data.forEach(function(d){d.dd = dateParse(d.date);
                        d.day_month = d3.timeFormat("%d %b")(d.dd);

});

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.dd; }))
    .range([ 0, width ])

  // Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.covid_cases_m; })])
  .range([ height, 0 ]).nice();

var svg = d3.select("#"+chart_id)
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

svg.append("g")
    .attr("class", "axis")  
    .call(d3.axisLeft(y));
	
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x",0 - (height / 1.8))
    .attr("dy", "1em")
    .attr('class','yaxistitle')
    .style("text-anchor", "middle")
    .text("COVID-19 cases (millions)");

  // Add the area
svg.append("path")
    .datum(data)
    .attr("fill", pal.orange1)
    .attr("stroke", pal.orange1)
    .attr("stroke-width", 1.5)
    .attr("d", d3.area()
      .x(function(d) { return x(d.dd) })
      .y0(y(0))
      .y1(function(d) { return y(d.covid_cases_m) })
      )
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
        var xPositionhold = d3.mouse(this)[0];
        var yPositionhold = d3.mouse(this)[1];
        var xPosition = x.invert(d3.mouse(this)[0]);
        var yPosition = y.invert(d3.mouse(this)[1]);
        console.log(xPosition);
        var closest_year_distance = d3.min(data, function(d){ return Math.abs(xPosition - d.dd)});
        var closest_year = data.filter(function(d){return Math.abs(xPosition - d.dd) == closest_year_distance})[0].day_month;
        var closest_value = data.filter(function(d){return Math.abs(xPosition - d.dd) == closest_year_distance})[0].covid_cases_m;
        console.log(d);
        tooltip.attr("transform", "translate(" + (xPositionhold+10) + "," + yPositionhold + ")");
        tooltip.select("text").text(closest_year+", "+closest_value+"m")});    

var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");   
        
tooltip.append("rect")
    .attr("width", 100)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0);
  
tooltip.append("text")
    .attr("x", 2)
    .attr("dy", "1.2em")
    .style("text-anchor", "left")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

}

function draw_area_figure2b(data, chart_id, margin, width, height,chart_config){

var dateParse = d3.timeParse("%d/%m/%Y");
data.forEach(function(d){d.dd = dateParse(d.date);
                        d.day_month = d3.timeFormat("%d %b")(d.dd);

});

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.dd; }))
    .range([ 0, width ])

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.all_total/1000000000; })])
  .range([ height, 0 ]).nice();
  
var svg = d3.select("#"+chart_id)
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

svg.append("g")
    .attr("class", "axis")  
    .call(d3.axisLeft(y));
	
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x",0 - (height / 1.8))
    .attr("dy", "1em")
    .attr('class','yaxistitle')
    .style("text-anchor", "middle")
    .text("COVID-19 emergency funding (US$ billions)");

 // Add the area
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange2)
		.attr("stroke", pal.orange2)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.all_total/1000000000) })
		  )  

svg.append("path")
    .datum(data)
		.attr("fill", pal.orange1)
		.attr("stroke", pal.orange1)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.all_committed/1000000000) })
		  ) 
		  
}

function draw_area_figure_8(data, chart_id, margin, width, height,chart_config){

var dateParse = d3.timeParse("%d/%m/%Y");
data.forEach(function(d){d.dd = dateParse(d.date);
                        d.day_month = d3.timeFormat("%d %b")(d.dd);

});

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.dd; }))
    .range([ 0, width ])

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.unclassified_c; })])
  .range([ height, 0 ]).nice();
  
var svg = d3.select("#"+chart_id)
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

svg.append("g")
    .attr("class", "axis")  
    .call(d3.axisLeft(y));
	
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x",0 - (height / 1.8))
    .attr("dy", "1em")
    .attr('class','yaxistitle')
    .style("text-anchor", "middle")
    .text("Regional COVID-19 cases");

 // Add the area
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange5)
		.attr("stroke", pal.orange5)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.unclassified_c) })
		  )  

svg.append("path")
    .datum(data)
		.attr("fill", pal.orange4)
		.attr("stroke", pal.orange4)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.UN_c) })
		  ) 
		  
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange3)
		.attr("stroke", pal.orange3)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.WHO_c) })
		  ) 
  
svg.append("path")
    .datum(data)
		.attr("fill", pal.orange2)
		.attr("stroke", pal.orange2)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.Red_Cross_c) })
		  ) 	

svg.append("path")
    .datum(data)
		.attr("fill", pal.orange1)
		.attr("stroke", pal.orange1)
		.attr("stroke-width", 1.5)
		.attr("d", d3.area()
		  .x(function(d) { return x(d.dd) })
		  .y0(y(0))
		  .y1(function(d) { return y(d.NGOs_c) })
		  )
		  
}