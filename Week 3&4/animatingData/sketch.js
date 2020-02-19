// Data source: https://github.com/fivethirtyeight/data/tree/master/poll-quiz-guns

//                 0             1             2               3                          4                             
// Data structure: Question Abrv,Full Question,Average Support,Average Republican Support,Average Democratic Support


 // variables
let parsedData = [];
let numPoints;
let centered = false;

// load data
d3.csv("parsedData.csv", function(data) {
    // created parsedData array
    parsedData.push(data)   
}).then(function () {

    // find number of data points
    numPoints = parsedData.length;

    // add container to hold graphics
    var container = d3.select("body").append("svg")
        .attr("class", "mainContainer")
        .attr("width", "100vw")
        .attr("height", "80vh")
        // .style("background-color", "red")

    // get height of container
    let containerHeight = container.node().getBoundingClientRect().height
    let containerWidth = container.node().getBoundingClientRect().width
    
    // append g elements to the main container
    var questionGroups = container.selectAll(".mainContainer")
        .data(parsedData)
        .enter()
        .append("g")
            .attr("id", function(d, i) {return "questionGroup" + i})
            .attr("transform", "translate(0, 30)")

    // add average points
    questionGroups.append("circle")
        .attr("id", "averageCircle")
        .attr("cx", function (d, i) {return d.AverageSupport + "%";})
        .attr("cy", function (d, i) {return containerHeight/numPoints * i;})
        .attr("r", "20")
        .style("fill", "rgba(0, 0, 0, .3)")
        .on("mouseover", function (d, i){
            d3.select(this)
                .style("fill", "rgba(0, 0, 0, .5)")
            d3.select("#questionTitle" + i)
                .attr("visibility", "visible")
                .html(function (d) {return d.FullQuestion;})
        })
        .on("mouseout", function (d, i){
            d3.select(this)
                .style("fill", "rgba(0, 0, 0, .3)")
            d3.select("#questionTitle" + i)
                .attr("visibility", "hidden")
                
        })

    // add support percent titles
    container.append("text")
        .text("0% Support")
        .attr("id", "scaleLabel")
        .attr("x", "5%")
        .attr("y", "5%")
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "rgba(0, 0, 0, .5)")
    container.append("text")
        .text("100% Support")
        .attr("id", "scaleLabel")
        .attr("x", "95%")
        .attr("y", "5%")
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "rgba(0, 0, 0, .5)")
    
    // add quesiton title
    questionGroups.append("text")
        .text(function(d) { return d.FullQuestion; })
            .attr("id", function (d, i) {return "questionTitle" + i;})
            .attr("class", "element")
            .attr("visibility", "hidden")
            .attr("text-anchor", "middle")
            .attr("x", function (d, i) {return d.AverageSupport + "%";})
            .attr("y", function (d, i) {return (containerHeight/numPoints * i) + 30;})
            .style("font-size", "12px")

    // add rep lines
    questionGroups.append("line")
        .attr("id", "repLine")
        .attr("class", "element")
        .attr("x1", function (d, i) {return d.AverageSupport + "%";})
        .attr("y1", function (d, i) {return containerHeight/numPoints * i;})
        .attr("x2", function (d, i) {return d.AverageSupport + "%";})
        .attr("y2", function (d, i) {return containerHeight/numPoints * i;})
        .style("stroke", "rgba(255, 0, 0, .3)")
        .transition()
            .ease(d3.easeLinear)
            .duration(function (d, i) {
                return parseInt(Math.abs(parseInt(d.AverageRepublicanSupport-d.AverageSupport)))*200;
            })
            .attr("x2", function (d, i) {return d.AverageRepublicanSupport + "%";})

    // add rep circles
    questionGroups.append("circle")
        .attr("id", "repCircle")
        .attr("class", "element")
        .attr("cx", function (d, i) {return d.AverageSupport + "%";})
        .attr("cy", function (d, i) {return containerHeight/numPoints * i;})
        .attr("r", "10")
        .style("fill", "rgba(255, 0, 0, .3)")
        .transition()
            .ease(d3.easeLinear)
            .duration(function (d, i) {
                return parseInt(Math.abs(parseInt(d.AverageRepublicanSupport-d.AverageSupport)))*200;
            })
            .attr("cx", function (d, i) {return d.AverageRepublicanSupport + "%";})


    // add dem lines
    questionGroups.append("line")
                .attr("id", "demLine")
                .attr("class", "element")
                .attr("x1", function (d, i) {return d.AverageSupport + "%";})
                .attr("y1", function (d, i) {return containerHeight/numPoints * i;})
                .attr("x2", function (d, i) {return d.AverageSupport + "%";})
                .attr("y2", function (d, i) {return containerHeight/numPoints * i;})
                .style("stroke", "rgba(0, 0, 255, .5)")
                .transition()
                    .ease(d3.easeLinear)
                    .duration(function (d, i) {
                        return parseInt(Math.abs(parseInt(d.AverageDemocratSupport-d.AverageSupport)))*200;
                    })
                    .attr("x2", function (d, i) {return d.AverageDemocratSupport + "%";})
    
    // add dem circles
    questionGroups.append("circle")
        .attr("id", "demCircle")
        .attr("class", "element")
        .attr("cx", function (d, i) {return d.AverageSupport + "%";})
        .attr("cy", function (d, i) {return containerHeight/numPoints * i;})
        .attr("r", "10")
        .style("fill", "rgba(0, 0, 255, .5)")
        .transition()
            .ease(d3.easeLinear)
            .duration(function (d, i) {
                return parseInt(Math.abs(parseInt(d.AverageDemocratSupport-d.AverageSupport)))*200;
            })
            .attr("cx", function (d, i) {return d.AverageDemocratSupport + "%";})

    // when mouse pressed, bring to center
    document.addEventListener("click", () => {

        if(centered){
            console.log("hi")

            // uncenter average circle
            d3.selectAll("#averageCircle")
            .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("cx", function (d, i) {return d.AverageSupport + "%";})
            
            // uncenter party line
            d3.selectAll(".element")
                .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attr("transform", "translate(0, 0)")

            // fade in scale labels
            d3.selectAll("#scaleLabel")
                .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .style("fill", "rgba(0, 0, 0, .5)")

        }else{
            // center average circle
            d3.selectAll("#averageCircle")
            .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("cx", "50%")

            // center party line
            d3.selectAll(".element")
                .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attr("transform", function(d, i){
                        let avgPoint = (containerWidth * (d.AverageSupport/100))
                        let diff = (containerWidth/2 - avgPoint);
                        return "translate(" + diff + ", 0)"      
                    })

            // fade out scale labels
            d3.selectAll("#scaleLabel")
                .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .style("fill", "rgba(0, 0, 0, 0)")

        }

        centered = !centered
        
    })
})




