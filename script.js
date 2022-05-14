const screenSize = 1600;
const sliderTimeInterval = 5000;

let headerOffset = 0;
const headerSliderLine = document.getElementById('slider-header');

document.querySelector('#slider-header-next').addEventListener('click', function(){
    headerOffset += screenSize;
    if (headerOffset > screenSize * 3)
        headerOffset = 0;
    headerSliderLine.style.left = -headerOffset + 'px';
});

document.querySelector('#slider-header-prev').addEventListener('click', function(){
    headerOffset -= screenSize;
    if (headerOffset < 0)
        headerOffset = screenSize * 3;
    headerSliderLine.style.left = -headerOffset + 'px';
});

const sliderContainer = document.getElementById('statement-slider-wrapper'),
      sliderItems = document.getElementsByClassName('slider-item'),
      buttons = document.getElementsByClassName('slide_button_dot');

let statementIndex = 0;

if (!localStorage.getItem('index')) {
    localStorage.setItem('index', statementIndex);
} else {
    statementIndex = Number(localStorage.getItem('index'));
}

const activateImage = n => {
    sliderContainer.style.left = -n * screenSize + 'px';
}

const activateDot = n => {
    for(let button of buttons) {
        button.classList.remove('but_chosen');
    }
    buttons[n].classList.add('but_chosen');
}

const activateSlide = n => {
    activateImage(n);
    activateDot(n);
}

const nextSlide = () => {
    statementIndex = (statementIndex + 1) % sliderItems.length;
    localStorage.setItem('index', statementIndex);
    activateSlide(statementIndex);
}

activateSlide(statementIndex);

Array.from(buttons).forEach((item, itemIndex) => {
    item.addEventListener('click', () => {
        statementIndex = 0;
        localStorage.setItem('index', statementIndex);
        activateSlide(itemIndex);
    })
});

setInterval(nextSlide, sliderTimeInterval);


function filtretion()
{
    const buttons = document.querySelectorAll('.button-class')
    const cards = document.querySelectorAll('.card')

    function filter(category, items) {
        items.forEach((item)=>{
            const isItemFiltered = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === 'all'

            if(isItemFiltered && !isShowAll){
                item.classList.add('hide')
            } else {
                item.classList.remove('hide')
            }
        })

    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const currentCategory = button.dataset.filter
            filter(currentCategory, cards)
            console.log(button.dataset.filter)
        })
    })
}

filtretion()