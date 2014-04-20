$(document).ready(function(){

	var Current_Size;
	var mode;

	function SetColor()
	{
		switch(mode)
		{
			case 1:
				DefaultColor();
				break;
			case 2:
				RandomColor();
				break;
			case 3:
				Flash();
				break;
			default:
				DefaultColor();
		}
	}

	function DefaultColor()
	{
		$(".cell").mouseover(function(){
			$(this).css('background-color', 'blue');
		});
	}

	function RandomColor()
	{
		var hexdigits = "0123456789abcdef";
		$(".cell").mouseover(function(){
			var color = "#";
			for ( var i = 0; i < 6; i ++){
				var index = Math.round( Math.random()*15 );
				color += hexdigits.charAt(index);
			}
			$(this).css('background-color', color);
		});
	}

	function Flash()
	{
		$(".cell").hover(function(){
			$(this).css('-webkit-transition', 'background-color 0s');
			$(this).css('background-color', 'white');
		});
		$(".cell").mouseout(function(){
			$(this).css('-webkit-transition', 'background-color 0.5s');
			$(this).css('background-color', 'black');
		});

	}

	function SetSize()
	{
		var size = prompt("Enter grid size:");
		Current_Size = size;
	}

	/* 
	* This function generate's a sketchpad that is 'value' cells across and 'value' cells down
	* Arguments:
	* @value - number of cells in each row and column
	*/
	function CreateGrid(value)
	{
		$("#sketchpad").empty(); // Clear the grid

		var cell_width = Math.round( ( 800 - 2* value ) / value );

		// Adjust the grid size to deal with decimals - should not be detectible by human eye
		$("#sketchpad").css('width' , cell_width * value + 2 * value);
		$("#sketchpad").css('height' , cell_width * value + 2 * value);

		for (var i = 0; i < value; i++ ){

			for ( var j = 0; j < value; j++ ){

				var cell = document.createElement("div");
				cell.className = "cell";
				$("#sketchpad").append(cell);
			}
		}

		// More efficient than setting induvidual cell's style attribute. Thanks Abrar Hussain!
		$(".cell").css( 'width',  cell_width);
		$(".cell").css( 'height', cell_width);

	}


	// Initialize defaults
	Current_Size = 10;
	mode = 1;

	// Initialize button
	$("#setSize").click(function(){
		SetSize();
		CreateGrid(Current_Size);
		SetColor();
	});
	$("#random").click(function(){
		mode = 2;
		CreateGrid(Current_Size);
		SetColor();
	});
	$("#flash").click(function(){
		mode = 3;
		CreateGrid(Current_Size);
		SetColor();
	});
	$("#default").click(function(){
		mode = 1;
		CreateGrid(Current_Size);
		SetColor();
	});
	$("#reset").click(function(){
		CreateGrid(Current_Size);
		SetColor();
	});

	// Create the Grid
	CreateGrid(Current_Size);
	SetColor();


}); // $(document).ready()