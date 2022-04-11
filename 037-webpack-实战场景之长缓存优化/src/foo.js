import react from 'react'
import module from './module'

import(/* webpackChunkName: 'async' */'./async').then(function (a) {
    console.log(a)
})

console.log('hello world!!')
