console.log("==== This is Member control page ====");

// Count the number of members
$(function(){
    $numberElem = $('.number');  
    $members = $('.members'); 
    
    // Define
    function countUp(elem, countFrom, countTo, countSpeed) {
        elem.text(countFrom);
        
        if(countFrom < countTo) {
            countFrom++;
            
            setTimeout(function() {
                countUp(elem, countFrom, countTo, countSpeed);
            }, countSpeed);
        }
    };

    // Call
    countUp($numberElem, 0, $members.text(), 200);  
});
