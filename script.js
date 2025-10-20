/******BURGERMENU*******/
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.menu-overlay').classList.add('active');
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.menu-overlay').classList.remove('active');
});
/******BURGERMENU*******/