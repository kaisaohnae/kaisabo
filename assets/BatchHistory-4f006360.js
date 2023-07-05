import{d as H,b as v,r as y,A as I,o as g,f,g as t,w as d,v as c,L as n,m as h,E as B,M as S,i as m,K as C,j as M,N as k,H as x}from"./index-6f6749ac.js";import{G,S as L,a as q}from"./SelectGroupDate-04c3b3da.js";import{j as b}from"./jsonApi-71500902.js";import{f as p}from"./formApi-e583adde.js";import{S as T,g as l}from"./util.grid-e8996db9.js";import"./index-8d9b3034.js";import"./util.date-5697c534.js";class V{async getBatchHistoryList(o){return(await b("/bo/bs/getBatchHistoryList",o||{})).data}async getBatchHistory(o){return(await b("/bo/bs/getBatchHistory",o||{})).data}async setBatchHistoryList(o){return(await b("/bo/bs/setBatchHistoryList",o||{})).data}async insertBatchHistory(o){return(await p("/bo/bs/insertBatchHistory",o)).data}async updateBatchHistory(o){return(await p("/bo/bs/updateBatchHistory",o)).data}async deleteBatchHistory(o){return(await p("/bo/bs/getBatchHistoryList",o)).data}}const _=new V,Y=["onSubmit","onKeyup"],N=t("legend",null,"검색",-1),$=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),A=t("th",null,"검색조건",-1),E={colspan:"3"},K={key:0},U=t("th",null,"업체ID",-1),R={colspan:"3"},z={class:"audit"},F=t("th",null,"수정기간",-1),O={colspan:"3"},W=t("th",null,"등록일",-1),X={colspan:"3"},j=t("th",null,"수정ID",-1),J=t("th",null,"등록ID",-1),P={class:"btnWrap"},Q={class:"crud"},Z=t("span",{class:"icon"},"",-1),tt=t("span",{class:"icon"},"",-1),et=t("span",{class:"icon"},"",-1),st=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),ot=t("span",{class:"icon"},'"',-1),at=[ot],it={class:"totalCount"},rt=t("div",{id:"batchHistoryGrid"},null,-1),bt=H({__name:"BatchHistory",setup(w){const o=v(),s=y({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),i=y({batchHistoryGrid:{},required:["reqVal","rsltCd"],totalCount:0,list:[],audit:!1}),u=()=>{_.getBatchHistoryList(s).then(r=>{i.totalCount=r.count?r.count:0,i.list=r.data,i.batchHistoryGrid.resetData(r.data,{})},r=>{console.log(r)})},D=()=>{let r=l.save(i.batchHistoryGrid,i.required);r&&_.setBatchHistoryList(r).then(e=>{location.reload()},e=>{console.log(e)})};return I(()=>{i.batchHistoryGrid=new G({el:document.getElementById("batchHistoryGrid"),columns:[{header:"배치번호",name:"btchNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"배치명",name:"btchNm",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"요청값",name:"reqVal",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"응답값",name:"resVal",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"결과코드",name:"rsltCd",width:120,align:"left",sortable:!0,disabled:!1,validation:{dataType:"string",required:!1},formatter:"listItemText",editor:{type:"select",options:{listItems:o.codeList.RSLT_CD}}},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),i.batchHistoryGrid.on("click",r=>{r.columnName==="cd"&&console.log("click")}),u()}),(r,e)=>(g(),f(x,null,[t("form",{class:"search",onSubmit:M(u,["prevent"]),onKeyup:k(u,["enter"])},[t("fieldset",null,[N,t("table",null,[$,t("tbody",null,[t("tr",null,[A,t("td",E,[d(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=a=>s.keyword=a)},null,512),[[c,s.keyword]])])]),n(o).userInfo.cmpId=="kaisa"?(g(),f("tr",K,[U,t("td",R,[h(T,{cmpId:s.cmpId,onSetCompany:e[1]||(e[1]=a=>{s.cmpId=a.cmpId})},null,8,["cmpId"])])])):B("",!0)]),d(t("tbody",z,[t("tr",null,[F,t("td",O,[h(L,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[s.startModDt,s.endModDt],onSetStartDate:e[2]||(e[2]=a=>{s.startModDt=a.date}),onSetEndDate:e[3]||(e[3]=a=>{s.endModDt=a.date})},null,8,["date"])])]),t("tr",null,[W,t("td",X,[h(q,{name:["regDt"],format:"YYYY-MM-DD",date:[s.regDt],onSetStartDate:e[4]||(e[4]=a=>{s.regDt=a.date})},null,8,["date"])])]),t("tr",null,[j,t("td",null,[d(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=a=>s.modId=a)},null,512),[[c,s.modId]])]),J,t("td",null,[d(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=a=>s.regId=a)},null,512),[[c,s.regId]])])])],512),[[S,i.audit]])])]),t("div",P,[t("span",Q,[t("button",{type:"button",class:"button add",onClick:e[7]||(e[7]=a=>n(l).add(i.batchHistoryGrid,0))},[Z,m("추가")]),t("button",{type:"button",class:"button save",onClick:D},[tt,m("저장")]),t("button",{type:"button",class:"button del",onClick:e[8]||(e[8]=a=>n(l).del(i.batchHistoryGrid))},[et,m("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[9]||(e[9]=a=>i.audit=!i.audit)},"상세조회"),st,t("button",{type:"reset",onClick:e[10]||(e[10]=a=>n(l).reload())},at),t("div",it,"총 "+C(i.totalCount)+"건",1)])],40,Y),rt],64))}});export{bt as default};
