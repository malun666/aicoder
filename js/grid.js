var cellW1, 
	cellW2,  
	cellW3, 
	cellW4,
	cellW5, 
	cellW6,
	cellW7, 
	cellW8,
	cellW9, 
	cellW10,
	cellW11, 
	cellW12;

var cellH1, 
	cellH2,  
	cellH3, 
	cellH4,
	cellH5, 
	cellH6,
	cellH7, 
	cellH8,
	cellH9, 
	cellH10,
	cellH11, 
	cellH12;

function initGridCells( cellW, cellH ) {
	for(var i = 1; i <= 12; i++ ) {
		eval( 'cellW'+i +' = cellW * i;'  );
		eval( 'cellH'+ i + ' = cellH * i;')
	}
}
