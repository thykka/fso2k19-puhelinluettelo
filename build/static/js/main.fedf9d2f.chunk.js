(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(39)},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(11),c=n.n(o),i=n(12),u=n(2),l=n(3),s=n.n(l),m="/api/persons",f=function(){return s.a.get(m).then(function(e){return e.data})},p=function(e){return s.a.post(m,e).then(function(e){return e.data})},d=function(e){return s.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},v=function(e,t){return s.a.put("".concat(m,"/").concat(e),t).then(function(e){return e.data})},E=function(e){var t=e.notification;if(!t||!t.hasOwnProperty("message"))return null;var n=t.type||"error";return t.error&&(t.message+="; "+t.error.toString()),a.a.createElement("div",{className:"notification notification--".concat(n)},t.message)},b={error:1e4,confirm:5e3},h=function(e){var t=e.addPerson,n=Object(r.useState)(""),o=Object(u.a)(n,2),c=o[0],i=o[1],l=Object(r.useState)(""),s=Object(u.a)(l,2),m=s[0],f=s[1];return a.a.createElement("form",{className:"contacts__new",onSubmit:function(e){e.preventDefault(),t(c,m),i(""),f("")}},a.a.createElement("h3",null,"Lis\xe4\xe4 yhteystieto"),a.a.createElement("div",{className:"form-control"},"Nimi:",a.a.createElement("br",null),a.a.createElement("input",{value:c,onChange:function(e){i(e.currentTarget.value)}})),a.a.createElement("div",{className:"form-control"},"Numero:",a.a.createElement("br",null),a.a.createElement("input",{value:m,onChange:function(e){f(e.currentTarget.value)}})),a.a.createElement("div",{className:"form-control"},a.a.createElement("button",{type:"submit"},"Lis\xe4\xe4")))},y=function(e){var t=e.filter,n=e.setFilter;return a.a.createElement("div",null,"Rajaa:",a.a.createElement("br",null),a.a.createElement("input",{value:t,onChange:function(e){n(e.currentTarget.value)}}))},g=function(e){var t=e.persons,n=e.removePerson;return a.a.createElement("ul",null,t.map(function(e){return a.a.createElement(j,{key:e.id,person:e,removePerson:function(){return n(e.id)}})}))},j=function(e){var t=e.person,n=e.removePerson;return a.a.createElement("li",{"data-id":t.id},a.a.createElement("button",{onClick:n},"X"),t.name," \u2014 ",t.number)},O=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(),l=Object(u.a)(c,2),s=l[0],m=l[1],j=function(){return m(null)};Object(r.useEffect)(function(){f().then(function(e){return o(e)})},[]);var O=Object(r.useState)(""),w=Object(u.a)(O,2),k=w[0],N=w[1],P=n.filter(function(e){return e.name.toLowerCase().indexOf(k.toLowerCase())>=0||e.number.indexOf(k)>=0}),S=function(e){m(e),setTimeout(j,b[e.type])};return a.a.createElement("section",{className:"contacts"},a.a.createElement("h1",null,"Puhelinluettelo"),a.a.createElement(E,{notification:s}),a.a.createElement(h,{addPerson:function(e,t){var r=n.find(function(n){return n.name===e||n.number===t});r&&window.confirm("".concat(e," on jo luettelossa, korvataanko tiedot?"))?v(r.id,{name:e,number:t}).then(function(e){o(n.map(function(t){return t.id===r.id?e:t})),S({message:"Yhteystieto p\xe4ivitetty: "+e.name,type:"confirm"})}).catch(function(e){return S({message:"Tietojen p\xe4ivitys ep\xe4onnistui",type:"error",error:e})}):p({name:e,number:t}).then(function(e){o([].concat(Object(i.a)(n),[e])),S({message:"Henkil\xf6 lis\xe4tty: "+e.name,type:"confirm"})}).catch(function(e){return S({message:"Henkil\xf6n lis\xe4ys ep\xe4onnistui",type:"error",error:e})})}}),a.a.createElement("h3",null,"Numerot"),a.a.createElement(y,{filter:k,setFilter:N}),a.a.createElement(g,{persons:P,removePerson:function(e){var t=n.find(function(t){return t.id===e});t&&window.confirm("Poistetaan henkil\xf6 "+t.name+"?")&&d(e).then(function(){o(n.filter(function(t){return t.id!==e})),S({message:"Henkil\xf6 poistettu: "+t.name,type:"confirm"})}).catch(function(e){return S({message:"Henkil\xf6n poisto ep\xe4onnistui",type:"error",error:e})})}}))};n(38);c.a.render(a.a.createElement(O,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.fedf9d2f.chunk.js.map