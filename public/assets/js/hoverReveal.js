
window.onload = () => {
    const items = document.querySelectorAll('.reveal-container')
    //const image = document.querySelector('img')

    items.forEach((el) => {
    el.addEventListener('mouseover', (e) => {
        console.log('hover')
        //imageData = e.target.getAttribute('data-image')
        //console.log(imageData)
        e.target.style.zIndex = 99
        //image.setAttribute('src', imageData)
    })
    el.querySelector('.hover-reveal').addEventListener('mousemove', (e) => {
        el.style.top = e.clientY + 'px'
        el.style.left = e.clientX + 'px'
    })
    el.querySelector('.hover-reveal').addEventListener('mouseleave', (e) => {
        e.target.style.zIndex = 1
    })
    })
}