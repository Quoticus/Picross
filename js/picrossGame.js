/*
Author: Quoticus
Date: May 12th, 2018
Purpose: JavaScipt file for Picross Website app
*/
window.onload = function(){
    var tdArray = $(".cell");
    tdArray.each(function(){
      let cell = $(this);
      cell.click(function(){
        if(cell.prop("selected") == true){
          cell.prop("selected", false).css("background-color", "white").text("");
          //console.log("white");
        }
        else{
          cell.prop("selected", true).css("background-color", "black").text("");
          //console.log("black");
        }
        //console.log(cell);
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
      });
    });
    //console.log(tdArray);
}


//Each cell has a cellIndex, and its parent element, will have a rowIndex.
