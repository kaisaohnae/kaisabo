import{d as D,b as v,r as g,A as I,o as f,f as y,g as t,w as i,v as m,L as r,m as c,E as k,M as S,i as p,K as x,j as Y,N as C,H as T}from"./index-6f6749ac.js";import{G as L,S as q,a as G}from"./SelectGroupDate-04c3b3da.js";import{j as b}from"./jsonApi-71500902.js";import{f as h}from"./formApi-e583adde.js";import{S as N,g as l}from"./util.grid-e8996db9.js";import"./index-8d9b3034.js";import"./util.date-5697c534.js";class V{async getMenuList(n){return(await b("/bo/bs/getMenuList",n||{})).data}async getMenu(n){return(await b("/bo/bs/getMenu",n||{})).data}async setMenuList(n){return(await b("/bo/bs/setMenuList",n||{})).data}async insertMenu(n){return(await h("/bo/bs/insertMenu",n)).data}async updateMenu(n){return(await h("/bo/bs/updateMenu",n)).data}async deleteMenu(n){return(await h("/bo/bs/getMenuList",n)).data}}const w=new V,B=["onSubmit","onKeyup"],H=t("legend",null,"검색",-1),U=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),$=t("th",null,"검색조건",-1),A={colspan:"3"},E={key:0},K=t("th",null,"업체ID",-1),R={colspan:"3"},z={class:"audit"},F=t("th",null,"수정기간",-1),O={colspan:"3"},W=t("th",null,"등록일",-1),X={colspan:"3"},j=t("th",null,"수정ID",-1),J=t("th",null,"등록ID",-1),P={class:"btnWrap"},Q={class:"crud"},Z=t("span",{class:"icon"},"",-1),tt=t("span",{class:"icon"},"",-1),et=t("span",{class:"icon"},"",-1),at=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),nt=t("span",{class:"icon"},'"',-1),st=[nt],ot={class:"totalCount"},dt=t("div",{id:"menuGrid"},null,-1),bt=D({__name:"Menu",setup(_){const n=v(),a=g({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),o=g({menuGrid:{},required:["url","menuNm","lwrkMenuYn","useYn","dpth","prir"],totalCount:0,list:[],audit:!1}),u=()=>{w.getMenuList(a).then(d=>{o.totalCount=d.count?d.count:0,o.list=d.data,o.menuGrid.resetData(d.data,{})},d=>{console.log(d)})},M=()=>{let d=l.save(o.menuGrid,o.required);d&&w.setMenuList(d).then(e=>{location.reload()},e=>{console.log(e)})};return I(()=>{o.menuGrid=new L({el:document.getElementById("menuGrid"),columns:[{header:"메뉴번호",name:"menuNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"상위메뉴번호",name:"hgrkMenuNo",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!0},editor:"text"},{header:"URL",name:"url",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"메뉴명",name:"menuNm",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"하위메뉴여부",name:"lwrkMenuYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!1,validation:{dataType:"string",required:!1},formatter:"listItemText",editor:{type:"select",options:{listItems:n.codeList.YN_CD}}},{header:"사용여부",name:"useYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!1,validation:{dataType:"string",required:!1},formatter:"listItemText",editor:{type:"select",options:{listItems:n.codeList.YN_CD}}},{header:"깊이",name:"dpth",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!1},editor:"text"},{header:"아이콘코드",name:"iconCd",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"우선순위",name:"prir",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!1},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),o.menuGrid.on("click",d=>{d.columnName==="cd"&&console.log("click")}),u()}),(d,e)=>(f(),y(T,null,[t("form",{class:"search",onSubmit:Y(u,["prevent"]),onKeyup:C(u,["enter"])},[t("fieldset",null,[H,t("table",null,[U,t("tbody",null,[t("tr",null,[$,t("td",A,[i(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=s=>a.keyword=s)},null,512),[[m,a.keyword]])])]),r(n).userInfo.cmpId=="kaisa"?(f(),y("tr",E,[K,t("td",R,[c(N,{cmpId:a.cmpId,onSetCompany:e[1]||(e[1]=s=>{a.cmpId=s.cmpId})},null,8,["cmpId"])])])):k("",!0)]),i(t("tbody",z,[t("tr",null,[F,t("td",O,[c(q,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[a.startModDt,a.endModDt],onSetStartDate:e[2]||(e[2]=s=>{a.startModDt=s.date}),onSetEndDate:e[3]||(e[3]=s=>{a.endModDt=s.date})},null,8,["date"])])]),t("tr",null,[W,t("td",X,[c(G,{name:["regDt"],format:"YYYY-MM-DD",date:[a.regDt],onSetStartDate:e[4]||(e[4]=s=>{a.regDt=s.date})},null,8,["date"])])]),t("tr",null,[j,t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=s=>a.modId=s)},null,512),[[m,a.modId]])]),J,t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=s=>a.regId=s)},null,512),[[m,a.regId]])])])],512),[[S,o.audit]])])]),t("div",P,[t("span",Q,[t("button",{type:"button",class:"button add",onClick:e[7]||(e[7]=s=>r(l).add(o.menuGrid,0))},[Z,p("추가")]),t("button",{type:"button",class:"button save",onClick:M},[tt,p("저장")]),t("button",{type:"button",class:"button del",onClick:e[8]||(e[8]=s=>r(l).del(o.menuGrid))},[et,p("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[9]||(e[9]=s=>o.audit=!o.audit)},"상세조회"),at,t("button",{type:"reset",onClick:e[10]||(e[10]=s=>r(l).reload())},st),t("div",ot,"총 "+x(o.totalCount)+"건",1)])],40,B),dt],64))}});export{bt as default};
