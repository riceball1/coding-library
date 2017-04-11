window.addEventListener('scroll', function (e) {
	console.log(window.innerHeight, document.body.scrollTop)
	let nav = document.getElementById('index-nav');
	if (document.documentElement.scrollTop || document.body.scrollTop > 600) {
        nav.classList.add('nav-transparent');
    } else {
        nav.classList.remove('nav-transparent');
    }
});
