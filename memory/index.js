/**
memory模式: 
    - 所有路径信息存储在本地，如localStorage
    - 缺点是没有url，是一个单机版的路由
*/
const indexPage = document.createElement('div')
indexPage.innerHTML = '<h3>Index</h3>'
const page1 = document.createElement('div')
page1.innerHTML = '<h3>Page1</h3>'
const page2 = document.createElement('div')
page2.innerHTML = '<h3>Page2</h3>'
const page3 = document.createElement('div')
page3.innerHTML = '<h3>Page3</h3>'
const page4 = document.createElement('div')
page4.innerHTML = '<h3>Page4</h3>'
const page404 = document.createElement('div')
page404.innerHTML = '<h3>Page Not Found</h3>'

// 路由表
const routeTable = {   
    '/': indexPage, 
    '/page1': page1,
    '/page2': page2,
    '/page3': page3,
    '/page4': page4,
    '/page404': page404,
}

function matchRoute(url) {
    const page = routeTable[url]
    return (page ? page : routeTable['/page404'])
}

function renderPage(container, page) {
    if (!container || !page) return;
    container.innerHTML = ''
    container.appendChild(page)
}

function route(container) {
    if (!container) return;

    const path = window.localStorage.getItem('pageRouter')
    const page = matchRoute(path)

    renderPage(container, page)
}

function onRouterState(app) {
    route(app)
}

function _main() {
    const app = document.getElementById('app')
    const allLink = document.querySelectorAll('a.link')
    for(let a of allLink) {
        a.addEventListener('click', e => {
            e.preventDefault();
            const href = e.target.getAttribute('href')
            window.localStorage.setItem('pageRouter', href)
            onRouterState(app)
        })
    }

    route(app)
}

_main()