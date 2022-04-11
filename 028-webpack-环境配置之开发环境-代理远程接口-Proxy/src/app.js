import base from './css/base.less';
import common from './css/common.less';

$('div').addClass('new');

// $.get('/api/comments/show', {
//     id: '4316823396398996',
//     page: 1
//   }, function (data) {
//     console.log(data);
//   });
$.get('/comments/show', {
    id: '4316823396398996',
    page: 1
  }, function (data) {
    console.log(data);
  });

  $.get('/msg/index', {
    format: 'cards'
  }, function (data) {
    console.log(data);
  })