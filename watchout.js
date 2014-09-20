// start slingin' some d3 here.

  var getDistance = function(n1,n2){
    var diffX = n1.x.animVal.value - n2.x.animVal.value;
    var diffY = n1.y.animVal.value - n2.y.animVal.value;

    var answer = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
    return answer;
  }
// var data = [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6];
function collide(node1,node2,callback) {
  if(getDistance(node1,node2) < 80){
    callback.apply(this,arguments);
  }
};

var tester = function(){
  console.log('It fucking WORKS!!!!!!!!');
}

var updateScoreBoard = function(){
  d3.select('.scoreboard .high span').text(highScore.toString());
  d3.select('.scoreboard .current span').text(currScore.toString());
}
var turnCollision = 0;
var currScore = 0;
var highScore = 0;

var collisionVerified =function(){
  turnCollision++;
}

var gameMaster = function(){
  if(turnCollision > 0){
    if(currScore > highScore){
      highScore = currScore;
    }
    turnCollision = 0;
    currScore = 0;
    updateScoreBoard();
  }
}


var height = 800;
var width = 1900;

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
            d3.select(this).attr('x', function(d){
              return d.x;
            })
            .attr('y', function(d){
              return d.y;
            })
            // .attr("transform", function(d,i){
            //     return "translate(" + [ d.x,d.y ] + ")"
            // })
        });

var player = canvas.selectAll('image .player').data([{'x':500,'y':500}]);
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

d3.select('body').on('keydown', function(){
  console.log(d3.event.keyCode);
  switch(d3.event.keyCode) {
    case 37:
      d3.select('.player').attr('x', function(d){
        return d.x-=8;
      })
      break;
    case 38:
      d3.select('.player').attr('y', function(d){
        return d.y-=8;
      })
      break;
    case 39:
      d3.select('.player').attr('x', function(d){
        return d.x+=8;
      })
      break;
    case 40:
      d3.select('.player').attr('y', function(d){
        return d.y+=8;
      })
      break;
  }
});

var update = function(){
  var data = _.map(_.range(0,40),function(value,i){
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
    .transition()
    .duration(2000)
    .attr('x',function(d){
      return d.x;
    })
    .attr('y',function(d){
      return d.y;
    })
    .forEach(function(val){

      for(var i = 0; i < val.length; i++){
      if(val[i] !== undefined){
        collide(val[i],player[0][0],collisionVerified);
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
    gameMaster();
    // .attr('r',10);
};
update();
setInterval(update, 2000);

setInterval(function(){
  currScore+=30;
  updateScoreBoard();
},500)



