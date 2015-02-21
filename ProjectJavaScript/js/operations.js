	/**
	 * function that given N arguments (numbers), calculates:total sum,average, the Max number, and the Min number.
	 * @author Noemi.Guzman@jalasoft.com
	 */
	function operations() {
		if(arguments.length>0){
			var suma=DoSum(arguments);
			console.log('The Total sum is : '+ suma);
			console.log('The Average is ' + (suma/arguments.length));
			console.log('The Max is: '+ GetMax(arguments));
			console.log('The Min is: ' + GetMin(arguments));
			
		}
		else
		{
			console.log('Please enter the numbers.');
		}
		
	}
	
	/**
	 * Sum of all items of an array.
	 * @param {arg} the array to sum.
	 * @return	{float} sum of items of the array.
	 */

	var DoSum=function(arg){
	if(arg.length==1)		
	{
		
		return arg[0];
	}
	else
		{
			return arg[0] + DoSum(arraycl(arg))
		}
	}
	/**
	 * Remove the first items of an array.
	 * @param {a} the array to remove item[0].
	 * @return	{array} the 'a' array without the first item.
	 */
	var arraycl = function (a) {
		var clra=[];
		for (var i = 0; i < a.length-1; i++) {
			 clra[i]=a[i+1];
		}
		return clra;
	};
	/**
	 * Function to get the maximum number
	 * @param {argMax} the array.
	 * @param {current} the current maximum.
	 * @return	{float} maximum of the array.	 
	 */
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
	/**
	 * Function to get the minimum number
	 * @param {argMax} the array.
	 * @param {current} the current minimum.	
	 * @return	{float} minimum of the array.	
	 */
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
	