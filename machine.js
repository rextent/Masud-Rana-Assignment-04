const jobCards = document.querySelectorAll('.job-card')

const totalCount = document.getElementById('total-count')
const interviewCount = document.getElementById('interview-count')
const rejectedCount = document.getElementById('rejected-count');

const visibleCountText = document.getElementById('visible-count')

const filterButtons = document.querySelectorAll(".filter-btn")




// Counter Function

function updateCounts(){

    const jobCards = document.querySelectorAll(".job-card")
    let total = jobCards.length;
    let interview = 0;
    let rejected = 0;

    jobCards.forEach(function(card){
        if(card.dataset.statu === "interview"){
            interview++;
        }
        if(card.dataset.statu === "rejected"){
            rejected++;
        }
    });

    totalCount.innerText = total;
    interviewCount.innerText = interview;
    rejectedCount.innerText =rejected;
}
updateCounts();


// Status Change Function

function changeStatus (card, newStatus){
    const sttausText = card.querySelector('.statu')
    
    if(newStatus === 'interview'){
        sttausText.innerText = 'Interview';
    }

    if(newStatus === 'rejected'){
        sttausText.innerText = 'Rejected'
    }

    card.dataset.statu = newStatus;

    updateCounts();
}


// Interview Button

const interviewButton = document.querySelectorAll(".interview-btn");

interviewButton.forEach(function(button){
    button.addEventListener('click', function(){
        const card = button.closest(".job-card");
        changeStatus(card, "interview");
    });
});

// Rejected Button

const rejectedButton = document.querySelectorAll(".rejected-btn");

rejectedButton.forEach(function(button){
    button.addEventListener('click', function(){
        const card = button.closest(".job-card");
        changeStatus(card, 'rejected');
    });
});



// Filter Logic


filterButtons.forEach(function(button){
    button.addEventListener('click', function(){
        
        filterButtons.forEach(function(btn){
            btn.classList.remove('btn-primary');
            btn.classList.add("btn-soft")
        });
        button.classList.remove("btn-soft");
        button.classList.add("btn-primary");

        const filterValue = button.dataset.filter;
        const emptyState = document.getElementById('empty-state');

        let visibleCount = 0;

        jobCards.forEach(function(card){
            if(filterValue === "all"){
                card.style.display = "block";
                visibleCount++;
            }
            else if(card.dataset.statu === filterValue){
                card.style.display = 'block';
                visibleCount++;
            }
            else{
                card.style.display = 'none';
            }
        })

        if(visibleCount === 0){
            emptyState.style.display = 'block';
        }
        else{
            emptyState.style.display = 'none';
        }

        visibleCountText.innerText = visibleCount
    })
})


// Trash or Delete Section

const trashButton = document.querySelectorAll(".trash-btn");

trashButton.forEach(function(btn){
    btn.addEventListener('click', function(){
        // console.log("clicked");
        const card = btn.closest(".job-card");
        card.remove();
        updateCounts();

        const currentCards = document.querySelectorAll('.job-card');
        if(currentCards.length === 0){
            emptyState.style.display = 'block'
        }
    });
});

