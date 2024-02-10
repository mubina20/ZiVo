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


new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Africa", "Asia", "Europe"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,1267,734,784,433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Zivo's members"
      }
    }
});

document.getElementById('charts-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const comments = document.querySelector('.comments');
  const members = document.querySelector('.members');
  
  charts.classList.add('active');
  comments.classList.remove('active');
  members.classList.remove('active');
});
document.getElementById('comments-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const comments = document.querySelector('.comments');
  const members = document.querySelector('.members');
  
  charts.classList.remove('active');
  comments.classList.add('active');
  members.classList.remove('active');
});
document.getElementById('members-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const comments = document.querySelector('.comments');
  const members = document.querySelector('.members');
  
  charts.classList.remove('active');
  comments.classList.remove('active');
  members.classList.add('active');
});



function selectSection(section) {
  // Barcha bo'limlarni tanlangan qilib olish
  const sections = document.querySelectorAll('.section');

  // Har bir bo'limdan 'active' klassini olib tashlash
  sections.forEach(section => {
      section.classList.remove('select_active');
  });

  // Tanlangan bo'limga 'active' klassini qo'shish
  const selectedSection = document.querySelector('.' + section);
  selectedSection.classList.add('select_active');
}


