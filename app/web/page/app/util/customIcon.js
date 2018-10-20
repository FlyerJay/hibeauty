/**
 * @author flyerjay
 * @desc 百度地图 - 自定义图标
 * @since 2018-10-19
 */
'use strict';

function generateIcon(url) {
  if (typeof BMap !== 'undefined') {
    return new window.BMap.Icon(url, new window.BMap.Size(30, 30), {
      imageSize: new window.BMap.Size(30, 30),
      anchor: new window.BMap.Size(15, 30)
    });
  }
}

export const walk = generateIcon('http://i.snowyet.cc/static/img/p.gif');
export const shadow = generateIcon('http://i.snowyet.cc/static/img/shadow.png');
export const company = generateIcon('http://i.snowyet.cc/static/img/company.png');
export const home = generateIcon('http://i.snowyet.cc/static/img/home.png');
export const warning = generateIcon('http://i.snowyet.cc/static/img/warning1.png');
export const danger = generateIcon('http://i.snowyet.cc/static/img/warning.png');