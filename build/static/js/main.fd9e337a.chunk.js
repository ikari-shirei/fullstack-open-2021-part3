(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),a=t(6),o=t(3),i=t(2),u=t(0),d=function(e){var n=e.onChange;return Object(u.jsxs)("div",{children:["filter: ",Object(u.jsx)("input",{onChange:n})]})},s=function(e){var n=e.addPerson,t=e.newName,r=e.newNumber,c=e.handleNewName,a=e.handleNewNumber;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:t,onChange:c})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:r,onChange:a})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.name,t=e.onClick;return Object(u.jsx)("button",{id:n,onClick:t,children:"Delete"})},j=function(e){var n=e.person,t=e.onClick;return Object(u.jsxs)("div",{children:[Object(u.jsx)("p",{children:n.name}),Object(u.jsx)("p",{children:n.number}),Object(u.jsx)(l,{name:n.name,onClick:t})]})},b=function(e){var n=e.personsToShow,t=e.onClick;return Object(u.jsx)("div",{children:n.map((function(e){return Object(u.jsx)(j,{person:e,onClick:t},e.name)}))})},f=t(4),h=t.n(f),m="/api/persons",O={getAll:function(){return h.a.get(m).then((function(e){return e.data}))},create:function(e){return h.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},deleteTarget:function(e,n){return h.a.delete("".concat(m,"/").concat(e),n).then((function(e){return e.data}))}},p=function(e){var n=e.message;if(n){var t=n[0],r="green"===n[1]?{color:"green",border:"2px solid green",padding:"8px"}:{color:"red",border:"2px solid red",padding:"8px"};return Object(u.jsx)("h1",{style:r,children:t})}return null},v=function(){var e=Object(i.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(i.useState)(""),l=Object(o.a)(c,2),j=l[0],f=l[1],h=Object(i.useState)(""),m=Object(o.a)(h,2),v=m[0],x=m[1],g=Object(i.useState)(""),w=Object(o.a)(g,2),C=w[0],k=w[1],N=Object(i.useState)(null),S=Object(o.a)(N,2),y=S[0],T=S[1],P=function(){O.getAll().then((function(e){r(e)}))};Object(i.useEffect)(P,[]);var A=function(e,n){T([e,n]),setTimeout((function(){T(null)}),5e3)},D=""===C?t:t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(p,{message:y}),Object(u.jsx)(d,{onChange:function(e){k(e.target.value)}}),Object(u.jsx)("h2",{children:"add a new"}),Object(u.jsx)(s,{addPerson:function(e){e.preventDefault();var n=t.every((function(e){return e.name!==j})),c=function(){x(""),f("")},o=""===j;if(!o&&n){var i={name:j,number:v};O.create(i).then((function(e){A("Added ".concat(i.name),"green")})).catch((function(e){A("".concat(e.response.data.error),"red")})),P(),c()}else if(o)A("Please enter a value","red");else{var u="".concat(j," is already added to phonebook, replace the old number with the new one?");if(window.confirm(u)){var d=t.find((function(e){return e.name===j})),s=Object(a.a)(Object(a.a)({},d),{},{number:v}),l=s.id;O.update(l,s).then((function(e){r(t.map((function(n){return n.id!==l?n:e}))),c(),A("Updated ".concat(d.name),"green")})).catch((function(e){var n="".concat(e.response.data.error);A(n,"red"),r(t.filter((function(e){return e.id!==l})))}))}}},newName:j,newNumber:v,handleNewName:function(e){f(e.target.value)},handleNewNumber:function(e){x(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(b,{personsToShow:D,onClick:function(e){var n=e.target.id;if(window.confirm("Delete ".concat(n,"?"))){var c=t.filter((function(e){return e.name!==n}));r(c);var a=t.find((function(e){return e.name===n?e:""}));O.deleteTarget(a.id,a).catch((function(e){A("Information of ".concat(n," has already been removed from server"),"red")}))}}})]})};c.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.fd9e337a.chunk.js.map