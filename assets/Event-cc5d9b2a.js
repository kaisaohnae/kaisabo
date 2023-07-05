import{d as M,b as L,r as h,A as N,o as f,f as E,g as t,j as $,w as c,v as D,m,L as g,i as F,E as k,M as C,K as T,N as A,D as x,H as Y}from"./index-6f6749ac.js";import{a as I,G as q,S as R}from"./SelectGroupDate-04c3b3da.js";import{j as y}from"./jsonApi-71500902.js";import{f as w}from"./formApi-e583adde.js";import{g as S,S as G}from"./util.grid-e8996db9.js";import{F as H}from"./FtpService-c7f28024.js";import{F as V}from"./FileListUploader-afa9b1dc.js";import{d as p}from"./util.date-5697c534.js";import"./index-8d9b3034.js";class O{async getEventList(n){return(await y("/bo/dp/getEventList",n||{})).data}async getEvent(n){return(await y("/bo/dp/getEvent",n||{})).data}async setEventList(n){return(await y("/bo/dp/setEventList",n||{})).data}async insertEvent(n){return(await w("/bo/dp/insertEvent",n)).data}async updateEvent(n){return(await w("/bo/dp/updateEvent",n)).data}async deleteEvent(n){return(await w("/bo/dp/getEventList",n)).data}}const v=new O,U={id:"EventDetail",class:"popup"},B={class:"popupWrap"},K=t("h3",null,"이벤트 등록/수정",-1),W=t("span",{class:"icon"},"",-1),P=[W],j={class:"popT"},z=t("th",{class:"th required"},"제목",-1),X={class:"td"},J=t("tr",null,[t("td",{colspan:"2",class:"td"},[t("div",{id:"eventEditor"})])],-1),Q=t("th",{class:"th"},"파일번호",-1),Z={class:"td"},tt=t("th",{class:"th required"},"시작/종료일",-1),et={class:"td"},at={class:"btnWrap"},dt=M({__name:"EventDetail",props:{data:{type:Object,required:!0}},emits:["set-close"],setup(b,{emit:n}){const e=b;L(),e.data.strtDt||(e.data.strtDt=p.format(new Date,p.DATE_FORMAT)),e.data.endDt||(e.data.endDt=p.format(new Date,p.DATE_FORMAT)),e.data.useYn||(e.data.useYn="Y");const o=h({addFileList:[]}),u=h({editor:{},editorOption:{}}),_=()=>{e.data.evtNo?v.getEvent({evtNo:e.data.evtNo}).then(d=>{e.data.evtNo=d.data.evtNo,e.data.cnts=d.data.cnts,e.data.fileList=d.data.fileList,l()},d=>{console.log(d)}):l()},l=()=>{u.editor=S.createEditor({name:"#eventEditor",cnts:e.data.cnts})},s=()=>{let d=S.makeFileData({name:"event",props:e,data:o});d.addCount>0||d.delCount>0?H.uploadList(d.form).then(a=>{if(a.success)e.data.fileNo=a.data.fileNo,i();else return!1},a=>(console.log(a),!1)):i()},i=()=>{let d=new FormData;d.append("evtNo",e.data.evtNo),d.append("tit",e.data.tit+""),d.append("cnts",u.editor.getMarkdown()),d.append("fileNo",e.data.fileNo),d.append("strtDt",e.data.strtDt+""),d.append("endDt",e.data.endDt+""),d.append("linkRef",e.data.linkRef+""),d.append("modId",e.data.modId+""),d.append("modDt",e.data.modDt+""),d.append("regId",e.data.regId+""),d.append("regDt",e.data.regDt+""),(e.data.mode==="insert"?v.insertEvent:v.updateEvent)(d).then(a=>{a.success?location.reload():console.log(a)},a=>{console.log(a)})};return N(()=>{_()}),(d,a)=>(f(),E("div",U,[t("div",B,[K,t("div",{class:"close",onClick:a[0]||(a[0]=r=>n("set-close"))},P),t("form",{onSubmit:a[7]||(a[7]=$(()=>{},["prevent"]))},[t("table",j,[t("tr",null,[z,t("td",X,[c(t("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=r=>e.data.tit=r),maxlength:"200",required:""},null,512),[[D,e.data.tit]])])]),J,t("tr",null,[Q,t("td",Z,[m(V,{name:"Event",fileList:e.data.fileList,addFileList:o.addFileList,onSetFileList:a[2]||(a[2]=r=>{e.data.fileList=r}),onSetAddFileList:a[3]||(a[3]=r=>{o.addFileList=r})},null,8,["fileList","addFileList"])])]),t("tr",null,[tt,t("td",et,[m(I,{name:["strtDt"],format:g(p).DATE_FORMAT,date:[e.data.strtDt],isAll:!1,timer:!0,onSetStartDate:a[4]||(a[4]=r=>{e.data.strtDt=r.date})},null,8,["format","date"]),F(" ~ "),m(I,{name:["endDt"],format:g(p).DATE_FORMAT,date:[e.data.endDt],isAll:!1,timer:!0,onSetStartDate:a[5]||(a[5]=r=>{e.data.endDt=r.date})},null,8,["format","date"])])])]),t("div",at,[t("button",{type:"submit",onClick:s},"저장"),t("button",{type:"button",class:"gray",onClick:a[6]||(a[6]=r=>n("set-close"))},"취소")])],32)])]))}}),ot=["onSubmit","onKeyup"],st=t("legend",null,"검색",-1),nt=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),it=t("th",null,"검색조건",-1),lt={colspan:"3"},rt={key:0},ut=t("th",null,"업체ID",-1),pt={colspan:"3"},mt={class:"audit"},ct=t("th",null,"수정기간",-1),ft={colspan:"3"},Dt=t("th",null,"등록일",-1),vt={colspan:"3"},ht=t("th",null,"수정ID",-1),gt=t("th",null,"등록ID",-1),bt={class:"btnWrap"},_t=t("span",{class:"icon"},"",-1),yt=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),wt=t("span",{class:"icon"},'"',-1),Et=[wt],It={class:"totalCount"},St=t("div",{id:"eventGrid"},null,-1),xt=M({__name:"Event",setup(b){const n=L(),e=h({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),o=h({eventGrid:{},required:["tit","cnts","strtDt","endDt"],totalCount:0,list:[],audit:!1,detailShow:!1,detail:{evtNo:0,tit:"",cnts:"",fileNo:0,strtDt:"",endDt:"",linkRef:"",modId:"",modDt:"",regId:"",regDt:"",mode:""}}),u=()=>{v.getEventList(e).then(l=>{o.totalCount=l.count?l.count:0,o.list=l.data,o.eventGrid.resetData(l.data,{})},l=>{console.log(l)})},_=()=>{o.detail={evtNo:0,tit:"",cnts:"",fileNo:0,strtDt:"",endDt:"",linkRef:"",modId:"",modDt:"",regId:"",regDt:"",mode:"insert"},o.detailShow=!0};return N(()=>{o.eventGrid=new q({el:document.getElementById("eventGrid"),columns:[{header:"이벤트번호",name:"evtNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"제목",name:"tit",sortable:!0,width:100,align:"left",disabled:!0,validation:{dataType:"string",required:!1},editor:"text"},{header:"파일번호",name:"fileNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!0},editor:"text"},{header:"시작일시",name:"strtDt",sortable:!0,width:120,align:"left",disabled:!0,validation:{dataType:"string",required:!1},editor:{type:"datePicker",options:{format:"yyyy-MM-dd HH:mm"}}},{header:"종료일시",name:"endDt",sortable:!0,width:120,align:"left",disabled:!0,validation:{dataType:"string",required:!1},editor:{type:"datePicker",options:{format:"yyyy-MM-dd HH:mm"}}},{header:"연동참조",name:"linkRef",align:"left",sortable:!0,width:110,disabled:!0,hidden:n.userInfo.cmpId!="kaisa"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),o.eventGrid.on("dblclick",l=>{l.columnName&&o.list[l.rowKey]&&(o.detail=o.list[l.rowKey],o.detailShow=!0)}),u()}),(l,s)=>(f(),E(Y,null,[t("form",{class:"search",onSubmit:$(u,["prevent"]),onKeyup:A(u,["enter"])},[t("fieldset",null,[st,t("table",null,[nt,t("tbody",null,[t("tr",null,[it,t("td",lt,[c(t("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=i=>e.keyword=i)},null,512),[[D,e.keyword]])])]),g(n).userInfo.cmpId=="kaisa"?(f(),E("tr",rt,[ut,t("td",pt,[m(G,{cmpId:e.cmpId,onSetCompany:s[1]||(s[1]=i=>{e.cmpId=i.cmpId})},null,8,["cmpId"])])])):k("",!0)]),c(t("tbody",mt,[t("tr",null,[ct,t("td",ft,[m(R,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[e.startModDt,e.endModDt],onSetStartDate:s[2]||(s[2]=i=>{e.startModDt=i.date}),onSetEndDate:s[3]||(s[3]=i=>{e.endModDt=i.date})},null,8,["date"])])]),t("tr",null,[Dt,t("td",vt,[m(I,{name:["regDt"],format:"YYYY-MM-DD",date:[e.regDt],onSetStartDate:s[4]||(s[4]=i=>{e.regDt=i.date})},null,8,["date"])])]),t("tr",null,[ht,t("td",null,[c(t("input",{type:"text","onUpdate:modelValue":s[5]||(s[5]=i=>e.modId=i)},null,512),[[D,e.modId]])]),gt,t("td",null,[c(t("input",{type:"text","onUpdate:modelValue":s[6]||(s[6]=i=>e.regId=i)},null,512),[[D,e.regId]])])])],512),[[C,o.audit]])])]),t("div",bt,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:_},[_t,F("등록")])]),t("button",{type:"button",class:"audit",onClick:s[7]||(s[7]=i=>o.audit=!o.audit)},"상세조회"),yt,t("button",{type:"reset",onClick:s[8]||(s[8]=i=>g(S).reload())},Et),t("div",It,"총 "+T(o.totalCount)+"건",1)])],40,ot),St,o.detailShow?(f(),x(dt,{key:0,data:o.detail,onSetClose:s[9]||(s[9]=i=>{o.detailShow=!1})},null,8,["data"])):k("",!0)],64))}});export{xt as default};