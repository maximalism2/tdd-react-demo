(this["webpackJsonptdd-react-demo"]=this["webpackJsonptdd-react-demo"]||[]).push([[0],{149:function(n,e,t){"use strict";t.r(e);var r=t(2),a=t.n(r),c=t(13),u=t(0),i=t.n(u),o=t(22),l=t.n(o),m=t(3),f=t(23),s=t(27),d=t(24),v=t(28),p=function(n){Object(d.a)(t,n);var e=Object(s.a)(t);function t(){return Object(f.a)(this,t),e.call(this,"Promise has been canceled")}return t}(Object(v.a)(Error));function b(){}var h=t(152),j=t(5),O=t(6);function E(){var n=Object(j.a)(["\n  color: #666;\n  font-size: 0.8rem;\n"]);return E=function(){return n},n}function g(){var n=Object(j.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"]);return g=function(){return n},n}function w(){var n=Object(j.a)(["\n  font-weight: bold;\n"]);return w=function(){return n},n}function y(){var n=Object(j.a)(["\n  width: 3rem;\n  height: 3rem;\n  border-radius: 0.2rem;\n  margin-right: 1rem;\n"]);return y=function(){return n},n}function x(){var n=Object(j.a)(["\n  display: flex;\n  align-items: center;\n"]);return x=function(){return n},n}function k(){var n=Object(j.a)(["\n  border: 1px solid #ddd;\n  border-radius: 0.2rem;\n  max-width: 35rem;\n  margin: 0 auto 2rem;\n  padding: 1rem;\n"]);return k=function(){return n},n}var D=O.a.article(k());function M(n){var e=n.avatar,t=n.fullName;return i.a.createElement(N,null,i.a.createElement(J,{src:e}),i.a.createElement(P,null,t))}var N=O.a.div(x()),J=O.a.img(y()),P=O.a.span(w()),S=O.a.header(g()),z=O.a.span(E());function A(n){var e=n.author,t=n.content,r=n.timestamp;return i.a.createElement(D,null,i.a.createElement(S,null,i.a.createElement(M,e),i.a.createElement(z,null,Object(h.a)(new Date(r),"yyyy-MM-dd"))),i.a.createElement("p",null,t))}var B=function(){var n=Object(u.useState)([]),e=Object(m.a)(n,2),t=e[0],r=e[1];return Object(u.useEffect)((function(){var n=function(n){var e=!1,t=new p;return{promise:new Promise((function(r,a){n.then((function(n){return e?a(t):r(n)}),(function(n){return a(e?t:n)}))})),cancel:function(){e=!0}}}(fetch("/posts"));return n.promise.then((function(n){return n.json()})).then(r).catch(b),function(){return n.cancel()}}),[]),i.a.createElement("div",null,i.a.createElement("h1",null,"TDD in React is \ud83d\udd25"),t.map((function(n){return i.a.createElement(A,Object.assign({key:n.id},n))})))},I=(t(36),t(16)),R=t(17),T=t(7),q=t(10),C=t.n(q);function F(){return{avatar:C.a.image.avatar(),fullName:C.a.name.findName("","",void 0)}}var G=[T.b.get("/posts",(function(n,e,t){return e(t.json(function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;return new Array(n).fill(null).map((function(){return{id:C.a.random.uuid(),content:C.a.lorem.lines(),author:F(),timestamp:C.a.date.recent()}}))}(5)))}))],H=R.a.apply(void 0,Object(I.a)(G));Object(c.a)(a.a.mark((function n(){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,H.start();case 2:l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(B,null)),document.getElementById("root"));case 3:case"end":return n.stop()}}),n)})))()},30:function(n,e,t){n.exports=t(149)},36:function(n,e,t){}},[[30,1,2]]]);
//# sourceMappingURL=main.11db3e6f.chunk.js.map