// ==UserScript==
// @author      Kevin Darlington (http://outroot.com)
// @name        twitchmod
// @namespace   twitchmod
// @description A userscript for twitch.tv to do things like save chat URLs, history, etc...
// @include     http://www.twitch.tv/*
// @include     http://*.twitch.tv/*
// @exclude     http://www.twitch.tv/*/popout
// @exclude     http://www.twitch.tv/
// @exclude     http://www.twitch.tv/directory/*
// @grant       none
// @version     1
// ==/UserScript==

function main()
{
  if (self !== top)
  {
    return;
  }

  // TinyColor v0.9.14
  // https://github.com/bgrins/TinyColor
  // 2013-04-04, Brian Grinstead, MIT License
  (function(root){function tinycolor(color,opts){if(color=color?color:"",opts=opts||{},"object"==typeof color&&color.hasOwnProperty("_tc_id"))return color;var rgb=inputToRGB(color),r=rgb.r,g=rgb.g,b=rgb.b,a=rgb.a,roundA=mathRound(100*a)/100,format=opts.format||rgb.format;return 1>r&&(r=mathRound(r)),1>g&&(g=mathRound(g)),1>b&&(b=mathRound(b)),{ok:rgb.ok,format:format,_tc_id:tinyCounter++,alpha:a,toHsv:function(){var hsv=rgbToHsv(r,g,b);return{h:360*hsv.h,s:hsv.s,v:hsv.v,a:a}},toHsvString:function(){var hsv=rgbToHsv(r,g,b),h=mathRound(360*hsv.h),s=mathRound(100*hsv.s),v=mathRound(100*hsv.v);return 1==a?"hsv("+h+", "+s+"%, "+v+"%)":"hsva("+h+", "+s+"%, "+v+"%, "+roundA+")"},toHsl:function(){var hsl=rgbToHsl(r,g,b);return{h:360*hsl.h,s:hsl.s,l:hsl.l,a:a}},toHslString:function(){var hsl=rgbToHsl(r,g,b),h=mathRound(360*hsl.h),s=mathRound(100*hsl.s),l=mathRound(100*hsl.l);return 1==a?"hsl("+h+", "+s+"%, "+l+"%)":"hsla("+h+", "+s+"%, "+l+"%, "+roundA+")"},toHex:function(allow3Char){return rgbToHex(r,g,b,allow3Char)},toHexString:function(allow3Char){return"#"+rgbToHex(r,g,b,allow3Char)},toRgb:function(){return{r:mathRound(r),g:mathRound(g),b:mathRound(b),a:a}},toRgbString:function(){return 1==a?"rgb("+mathRound(r)+", "+mathRound(g)+", "+mathRound(b)+")":"rgba("+mathRound(r)+", "+mathRound(g)+", "+mathRound(b)+", "+roundA+")"},toPercentageRgb:function(){return{r:mathRound(100*bound01(r,255))+"%",g:mathRound(100*bound01(g,255))+"%",b:mathRound(100*bound01(b,255))+"%",a:a}},toPercentageRgbString:function(){return 1==a?"rgb("+mathRound(100*bound01(r,255))+"%, "+mathRound(100*bound01(g,255))+"%, "+mathRound(100*bound01(b,255))+"%)":"rgba("+mathRound(100*bound01(r,255))+"%, "+mathRound(100*bound01(g,255))+"%, "+mathRound(100*bound01(b,255))+"%, "+roundA+")"},toName:function(){return 0===a?"transparent":hexNames[rgbToHex(r,g,b,!0)]||!1},toFilter:function(secondColor){var hex=rgbToHex(r,g,b),secondHex=hex,alphaHex=Math.round(255*parseFloat(a)).toString(16),secondAlphaHex=alphaHex,gradientType=opts&&opts.gradientType?"GradientType = 1, ":"";if(secondColor){var s=tinycolor(secondColor);secondHex=s.toHex(),secondAlphaHex=Math.round(255*parseFloat(s.alpha)).toString(16)}return"progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr=#"+pad2(alphaHex)+hex+",endColorstr=#"+pad2(secondAlphaHex)+secondHex+")"},toString:function(format){format=format||this.format;var formattedString=!1;return"rgb"===format&&(formattedString=this.toRgbString()),"prgb"===format&&(formattedString=this.toPercentageRgbString()),("hex"===format||"hex6"===format)&&(formattedString=this.toHexString()),"hex3"===format&&(formattedString=this.toHexString(!0)),"name"===format&&(formattedString=this.toName()),"hsl"===format&&(formattedString=this.toHslString()),"hsv"===format&&(formattedString=this.toHsvString()),formattedString||this.toHexString()}}}function inputToRGB(color){var rgb={r:0,g:0,b:0},a=1,ok=!1,format=!1;return"string"==typeof color&&(color=stringInputToObject(color)),"object"==typeof color&&(color.hasOwnProperty("r")&&color.hasOwnProperty("g")&&color.hasOwnProperty("b")?(rgb=rgbToRgb(color.r,color.g,color.b),ok=!0,format="%"===(color.r+"").substr(-1)?"prgb":"rgb"):color.hasOwnProperty("h")&&color.hasOwnProperty("s")&&color.hasOwnProperty("v")?(color.s=convertToPercentage(color.s),color.v=convertToPercentage(color.v),rgb=hsvToRgb(color.h,color.s,color.v),ok=!0,format="hsv"):color.hasOwnProperty("h")&&color.hasOwnProperty("s")&&color.hasOwnProperty("l")&&(color.s=convertToPercentage(color.s),color.l=convertToPercentage(color.l),rgb=hslToRgb(color.h,color.s,color.l),ok=!0,format="hsl"),color.hasOwnProperty("a")&&(a=color.a)),a=parseFloat(a),(isNaN(a)||0>a||a>1)&&(a=1),{ok:ok,format:color.format||format,r:mathMin(255,mathMax(rgb.r,0)),g:mathMin(255,mathMax(rgb.g,0)),b:mathMin(255,mathMax(rgb.b,0)),a:a}}function rgbToRgb(r,g,b){return{r:255*bound01(r,255),g:255*bound01(g,255),b:255*bound01(b,255)}}function rgbToHsl(r,g,b){r=bound01(r,255),g=bound01(g,255),b=bound01(b,255);var h,s,max=mathMax(r,g,b),min=mathMin(r,g,b),l=(max+min)/2;if(max==min)h=s=0;else{var d=max-min;switch(s=l>.5?d/(2-max-min):d/(max+min),max){case r:h=(g-b)/d+(b>g?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}return{h:h,s:s,l:l}}function hslToRgb(h,s,l){function hue2rgb(p,q,t){return 0>t&&(t+=1),t>1&&(t-=1),1/6>t?p+6*(q-p)*t:.5>t?q:2/3>t?p+6*(q-p)*(2/3-t):p}var r,g,b;if(h=bound01(h,360),s=bound01(s,100),l=bound01(l,100),0===s)r=g=b=l;else{var q=.5>l?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3),g=hue2rgb(p,q,h),b=hue2rgb(p,q,h-1/3)}return{r:255*r,g:255*g,b:255*b}}function rgbToHsv(r,g,b){r=bound01(r,255),g=bound01(g,255),b=bound01(b,255);var h,s,max=mathMax(r,g,b),min=mathMin(r,g,b),v=max,d=max-min;if(s=0===max?0:d/max,max==min)h=0;else{switch(max){case r:h=(g-b)/d+(b>g?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}return{h:h,s:s,v:v}}function hsvToRgb(h,s,v){h=6*bound01(h,360),s=bound01(s,100),v=bound01(v,100);var i=math.floor(h),f=h-i,p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s),mod=i%6,r=[v,q,p,p,t,v][mod],g=[t,v,v,q,p,p][mod],b=[p,p,t,v,v,q][mod];return{r:255*r,g:255*g,b:255*b}}function rgbToHex(r,g,b,allow3Char){var hex=[pad2(mathRound(r).toString(16)),pad2(mathRound(g).toString(16)),pad2(mathRound(b).toString(16))];return allow3Char&&hex[0].charAt(0)==hex[0].charAt(1)&&hex[1].charAt(0)==hex[1].charAt(1)&&hex[2].charAt(0)==hex[2].charAt(1)?hex[0].charAt(0)+hex[1].charAt(0)+hex[2].charAt(0):hex.join("")}function flip(o){var flipped={};for(var i in o)o.hasOwnProperty(i)&&(flipped[o[i]]=i);return flipped}function bound01(n,max){isOnePointZero(n)&&(n="100%");var processPercent=isPercentage(n);return n=mathMin(max,mathMax(0,parseFloat(n))),processPercent&&(n=parseInt(n*max,10)/100),1e-6>math.abs(n-max)?1:n%max/parseFloat(max)}function clamp01(val){return mathMin(1,mathMax(0,val))}function parseHex(val){return parseInt(val,16)}function isOnePointZero(n){return"string"==typeof n&&-1!=n.indexOf(".")&&1===parseFloat(n)}function isPercentage(n){return"string"==typeof n&&-1!=n.indexOf("%")}function pad2(c){return 1==c.length?"0"+c:""+c}function convertToPercentage(n){return 1>=n&&(n=100*n+"%"),n}function stringInputToObject(color){color=color.replace(trimLeft,"").replace(trimRight,"").toLowerCase();var named=!1;if(names[color])color=names[color],named=!0;else if("transparent"==color)return{r:0,g:0,b:0,a:0,format:"name"};var match;return(match=matchers.rgb.exec(color))?{r:match[1],g:match[2],b:match[3]}:(match=matchers.rgba.exec(color))?{r:match[1],g:match[2],b:match[3],a:match[4]}:(match=matchers.hsl.exec(color))?{h:match[1],s:match[2],l:match[3]}:(match=matchers.hsla.exec(color))?{h:match[1],s:match[2],l:match[3],a:match[4]}:(match=matchers.hsv.exec(color))?{h:match[1],s:match[2],v:match[3]}:(match=matchers.hex6.exec(color))?{r:parseHex(match[1]),g:parseHex(match[2]),b:parseHex(match[3]),format:named?"name":"hex"}:(match=matchers.hex3.exec(color))?{r:parseHex(match[1]+""+match[1]),g:parseHex(match[2]+""+match[2]),b:parseHex(match[3]+""+match[3]),format:named?"name":"hex"}:!1}var trimLeft=/^[\s,#]+/,trimRight=/\s+$/,tinyCounter=0,math=Math,mathRound=math.round,mathMin=math.min,mathMax=math.max,mathRandom=math.random;tinycolor.fromRatio=function(color,opts){if("object"==typeof color){var newColor={};for(var i in color)color.hasOwnProperty(i)&&(newColor[i]="a"===i?color[i]:convertToPercentage(color[i]));color=newColor}return tinycolor(color,opts)},tinycolor.equals=function(color1,color2){return color1&&color2?tinycolor(color1).toRgbString()==tinycolor(color2).toRgbString():!1},tinycolor.random=function(){return tinycolor.fromRatio({r:mathRandom(),g:mathRandom(),b:mathRandom()})},tinycolor.desaturate=function(color,amount){var hsl=tinycolor(color).toHsl();return hsl.s-=(amount||10)/100,hsl.s=clamp01(hsl.s),tinycolor(hsl)},tinycolor.saturate=function(color,amount){var hsl=tinycolor(color).toHsl();return hsl.s+=(amount||10)/100,hsl.s=clamp01(hsl.s),tinycolor(hsl)},tinycolor.greyscale=function(color){return tinycolor.desaturate(color,100)},tinycolor.lighten=function(color,amount){var hsl=tinycolor(color).toHsl();return hsl.l+=(amount||10)/100,hsl.l=clamp01(hsl.l),tinycolor(hsl)},tinycolor.darken=function(color,amount){var hsl=tinycolor(color).toHsl();return hsl.l-=(amount||10)/100,hsl.l=clamp01(hsl.l),tinycolor(hsl)},tinycolor.complement=function(color){var hsl=tinycolor(color).toHsl();return hsl.h=(hsl.h+180)%360,tinycolor(hsl)},tinycolor.triad=function(color){var hsl=tinycolor(color).toHsl(),h=hsl.h;return[tinycolor(color),tinycolor({h:(h+120)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+240)%360,s:hsl.s,l:hsl.l})]},tinycolor.tetrad=function(color){var hsl=tinycolor(color).toHsl(),h=hsl.h;return[tinycolor(color),tinycolor({h:(h+90)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+180)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+270)%360,s:hsl.s,l:hsl.l})]},tinycolor.splitcomplement=function(color){var hsl=tinycolor(color).toHsl(),h=hsl.h;return[tinycolor(color),tinycolor({h:(h+72)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+216)%360,s:hsl.s,l:hsl.l})]},tinycolor.analogous=function(color,results,slices){results=results||6,slices=slices||30;var hsl=tinycolor(color).toHsl(),part=360/slices,ret=[tinycolor(color)];for(hsl.h=(hsl.h-(part*results>>1)+720)%360;--results;)hsl.h=(hsl.h+part)%360,ret.push(tinycolor(hsl));return ret},tinycolor.monochromatic=function(color,results){results=results||6;for(var hsv=tinycolor(color).toHsv(),h=hsv.h,s=hsv.s,v=hsv.v,ret=[],modification=1/results;results--;)ret.push(tinycolor({h:h,s:s,v:v})),v=(v+modification)%1;return ret},tinycolor.readability=function(color1,color2){var a=tinycolor(color1).toRgb(),b=tinycolor(color2).toRgb(),brightnessA=(299*a.r+587*a.g+114*a.b)/1e3,brightnessB=(299*b.r+587*b.g+114*b.b)/1e3,colorDiff=Math.max(a.r,b.r)-Math.min(a.r,b.r)+Math.max(a.g,b.g)-Math.min(a.g,b.g)+Math.max(a.b,b.b)-Math.min(a.b,b.b);return{brightness:Math.abs(brightnessA-brightnessB),color:colorDiff}},tinycolor.readable=function(color1,color2){var readability=tinycolor.readability(color1,color2);return readability.brightness>125&&readability.color>500},tinycolor.mostReadable=function(baseColor,colorList){for(var bestColor=null,bestScore=0,bestIsReadable=!1,i=0;colorList.length>i;i++){var readability=tinycolor.readability(baseColor,colorList[i]),readable=readability.brightness>125&&readability.color>500,score=3*(readability.brightness/125)+readability.color/500;(readable&&!bestIsReadable||readable&&bestIsReadable&&score>bestScore||!readable&&!bestIsReadable&&score>bestScore)&&(bestIsReadable=readable,bestScore=score,bestColor=tinycolor(colorList[i]))}return bestColor};var names=tinycolor.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},hexNames=tinycolor.hexNames=flip(names),matchers=function(){var CSS_INTEGER="[-\\+]?\\d+%?",CSS_NUMBER="[-\\+]?\\d*\\.\\d+%?",CSS_UNIT="(?:"+CSS_NUMBER+")|(?:"+CSS_INTEGER+")",PERMISSIVE_MATCH3="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?",PERMISSIVE_MATCH4="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?";return{rgb:RegExp("rgb"+PERMISSIVE_MATCH3),rgba:RegExp("rgba"+PERMISSIVE_MATCH4),hsl:RegExp("hsl"+PERMISSIVE_MATCH3),hsla:RegExp("hsla"+PERMISSIVE_MATCH4),hsv:RegExp("hsv"+PERMISSIVE_MATCH3),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof module&&module.exports?module.exports=tinycolor:"undefined"!=typeof define?define(function(){return tinycolor}):root.tinycolor=tinycolor})(this);


  // var STRIP_TAGS_RE = /<(?:.|\n)*?>/gm;
  // var EMOTICON_RE = /"emo\-[0-9]+ emoticon"/g;
  // var EMPTY_MESSAGE_PATTERN = 'chat_line"></';
  var LINKIFY_RE = /\x02?((?:https?:\/\/|[\w\-\.\+]+@)?\x02?(?:[\w\-]+\x02?\.)+\x02?(?:com|au|org|tv|net|info|jp|uk|us|cn|fr|mobi|gov|co|ly|me|vg|eu|ca|fm|am|ws)\x02?(?:\:\d+)?\x02?(?:\/[\w\.\/@\?\&\%\#\(\)\,\-\+\=\;\:\x02?]+\x02?[\w\/@\?\&\%\#\(\)\=\;\x02?]|\x02?\w\x02?|\x02?)?\x02?)\x02?/ig;
  var HEX6_RE = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

  var list = null;
  var seenUrls = {};

  var html = [
    '<div id="twitchmod"><ul></ul><a id="twitchmod_handle"></a></div>'
  ].join('');

  var css = [
    '#twitchmod {',    
      'z-index: 5444333 !important;',
      'position: absolute;',
      'top: 0;',
      'right: 0;',
      'color: white;',    
      'width: 319px;',
    '}',
    '#twitchmod ul {',
      'height: 0px;',
      'overflow-x: hidden;',
      'overflow-y: auto;',
      'list-style: none;',
      'padding: 0px;',
      'background: none repeat scroll 0 0 rgba(0, 0, 0, 0.85);',
      'box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;',
      'border-radius: 5px 5px 5px 5px;',
    '}',
    '.twitchmod_url a {',     
      'color: white !important;',
    '}',
    '.twitchmod_url a:visited {',     
      'color: #6441A5 !important;',
    '}',
    '#twitchmod_handle {',
      'display: block;',
      'height: 7px;',
      'width: 319px;',
      'background: none repeat scroll 0 0 rgba(0, 255, 0, 0.55);',
      'border-radius: 5px 5px 5px 5px;',
    '}',
  ''].join('');

  // should return >= 5 for readability
  // http://bgrins.github.com/TinyColor/
  function lumdiff(rgb1, rgb2) {
    var L1 = 0.2126 * Math.pow(rgb1.r / 255, 2.2) + 0.7152 * Math.pow(rgb1.g / 255, 2.2) + 0.0722 * Math.pow(rgb1.b / 255, 2.2);
    var L2 = 0.2126 * Math.pow(rgb2.r / 255, 2.2) + 0.7152 * Math.pow(rgb2.g / 255, 2.2) + 0.0722 * Math.pow(rgb2.b / 255, 2.2);

    if (L1 > L2) {
      return (L1 + 0.05) / (L2 + 0.05);
    } else {
      return (L2 + 0.05) / (L1 + 0.05);
    }
  }

  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  jQuery.fn.outerHTML = function() {
    return jQuery('<div>').append(this.eq(0).clone()).html();
  };

  list = jQuery(html).appendTo("body").find("ul");
  addGlobalStyle(css);

  var toggleState = true;
  jQuery('#twitchmod_handle').click(function() {
    if (toggleState) {
      jQuery('#twitchmod ul').animate({
        height: '300px',
        padding: '8px',
      }, 500);
      toggleState = false;
    } else {      
      jQuery('#twitchmod ul').animate({
        height: '0',
        padding: '0',
      }, 500);
      toggleState = true;
    }
  });

  jQuery(function()
  {
    var insert_chat_line = Chat.prototype.insert_chat_line;
    //var insert_with_lock = Chat.prototype.insert_with_lock;
    var format_message = Chat.prototype.format_message;

    Chat.prototype.insert_chat_line = function(a)
    {      
      insert_chat_line.call(this, a);
    };

    Chat.prototype.format_message = function(a)
    {
      var urls = a.message.match(LINKIFY_RE);

      var nick_rgb = tinycolor(a.color).toRgb();
      var nick_rgb_orig = nick_rgb;
      var bg_rgb = tinycolor("202020").toRgb();

      var lighten = true;
      var last_diff = 0.0;
      for (var x = 0; x < 15; x++) { // max 15 iterations.
        var diff;
        diff = lumdiff(nick_rgb, bg_rgb);
        if (diff >= 5.0) {
          break;
        }

        if (last_diff > diff) {
          lighten = !lighten;
          nick_rgb = nick_rgb_orig;
        }

        if (lighten) { 
          nick_rgb = tinycolor.lighten(nick_rgb).toRgb();
        } else {
          nick_rgb = tinycolor.darken(nick_rgb).toRgb();
        }

        last_diff = diff;
      }
      
      if (urls) {
        for (var x = 0; x < urls.length; x++) {
          if (!(urls[x] in seenUrls)) { 
            list.prepend([
              '<li><span style="color:', tinycolor(nick_rgb).toHexString() ,';">', a.nickname, '</span>: <span class="twitchmod_url">', Chat.prototype.linkify.call(this, urls[x], a.nickname), '</span></li>',
            ].join(''));

            seenUrls[urls[x]] = true;
          }
        }
      }

      var msg = format_message.apply(this, arguments);
      return msg;
    };

    // Chat.prototype.insert_with_lock = function(a, line, c, b)
    // {
    //   if (line.lastIndexOf(EMPTY_MESSAGE_PATTERN) === -1)
    //   {
    //     insert_with_lock.apply(this, arguments);
    //   }
    // };
  });
}

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(main);
