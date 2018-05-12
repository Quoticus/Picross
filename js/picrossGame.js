/*
Author: Quoticus
Date: May 12th, 2018
Purpose: JavaScipt file for Picross Website app
*/
window.onload = function(){
    var tdArray = $(".cell");
    var answerArray = [];
    for(var x = 0; x < 6; x++){
      answerArray[x] = [];
      for(var y = 0; y < 6; y++){
        if((Math.random() * 100) >= 60){
          answerArray[x][y] = true;
        }else {
          answerArray[x][y] = false;
        }
      }
    }

    tdArray.each(function(){
      let cell = $(this);
      cell.click(function(){
        if(cell.prop("selected") == true){
          cell.prop("selected", false).css("background-color", "white").text("");
        }
        else{
          cell.prop("selected", true).css("background-color", "black").text("");
        }
        checkForWin(verifyAnswers(tdArray, answerArray));
      });
      cell.contextmenu(function(event){
        event.preventDefault();
        if(cell.prop("selected") == true){
          cell.prop("selected", false).css("background-color", "white");
        }
        if(cell.text() == "X"){
          cell.text("");
        }
        else{
          cell.text("X");
        }
        checkForWin(verifyAnswers(tdArray, answerArray));
      });
    });
    console.log(tdArray); //Debug - remove before release
    console.dir(answerArray); //Debug - remove before release
}

function verifyAnswers(tdArray, answerArray){
  let on = 0;
  let off = 0;
  let right = 0;
  let wrong = 0;
  let total = 0;
  tdArray.each(function(){
    let cell = $(this);
    total++;
    if(cell.prop("selected") == true){
      on++;
      if(answerArray[cell.parent().prop("rowIndex")][cell.prop("cellIndex")]){
        right++;
      }else{
        wrong++;
      }
    }else{
      off++;
      if(answerArray[cell.parent().prop("rowIndex")][cell.prop("cellIndex")]){
        wrong++;
      }else{
        right++;
      }
    }
  });
  //console.log("On: "+on+"\nOff: "+off);
  console.log("Right: "+right+"\nWrong: "+wrong); //Debug - remove before release
  if(right == total){
    return true;
  }else{
    return false;
  }
}

function checkForWin(winCondition){
  if(winCondition){
    $("#vic").text("You win!");
  }
}
