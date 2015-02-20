
function operations() {
	if(arguments.length>0){
		var suma=DoSum(arguments);
		console.log('The sum is : '+ suma);
		console.log('The average is ' + (suma/arguments.length));
		console.log('The Max is: '+ GetMax(arguments));
		console.log ('The Min is: ' + GetMin(arguments));
		
	}
	else
	{
		console.log('Please enter the number.');
	}
	
}
function DoSum(arg){
	if(arg.length==1)
		
	{
		
		return arg[0];
	}
	else
		{
			return arg[0] + DoSum(arraycl(arg))
		}
	}
	
	var arraycl = function (a) {
		var clra=[];
		for (var i = 0; i < a.length-1; i++) {
			 clra[i]=a[i+1];
		}
		return clra;
	};
var  GetMax=function(argMax, current){
	if (current== undefined){
		current=argMax[0];
	}
	if(argMax.length==0){
		return current ;
	}	
	else	{
		if (current>argMax[0]){ return GetMax(arraycl(argMax),current) ;}
		else {return GetMax(arraycl(argMax),argMax[0]);}
		
	}
}
var GetMin=function(argMin,currentMin){
	if (currentMin== undefined){
		currentMin=argMin[0];
	}
	if(argMin.length==0){
		return currentMin ;
	}	
	else	{
		if (currentMin<argMin[0]){ return GetMin(arraycl(argMin),currentMin) ;}
		else {return GetMin(arraycl(argMin),argMin[0]);}
		
	}

}
	