import{d as w,b as v,r as _,A as M,o as S,f as x,g as t,w as r,v as u,M as C,m as h,i as c,K as I,N as k,p as R,k as Y,_ as L}from"./index-6f6749ac.js";import{G as q,S as K,a as V}from"./SelectGroupDate-04c3b3da.js";import{j as g}from"./jsonApi-71500902.js";import"./index-8d9b3034.js";import"./util.date-5697c534.js";class T{async getDictionaryList(d){return(await g("/bo/bs/getDictionaryList",d||{})).data}async setDictionaryList(d){return(await g("/bo/bs/setDictionaryList",d||{})).data}}const m=new T,a=i=>(R("data-v-609ad1d1"),i=i(),Y(),i),B={id:"dirctionary"},N=["onKeyup"],H=a(()=>t("legend",null,"검색",-1)),U=a(()=>t("colgroup",null,[t("col",{width:"100"}),t("col",{width:"*"}),t("col",{width:"100"}),t("col",{width:"*"})],-1)),A=a(()=>t("th",{class:"required"},"약어",-1)),E={colspan:"2"},G={class:"audit"},$=a(()=>t("th",null,"수정기간",-1)),z={colspan:"2"},F=a(()=>t("th",null,"등록일",-1)),O={colspan:"2"},W=a(()=>t("th",null,"수정ID",-1)),X=a(()=>t("th",null,"등록ID",-1)),j={class:"btnWrap"},J=a(()=>t("span",{class:"icon"},"",-1)),P=a(()=>t("span",{class:"icon"},"",-1)),Q=a(()=>t("span",{class:"icon"},"",-1)),Z=a(()=>t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),tt=a(()=>t("span",{class:"icon"},'"',-1)),et=[tt],ot={class:"totalCount"},st=a(()=>t("div",{id:"grid"},null,-1)),nt=w({__name:"Dictionary",setup(i){v();const d=_({abb:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:""}),s=_({required:["abb","ko","en"],grid:{},totalCount:0,list:[],audit:!1}),l=()=>{s.totalCount=0,m.getDictionaryList(d).then(n=>{s.totalCount=n.count?n.count:0,s.list=n.data,s.grid.resetData(s.list,{})},n=>{console.log(n)})},b=()=>{s.grid.appendRow({},{at:0})},f=()=>{let n=s.grid.getFocusedCell();if(n.rowKey==null||n.rowKey==null){alert("행을 먼저 선택해주세요.");return}confirm("선택한 행을 정말 삭제하시겠습니까?")&&s.grid.removeRow(n.rowKey)},y=()=>{location.reload()},p=n=>{for(let o in n)for(let e of s.required)if(o==e&&!n[o])return alert("필수값이 없습니다."),!1;return!0},D=()=>{s.grid.blur();let n=[],o=[0,0,0];for(let e of s.grid.getModifiedRows().createdRows){if(e.crud="C",!p(e))return;n.push(e),o[0]++}for(let e of s.grid.getModifiedRows().updatedRows){if(e.crud="U",!p(e))return;n.push(e),o[1]++}for(let e of s.grid.getModifiedRows().deletedRows)e.crud="D",n.push(e),o[2]++;if(o[0]==0&&o[1]==0&&o[2]==0){alert("변경사항이 없습니다.");return}confirm("등록 "+o[0]+"건, 수정 "+o[1]+"건, 삭제 "+o[2]+"건을 정말 저장하시겠습니까?")&&m.setDictionaryList(n).then(e=>{location.reload()},e=>{console.log(e)})};return M(()=>{s.grid=new q({el:document.getElementById("grid"),columns:[{header:"약어",name:"abb",editor:"text",sortable:!0,align:"left",validation:{dataType:"string",required:!0}},{header:"한국어",name:"ko",hidden:!1,editor:"text",validation:{dataType:"string",required:!0}},{header:"영어",name:"en",editor:"text",validation:{dataType:"string",required:!0}},{header:"설명",name:"dsc",editor:"text",validation:{dataType:"string",required:!1}},{header:"연동참조",name:"linkRef",editor:"text",hidden:!0,defaultValue:"",width:150},{header:"수정일시",name:"modDt",disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),s.grid.on("click",n=>{n.columnName}),l()}),(n,o)=>(S(),x("div",B,[t("form",{class:"search",onSubmit:l,onKeyup:k(l,["enter"])},[t("fieldset",null,[H,t("table",null,[U,t("tbody",null,[t("tr",null,[A,t("td",E,[r(t("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=e=>d.abb=e)},null,512),[[u,d.abb]])])])]),r(t("tbody",G,[t("tr",null,[$,t("td",z,[h(K,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[d.startModDt,d.endModDt],onSetStartDate:o[1]||(o[1]=e=>{d.startModDt=e.date}),onSetEndDate:o[2]||(o[2]=e=>{d.endModDt=e.date})},null,8,["date"])])]),t("tr",null,[F,t("td",O,[h(V,{name:["regDt"],format:"YYYY-MM-DD",date:[d.regDt],onSetStartDate:o[3]||(o[3]=e=>{d.regDt=e.date})},null,8,["date"])])]),t("tr",null,[W,t("td",null,[r(t("input",{type:"text","onUpdate:modelValue":o[4]||(o[4]=e=>d.modId=e)},null,512),[[u,d.modId]])]),X,t("td",null,[r(t("input",{type:"text","onUpdate:modelValue":o[5]||(o[5]=e=>d.regId=e)},null,512),[[u,d.regId]])])])],512),[[C,s.audit]])])]),t("div",j,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:b},[J,c("추가")]),t("button",{type:"button",class:"button del",onClick:f},[P,c("삭제")]),t("button",{type:"button",class:"button save",onClick:D},[Q,c("저장")])]),t("button",{type:"button",class:"audit",onClick:o[6]||(o[6]=e=>s.audit=!s.audit)},"상세조회"),Z,t("button",{type:"reset",onClick:y},et),t("div",ot,"총 "+I(s.totalCount)+"건",1)])],40,N),st]))}});const ut=L(nt,[["__scopeId","data-v-609ad1d1"]]);export{ut as default};