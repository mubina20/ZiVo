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

// CHART
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
  const members = document.querySelector('.memberS');
  
  charts.classList.add('active');
  comments.classList.remove('active');
  members.classList.remove('active');
});
document.getElementById('comments-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const comments = document.querySelector('.comments');
  const members = document.querySelector('.memberS');
  
  charts.classList.remove('active');
  comments.classList.add('active');
  members.classList.remove('active');
});
document.getElementById('members-section').addEventListener('click', function(event) {
  event.preventDefault(); 

  const charts = document.querySelector('.charts');
  const comments = document.querySelector('.comments');
  const members = document.querySelector('.memberS');
  
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

// Member status change
$(".mb_status").on('change', function(e) {
  const id = e.target.id;
  const mb_status = $(`#${id}.mb_status`).val();
  console.log("mb_status:", mb_status);
  
  axios
      .post('/admin/members/edit', {mb_id: id, mb_status: mb_status})
      .then(response => {
          const result = response.data;
          console.log(response.data);
          if(result.state === 'success') alert("mb_status changed successfully");
          else alert(result.message);
      })
      .catch(err => console.log(err));
});



