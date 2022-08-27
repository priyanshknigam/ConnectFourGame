// Created By: Priyansh Kumar Nigam
var p1 = prompt("Player 1, please enter your name, you will play as blue");
p1c = 'rgb(86, 151, 255)';

var p2 = prompt("Player 2, please enter your name, you will play as red");
p2c = 'rgb(237, 45, 73)';

var game = true;
var table = $('table tr');

function changeColor(r, c, color){
  return table.eq(r).find('td').eq(c).find('button').css('background-color', color);
}

function returnColor(r, c){
  return table.eq(r).find('td').eq(c).find('button').css('background-color');
}

function checkBottom(c){
  var colorRep = returnColor(5, c);
  for(var row=5; row>-1; row--)
  {
    colorRep = returnColor(row, c);
    if(colorRep === 'rgb(128, 128, 128)')
    {
      // console.log(colorRep);
      return row;
    }
  }
}

function colormatch(one, two, three, four){
  return (one == two && one == three && one == four && one != 'rgb(128, 128, 128)' && one!=undefined);
}

function horcheck(){
  for(var p = 0; p<6; p++){
    for(var q = 0; q<=3; q++){
      if(colormatch(returnColor(p, q), returnColor(p, q+1), returnColor(p, q+2), returnColor(p, q+3)))
      {
        return true;
      }
    }
  }
}

function vercheck(){
  for(var p = 0; p<7; p++){
    for(var q = 0; q<=2; q++)
    {
      if(colormatch(returnColor(q, p), returnColor(q+1, p), returnColor(q+2, p), returnColor(q+3, p)))
      {
        return true;
      }
    }
  }
}

function diagcheck(){
  for(var p = 0; p<=5; p++)
  {
    for(var q = 0; q<=6; q++){
      if(colormatch(returnColor(p, q), returnColor(p+1, q+1), returnColor(p+2, q+2), returnColor(p+3, q+3)))
      {
        return true;
      }
      if(colormatch(returnColor(p, q), returnColor(p-1, q+1), returnColor(p-2, q+2), returnColor(p-3, q+3)))
      {
        return true;
      }
    }
  }
}

var cp = 1;
var cn = p1;
var curcolor = p1c;

$('h3').text(p1 + ', it is your turn, pick a column to drop your chip (Blue)');

$('.board button').on('click', function(){
  if(game)
  {
    var col = $(this).closest('td').index();
    var rowavail = checkBottom(col);
    console.log(rowavail);
    console.log(col);
    console.log(curcolor);
    console.log(cp);
    changeColor(rowavail, col, curcolor);
    if(horcheck() || vercheck() || diagcheck())
    {
      $('h1').text('Congratulations! '+cn+', You have won!');
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      game = false;
    }
    cp = cp*(-1);
    if(cp==1){
      $('h3').text(p1 + ', it is your turn, pick a column to drop your chip (Blue)');
      cn = p1;
      curcolor = p1c;
    }
    else {
      $('h3').text(p2 + ', it is your turn, pick a column to drop your chip (Red)');
      cn = p2;
      curcolor = p2c;
    }
  }
})
