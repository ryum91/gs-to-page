(this["webpackJsonpgs-to-page"]=this["webpackJsonpgs-to-page"]||[]).push([[0],{152:function(e,t){},291:function(e,t,n){},302:function(e,t){},304:function(e,t){},346:function(e,t){},348:function(e,t){},380:function(e,t){},381:function(e,t){},386:function(e,t){},388:function(e,t){},395:function(e,t){},414:function(e,t){},479:function(e,t,n){},547:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(41),o=n.n(r),i=(n(291),n(107)),s=n(3),u=n(16),l=n.n(u),j=n(279),b=n(554),d=n(550),f=n(553),O=n(555),h=n(556),x=n(109),w=n.n(x),p=n(551),g=n(283),m=n(10),v=function(){var e=Object(c.useState)(""),t=Object(s.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),o=Object(s.a)(r,2),i=o[0],u=o[1],l=Object(c.useState)(""),j=Object(s.a)(l,2),b=j[0],d=j[1],f=Object(c.useCallback)((function(e,t){try{d("".concat(window.location.href,"?id=").concat(e,"&key=").concat(t)),window.alert("\uc0dd\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")}catch(n){window.alert("\uac12\uc774 \uc785\ub825\ub418\uc9c0 \uc54a\uc558\uac70\ub098, \uc798\ubabb\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")}}),[]);return Object(m.jsxs)("div",{className:"container",children:[Object(m.jsx)("div",{className:"header",children:Object(m.jsx)("h1",{children:"Google SpreadSheet \ud398\uc774\uc9c0 \ub9cc\ub4e4\uae30"})}),Object(m.jsxs)("div",{className:"contents",children:[Object(m.jsx)(p.a,{value:n,onChange:function(e){return a(e.target.value)},placeholder:"Google SpreadSheet ID"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(p.a,{value:i,onChange:function(e){return u(e.target.value)},placeholder:"API Key"}),Object(m.jsx)("br",{}),"\ud0a4 \ubc1c\uae09:"," ",Object(m.jsx)("a",{href:"https://console.cloud.google.com/apis/credentials",children:"Google Cloud Platform"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(g.a,{style:{width:"100%"},onClick:function(){return f(n,i)},children:"\uc0dd\uc131"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),!!b&&Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(g.a,{onClick:function(){w()(b),window.alert("\ud074\ub9bd\ubcf4\ub4dc\uc5d0 \ubcf5\uc0ac\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")},children:"\ubcf5\uc0ac"})," ",Object(m.jsx)(g.a,{onClick:function(){return window.location.href=b},children:"\uc774\ub3d9\ud558\uae30"})]})]})]})},k=(n(479),new URLSearchParams(window.location.search)),S=k.get("key"),y=k.get("id"),C=["red","gold","green","blue","purple","magenta","orange","lime","cyan","volcano","geekblue"];var I=function(){var e=Object(c.useState)(""),t=Object(s.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)([]),o=Object(s.a)(r,2),u=o[0],x=o[1],p=Object(c.useState)([]),g=Object(s.a)(p,2),k=g[0],I=g[1],N=Object(c.useCallback)(Object(i.a)(l.a.mark((function e(){var t,n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y){e.next=2;break}return e.abrupt("return");case 2:if(S){e.next=4;break}return e.abrupt("return");case 4:return(t=new j.GoogleSpreadsheet(y)).useApiKey(S),e.next=8,t.loadInfo();case 8:return document.title=t.title,a(t.title),n=t.sheetsByIndex[0],e.next=13,n.getRows();case 13:c=e.sent,r=n.headerValues,x(r),I(c.map((function(e){var t={};return r.forEach((function(n){t[n]=e[n]})),t})));case 17:case"end":return e.stop()}}),e)}))),[]);Object(c.useLayoutEffect)((function(){N().catch((function(e){window.alert("ID\ub098 KEY\uc5d0 \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ud655\uc778\ud574\uc8fc\uc138\uc694."),window.location.href="".concat(window.location.origin).concat(window.location.pathname)}))}),[N]);var E=Object(c.useMemo)((function(){return u.filter((function(e){return""!==e&&"name"!==e&&"link"!==e}))}),[u]),G=Object(c.useMemo)((function(){return E.reduce((function(e,t,n){return e[t]=C[n],e}),{})}),[E]);return y&&S?Object(m.jsxs)("div",{className:"container",children:[Object(m.jsx)("div",{className:"header",children:Object(m.jsx)("h1",{children:n})}),Object(m.jsx)("div",{className:"contents",children:Object(m.jsx)(b.b,{wrap:!0,children:null===k||void 0===k?void 0:k.map((function(e,t){return Object(m.jsx)(d.a,{title:e.name,actions:[Object(m.jsx)(O.a,{onClick:function(){window.location.href=e.link}},"\uc774\ub3d9"),Object(m.jsx)(h.a,{onClick:function(){w()(e.link),window.alert("\ubcf5\uc0ac\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n".concat(e.link))}},"\ubcf5\uc0ac")],children:Object.keys(e).filter((function(t){return""!==t&&"name"!==t&&"link"!==t&&void 0!==e[t]})).map((function(t){return Object(m.jsx)("p",{children:Object(m.jsx)(f.a,{color:G[t],children:e[t]})},t)}))},t)}))})})]}):Object(m.jsx)(v,{})};o.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(I,{})}),document.getElementById("root"))}},[[547,1,2]]]);
//# sourceMappingURL=main.379a85d9.chunk.js.map