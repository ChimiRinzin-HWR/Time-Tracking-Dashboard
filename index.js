const type = document.querySelectorAll(".types");

const weekly = document.querySelector(".week");
const colorBlue = getComputedStyle(document.documentElement).getPropertyValue("--Desaturatedblue");

const format = document.querySelectorAll(".format");
myfunction("weekly");

var selected = weekly;

var counter = 0;
selected.classList.add("clicked");
function myfunction(selection){
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                var name = element.title;
                if(element.title.includes(" ")){
                    name = element.title.replace(/\s+/g, "");
                }
                const currentHours = document.querySelector(`.${name.toLowerCase()}h`);
                const previousHours = document.querySelector(`.${name.toLowerCase()}p`);
                previousHours.textContent = element.timeframes[selection].previous;
                currentHours.textContent = element.timeframes[selection].current;
            });
        })
}

type.forEach(element => {
    element.addEventListener("click", function(){
        if(selected != element){
            const formatShown = element.classList[1];
            format.forEach(element1 => {
                element1.textContent = formatShown;
            })
            selected.classList.remove("clicked");
            element.classList.add("clicked");
            selected = element;
            myfunction(selected.textContent.toLowerCase());
        }
    })
});