const host = 'https://api.soft/';
let containerDescriptor = [];
containerDescriptor = document.querySelectorAll('.container-descriptor');
const containerItemCount = document.querySelector('.container-item-count');

const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const bgCurcle = document.querySelector('.bg-curcle');

const burger = document.querySelector('#burger');
const enterLogin = document.querySelector('#enter-login');
const startProject = document.querySelector('#start-project');
const buySite = document.querySelector('#buy-site');
const buyBot = document.querySelector('#buy-bot');

let notificationFlag = false;

let curcleMoveFlag = false;
let curcleMoveCount = 0;
const saleBlock = document.querySelector('.sales');
const loginName = document.querySelector('#login-name');
const userName = document.querySelector('#name-user');

if (document.cookie.indexOf('auth=1') !== -1){
    saleBlock.style.display = 'none';
    const n = getCookie('name');
    loginName.innerHTML = n;
    userName.innerHTML = n;
    notificationShow(`Здравствуйте, ${n}!<br>Ради снова Вас видеть!`); // что

} else {
    notificationShow("Привет! Меня зовут Фектс! <br>Я буду Вашим ассистентом!<br>Нажмите на уведомление и оно закроется!");

    setTimeout(() => {
        notificationShow("Я использую Ваши cookie, чтобы<br>Вам было удобнее пользоватся<br>нашим сайтом! <a class='notifiction-link' href='#'>Подробнее</a>");
    }, 5000);
}

for(let i = 0; i < containerDescriptor.length; i++){
    if(i === 0) { continue; }
    
    containerDescriptor[i].style.opacity = '0';
}

let activeWindow = 0;
windowNav = document.querySelector('.navigation-wrapper');
burger.addEventListener('click', function(){
    if(activeWindow != 0){
        activeWindow.style.height = '0';
    }
    // notificationShow("Меню в разработке!");
    windowNav.style.height = '100%';
    document.body.style.overflowY = 'hidden';
    closeNav.style.display = 'block';
    activeWindow = windowNav;
});
closeNav = document.querySelector('#close-nav');
closeNav.addEventListener('click', function(){
    // notificationShow("Меню в разработке!");
    windowNav.style.height = '0';
    document.body.style.overflowY = 'auto';
    closeNav.style.display = 'none';
});

closeForm = document.querySelector('#close-form');
windowForm = document.querySelector('.wrapper-request-form');
closeForm.addEventListener('click', function(){
    if(activeWindow != 0){
        activeWindow.style.height = '0';
    }
    // notificationShow("Меню в разработке!");
    windowForm.style.height = '0';
    document.body.style.overflowY = 'auto';
    closeForm.style.display = 'none';
    activeWindow = windowForm;
});
enterLogin.addEventListener('click', function(){
    if (document.cookie.indexOf('auth=1') !== -1){
        notificationShow("Вы уже авторизованны!");
        return;
    }
    notificationShow("Авторизируйтесь и получите скидку!<br>Вы получите доступ к общему чату!");
    windowForm.style.height = '100%';
    document.body.style.overflowY = 'hidden';
    closeForm.style.display = 'block';
    activeWindow = windowForm;

    document.querySelector('#info').style.display = 'none';

    let title = document.querySelector('.form-title');
    title.innerHTML = 'Авторизация';
    buttonAuth.style.display = 'block';
    buttonForm.style.display = 'none';

});
startProject.addEventListener('click', function(){
    notificationShow("Кнопка в разработке!");
});
buySite.addEventListener('click', function(){
    //notificationShow("Кнопка в разработке!");
    if(activeWindow != 0){
        activeWindow.style.height = '0';
    }
    // notificationShow("Меню в разработке!");
    windowForm.style.height = '100%';
    document.body.style.overflowY = 'hidden';
    closeForm.style.display = 'block';
    activeWindow = windowForm;

    let name = document.querySelector('#name');
    let info = document.querySelector('#info');
    let title = document.querySelector('.form-title');

    if (document.cookie.indexOf('auth=1') !== -1){
        name.style.display = 'none';
        phone.style.display = 'none';
    }

    info.style.display = 'block';
    buttonAuth.style.display = 'none';
    buttonForm.style.display = 'block';
    title.innerHTML = 'Новая заявка';
});
buyBot.addEventListener('click', function(){
    notificationShow("Кнопка в разработке!");
});

arrowLeft.addEventListener('click', function(){
    if(curcleMoveFlag === true) return;
    curcleMove('left');
    console.log("left");
});

arrowRight.addEventListener('click', function(){
    if(curcleMoveFlag === true) return;
    curcleMove('right');
    console.log("right");
});

function curcleMove(type){
    if(curcleMoveFlag) return;

    const style = window.getComputedStyle(bgCurcle);
    const matrix = new DOMMatrix(style.transform);
    const translateX = matrix.m41;
    console.log(curcleMoveCount)

    if(type === "right"){
        if(curcleMoveCount >= containerDescriptor.length - 1) return;
        containerDescriptor[curcleMoveCount].style.opacity = '0';
        bgCurcle.style.width = '30px';
        bgCurcle.style.borderRadius = '30px';
        curcleMoveCount++;
        bgCurcle.style.transform = `translate(calc(${translateX}px + 5px), -50%)`;
        curcleMoveFlag = true;
        setTimeout(function(){
            bgCurcle.style.width = '10px';
            bgCurcle.style.borderRadius = '50%';
            bgCurcle.style.transform = `translate(calc(${translateX}px + 30px), -50%)`;

            containerDescriptor[curcleMoveCount].style.opacity = '1';
            
        }, 200)
    }
    if(type === "left"){
        if(curcleMoveCount <= 0) return;
        bgCurcle.style.width = '30px';
        bgCurcle.style.borderRadius = '30px';
        containerDescriptor[curcleMoveCount].style.opacity = '0';
        curcleMoveCount--;
        
        bgCurcle.style.transform = `translate(calc(${translateX}px - 30px), -50%)`;
        curcleMoveFlag = true;
        setTimeout(function(){
            bgCurcle.style.width = '10px';
            bgCurcle.style.borderRadius = '50%';
            bgCurcle.style.transform = `translate(calc(${translateX}px - 30px), -50%)`;

            containerDescriptor[curcleMoveCount].style.opacity = '1';
        }, 200)
    }
    if(curcleMoveCount < 6) containerDescriptor[curcleMoveCount].style.opacity = '1';

    setTimeout(function(){
        curcleMoveFlag = false;
    }, 500)
}

//=======================
buttonAuth = document.querySelector('#button-auth');
buttonAuth.addEventListener('click', function(){
    if (document.cookie.indexOf('auth=1') !== -1){
        notificationShow('Вы уже авторизованны!');
        return;
    }
    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');

    if(name.value.length < 5){
        notificationShow("Некорректное имя!");
        return;
    }
    if(!isValidPhoneNumber(phone.value)){
        notificationShow("Некорректный телефон!");
        return;
    }

    buttonAuth.style.cursor = 'no-drop';
    buttonAuth.style.opacity = '.5';
    notificationShow("Авторизация...");

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('phone', phone.value);
    

    fetch(`${host}auth/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response.text());
        notificationShow("Отлично!<br>Вы авторизовались!");

        buttonAuth.style.cursor = 'pointer';
        buttonAuth.style.opacity = '1';
        windowForm.style.height = '0';
        document.body.style.overflowY = 'auto';
        closeForm.style.display = 'none';
        activeWindow = windowForm;

        const now = new Date();
        const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        document.cookie = `auth=1; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `name=${name.value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `phone=${phone.value}; expires=${expirationDate.toUTCString()}; path=/`;

        name.value = '';
        phone.value = '';
        saleBlock.style.display = 'none';
        loginName.innerHTML = getCookie('name');
        userName.innerHTML = getCookie('name');
    })
    .catch(error => {
        notificationShow("Извините!<br>Технические неполадки на сервере!");
        buttonAuth.style.cursor = 'pointer';
        buttonAuth.style.opacity = '1';

        name.value = '';
        phone.value = '';
    });
})
//=======================
buttonForm = document.querySelector('#button-form');
buttonForm.addEventListener('click', function(){
    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let info = document.querySelector('#info');
    const formData = new FormData();
    if (document.cookie.indexOf('auth=1') !== -1){
        formData.append('name', getCookie('name'));
        formData.append('phone', getCookie('phone'));
    } else {

        if(name.value.length < 5){
            notificationShow("Некорректное имя!");
            return;
        }
        if(!isValidPhoneNumber(phone.value)){
            notificationShow("Некорректный телефон!");
            return;
        }
        formData.append('name', name.value);
        formData.append('phone', phone.value);
    }

    if(info.value.length < 20){
        notificationShow("Введите описание проекта!");
        return;
    }
    formData.append('info', info.value);
    notificationShow("Отправляю заявку...");
    buttonForm.style.cursor = 'no-drop';
    buttonForm.style.opacity = '.5';
    

    fetch(`${host}requests/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response.text());
        notificationShow("Отлично!<br>Мы уже обрабатываем Вашу заявку!<br>Наш менеджер скоро свяжется с Вами!");

        buttonForm.style.cursor = 'pointer';
        buttonForm.style.opacity = '1';
        windowForm.style.height = '0';
        document.body.style.overflowY = 'auto';
        closeForm.style.display = 'none';
        activeWindow = windowForm;

        name.value = '';
        phone.value = '';
        info.value = '';
    })
    .catch(error => {
        notificationShow("Извините!<br>Технические неполадки на сервере!");
        buttonForm.style.cursor = 'pointer';
        buttonForm.style.opacity = '1';

        name.value = '';
        phone.value = '';
        info.value = '';
    });

});
//=======================
const block = document.getElementById('myElement');
const headerBlock = document.getElementById('header')
window.addEventListener('scroll', function() {
    // if (block.scrollTop === 0) {
    //     console.log('Скролл находится на верху элемента myElement');
    //   }
    if(window.scrollY >= 100){
        headerBlock.style.background = 'linear-gradient(to right, #8f31a6 0, #2871b5 100%)';
    }
    else{
        headerBlock.style.background = '#ffffff00';
    }
});
// ===================================
const notification = document.querySelector('.notification-wrapper');
const notificationText = document.querySelector('#notification-text');

notification.addEventListener('click', function(){

    notificationClose();

});

function notificationClose(){
    if(notificationFlag === false) return;
    notification.style.opacity = '0';
    setTimeout(() => {
        notificationFlag = false;
        notification.style.transform = 'translate(-500px, 0)';
    }, 300);
}

function notificationShow(text){
    if(notificationFlag === true) {
        notificationClose();
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notificationText.innerHTML = text;
            notificationFlag = true;
            notification.style.transform = 'translate(0, 0)';
            // setTimeout(() =>{
                
                
            // }, 300);
        }, 600);

        return;
    }


    notificationFlag = true;
    setTimeout(() => {
        notification.style.opacity = '1';
        notificationText.innerHTML = text;
        notification.style.transform = 'translate(0, 0)';
        // setTimeout(() =>{
            
        // }, 300);
    }, 600);

}
sendAPI();
function sendAPI(){
    const xhr = new XMLHttpRequest();
    const url = host;
    xhr.open('GET', `${url}`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            //const response = JSON.parse(xhr.responseText);
            // if (response.error) {
            //     console.log(`Ошибка авторизации: ${response.error}`);
            // } else {
                
                
            // }
            console.log(xhr.responseText)
        } 
        else {
            console.log(response)
        }
        //closeLoadWindow();
    };  
    xhr.send();
}
function isValidPhoneNumber(phoneNumber) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phoneNumber);
}
function getCookie(name){
    const cookies = document.cookie.split("; "); 
    for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("="); 
        if (cookie[0] === name) {
            return cookie[1];
        }
    }

    return 'null';
}