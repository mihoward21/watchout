// start slingin' some d3 here.

  var getDistance = function(n1,n2){
    var diffX = n1.x - n2.x;
    var diffY = n1.y - n2.y;

    return Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));

  }
// var data = [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6];
function collide(node1,node2,callback) {
  if(getDistance(node1,node2) < 50){
    callback.apply(this,arguments);
  }
  console.log('This is the problem');

};

var tester = function(){
  console.log('It fucking WORKS!!!!!!!!');
}




var height = 1000;
var width = 1000;

var canvas = d3.select('body').append('svg')
               .attr('height',height)
               .attr('width',width);
             canvas
               .append('rect')
               .attr('height',height)
               .attr('width',width)
               .attr('fill','black');

var drag = d3.behavior.drag()
          .on("drag", function(d,i) {
            d.x += d3.event.dx
            d.y += d3.event.dy
            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })
        });

var player = canvas.selectAll('image .player').data([{'x':Math.random(),'y': Math.random()}]);
player
    .enter()
    .append('image')
    .attr('xlink:href','spaceShip.png')
    .attr('x', height/2)
    .attr('y', width/2)
    .attr('class','player')
    .attr('height',40)
    .attr('width',40)
    .call(drag);

var update = function(){
  var data = _.map(_.range(0,20),function(value,i){
     return {
      id:i,
      x:Math.random() * width,
      y:Math.random()* height
     }
  })
  var circle = canvas.selectAll('.enemy')
                    .data(data);
  //update existing data
  //
  circle
    // .transition()
    // .duration(3000)
    .attr('x',function(d){
      return d.x;
    })
    .attr('y',function(d){
      return d.y;
    })
    .forEach(function(val){

      for(var i = 0; i < val.length; i++){
      if(val[i] !== undefined){
        collide(val[i],player,tester);
      }
     }
    })

  //new data entering
  circle
    .enter()
    .append('image')
    .attr('class','enemy')
    .attr('height',50)
    .attr('width',50)
    .attr('xlink:href', 'asteroid2.png')
    // .attr('fill','red')
    .attr('x',function(d){
      return d.x;
    })
    .attr('y',function(d){
      return d.y;
    });
    // .attr('r',10);
};
update();
setInterval(update, 3000);

