(function(t){function e(e){for(var a,o,r=e[0],l=e[1],c=e[2],d=0,u=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&u.push(s[o][0]),s[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);p&&p(e);while(u.length)u.shift()();return n.push.apply(n,c||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],a=!0,r=1;r<i.length;r++){var l=i[r];0!==s[l]&&(a=!1)}a&&(n.splice(e--,1),t=o(o.s=i[0]))}return t}var a={},s={app:0},n=[];function o(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=a,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(i,a,function(e){return t[e]}.bind(null,a));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var p=l;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"025e":function(t,e,i){"use strict";i.r(e),i.d(e,"decodeRichText",(function(){return s})),i.d(e,"decodeImgSrc",(function(){return n})),i.d(e,"getCookie",(function(){return o})),i.d(e,"setCookie",(function(){return r})),i.d(e,"isMobile",(function(){return l}));i("c975"),i("ac1f"),i("1276"),i("498a");var a=i("f940");function s(t){return t=a("|*|",'"',t),t=a("|**|","'",t),t}function n(t,e){return t=a("[%base%]",e,t),t}function o(t){for(var e=t+"=",i=document.cookie.split(";"),a=0;a<i.length;a++){var s=i[a].trim();if(0==s.indexOf(e))return s.substring(e.length,s.length)}return""}function r(t,e,i,a){var s,n;o(t).length>1||(a?document.cookie=t+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;":(n=864e5*i,s=new Date,s.setTime(s.getTime()+n),document.cookie=t+"="+e+";expires="+s.toGMTString()+";SameSite=Strict;"))}function l(){return screen.width<480}},"034f":function(t,e,i){"use strict";var a=i("85ec"),s=i.n(a);s.a},1921:function(t,e,i){},"19e7":function(t,e,i){t.exports=i.p+"img/image.134b1207.svg"},"2b55":function(t,e,i){},"3b51":function(t,e,i){},"3ff7":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("e623"),i("e379"),i("5dc8"),i("37e1");var a=i("2b0e"),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.loaded?i("div",{attrs:{id:"app"}},[i("topping",{directives:[{name:"show",rawName:"v-show",value:t.showTopping,expression:"showTopping"}],attrs:{base:t.api_base,toppingLogo:t.theme["Topping-Logo"].val}}),i("hheader",{ref:"headerRef",attrs:{id:"hheader",base:t.api_base,leftLogo:t.theme["Side-Logo"].val,centerLogo:t.theme["Center-Logo"].val,socialMedia:t.social_media}}),i("navs",{attrs:{id:"nnavs",navs:t.navs}}),i("div",{ref:"contentsRef",attrs:{id:"contents"}},[i("transition",{attrs:{name:"fade"}},[i("keep-alive",{attrs:{exclude:"post"}},[i("router-view",{attrs:{base:t.api_base,siteName:t.site.title,siteDes:t.site.desText,files:t.files}})],1)],1)],1),i("ffooter",{directives:[{name:"show",rawName:"v-show",value:t.showFooter,expression:"showFooter"}],attrs:{id:"ffooter",base:t.api_base,bottomLogo:t.theme["Footer-Logo"].val,icpNum:t.theme["China-ICP-License"].val}})],1):t._e()},n=[],o=new a["a"],r=(i("c975"),i("b0c0"),i("ac1f"),i("1276"),i("4328")),l=i("bc3a"),c=i("025e");function p(t,e,i){l.get(g(t,e)).then((function(t){return"string"==typeof t.data?void i({status:!1,error:t.data}):void i({status:!0,data:t.data})})).catch((function(t){i({status:!1,error:t})}))}function d(t,e,i){var a=r.stringify(e);l.post(t,a).then((function(t){-1!=t.data.indexOf("success")?i({status:!0,data:t.data}):i({status:!1,data:t.data})})).catch((function(t){i({status:!1,data:t})}))}function u(t,e){if(!c.getCookie("isjeffcom")){var i=parseInt(Math.ceil(1e3*Math.random())*Date.parse(new Date)/1e7);c.setCookie("isjeffcom",i,e,!1);var a={userAgent:navigator.userAgent,userLanguage:navigator.language,appName:navigator.appName,platform:navigator.platform};d(t,a,(function(t){if(t.status){var i=t.data.split(",");-1!=i[1].indexOf("CN")&&c.setCookie("v_region","CN",e,!1)}}))}}function h(t,e){var i={pid:e};d(t,i,(function(t){t.status}))}function g(t,e){if(e.length>0){t+="?";for(var i=0;i<e.length;i++)t=i==e.length-1?t+e[i].name+"="+e[i].val:t+e[i].name+"="+e[i].val+"&"}return t}var f=i("025e"),m=i("f351"),v=i.n(m),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"hheader"}},[a("div",{attrs:{id:"hheader-inner"}},[a("div",{ref:"hl",attrs:{id:"hheader-left"},on:{click:function(e){return t.back()}}},[a("img",{attrs:{src:t.base+t.leftLogo,alt:"Logo"}})]),a("div",{ref:"hc",attrs:{id:"hheader-center"}},[a("img",{attrs:{id:"hheader-center-logo",src:t.base+t.centerLogo,alt:"Name"}}),a("img",{attrs:{id:"hheader-center-upbtn",src:i("deef"),alt:"Name"}})]),a("div",{attrs:{id:"hheader-right"}},["post"==t.mode||t.mobileView?t._e():a("div",{staticClass:"hheader-sm"},t._l(t.socialMedia,(function(e){return a("div",{key:e.id,staticClass:"hheader-sm-single"},[a("a",{attrs:{href:e.url}},[a("img",{staticClass:"hheader-sm-single-img",attrs:{src:t.base+e.icon,alt:e.name}})])])})),0),"post"==t.mode?a("div",{staticClass:"hheader-switcher"},[a("span",{staticClass:"hheader-switcher-single",style:0==t.lang?"font-weight: bold;":"font-weight: normal;",on:{click:function(e){return t.switchLang(0,!1)}}},[t._v("ENG")]),a("span",[t._v(" / ")]),a("span",{staticClass:"hheader-switcher-single",style:1==t.lang?"font-weight: bold;":"font-weight: normal;",on:{click:function(e){return t.switchLang(1,!1)}}},[t._v("中文")])]):t._e()])])])},_=[],w={name:"hheader",props:{base:String,leftLogo:String,centerLogo:String,socialMedia:Array},components:{},data:function(){return{nameLogoShown:!0,animating:!1,lang:0,mobileView:Object(f["isMobile"])(),mode:"home"}},watch:{$route:"initial"},mounted:function(){if(this.mobileView){var t=document.getElementById("hheader-center"),e=document.getElementById("hheader-left"),i=document.getElementById("hheader-right");window.addEventListener("scroll",(function(){window.scrollY>10?(t.style.opacity=1,e.style.opacity=0,i.style.top="-13px"):(t.style.opacity=0,e.style.opacity=1,i.style.top="5px")})),window.addEventListener("orientationchange",(function(){90==screen.orientation.angle||-90==screen.orientation.angle?t.style.top="-40px":t.style.top="0px"})),90==screen.orientation.angle||-90==screen.orientation.angle?t.style.top="-40px":t.style.top="0px"}},created:function(){this.initial()},methods:{initial:function(){var t=this;this.lang=parseInt(this.$route.query.lang),this.mode=this.$route.name,this.mobileView&&("home"==this.mode||"blog"==this.mode?this.$nextTick((function(){t.$refs.hl.style.left="41%",t.$refs.hc.style.left="0px"})):this.$nextTick((function(){t.$refs.hl.style.left="2%",t.$refs.hc.style.left=screen.width>320?"-108px":"-80px"})))},switchLang:function(t,e){this.lang=t,e||o.$emit("switchLang",t)},back:function(){1==history.length?this.$router.push("home"):this.$route.query.from?this.$router.push(this.$route.query.from):this.$router.push("home")}}},y=w,k=(i("bd25"),i("2877")),T=Object(k["a"])(y,b,_,!1,null,"3c88b87d",null),x=T.exports,$=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"topping"}},[i("div",{attrs:{id:"topping-inner"}},[i("img",{attrs:{src:t.base+t.toppingLogo,alt:"Topping logo"}})])])},C=[],D={name:"topping",props:{base:String,toppingLogo:String}},L=D,O=(i("a781"),Object(k["a"])(L,$,C,!1,null,"df3675ba",null)),S=O.exports,I=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"ffooter"}},[i("div",{attrs:{id:"f-inner"}},[i("div",{attrs:{id:"f-logo"},on:{click:t.toTop}},[i("img",{attrs:{src:t.base+t.bottomLogo,alt:"logo"}})]),i("div",{attrs:{id:"f-info"}},[i("span",[t._v("Design by JIANFENG WU | Powered by POSTER "),i("a",{attrs:{href:"http://www.miit.gov.cn/"}},[t._v(t._s(t.icpNum.length>0?"| "+t.icpNum:""))])])])])])},j=[],P={name:"ffooter",props:{bottomLogo:String,icpNum:String,base:String},components:{},data:function(){return{}},created:function(){},methods:{toTop:function(){v()(0,0,{ease:"inOutQuart",duration:500})}}},N=P,E=(i("71e0"),Object(k["a"])(N,I,j,!1,null,"5069ca98",null)),M=E.exports,q=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"navshow"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],attrs:{id:"navs"}},[i("div",{attrs:{id:"navs-inner"}},t._l(t.navs,(function(e){return i("div",{key:e.id,staticClass:"navs-single"},[i("a",{attrs:{href:e.url}},[t._v(t._s(e.name))])])})),0)])])},A=[],V={name:"navs",props:{navs:Array},data:function(){return{show:!0}},watch:{$route:"initial"},created:function(){this.initial()},methods:{initial:function(){"post"===this.$route.name?this.show=!1:this.show=!0}}},H=V,R=(i("7550"),Object(k["a"])(H,q,A,!1,null,"b085365a",null)),z=R.exports,F={name:"app",components:{topping:S,hheader:x,navs:z,ffooter:M},metaInfo:function(){return{title:this.metaTitle,titleTemplate:"%s - "+this.site.title,meta:[{name:"description",content:this.metaDes}],htmlAttrs:{lang:"en",amp:!0}}},data:function(){return{api_base:"https://api.isjeff.com/main",api_site:"/front/home/",api_track:"/updater/visit/",mode:"home",pid:"1",loaded:!1,site:{},theme:{},navs:[],social_media:[],files:[],headerY:0,showTopping:!0,showFooter:!1,animating:!1,currentPosi:0,delay:3e3,damping:20,dontDisplayAni:!1,metaTitle:"Welcome",metaDes:"Hello"}},created:function(){var t=this,e=this;this.dontDisplayAni="true"==Object(f["getCookie"])("topping"),this.getSiteData(),setTimeout((function(){u(t.api_base+t.api_track,1)}),1e3),o.$on("set-meta",(function(t){e.setMeta(t)})),o.$on("show-footer",(function(t){e.showFot(t)}))},methods:{scrollToMain:function(){this.animating=!0;var t=this,e=this.delay;setTimeout((function(){t.loaded?v()(0,t.headerY,{ease:"inOutQuart",duration:500}):t.showTopping=!1}),e),setTimeout((function(){t.showTopping=!1,t.animating=!1,t.currentPosi=1}),e+550),Object(f["setCookie"])("topping",!0,3,!1)},showFot:function(t){this.showFooter=t},setMeta:function(t){this.metaTitle=t.title,this.metaDes=t.des},getSiteData:function(){var t=this,e=this;p(this.api_base+this.api_site,[],(function(i){if(i.status){var a=i.data,s=a.site[0],n=a.sm,o=a.nav;s.title=Object(f["decodeRichText"])(s.title),s.subtitle=Object(f["decodeRichText"])(s.subtitle),s.desText=Object(f["decodeRichText"])(s.desText),s.seoTitle=Object(f["decodeRichText"])(s.seoTitle),e.theme=JSON.parse(Object(f["decodeRichText"])(s.data_struct)),s.data_struct="",e.site=s,e.social_media=n,e.navs=o,e.files=[{name:"PDF-Portfolio",val:e.theme["PDF-Portfolio"]},{name:"CV-English",val:e.theme["CV-English"]},{name:"CV-Chinese",val:e.theme["CV-Chinese"]}],e.loaded=!0,t.dontDisplayAni?t.showTopping=!1:t.scrollToMain(),e.$nextTick((function(){e.headerY=e.$refs.headerRef.$el.offsetTop,e.setMeta({title:"Home",des:t.site.desText})}))}}))}}},W=F,B=(i("034f"),Object(k["a"])(W,s,n,!1,null,null,null)),Y=B.exports,J=i("8c4f"),U=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"all"}},[i("div",{attrs:{id:"posts"}},[i("div",{attrs:{id:"posts-inner"}},t._l(t.postsList,(function(e){return i("div",{key:e.id,staticClass:"post-single"},[i("router-link",{attrs:{to:{path:"/post",query:{pid:e.id,from:"home"}}}},[i("div",{staticClass:"post-single-title"},[i("span",[t._v(t._s(e.title))])]),i("div",{staticClass:"post-single-filter"}),i("img",{attrs:{src:t.parseTitleImg(e.title_img),alt:e.title}})])],1)})),0)]),t.postsTotal>9?i("div",{attrs:{id:"pagination"}},[i("div",{attrs:{id:"p-nav"}},[i("div",{staticClass:"p-single arrow-left",style:1===t.page?"opacity: .1":"opacity: 1",on:{click:function(e){return t.sPage(0)}}}),i("div",{staticClass:"p-single arrow-right",style:t.page===t.pagesTotal?"opacity: .1":"opacity: 1",on:{click:function(e){return t.sPage(1)}}})])]):t._e(),i("div",{attrs:{id:"files"}},[i("div",{staticClass:"files-cont"},t._l(t.files,(function(e,a){return i("div",{key:a,staticClass:"file-single"},[i("div",{staticClass:"file-single-inner"},[i("a",{staticStyle:{display:"flex","margin-left":"auto","margin-right":"auto"},attrs:{href:-1!=e.val.val.indexOf("http")?e.val.val:t.base+e.val.val,target:"_blank"}},[t._m(0,!0),i("div",{staticClass:"file-down-name"},[i("span",[t._v(t._s(e.name))])])])])])})),0)])])},G=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"file-down-icon"},[a("img",{attrs:{src:i("6369"),alt:""}})])}],Q={name:"home",components:{},props:{siteName:String,siteDes:String,base:String,navs:Array,files:Array},data:function(){return{api:"/front/posts/",page:1,postsList:[],postsTotal:0,pagesTotal:0,pageSize:9}},created:function(){this.getPosts(this.page)},activated:function(){o.$emit("set-meta",{title:"Home",des:this.siteDes})},methods:{getPosts:function(t){var e=this,i=this.pageToLimit(t),a=t?[{name:"ls",val:i},{name:"size",val:this.pageSize}]:[];this.$route.query.cate&&a.push({name:"cate",val:this.$route.query.cate}),p(this.base+this.api,a,(function(t){t.status&&(e.postsTotal=t.data.total,e.postsList=t.data.data,e.pagesTotal=Math.ceil(e.postsTotal/e.pageSize))})),o.$emit("show-footer",!0),o.$emit("set-meta",{title:"Home",des:this.siteDes})},sPage:function(t){if(1===t&&this.page!==this.pagesTotal)this.page=this.page+1;else{if(0!==t||1==this.page)return!1;this.page=this.page-1}this.getPosts(this.page)},pageToLimit:function(t){return(t-1)*this.pageSize},parseTitleImg:function(t){return-1!=t.indexOf("cos")?"https://"+t:this.base+t}}},K=Q,X=(i("5d8a"),Object(k["a"])(K,U,G,!1,null,"72e5c6f0",null)),Z=X.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.loaded?a("div",{attrs:{id:"post"}},[a("div",{attrs:{id:"post-title"}},[a("div",{attrs:{id:"post-title-inner"}},[a("span",[t._v(t._s(0===t.lang?t.postData.title:t.postData.title_sublang))])]),a("div",{attrs:{id:"post-title-info"}},[a("span",[t._v(t._s(t.postData.name)+" | "+t._s(t.postData.date_pub)+" | "+t._s(t.postData.ux_visit)+" Views")])])]),t.postData.title_img.length>1?a("div",{attrs:{id:"post-title-img"}},[a("div",{attrs:{id:"post-title-img-inner"}},[a("iimage",{attrs:{isrc:t.postData.title_img,ialt:"title image",width:"100%",height:"340px",mode:"grey"}})],1)]):t._e(),a("div",{attrs:{id:"post-contents"}},[a("div",{attrs:{id:"posts-contents-cont"},domProps:{innerHTML:t._s(0===t.lang?t.postData.content:t.postData.content_sublang)}}),t._m(0)]),a("div",{attrs:{id:"post-like"}},[a("div",{attrs:{id:"post-like-inner"}},[a("div",{attrs:{id:"post-like-icon"},on:{click:t.like}},[a("div",{style:"transform: rotate("+t.like_rotate+"deg)",attrs:{id:"post-like-icon-bg"}}),a("img",{attrs:{src:i("8e44"),alt:"Like"}})]),a("div",{attrs:{id:"post-like-count"}},[a("span",[a("span",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.postData.ux_likes))]),t._v(" Likes")])])])]),a("transition",{attrs:{name:"up"}},[t.popup?a("div",{attrs:{id:"post-popup"}},[a("div",{attrs:{id:"post-popup-inner"}},[a("div",{attrs:{id:"post-popup-info"}},[a("span",[t._v(t._s(t.popup_info))])]),a("div",{attrs:{id:"post-popup-button"},on:{click:t.popupAct}},[t._v(t._s(t.popup_action))])])]):t._e()]),t.showImgViewer&&t.viewingImg.length>1?a("image-viewer",{attrs:{imgWidth:t.viewingImgWidth,imgHeight:t.viewingImgHeight,path:t.viewingImg}}):t._e()],1):t._e()},et=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"posts-content-end"}},[i("div",{attrs:{id:"posts-content-end-inner"}},[i("span",[t._v(" - END - ")])])])}],it=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"iimage",style:"width:"+t.width+";height:"+t.height+";",attrs:{id:"iimage"}},[t.loaded?a("div",{ref:"real",class:t.tclass,style:"width:"+t.width+";height:"+t.height+";",attrs:{id:"real"}},[a("transition",{attrs:{name:"fade"}},[a("img",{style:"width:"+t.width+";height:"+t.height+";",attrs:{id:"realimg",src:t.isrc,alt:t.ialt},on:{load:t.imgLoaded}})])],1):t._e(),t.loaded?t._e():a("div",{ref:"placeholder",attrs:{id:"placeholder"}},[a("img",{staticClass:"phimg",attrs:{src:i("19e7"),alt:"Image placeholder"},on:{load:t.imgLoaded}})])])},at=[],st={name:"iimage",props:{isrc:{type:String,default:""},ialt:{type:String,default:""},width:{type:String,default:"100px"},height:{type:String,default:"100px"},mode:{type:String,default:"normal"}},data:function(){return{loaded:!1,tclass:"normal"}},created:function(){this.tclass=this.mode},methods:{imgLoaded:function(){var t=this;setTimeout((function(){t.loaded=!0}),1e3)}}},nt=st,ot=(i("f66a"),Object(k["a"])(nt,it,at,!1,null,"d3b275d0",null)),rt=ot.exports,lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"image-viewer"}},[a("div",{attrs:{id:"image-viewer-close"},on:{click:t.close}},[a("img",{attrs:{id:"iv-close",src:i("cd5c"),alt:""}})]),a("div",{attrs:{id:"image-viewer-inner"}},[a("img",{attrs:{src:t.path,alt:"image"}})])])},ct=[],pt=(i("a9e3"),{name:"viewimg",props:{imgWidth:Number,imgHeight:Number,path:String},methods:{close:function(){o.$emit("img-viewer-close",!0)}}}),dt=pt,ut=(i("a560"),Object(k["a"])(dt,lt,ct,!1,null,"2affaf68",null)),ht=ut.exports,gt={name:"post",components:{iimage:rt,imageViewer:ht},props:{base:String,files:Array,siteName:String},data:function(){return{api:"/front/posts/",api_up:"/front/like/",api_view:"/front/view/",loaded:!1,liked:!1,like_posted:!1,showImgViewer:!1,lang:0,like_rotate:15,postData:{},viewingImg:"",viewingImgWidth:0,viewingImgHeight:0,popup:!1,popup_info:"",popup_action:""}},mounted:function(){var t=this;window.addEventListener("click",(function(e){"IMG"==e.target.nodeName&&"P"==e.target.parentNode.nodeName&&"iv-close"!=e.target.id&&t.handleImgViewer(e.target.src,e.target.naturalWidth,e.target.naturalHeight,!0)}))},created:function(){var t=this,e=this;o.$emit("show-footer",!1),this.pid=this.$route.query.pid,this.getData(),1==this.$route.query.lang?(this.lang=parseInt(this.$route.query.lang),this.switchLang(1,!0)):"CN"==Object(f["getCookie"])("v_region")?(this.switchLang(1,!0),this.alertLang()):this.setUrlParam(),setTimeout((function(){"CN"==Object(f["getCookie"])("v_region")&&0==t.lang&&(t.switchLang(1,!0),t.alertLang())}),3e3),o.$on("switchLang",(function(t){e.switchLang(t,!1)})),o.$on("img-viewer-close",(function(){e.handleImgViewer("",0,0,!1)})),0!=window.scrollY&&v()(0,0,{ease:"inOutQuart",duration:100})},methods:{getData:function(){var t=this;p(this.base+this.api,[{name:"pid",val:this.pid}],(function(e){e.status&&(t.postData=e.data.data[0],t.postData.content=Object(f["decodeRichText"])(t.postData.content),t.postData.content=Object(f["decodeImgSrc"])(t.postData.content,t.base),t.postData.title_img=t.parseTitleImg(t.postData.title_img),t.postData.ux_likes=parseInt(t.postData.ux_likes),t.postData.date_pub=t.postData.date_pub.substr(0,t.postData.date_pub.length-9),t.postData.content_sublang=Object(f["decodeRichText"])(t.postData.content_sublang),t.postData.content_sublang=Object(f["decodeImgSrc"])(t.postData.content_sublang,t.base),t.$nextTick((function(){t.loaded=!0,t.setMeta()}))),o.$emit("show-footer",!0)})),h(this.base+this.api_view,this.pid)},like:function(){var t=this;this.liked=!0,this.postData.ux_likes=this.postData.ux_likes+1,this.like_rotate=360==this.like_rotate?0:this.like_rotate+15,this.like_posted||d(this.base+this.api_up,{pid:this.pid},(function(e){e.status&&(t.like_posted=!0)}))},showPopup:function(t,e,i){var a=this;this.popup=!0,this.popup_info=t,this.popup_action=e,setTimeout((function(){a.popup=!1}),1e3*i)},popupAct:function(){this.switchLang(0,!0),this.popup=!1,Object(f["setCookie"])("v_region",0,0,!0)},alertLang:function(){this.showPopup("您可能在中国大陆地区，已切换为中文 You might visit from China mainland, post has been switch to Chinese.","BACK",10)},switchLang:function(t){this.lang=t,this.setMeta(),this.setUrlParam()},handleImgViewer:function(t,e,i,a){this.showImgViewer=a,a?(this.viewingImg=t,this.viewingImgWidth=e,this.viewingImgHeight=i):(this.viewingImg="",this.viewingImgWidth=0,this.viewingImgHeight=0)},setMeta:function(){var t=0==this.lang?this.postData.title:this.postData.title_sublang,e=0==this.lang?this.postData.brief:this.postData.brief_sublang;o.$emit("set-meta",{title:t,des:e})},setUrlParam:function(){this.$route.query.lang&&this.$route.query.lang==parseInt(this.lang)||this.$router.push({query:Object.assign({},this.$route.query,{lang:this.lang})})},parseTitleImg:function(t){return-1!=t.indexOf("cos")?"https://"+t:this.base+t}}},ft=gt,mt=(i("a8f5"),Object(k["a"])(ft,tt,et,!1,null,null,null)),vt=mt.exports,bt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"all"}},[i("div",{attrs:{id:"posts"}},[i("div",{attrs:{id:"posts-inner"}},t._l(t.blogsList,(function(e){return i("div",{key:e.id,staticClass:"post-single"},[i("div",{staticClass:"post-single-topbar"},[i("div",{staticClass:"post-single-author"},[i("div",{staticClass:"post-single-author-avator"},[i("img",{attrs:{src:t.base+e.avatar,alt:"Author avatar"}})]),i("div",{staticClass:"post-single-author-info"},[i("div",{staticClass:"post-single-author-name"},[i("span",[t._v(t._s(e.name))])]),i("div",{staticClass:"post-single-date"},[i("span",[t._v(t._s(e.date_modi?e.date_modi.slice(5,10):"2910-01-01")+" · "+t._s(e.ux_visit)+" views")])])])]),i("div",{staticClass:"post-single-like"},[i("div",{staticClass:"post-single-like-count"},[i("span",[t._v(t._s(e.ux_likes))])]),t._m(0,!0)])]),i("router-link",{attrs:{to:{path:"/post",query:{pid:e.id,from:"blog"}}}},[i("div",{staticClass:"post-single-titleimg"},[i("div",{staticClass:"post-single-filter"}),i("iimage",{attrs:{isrc:t.base+e.title_img,ialt:e.title,width:"100%",height:"330px"}})],1),i("div",{staticClass:"post-single-content"},[i("div",{staticClass:"post-single-content-title"},[i("span",[t._v(t._s(e.title))])]),i("div",{staticClass:"post-single-content-brief"},[i("span",[t._v(t._s(e.brief))])])])]),i("hr",{staticStyle:{opacity:".2"}})],1)})),0)])])},_t=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"post-single-like-icon"},[a("img",{attrs:{src:i("8e44"),alt:""}})])}],wt={name:"home",components:{iimage:rt},props:{base:String,files:Array},data:function(){return{api:"/front/posts/",page:1,blogsList:[],postsTotal:0,pagesTotal:0,pageSize:10}},created:function(){this.$route.query.cate||this.$router.push({query:{cate:3}}),this.getData(this.page)},activated:function(){o.$emit("set-meta",{title:"Blog",des:this.siteDes})},methods:{getData:function(t){var e=this,i=this.pageToLimit(t),a=t?[{name:"ls",val:i},{name:"size",val:this.pageSize}]:[];a.push({name:"cate",val:this.$route.query.cate}),p(this.base+this.api,a,(function(t){t.status&&(e.postsTotal=t.data.total,e.blogsList=t.data.data,e.pagesTotal=Math.ceil(e.postsTotal/e.pageSize))})),o.$emit("show-footer",!0),o.$emit("set-meta",{title:"Blog",des:this.siteDes})},sPage:function(t){if(1===t&&this.page!==this.pagesTotal)this.page=this.page+1;else{if(0!==t||1==this.page)return!1;this.page=this.page-1}this.getPosts(this.page)},pageToLimit:function(t){return(t-1)*this.pageSize}}},yt=wt,kt=(i("e987"),Object(k["a"])(yt,bt,_t,!1,null,"679140f8",null)),Tt=kt.exports;a["a"].use(J["a"]);var xt=new J["a"]({mode:"history",routes:[{path:"/",name:"Home",redirect:"/home"},{path:"/home",name:"home",component:Z},{path:"/post",name:"post",component:vt},{path:"/blog",name:"blog",component:Tt}]}),$t=i("bc3a"),Ct=i.n($t),Dt=i("a7fe"),Lt=i.n(Dt),Ot=i("58ca");a["a"].use(Lt.a,Ct.a),a["a"].use(Ot["a"],{refreshOnceOnNavigation:!0}),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(Y)},router:xt}).$mount("#app")},"5d8a":function(t,e,i){"use strict";var a=i("8cfb"),s=i.n(a);s.a},6369:function(t,e,i){t.exports=i.p+"img/download.6ba1c105.svg"},"71e0":function(t,e,i){"use strict";var a=i("be84"),s=i.n(a);s.a},7550:function(t,e,i){"use strict";var a=i("77ba"),s=i.n(a);s.a},"77ba":function(t,e,i){},"85ec":function(t,e,i){},"8cfb":function(t,e,i){},"8e44":function(t,e,i){t.exports=i.p+"img/like.514599de.png"},a560:function(t,e,i){"use strict";var a=i("1921"),s=i.n(a);s.a},a781:function(t,e,i){"use strict";var a=i("3ff7"),s=i.n(a);s.a},a8f5:function(t,e,i){"use strict";var a=i("b9d4"),s=i.n(a);s.a},b9d4:function(t,e,i){},bd25:function(t,e,i){"use strict";var a=i("eccb"),s=i.n(a);s.a},be84:function(t,e,i){},cd5c:function(t,e,i){t.exports=i.p+"img/close.9e0fe513.png"},deef:function(t,e,i){t.exports=i.p+"img/sup.45b34c25.png"},e987:function(t,e,i){"use strict";var a=i("3b51"),s=i.n(a);s.a},eccb:function(t,e,i){},f66a:function(t,e,i){"use strict";var a=i("2b55"),s=i.n(a);s.a}});
//# sourceMappingURL=app.2e34dda7.js.map