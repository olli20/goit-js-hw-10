var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},e=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,l=/^0o[0-7]+$/i,a=parseInt,c="object"==typeof n&&n&&n.Object===Object&&n,r="object"==typeof self&&self&&self.Object===Object&&self,u=c||r||Function("return this")(),s=Object.prototype.toString,f=Math.max,p=Math.min,y=function(){return u.Date.now()};function g(n){var t=typeof n;return!!n&&("object"==t||"function"==t)}function m(n){if("number"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==s.call(n)}(n))return NaN;if(g(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=g(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=n.replace(e,"");var c=i.test(n);return c||l.test(n)?a(n.slice(2),c?2:8):o.test(n)?NaN:+n}t=function(n,t,e){var o,i,l,a,c,r,u=0,s=!1,d=!1,v=!0;if("function"!=typeof n)throw new TypeError("Expected a function");function h(t){var e=o,l=i;return o=i=void 0,u=t,a=n.apply(l,e)}function b(n){return u=n,c=setTimeout(j,t),s?h(n):a}function _(n){var e=n-r;return void 0===r||e>=t||e<0||d&&n-u>=l}function j(){var n=y();if(_(n))return T(n);c=setTimeout(j,function(n){var e=t-(n-r);return d?p(e,l-(n-u)):e}(n))}function T(n){return c=void 0,v&&o?h(n):(o=i=void 0,a)}function $(){var n=y(),e=_(n);if(o=arguments,i=this,r=n,e){if(void 0===c)return b(r);if(d)return c=setTimeout(j,t),h(r)}return void 0===c&&(c=setTimeout(j,t)),a}return t=m(t)||0,g(e)&&(s=!!e.leading,l=(d="maxWait"in e)?f(m(e.maxWait)||0,t):l,v="trailing"in e?!!e.trailing:v),$.cancel=function(){void 0!==c&&clearTimeout(c),u=0,o=r=i=c=void 0},$.flush=function(){return void 0===c?a:T(y())},$};const d={inputQuery:document.querySelector("#search-box"),countriesList:document.querySelector(".country-list"),countryInfo:document.querySelector(".country-info")};d.inputQuery.addEventListener("input",t((n=>{n.preventDefault();const t=n.target.value.trim();console.log(t),v(t).then(h).catch((n=>console.log(n)))}),300));const v=n=>fetch(`https://restcountries.com/v3.1/name/${n}?fields=name,capital,population,flags,languages`).then((n=>n.json())),h=n=>{if(console.log(n),console.log(n.length),1===n.length){const t={commonName:n[0].name.common,capital:n[0].capital[0],population:n[0].population,flag:n[0].flags.svg,languages:Object.values(n[0].languages).join(", ")};b(t),console.log("One country ",t)}else n.length>1&&n.length<=10?console.log("2 - 10 countries "):n.length>10&&console.log("Too many matches found. Please enter a more specific name.")},b=({commonName:n,capital:t,population:e,flag:o,languages:i})=>{const l=`\n    <div class="country-info__title-container">\n        <img src=${o} width='40px'>\n        <h1 class="country-info__name">${n}<h1>\n    </div>\n    <ul class="country-info__list">\n        <li class="country-info__list-item"><span class="country-info__list-key">Capital:</span> ${t}</li>\n        <li class="country-info__list-item"><span class="country-info__list-key">Population:</span> ${e}</li>\n        <li class="country-info__list-item"><span class="country-info__list-key">Languages:</span> ${i}</li>\n    </ul>`;d.countryInfo.innerHTML=l};
//# sourceMappingURL=index.ad44f662.js.map