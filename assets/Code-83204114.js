import{d as v,b as D,r as h,A as x,o as M,f as S,g as t,w as n,v as c,M as I,m as b,i as m,K as q,j as T,N as k,p as L,k as R,_ as Y}from"./index-6f6749ac.js";import{G as N,S as X,a as V}from"./SelectGroupDate-04c3b3da.js";import{j as p}from"./jsonApi-71500902.js";import{f}from"./formApi-e583adde.js";import"./index-8d9b3034.js";import"./util.date-5697c534.js";class B{async getCodeList(o){return(await p("/bo/bs/getCodeList",o||{})).data}async getCode(o){return(await p("/bo/bs/getCode",o||{})).data}async setCodeList(o){return(await p("/bo/bs/setCodeList",o||{})).data}async insertCode(o){return(await f("/bo/bs/insertCode",o)).data}async updateCode(o){return(await f("/bo/bs/updateCode",o)).data}async deleteCode(o){return(await f("/bo/bs/getCodeList",o)).data}}const _=new B,r=i=>(L("data-v-84ce34d4"),i=i(),R(),i),A={id:"code"},H=["onSubmit","onKeyup"],K=r(()=>t("legend",null,"검색",-1)),U=r(()=>t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1)),E=r(()=>t("th",null,"그룹코드",-1)),G={colspan:"3"},O={class:"audit"},$=r(()=>t("th",null,"수정기간",-1)),z={colspan:"3"},W=r(()=>t("th",null,"등록일",-1)),j={colspan:"3"},F=r(()=>t("th",null,"수정ID",-1)),J=r(()=>t("th",null,"등록ID",-1)),P={class:"btnWrap"},Q=r(()=>t("span",{class:"icon"},"",-1)),Z=r(()=>t("span",{class:"icon"},"",-1)),tt=r(()=>t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),et=r(()=>t("span",{class:"icon"},'"',-1)),dt=[et],ot={class:"totalCount"},at=r(()=>t("div",{id:"grid"},null,-1)),st=v({__name:"Code",setup(i){D();const o=h({grpCd:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:""}),a=h({required:["grpCd","cd","cdNm"],grid:{},totalCount:0,list:[],audit:!1}),l=()=>{_.getCodeList(o).then(s=>{a.totalCount=s.count?s.count:0;let d=[];for(let e of s.data)e.cd==="XXX"&&d.push(e);for(let e of d){e.attributes={expanded:!0},e._children=[];for(let u of s.data)u.cd!="XXX"&&e.grpCd===u.grpCd&&e._children.push(u)}a.grid.resetData(d,{})},s=>{console.log(s)})},w=()=>{a.grid.appendRow({},{at:0})},C=()=>{location.reload()},g=s=>{for(let d in s)for(let e of a.required)if(d==e&&!s[d])return alert("필수값이 없습니다."),!1;return!0},y=()=>{a.grid.blur();let s=[],d=[0,0,0];for(let e of a.grid.getModifiedRows().createdRows){if(e.crud="C",s.push(e),!g(e))return;d[0]++}for(let e of a.grid.getModifiedRows().updatedRows){if(e.crud="U",s.push(e),!g(e))return;d[1]++}for(let e of a.grid.getModifiedRows().deletedRows)e.crud="D",s.push(e),d[2]++;if(d[0]==0&&d[1]==0&&d[2]==0){alert("변경사항이 없습니다.");return}confirm("등록 "+d[0]+"건, 수정 "+d[1]+"건, 삭제 "+d[2]+"건을 정말 저장하시겠습니까?")&&_.setCodeList(s).then(e=>{location.reload()},e=>{console.log(e)})};return x(()=>{a.grid=new N({el:document.getElementById("grid"),treeColumnOptions:{name:"grpCd",useCascadingCheckbox:!0},columns:[{header:"그룹코드",name:"grpCd",sortable:!0,width:200,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"코드명",name:"cdNm",sortable:!0,width:150,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"코드",name:"cd",sortable:!0,width:150,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"우선순위",name:"prir",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!1},editor:"text"},{header:"참조1",name:"ref1",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"참조2",name:"ref2",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"참조3",name:"ref3",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"비고",name:"note",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"설명",name:"dsc",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),a.grid.on("click",s=>{s.columnName==="cd"&&console.log("click")}),l()}),(s,d)=>(M(),S("div",A,[t("form",{class:"search",onSubmit:T(l,["prevent"]),onKeyup:k(l,["enter"])},[t("fieldset",null,[K,t("table",null,[U,t("tbody",null,[t("tr",null,[E,t("td",G,[n(t("input",{type:"text","onUpdate:modelValue":d[0]||(d[0]=e=>o.grpCd=e)},null,512),[[c,o.grpCd]])])])]),n(t("tbody",O,[t("tr",null,[$,t("td",z,[b(X,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[o.startModDt,o.endModDt],onSetStartDate:d[1]||(d[1]=e=>{o.startModDt=e.date}),onSetEndDate:d[2]||(d[2]=e=>{o.endModDt=e.date})},null,8,["date"])])]),t("tr",null,[W,t("td",j,[b(V,{name:["regDt"],format:"YYYY-MM-DD",date:[o.regDt],onSetStartDate:d[3]||(d[3]=e=>{o.regDt=e.date})},null,8,["date"])])]),t("tr",null,[F,t("td",null,[n(t("input",{type:"text","onUpdate:modelValue":d[4]||(d[4]=e=>o.modId=e)},null,512),[[c,o.modId]])]),J,t("td",null,[n(t("input",{type:"text","onUpdate:modelValue":d[5]||(d[5]=e=>o.regId=e)},null,512),[[c,o.regId]])])])],512),[[I,a.audit]])])]),t("div",P,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:w},[Q,m("추가")]),t("button",{type:"button",class:"button save",onClick:y},[Z,m("저장")])]),t("button",{type:"button",class:"audit",onClick:d[6]||(d[6]=e=>a.audit=!a.audit)},"상세조회"),tt,t("button",{type:"reset",onClick:C},dt),t("div",ot,"총 "+q(a.totalCount)+"건",1)])],40,H),at]))}});const pt=Y(st,[["__scopeId","data-v-84ce34d4"]]);export{pt as default};
