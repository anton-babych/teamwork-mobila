"use strict";(self.webpackChunkmobila=self.webpackChunkmobila||[]).push([[853],{1853:(_,c,i)=>{i.r(c),i.d(c,{MainPageComponent:()=>M});var h=i(2591),t=i(4650);let u=(()=>{class e{constructor(){this.text="",this.routerText=""}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["link-button"]],inputs:{text:"text",routerText:"routerText"},standalone:!0,features:[t.jDz],decls:7,vars:2,consts:[[1,"link-btn",3,"href","routerLink"],[1,"text"],[1,"line","-right"],[1,"line","-top"],[1,"line","-left"],[1,"line","-bottom"]],template:function(n,o){1&n&&(t.TgZ(0,"a",0)(1,"span",1),t._uU(2,"start now"),t.qZA(),t._UZ(3,"span",2)(4,"span",3)(5,"span",4)(6,"span",5),t.qZA()),2&n&&t.Q6J("href",o.routerText,t.LSH)("routerLink",o.routerText)},dependencies:[h.rH],styles:['a[_ngcontent-%COMP%]{color:#fff;padding:.7em .84em;display:inline-block;border:3px solid transparent;position:relative;font-size:1.5em;cursor:pointer;letter-spacing:.07em}a[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{color:#4f4f4f;font-weight:1000;font-family:proxima-nova,monospace;transform:translate3d(0,.7em,0);display:block;transition:transform .4s cubic-bezier(.2,0,0,1) .4s}a[_ngcontent-%COMP%]:after{position:absolute;content:"";bottom:-3px;left:.84em;right:.84em;height:3px;background:#1f1f1f;transition:transform .8s cubic-bezier(1,0,.37,1) .2s,right .2s cubic-bezier(.04,.48,0,1) .6s,left .4s cubic-bezier(.04,.48,0,1) .6s;transform-origin:left}.line[_ngcontent-%COMP%]{position:absolute;background:#1f1f1f}.line.-right[_ngcontent-%COMP%], .line.-left[_ngcontent-%COMP%]{width:3px;bottom:-3px;top:-3px;transform:scale3d(1,0,1)}.line.-top[_ngcontent-%COMP%], .line.-bottom[_ngcontent-%COMP%]{height:3px;left:-3px;right:-3px;transform:scale3d(0,1,1)}.line.-right[_ngcontent-%COMP%]{right:-3px;transition:transform .1s cubic-bezier(1,0,.65,1.01) .23s;transform-origin:top}.line.-top[_ngcontent-%COMP%]{top:-3px;transition:transform .08s linear .43s;transform-origin:left}.line.-left[_ngcontent-%COMP%]{left:-3px;transition:transform .08s linear .51s;transform-origin:bottom}.line.-bottom[_ngcontent-%COMP%]{bottom:-3px;transition:transform .3s cubic-bezier(1,0,.65,1.01);transform-origin:right}a[_ngcontent-%COMP%]:hover   .text[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active   .text[_ngcontent-%COMP%]{transform:translateZ(0);transition:transform .6s cubic-bezier(.2,0,0,1) .4s}a[_ngcontent-%COMP%]:hover:after, a[_ngcontent-%COMP%]:active:after{transform:scale3d(0,1,1);right:-3px;left:-3px;transform-origin:right;transition:transform .2s cubic-bezier(1,0,.65,1.01) .17s,right .2s cubic-bezier(1,0,.65,1.01),left 0s .3s}a[_ngcontent-%COMP%]:hover   .line[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active   .line[_ngcontent-%COMP%]{transform:scaleZ(1)}a[_ngcontent-%COMP%]:hover   .line.-right[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active   .line.-right[_ngcontent-%COMP%]{transition:transform .1s cubic-bezier(1,0,.65,1.01) .2s;transform-origin:bottom}a[_ngcontent-%COMP%]:hover   .line.-top[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active   .line.-top[_ngcontent-%COMP%]{transition:transform .08s linear .4s;transform-origin:right}a[_ngcontent-%COMP%]:hover   .line.-left[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active   .line.-left[_ngcontent-%COMP%]{transition:transform .08s linear .48s;transform-origin:top}a[_ngcontent-%COMP%]:hover   .line.-bottom[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active   .line.-bottom[_ngcontent-%COMP%]{transition:transform .5s cubic-bezier(0,.53,.29,1) .56s;transform-origin:left}'],changeDetection:0}),e})();var l=i(5861),d=i(6895),C=i(4378);const x=["text",""];function O(e,r){if(1&e&&(t.TgZ(0,"span",2),t._uU(1),t.qZA()),2&e){const n=r.$implicit;t.xp6(1),t.Oqu(n)}}let P=(()=>{class e{constructor(){this.charsOrder=[["a","A"],["b","B"],["c","C"],["d","D"],["e","E"],["f","F"],["g","G"],["h","H"],["i","I"],["j","J"],["k","K"],["l","L"],["m","M"],["n","N"],["o","O"],["p","P"],["q","Q"],["r","R"],["s","S"],["t","T"],["u","U"],["v","V"],["w","W"],["x","X"],["y","Y"],["z","Z"],[".",",","!","?"]]}ngAfterViewInit(){this.animateChars().then(()=>console.log("complete"))}delay(n){return new Promise(o=>setTimeout(o,n))}animateChars(){var n=this;return(0,l.Z)(function*(){return new Promise(o=>{const s=Array.from(document.querySelectorAll(".animated-text__char"));let a=0;const f=function(){var b=(0,l.Z)(function*(){if(a>=n.charsOrder.length)return void o();let p=n.isTextContainChars(n.text,n.charsOrder[a]);if(p){yield n.delay(500);for(const g of s)p.includes(g.textContent||"")&&g.classList.add("fade-in-animation")}a++,f()});return function(){return b.apply(this,arguments)}}();f()})})()}isTextContainChars(n,o){const s=o.filter(a=>n.includes(a));return s.length>0?s:null}fadeInButton(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["fade-in-order-text","text",""]],inputs:{text:"text"},standalone:!0,features:[t.jDz],attrs:x,decls:3,vars:3,consts:[[1,"animated-text"],["class","animated-text__char",4,"ngFor","ngForOf"],[1,"animated-text__char"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t.YNc(1,O,2,1,"span",1),t.ALo(2,"splitIntoChars"),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngForOf",t.lcZ(2,1,o.text)))},dependencies:[d.sg,C.V],styles:[".animated-text__char[_ngcontent-%COMP%]{font-size:2rem;padding:0 .5rem;transition:opacity .5s;opacity:0}.fade-in-animation[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadein 1s forwards}@keyframes _ngcontent-%COMP%_fadein{0%{opacity:0}to{opacity:1}}"],changeDetection:0}),e})(),M=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["main-page"]],standalone:!0,features:[t.jDz],decls:5,vars:3,consts:[[1,"fullscreen"],[1,"text-container"],[3,"text"],[1,"button-container"],[3,"text","routerText"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"fade-in-order-text",2),t.qZA(),t.TgZ(3,"div",3),t._UZ(4,"link-button",4),t.qZA()()),2&n&&(t.xp6(2),t.Q6J("text","Your one-stop destination for all things tech! Discover the latest smartphones, trendy accessories, high-quality headphones, and more. With a user-friendly interface, competitive prices, and secure transactions, we make online shopping a breeze. Stay connected and shop with confidence at Mobila, your ultimate tech haven."),t.xp6(2),t.Q6J("text","start now")("routerText","shop"))},dependencies:[u,P],styles:[".fullscreen[_ngcontent-%COMP%]{min-height:100vh;width:100vw;display:flex;justify-content:center;place-items:center;flex-direction:column}.text-container[_ngcontent-%COMP%]{width:80vw;margin-bottom:5rem}"],changeDetection:0}),e})()}}]);