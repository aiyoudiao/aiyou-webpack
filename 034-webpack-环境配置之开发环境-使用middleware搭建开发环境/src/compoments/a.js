export function compomentA () {
    const ul = document.createElement('ul')
    const list = `
        <ul>
            <li>111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
        </ul>
    `

    ul.innerHTML = list

    return ul
}