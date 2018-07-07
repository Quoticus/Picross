/*
Author: Quoticus
Date: May 12th, 2018
Purpose: JavaScipt file for Picross Website app
*/
window.onload = function(){
    var tableX = 15;
    var tableY = 20;
    createTable(tableX, tableY);
    var tdArray = $(".cell");
    var answerArray = [];
    for(var x = 0; x < tableX; x++){
      answerArray[x] = [];
      for(var y = 0; y < tableY; y++){
        if((Math.random() * 100) >= 60){
          answerArray[x][y] = true;
        }else {
          answerArray[x][y] = false;
        }
      }
    }
    var hintArray = $(".hint");
    hintArray.each(function(){
      let hintCell = $(this);
      let rowNum = hintCell.parent().prop("rowIndex")
      //get the column
      let colNum = hintCell.prop("cellIndex");
      if(rowNum == 0){
        let colCount = 0;
        let colString = "";
        //iterarate through the rows in that column
        for(var x = 1; x < answerArray.length; x++){
          if(answerArray[x][colNum]){
            colCount++;
            if(x+1 == answerArray.length){
              if(colString.length != 0){
                colString += "<br/>"+colCount;
              } else if(colString.length == 0){
                colString += colCount;
              }
            }
          } else if(!(answerArray[x][colNum]) && colCount > 0){
            if(colString.length == 0){
              colString += colCount + "";
            }
            else{
              colString += "<br/>"+colCount;
            }
            colCount = 0;
          }
        }
        if(colString.length == 0){
          colString = 0;
        }
        hintCell.html(colString);
        //console.log("colString: "+colString+" colString Length: "+colString.length);
        //console.log("colString Output: "+colString);
      }
      else{
        let rowCount = 0;
        let rowString = "";
        for(var y = 1; y < answerArray.length; y++){
          if(answerArray[rowNum][y]){
            rowCount++;
            if(y+1 == answerArray.length){
              if(rowString.length != 0){
                rowString += " "+rowCount;
              } else if(rowString.length == 0){
                rowString += rowCount;
              }
            }
          }else if(!(answerArray[rowNum][y]) && rowCount > 0){
            if(rowString.length == 0){
              rowString += rowCount + "";
            }
            else{
              rowString += " "+rowCount;
            }
            rowCount = 0;
          }
        }
        //console.log("rowString: "+rowString+" rowString Length: "+rowString.length);
        if(rowString.length == 0){
          rowString = 0;
        }
        hintCell.html(rowString);
        //console.log("rowString Output: "+rowString);
      }
    });

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
    //console.log(tdArray); //Debug - remove before release
    //console.log(hintArray); //Debug - remove before release
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
  //console.log("Right: "+right+"\nWrong: "+wrong); //Debug - remove before release
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

//Create a dynamic table with reference IDs for each cell from the input values
function createTable(rowLength, colLength){
  let tableDiv = document.createElement("div");
  tableDiv.id = "dynamicTableDiv";
  let table = document.createElement("table");
  for(let y = 0; y < rowLength; y++){
    let rowDiv = document.createElement("tr");
    for(let x = 0; x < colLength; x++){
      let colDiv = document.createElement("td");
      colDiv.id = "colDiv"+ x;
      if(x == 0 && y == 0){
        colDiv.className = "instructions";
      }
      else if(x == 0 || y == 0){
        colDiv.className = "hint";
      }else{
        colDiv.className = "cell";
      }
      rowDiv.appendChild(colDiv);
    }
    rowDiv.id = "rowDiv"+y;
    table.appendChild(rowDiv);
  }
  tableDiv.appendChild(table);
  document.body.appendChild(tableDiv);
}
