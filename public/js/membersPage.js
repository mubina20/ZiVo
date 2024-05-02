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

document.getElementById('charts-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const messages = document.querySelector('.messages');
  const members = document.querySelector('.memberS');
  
  charts.classList.add('active');
  messages.classList.remove('active');
  members.classList.remove('active');
});
document.getElementById('messages-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const messages = document.querySelector('.messages');
  const members = document.querySelector('.memberS');
  
  charts.classList.remove('active');
  messages.classList.add('active');
  members.classList.remove('active');
});
document.getElementById('members-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const messages = document.querySelector('.messages');
  const members = document.querySelector('.memberS');
  
  charts.classList.remove('active');
  messages.classList.remove('active');
  members.classList.add('active');
});