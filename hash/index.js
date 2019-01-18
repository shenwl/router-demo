/**
hash模式: 
    - hash任何情况都能做前端路由
    - 缺点：对SEO不友好（服务器收不到hash，浏览器不会把'#'之后内容发给服务器)
    - ‘#’ 后面虽然不一样，但是会被认为是同一个页面
*/

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

// const routes = [
//     {
//         path: 'page1',
//         component: page1,
//         children: []
//     },
//     {
//         path: 'page2',
//         component: page2,
//     },
//     {
//         path: 'page3',
//         component: page3,
//     },
//     {
//         path: 'page4',
//         component: page4,
//     },
//     {
//         path: 'page404',
//         component: page404,
//     },
// ]

// 路由表
const routeTable = {
    page1,
    page2,
    page3,
    page4,
    page404,
}

function matchRoute(hashUrl) {
    const page = routeTable[hashUrl]
    return (page ? page : routeTable.page404)
}

function renderPage(container, page) {
    if (!container || !page) return;
    container.innerHTML = ''
    container.appendChild(page)
}

function route(container) {
    const hashUrl = window.location.hash.substr(1)
    const page = matchRoute(hashUrl)

    if (!container) return;

    renderPage(container, page)
}

function _main() {
    const app = document.getElementById('app')

    route(app)

    window.addEventListener('hashchange', (e) => {
        route(app)
    })
}

_main()