import{d as w,b as I,r as g,A as v,o as G,f as _,g as t,w as d,v as p,L as i,m as c,E as U,M as S,i as m,K as k,j as M,N as C,H as x}from"./index-6f6749ac.js";import{G as L,S as Y,a as N}from"./SelectGroupDate-04c3b3da.js";import{j as b}from"./jsonApi-71500902.js";import{f as h}from"./formApi-e583adde.js";import{S as V,g as l}from"./util.grid-e8996db9.js";import"./index-8d9b3034.js";import"./util.date-5697c534.js";class q{async getUserGroupList(s){return(await b("/bo/mb/getUserGroupList",s||{})).data}async getUserGroup(s){return(await b("/bo/mb/getUserGroup",s||{})).data}async setUserGroupList(s){return(await b("/bo/mb/setUserGroupList",s||{})).data}async insertUserGroup(s){return(await h("/bo/mb/insertUserGroup",s)).data}async updateUserGroup(s){return(await h("/bo/mb/updateUserGroup",s)).data}async deleteUserGroup(s){return(await h("/bo/mb/getUserGroupList",s)).data}}const f=new q,B=["onSubmit","onKeyup"],H=t("legend",null,"검색",-1),T=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),$=t("th",null,"검색조건",-1),A={colspan:"3"},E={key:0},K=t("th",null,"업체ID",-1),R={colspan:"3"},z={class:"audit"},F=t("th",null,"수정기간",-1),O={colspan:"3"},W=t("th",null,"등록일",-1),X={colspan:"3"},j=t("th",null,"수정ID",-1),J=t("th",null,"등록ID",-1),P={class:"btnWrap"},Q={class:"crud"},Z=t("span",{class:"icon"},"",-1),tt=t("span",{class:"icon"},"",-1),et=t("span",{class:"icon"},"",-1),ot=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),st=t("span",{class:"icon"},'"',-1),rt=[st],nt={class:"totalCount"},at=t("div",{id:"userGroupGrid"},null,-1),bt=w({__name:"UserGroup",setup(y){const s=I(),o=g({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),n=g({userGroupGrid:{},required:["grpNm"],totalCount:0,list:[],audit:!1}),u=()=>{f.getUserGroupList(o).then(a=>{n.totalCount=a.count?a.count:0,n.list=a.data,n.userGroupGrid.resetData(a.data,{})},a=>{console.log(a)})},D=()=>{let a=l.save(n.userGroupGrid,n.required);a&&f.setUserGroupList(a).then(e=>{location.reload()},e=>{console.log(e)})};return v(()=>{n.userGroupGrid=new L({el:document.getElementById("userGroupGrid"),columns:[{header:"그룹ID",name:"grpId",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"업체ID",name:"cmpId",sortable:!0,width:100,align:"left",disabled:s.userInfo.cmpId!="kaisa",editor:"text"},{header:"그룹명",name:"grpNm",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),n.userGroupGrid.on("click",a=>{a.columnName==="cd"&&console.log("click")}),u()}),(a,e)=>(G(),_(x,null,[t("form",{class:"search",onSubmit:M(u,["prevent"]),onKeyup:C(u,["enter"])},[t("fieldset",null,[H,t("table",null,[T,t("tbody",null,[t("tr",null,[$,t("td",A,[d(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=r=>o.keyword=r)},null,512),[[p,o.keyword]])])]),i(s).userInfo.cmpId=="kaisa"?(G(),_("tr",E,[K,t("td",R,[c(V,{cmpId:o.cmpId,onSetCompany:e[1]||(e[1]=r=>{o.cmpId=r.cmpId})},null,8,["cmpId"])])])):U("",!0)]),d(t("tbody",z,[t("tr",null,[F,t("td",O,[c(Y,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[o.startModDt,o.endModDt],onSetStartDate:e[2]||(e[2]=r=>{o.startModDt=r.date}),onSetEndDate:e[3]||(e[3]=r=>{o.endModDt=r.date})},null,8,["date"])])]),t("tr",null,[W,t("td",X,[c(N,{name:["regDt"],format:"YYYY-MM-DD",date:[o.regDt],onSetStartDate:e[4]||(e[4]=r=>{o.regDt=r.date})},null,8,["date"])])]),t("tr",null,[j,t("td",null,[d(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=r=>o.modId=r)},null,512),[[p,o.modId]])]),J,t("td",null,[d(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=r=>o.regId=r)},null,512),[[p,o.regId]])])])],512),[[S,n.audit]])])]),t("div",P,[t("span",Q,[t("button",{type:"button",class:"button add",onClick:e[7]||(e[7]=r=>i(l).add(n.userGroupGrid,0))},[Z,m("추가")]),t("button",{type:"button",class:"button save",onClick:D},[tt,m("저장")]),t("button",{type:"button",class:"button del",onClick:e[8]||(e[8]=r=>i(l).del(n.userGroupGrid))},[et,m("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[9]||(e[9]=r=>n.audit=!n.audit)},"상세조회"),ot,t("button",{type:"reset",onClick:e[10]||(e[10]=r=>i(l).reload())},rt),t("div",nt,"총 "+k(n.totalCount)+"건",1)])],40,B),at],64))}});export{bt as default};