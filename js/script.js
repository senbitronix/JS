// document.addEventListener('DOMContentLoaded', (e) => {

// --------------------------------------------------------------------TabsSec
const tabsParent = document.querySelector('.tabheader__items');
const tabs = document.querySelectorAll('.tabheader__item');

const tabContent = document.querySelectorAll('.tabcontent');

function hideContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.add('hide');
        tabContent[i].classList.remove('show');
        tabs[i].classList.remove('tabheader__item_active')
    }

}

function showContent(b) {

    hideContent(0);
    tabContent[b].classList.add('show', 'fade');
    tabContent[b].classList.remove('hide');
    tabs[b].classList.add('tabheader__item_active')

}

hideContent(1);

tabsParent.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (e.target == item) {
                showContent(i)
            }
        })
    }
})


// ---------------------------------------------------------------------TimerSec

const currentMonth = new Date().getMonth() + 1;

const deadline = `2021-0${currentMonth+1}-07T19:03:20`;
console.log(deadline);


const createTimeData = function (deadline) {
    const t = Date.parse(deadline) - new Date(),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor(t / (1000 * 60) % 60),
        seconds = Math.floor(t / 1000 % 60);
    return {
        t,
        days,
        hours,
        minutes,
        seconds
    }
}



function setClock(selector, deadline) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds');

    updateData();
    let intId = setInterval(updateData, 1000);

    function updateData() {
        const timeData = createTimeData(deadline);
        if (timeData.t <= 0) {
            clearInterval(intId);
            timer.style.display = 'none';
            timer.previousElementSibling.style.display = 'none'
        }
        days.innerHTML = timeData.days < 10 ? "0" + timeData.days : timeData.days;
        hours.innerHTML = timeData.hours;
        minutes.innerHTML = timeData.minutes;
        seconds.innerHTML = timeData.seconds;


    }
}

setClock(".timer", deadline)

// ---------------------------------------------------------------------modalSec

const modal = document.querySelector('.modal');
const openModalBtn = document.querySelectorAll('[data-modal="open"]');

function modalOpen() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";
}

function modalClose() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

openModalBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        modalOpen();
    })
})


document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && modal.classList.contains('show')) {
        modalClose()
    }
})

modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-modal') == "close") {
        modalClose()
    }
})

// const modalTimerId = setTimeout(() => {
//     console.log("settimeout");
//     modalOpen()
// }, 3000);

function scrollOpen() {

    if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
        modalOpen();
        window.removeEventListener('scroll', scrollOpen)
    }

}

window.addEventListener('scroll', scrollOpen)

// -------------------------------------------------------------------MenuCardSec

class MenuCard {
    constructor({
        img,
        alt,
        title,
        descr,
        preprice,
        parentCont
    }, ...classes) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.preprice = preprice;
        this.transfer = 27;
        this.parentCont = document.querySelector(parentCont);
        this.classes = classes;
    }

    get price() {
        return this.preprice * this.transfer;
    }

    render() {
        let divEl = document.createElement("div");
        this.classes.forEach((item) => {
            divEl.classList.add(item)
        })
        divEl.innerHTML = `            
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `
        this.parentCont.append(divEl)
    }
}

// axios.get('http://localhost:3000/menu')
//     .then(data => {
//         data.data.forEach(({
//             img,
//             altimg,
//             title,
//             descr,
//             price
//         }) => {
//             new MenuCard({
//                 descr,
//                 img,
//                 alt: altimg,
//                 title,
//                 preprice: price,
//                 parentCont: '.menu__field .container'
//             }, "menu__item").render()
//         });
//     })

new MenuCard({
    descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    img: "img/tabs/vegy.jpg",
    alt: "vegy",
    title: "Меню 'Фитнес'",
    parentCont: '.menu__field .container',
    preprice: 9
}, "menu__item", "big").render();

new MenuCard({
    descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    img: "img/tabs/elite.jpg",
    alt: "elite",
    title: 'Меню “Премиум”',
    parentCont: '.menu__field .container',
    preprice: 12
}, "menu__item").render();

new MenuCard({
    descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    img: "img/tabs/post.jpg",
    alt: "post",
    title: "Меню 'Фитнес'",
    parentCont: '.menu__field .container',
    preprice: 18
}, "menu__item").render();

//--------------------------------------------------XMLHttpRequestSec (not JSON)

/* let forms = document.querySelectorAll('form');
forms.forEach(item => {
    makeRequest(item)
})

const messages = {
    loading: 'Loading...',
    success: 'SUCCESS!',
    fail: 'FAIL!'
}


function makeRequest(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        let message = document.createElement('div');
        message.classList.add('status');
        message.textContent = messages.loading;
        if (form.lastElementChild.classList.contains('status')) {
            form.lastElementChild.remove();
            form.append(message);
        } else {
            form.append(message);
        }

        const formData = new FormData(form);
        request.send(formData);

        request.addEventListener('load', (e) => {
            if (request.status == 200) {
                message.textContent = messages.success;
                console.log(request.response);

            } else {
                message.style.color = 'red';
                message.textContent = messages.fail;
            }

            setTimeout(() => {
                message.remove();
            }, 2000)
        })
    })
} */

// ------------------------------------------------------XMLHttpRequestSec(JSON)

// const forms = document.querySelectorAll('form');
// forms.forEach((item) => makeJsonRequest(item));

// const messages = {
//     loading: 'img/form/spinner.svg',
//     success: 'SUCCESS!',
//     failure: 'FAIL!'
// }

// function makeJsonRequest(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         let message = document.createElement('img');
//         message.classList.add('status');
//         message.style.cssText = `
//             position: absolute;
//             left: 50%;            
//         `;
//         message.src = messages.loading;
//         console.log(message.src);
//         if (form.lastElementChild.classList.contains('status')) {
//             form.lastElementChild.remove();
//         }
//         form.insertAdjacentElement('afterend', message);


//         const request = new XMLHttpRequest();
//         request.addEventListener('load', (e) => {
//             if (request.status == 200) {
//                 showThanksModal(messages.success);
//                 console.log(request.response);
//             } else {
//                 showThanksModal(messages.failure);
//             }
//             message.remove();
//         })

//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-type', 'application/json');

//         const formData = new FormData(form);

//         let objFormData = {};

//         formData.forEach((item, i) => {
//             objFormData[i] = item
//         })
//         // [].forEach.call(formData, (item, i) => {
//         //     objFormData[i] = item
//         // })
//         const json = JSON.stringify(objFormData);

//         request.send(json);
//     })

// }


// ----------------------------------------------------thanksModalSec(+request)


function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.remove();
    modalOpen();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-modal="close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        modal.append(modalDialog);
        modalClose();
    }, 2000);


}

// Promise
var isMomHappy = false;


var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // Всё выполнено
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // reject
        }
    }
);

// ---------------------------------------------------------------------sliderSec

/* const slides = document.querySelectorAll('.offer__slide'),
    sliderNext = document.querySelector('.offer__slider-next'),
    sliderPrev = document.querySelector('.offer__slider-prev');
    
let current = document.querySelector('#current'),        
    counter = 0;

current.textContent = "01";

function show(a) {
    slides.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show')
    });
    slides[a].classList.add('show');
    slides[a].classList.remove('hide');
}
show(0)

function currentChange() {
    if (counter > slides.length-1) {
        counter = 0;
    };
    if (counter < 0) {
        counter = slides.length-1;
    };
    current.textContent = (counter<10) ? `0${counter+1}` : counter+1;
};
      
sliderNext.addEventListener('click', (e) => {
    counter++;
    currentChange()
    show(counter);
})
    
sliderPrev.addEventListener('click', (e) => {
    counter--;        
    currentChange()
    show(counter);
}) */

// --------------------------------------------------------------sliderComplexSec

const slider = document.querySelector('.offer__slider'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderInner = document.querySelector('.offer__slider-inner'),

    slides = document.querySelectorAll('.offer__slide'),
    sliderNext = document.querySelector('.offer__slider-next'),
    sliderPrev = document.querySelector('.offer__slider-prev'),
    width = window.getComputedStyle(sliderWrapper).width;

sliderWrapper.style.overflow = "hidden";
sliderInner.style.cssText = `
        display: flex;
        width: ${100*slides.length}%;
        transition: 0.5s;        
    `;

slides.forEach(item => {
    item.style.width = width;
});

let offset = 0;
sliderNext.addEventListener('click', (e) => {
    if (offset == width.slice(0, -2) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += parseInt(width)
    }

    currentChange(e.currentTarget);
})

sliderPrev.addEventListener('click', (e) => {
    if (offset == 0) {
        offset = parseInt(width) * (slides.length - 1);
    } else {
        offset -= parseInt(width)
    }

    currentChange(e.currentTarget);
})

let current = document.querySelector('#current'),
    counter = 0;
current.textContent = "01";

function render() {
    for (let i = 0; i < sliderNav.children.length; i++) {
        sliderNav.children[i].style.opacity = 0.5;
    }
    sliderNav.children[counter].style.opacity = 1;

    current.textContent = (counter < 10) ? `0${counter+1}` : counter + 1;

    sliderInner.style.transform = `translateX(-${offset}px)`;
}

function currentChange(b) {
    if (b == sliderNext) {
        counter++;
        if (counter > slides.length - 1) {
            counter = 0;
        }
    };
    if (b == sliderPrev) {
        counter--;
        if (counter < 0) {
            counter = slides.length - 1;
        }
    }

    render()
};

// -----------------------------------------------------------sliderNavigationSec
slider.style.position = "relative";
const sliderNav = document.createElement('ol');
sliderNav.classList.add('carousel-indicators');
slider.append(sliderNav);
for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement('li');
    dot.setAttribute('data-dot-number', i);
    dot.classList.add('dot');
    sliderNav.append(dot);
}
sliderNav.children[0].style.opacity = 1;


sliderNav.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('dot')) {
        counter = +e.target.getAttribute('data-dot-number');
        offset = parseInt(width) * (counter);
        render();
    }
    console.log(e.target);
})

// -------------------------------------------------------------calculatorSec

const gender = document.querySelectorAll('#gender div');
const constitution = document.querySelectorAll('.calculating__choose_medium input');
const activity = document.querySelectorAll('.calculating__choose_big div');
let calcTotal = document.querySelector('.calculating__total span');

let state = {
    sex: localStorage.getItem('sex') || "female",
    constitution: {
        height: localStorage.getItem('height') || 0,
        weight: localStorage.getItem('weight') || 0,
        age: localStorage.getItem('age') || 0,
    },
    ratio: localStorage.getItem('ratio') || 1.375,
    total: calcTotal.textContent
};

makeActiveStart(state, gender, constitution, activity);
calc(state);

addListners(gender, state);
addListners(constitution, state);
addListners(activity, state);


function makeActiveStart(pstate, gender, constitution, activity) {

    gender.forEach(item => {
        item.classList.remove('calculating__choose-item_active');
        if (item.getAttribute('data-sex') == pstate.sex) {
            item.classList.add('calculating__choose-item_active');
        }
    });

    constitution[0].value = pstate.constitution.height;
    constitution[1].value = pstate.constitution.weight;
    constitution[2].value = pstate.constitution.age;

    activity.forEach(item => {
        item.classList.remove('calculating__choose-item_active');
        if (item.getAttribute('data-ratio') == pstate.ratio) {
            item.classList.add('calculating__choose-item_active');
        }
    });
}

function makeActive(els, curTar) {
    els.forEach(item => {
        item.classList.remove('calculating__choose-item_active');
    });
    curTar.classList.add('calculating__choose-item_active');
}

function addListners(els, state) {

    switch (els) {
        case gender:
            els.forEach(item => {
                item.addEventListener('click', (e) => {
                    localStorage.setItem('sex', e.currentTarget.getAttribute('data-sex'));
                    state.sex = localStorage.getItem('sex');
                    makeActive(els, e.currentTarget);
                    calc(state);
                });
            })
            break;
        case constitution:
            els.forEach(item => {
                item.addEventListener('input', (e) => {
                    let constitution = state.constitution;
                    if (e.currentTarget.value.match(/\D/g)) {
                        e.currentTarget.style.border = '2px solid red';
                    } else {
                        e.currentTarget.style.border = 'none'
                    }
                    switch (e.currentTarget.getAttribute('id')) {
                        case 'height':
                            localStorage.setItem('height', +e.currentTarget.value);
                            constitution.height = localStorage.getItem('height');
                            break;
                        case 'weight':
                            localStorage.setItem('weight', +e.currentTarget.value);
                            constitution.weight = localStorage.getItem('weight');
                            break;
                        case 'age':
                            localStorage.setItem('age', +e.currentTarget.value);
                            constitution.age = localStorage.getItem('age');
                            break;
                    }
                    calc(state);
                });
            })
            break;
        case activity:
            els.forEach(item => {
                item.addEventListener('click', (e) => {
                    localStorage.setItem('ratio', e.currentTarget.getAttribute('data-ratio'));
                    state.ratio = +localStorage.getItem('ratio');
                    makeActive(els, e.currentTarget)
                    calc(state);
                });
            })
            break;
    }
}

function calc(pstate) {
    let {
        sex,
        constitution: {
            height,
            weight,
            age
        },
        ratio
    } = pstate;
    if (height && weight && age) {
        if (sex == "female") {
            pstate.total = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            pstate.total = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    } else {
        pstate.total = "0"
    };

    calcTotal.textContent = pstate.total;
    // console.table(state);
}















// let bul1 = 1;
// let bul2 = 2;

// let p = new Promise((resolve, reject) => {
//     console.log('Starting...');        
//     setTimeout(() => {
//         let obj1 = {
//             name: 'Vasya',
//         };
//         console.log(obj1);
//         resolve(obj1)
//     }, 1000)
// });


// p.then(data => {
//     return new Promise((resolve, reject) => {
//         setTimeout(()=> {
//             data.age = 40;
//             console.log(data);
//             resolve(data)
//         }, 1000)
//     })

// }).catch(err => {
//     console.error(`Error: ${err}`)
// }).finally(() => {
//     setTimeout(()=> {
//         console.log('finally');
//     }, 1000)
// })

//------------------------------------------------

// let bul1 = 1;
// let bul2 = 1;

// let prom = new Promise((resolve, reject) => {
//     console.log('starting...');
//     setTimeout(() => {
//     resolve({name: "vasya"})
//     }, 2000)
// });

// for(let i = 0; i < 320000000; i++) {
//     Math.random(338389)
// }    
// console.log("for done");

// prom.then((data) => {
//     console.log('First THEN accepted');
//     console.log('data 1: ');
//     console.log(data);
//     data.age = 40;
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (bul2) {
//                 resolve(data)
//             } else {
//                 reject("alalalala!")
//             }
//         }, 2000)
//     })


// }).then((data) => {
//     console.log('Second THEN accepted');
//     console.log('data 2: ');
//     console.log(data);
// }).catch((err) => {
//     console.error(`Error: ${err}`);
// }).finally(() => {
//     console.log(`finaly`);
// })        
// })