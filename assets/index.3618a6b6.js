import{r,j as e,c as t,S as m,F as h,H as E}from"./vendor.6b141815.js";import{g as p,a as N,u as g}from"./index.84b58e98.js";import{C as v}from"./index.69f15a28.js";const C=()=>{const[a,i]=r.exports.useState({}),[c,n]=r.exports.useState(!0),l=r.exports.useCallback(async()=>{const o=await p();n(!1),i(o)},[]);return r.exports.useEffect(()=>{l()},[l]),{config:a,loading:c}};const f=({showAll:a})=>{const[i,c]=r.exports.useState([]),n=r.exports.useCallback(async()=>{const s=await N(),{teacherList:d}=s;c(d)},[]);r.exports.useEffect(()=>{n()},[n]);const o=a?i:(()=>i.filter(s=>s.tag==="star"))();return e("div",{className:"teachar-recommand",children:o.map(s=>t("div",{className:"teachar-intro",children:[e("img",{src:s.avatarUrl,alt:"avatar",className:"avatar"}),t("div",{className:"info",children:[t("div",{className:"teachar-title",children:[t("div",{className:"teachar-name",children:[s.name,"\u8001\u5E08"]}),t("span",{className:"teachar-tag",children:["\u8BFE\u7A0B",e("span",{children:s.coursesCount}),"\u5B66\u751F",e("span",{children:s.studentsCount})]})]}),e("div",{className:"teach-intro",children:s.info})]})]},s.name))})};const A=[{key:"INDEX",title:"\u4E3B\u9875"},{key:"COURSE",title:"\u8BFE\u7A0B"},{key:"TEACHAR",title:"\u8001\u5E08"},{key:"ABOUT",title:"\u5173\u4E8E\u6211\u4EEC"}],u=a=>a?"tab-show":"";function k(){const{state:{tabStatus:a},dispatch:i}=g(),c=a==="INDEX",{config:n,loading:l}=C(),o=()=>t(h,{children:[e(E,{children:e("meta",{name:"description",content:n.aboutUsInfo})}),t("section",{className:u(a==="INDEX"||a==="COURSE"),children:[e("div",{className:"title",children:c?"\u70ED\u95E8\u8BFE\u7A0B":"\u5168\u90E8\u8BFE\u7A0B"}),e(v,{showAll:a==="COURSE"})]}),t("section",{className:u(a==="INDEX"||a==="TEACHAR"),children:[e("div",{className:"title",children:c?"\u63A8\u8350\u540D\u5E08":"\u5168\u90E8\u540D\u5E08"}),e(f,{showAll:a==="TEACHAR"})]})]});return e("div",{className:"home-wrapper",children:t(m,{spinning:l,children:[t("header",{className:"home-wrapper-header",children:[e("img",{className:"intro-cover",src:n.coverUrl,alt:"site-cover"}),e("img",{className:"logo-mark",src:n.consultUrl,alt:"logo-mark"}),e("ul",{className:"nav",children:A.map(s=>e("li",{className:`${s.key===a?"active":""}`,onClick:()=>i({type:"TAB_CHANGE",payload:s.key}),children:s.title},s.key))})]}),t("main",{className:"home-wrapper-content",children:[o(),t("section",{className:u(c||a==="ABOUT"),children:[e("div",{className:"title",children:"\u673A\u6784\u4ECB\u7ECD"}),t("div",{className:"organize",children:[e("div",{className:"intro",children:n.aboutUsInfo}),e("img",{src:n.aboutUsImgUrl,alt:"organize-logo",className:"organize-logo"})]})]})]})]})})}export{k as default};
