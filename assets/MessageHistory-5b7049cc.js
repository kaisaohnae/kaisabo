import{d as w,b as H,r as b,A as I,o as h,f,g as t,w as d,v as c,L as r,m,E as v,M as S,i as g,K as k,j as C,N as x,H as G}from"./index-6f6749ac.js";import{G as L,S as Y,a as q}from"./SelectGroupDate-04c3b3da.js";import{j as p}from"./jsonApi-71500902.js";import{f as y}from"./formApi-e583adde.js";import{S as N,g as l}from"./util.grid-e8996db9.js";import"./index-8d9b3034.js";import"./util.date-5697c534.js";class T{async getMessageHistoryList(a){return(await p("/bo/bs/getMessageHistoryList",a||{})).data}async getMessageHistory(a){return(await p("/bo/bs/getMessageHistory",a||{})).data}async setMessageHistoryList(a){return(await p("/bo/bs/setMessageHistoryList",a||{})).data}async insertMessageHistory(a){return(await y("/bo/bs/insertMessageHistory",a)).data}async updateMessageHistory(a){return(await y("/bo/bs/updateMessageHistory",a)).data}async deleteMessageHistory(a){return(await y("/bo/bs/getMessageHistoryList",a)).data}}const _=new T,V=["onSubmit","onKeyup"],B=t("legend",null,"검색",-1),$=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),A=t("th",null,"검색조건",-1),E={colspan:"3"},K={key:0},U=t("th",null,"업체ID",-1),R={colspan:"3"},z={class:"audit"},F=t("th",null,"수정기간",-1),O={colspan:"3"},W=t("th",null,"등록일",-1),X={colspan:"3"},j=t("th",null,"수정ID",-1),J=t("th",null,"등록ID",-1),P={class:"btnWrap"},Q={class:"crud"},Z=t("span",{class:"icon"},"",-1),tt=t("span",{class:"icon"},"",-1),et=t("span",{class:"icon"},"",-1),st=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),ot=t("span",{class:"icon"},'"',-1),at=[ot],nt={class:"totalCount"},it=t("div",{id:"messageHistoryGrid"},null,-1),pt=w({__name:"MessageHistory",setup(D){const a=H(),s=b({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),n=b({messageHistoryGrid:{},required:["cnts"],totalCount:0,list:[],audit:!1}),u=()=>{_.getMessageHistoryList(s).then(i=>{n.totalCount=i.count?i.count:0,n.list=i.data,n.messageHistoryGrid.resetData(i.data,{})},i=>{console.log(i)})},M=()=>{let i=l.save(n.messageHistoryGrid,n.required);i&&_.setMessageHistoryList(i).then(e=>{location.reload()},e=>{console.log(e)})};return I(()=>{n.messageHistoryGrid=new L({el:document.getElementById("messageHistoryGrid"),columns:[{header:"메시지번호",name:"msgNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"사용자ID",name:"usrId",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"회원ID",name:"mbrId",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"내용",name:"cnts",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),n.messageHistoryGrid.on("click",i=>{i.columnName==="cd"&&console.log("click")}),u()}),(i,e)=>(h(),f(G,null,[t("form",{class:"search",onSubmit:C(u,["prevent"]),onKeyup:x(u,["enter"])},[t("fieldset",null,[B,t("table",null,[$,t("tbody",null,[t("tr",null,[A,t("td",E,[d(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>s.keyword=o)},null,512),[[c,s.keyword]])])]),r(a).userInfo.cmpId=="kaisa"?(h(),f("tr",K,[U,t("td",R,[m(N,{cmpId:s.cmpId,onSetCompany:e[1]||(e[1]=o=>{s.cmpId=o.cmpId})},null,8,["cmpId"])])])):v("",!0)]),d(t("tbody",z,[t("tr",null,[F,t("td",O,[m(Y,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[s.startModDt,s.endModDt],onSetStartDate:e[2]||(e[2]=o=>{s.startModDt=o.date}),onSetEndDate:e[3]||(e[3]=o=>{s.endModDt=o.date})},null,8,["date"])])]),t("tr",null,[W,t("td",X,[m(q,{name:["regDt"],format:"YYYY-MM-DD",date:[s.regDt],onSetStartDate:e[4]||(e[4]=o=>{s.regDt=o.date})},null,8,["date"])])]),t("tr",null,[j,t("td",null,[d(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=o=>s.modId=o)},null,512),[[c,s.modId]])]),J,t("td",null,[d(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=o=>s.regId=o)},null,512),[[c,s.regId]])])])],512),[[S,n.audit]])])]),t("div",P,[t("span",Q,[t("button",{type:"button",class:"button add",onClick:e[7]||(e[7]=o=>r(l).add(n.messageHistoryGrid,0))},[Z,g("추가")]),t("button",{type:"button",class:"button save",onClick:M},[tt,g("저장")]),t("button",{type:"button",class:"button del",onClick:e[8]||(e[8]=o=>r(l).del(n.messageHistoryGrid))},[et,g("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[9]||(e[9]=o=>n.audit=!n.audit)},"상세조회"),st,t("button",{type:"reset",onClick:e[10]||(e[10]=o=>r(l).reload())},at),t("div",nt,"총 "+k(n.totalCount)+"건",1)])],40,V),it],64))}});export{pt as default};