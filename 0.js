
// function to find the index of the median
function medianIndex(arrSize){
    // initialize left and right indices
    var l = 0;
    var r = arrSize - 1;
    // use the median rule
    return Math.floor((l+r)/2);
}

// function to generate a randomm array of size n with integers ranging betweem 1 and 100
function fillArray(arr,size){
    for(var x=0; x< size; x++){
        arr[x] = Math.floor(Math.random()*(100))+1; // fill every index with a random integer between 1 and 100
    }
}

/////////////////////////////////////////// QuickSelect for Lumoto ///////////////////////////////////////////
function lumoto(arr,l,r,k){
    var pivot = lumotoPartition(arr,l,r); // initialize the pivotIndex
    if(pivot == k){
        return arr[pivot]; // if it is the same as k (index of median), return the element 
    }
    else if(pivot > k){
        r = pivot - 1; // else if it is greater than k, then discard of the right side of the array by changing r
    }
    else{
        l = pivot + 1; // else if it is less than k, then discard of the right side of the array by changing l
    }
    return lumoto(arr,l,r,k); // call lumoto again with the new changes
}

// Lumoto partitioning method
function lumotoPartition(arr,i,j){
    // initialize the pivot and its index
    var p = arr[i] , pIndex = i;
    for(var x = i+1; x<=j; x++){
        lumotoCounter++; // start incrementing the global lumotoCounter of the basic operation (comparison)
        if(arr[x] < p){ // only if the current element is less than the pivot do the following
            pIndex++; // increment the index of the pivot
            // then swap arr[pIndex] and arr[x]
            var temp = arr[pIndex];
            arr[pIndex] = arr[x];
            arr[x] = temp;
        }
    }
    // now swap arr[i] and arr[pIndex]
    var temp = arr[i];
    arr[i] = arr[pIndex];
    arr[pIndex] = temp;
    return pIndex; // reutnr the index of the pivot
}

/////////////////////////////////////////// QuickSelect for Sedgewick ///////////////////////////////////////////
function sedgewick(arr,l,r,k){
    var pivotInx = sedgewickPartition(arr, l, r); // initialize the pivotIndex
    if(pivotInx == k){ // if it is the same as k (index of median), return the element 
        return arr[pivotInx];
    }
    else if(pivotInx< k){ 
        l = pivotInx + 1; // else if it is greater than k, then discard of the right side of the array by changing r
    }
    else{
        r = pivotInx - 1; // else if it is less than k, then discard of the right side of the array by changing l
    }
    return sedgewick(arr,l,r,k); // call sedgewick again with the new changes
}

// Sedgewick partitioning method
function sedgewickPartition(arr, l, r){
    // initialize i, j and p (pivot element) to use in the partitioning
    var i = l-1;
    var j = r;
    var p = arr[r];
    while(true){
        while(arr[++i] < p){
            sCounter++; // start incrementing the global sCounter of the basic operation (comparison)
        }
        sCounter++; // increment the counter one more time for the comparison that broke the loop
        while(arr[--j] > p){
            sCounter++; 
        }
        sCounter++;
        if(i>=j)
            break;
        // swap arr[i] and arr[j]
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    // swap 
    var temp = arr[i];
    arr[i] = arr[r];
    arr[r] = temp;
    return i;
}


///////////////////////////////////////////////////MAIN///////////////////////////////////////////////////


//////////////////////////// first try the slides example to make sure our code is correct//////////////////////////

//////////////////////////////////////////////// lumoto C(n) = 14 //////////////////////////////////////////////////
//////////////////////////////////////////////// sedgewick C(n) = 36 ///////////////////////////////////////////////
/////////////////////////////////////////////// uncomment the following to run it //////////////////////////////////
// var array = [4,1,10,9,7,12,8,2,15];
// var array2 = [];
// for(var x=0; x<array.length;x++){
//     array2[x] = array[x];
// }

// var k = medianIndex(array.length);

// var lumotoCounter = 0;
// var sCounter = 0;

// console.log("Lumoto: ")
// console.log("The median is: ", lumoto(array, 0, array.length-1, k));
// console.log("C(n)=" , lumotoCounter);

// console.log("Sedgewick: " );
// console.log("The median is: ", sedgewick(array2, 0, array2.length-1, k));
// console.log("C(n)=" , sCounter);

/////////////////////////////////////////////// it works perfectly////////////////////////////////////////////


// now try a random array

// first, empty the global counters counters
lumotoCounter = 0;
sCounter = 0;

// create the two arrays
var arr1 = [];
var arr2 = [];
// User only enters the size of the array. This is the only part of the code that the user can change.
var size = 1000001;
// fill the first array using the fillArray Function
fillArray(arr1,size);
// copy the contents of the first array onto the second one
for(var x=0; x<arr1.length; x++){
    arr2[x] = arr1[x];
}
// find the index of the mediann using the medianIndex Function
k = medianIndex(size);

// print size of the array for the user to see
console.log("The size of the array is: " , size);

// Try Lumoto
console.log("---------------QuickSelect using Lumoto Partitioning---------------");
console.time("Lumoto Runtime: "); // start calculating the runtime here, right before calling the lumoto function
var lumotoExp = lumoto(arr1, 0, arr1.length-1, k);
console.timeEnd("Lumoto Runtime: "); // end it here, right after the function has returned a result
console.log("The median is: ", lumotoExp); // print the median
console.log("C(n)=" , lumotoCounter); // print the basic operation count

// Try Sedgewick
// same exact way as we did lumoto
console.log("---------------QuickSelect using Sedgewick Partitioning---------------");
console.time("Sedgewick Runtime: ");
var sedgewickExp = sedgewick(arr2, 0, arr2.length-1, k);
console.timeEnd("Sedgewick Runtime: ");
console.log("The median is: " , sedgewickExp);
console.log("C(n)=" , sCounter);