//"Τραβάω" το dataset μου-Fetch my dataset json--
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json' 
const req = new XMLHttpRequest();
req.open('GET', url, 'true');
req.send();
req.onload = function(){
 
      const dataset = JSON.parse(req.responseText);
      
      baseTemp = dataset.baseTemperature;
      data = dataset.monthlyVariance;

      generateScales();
      drawAxes();
      drawCells();
                       
};
//--

//ορίζω τον κανβά μου-Define my canvas--
let w = 1000;
let h = 600;
let padding = 60;    

let canvas = d3.select('#canvas')

canvas.attr('width', w)
canvas.attr('height', h)
//--

//οριζω τις βασικές σταθερές μου-My basic data-vars--
let baseTemp;
let data = [];
//--


//ορίζω κάποιες σταθερές που θα χρειαστώ για τα χ-ψ.
let xScale
let yScale

let minYear
let maxYear
// let totalYears
//--

//ορίζω τις απαραίτητες λειτουργίες μου-Define my basic functions--
let generateScales = ()=> {

      minYear = d3.min(data, d => d.year)
      maxYear = d3.max(data, d => d.year)

      xScale = d3.scaleLinear()
                  .domain([minYear, maxYear])
                  .range([padding, w-padding])
      
      yScale = d3.scaleTime()
                  .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
                  .range([padding, h-padding])

      
                  
}

let drawAxes = ()=> {
      let xAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format('d'))
      let yAxis = d3.axisLeft(yScale)

      canvas.append("g")
            .call(xAxis)
            .attr("id", "x-axis")
            .attr('transform', 'translate(0, '+ (h-padding) +') ')

      canvas.append("g")
            .call(yAxis)
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ", 0) ")     
}

let drawCells = ()=> {

      canvas.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('fill', d=> {
                  variance = d.variance
                  if (variance <= -1) {
                        return 'SteelBlue'
                  }else if (variance <= 0){
                        return 'LightGreen'
                  }else if (variance <= 1){
                        return "Yellow"
                  }else {
                        return "Red"
                  }
            })
            .attr('data-month', d => d.month - 1)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => {
                  return (baseTemp + d.variance)
            })
            .attr('height', (h-2*padding)/12)
            .attr('y', d => yScale(new Date(0, d.month-1, 0, 0, 0, 0, 0)))
            .attr('width', ((w-(2*padding))/(maxYear-minYear)))
            .attr('x', d => d.year)


}
//--


