import{d as k,b as x,r as g,A as S,o as h,f as D,g as t,j as $,L as C,m,E as N,w as u,v as p,M as T,i as q,K as M,N as V,D as F,H as R}from"./index-6f6749ac.js";import{G as U,S as A,a as E}from"./SelectGroupDate-04c3b3da.js";import{j as I}from"./jsonApi-71500902.js";import{f as w}from"./formApi-e583adde.js";import{S as L,g as P}from"./util.grid-e8996db9.js";import{F as G}from"./FtpService-c7f28024.js";import{_ as Y}from"./CommonCode.vue_vue_type_script_setup_true_lang-ab59297e.js";import{F as B}from"./FileListUploader-afa9b1dc.js";import{d as b}from"./util.date-5697c534.js";import"./index-8d9b3034.js";class K{async getProductList(s){return(await I("/bo/pr/getProductList",s||{})).data}async getProduct(s){return(await I("/bo/pr/getProduct",s||{})).data}async setProductList(s){return(await I("/bo/pr/setProductList",s||{})).data}async insertProduct(s){return(await w("/bo/pr/insertProduct",s)).data}async updateProduct(s){return(await w("/bo/pr/updateProduct",s)).data}async deleteProduct(s){return(await w("/bo/pr/getProductList",s)).data}}const _=new K,H={id:"ProductDetail",class:"popup"},O={class:"popupWrap"},W=t("h3",null,"상품 등록/수정",-1),j=t("span",{class:"icon"},"",-1),z=[j],X={class:"popT"},J={key:0},Q=t("th",{class:"th required"},"업체",-1),Z={class:"td"},tt=t("th",{class:"th required"},"상품명",-1),et={class:"td"},dt=t("th",{class:"th"},"인원수",-1),at={class:"td"},ot=t("th",{class:"th"},"최대인원수",-1),st={class:"td"},nt=t("th",{class:"th"},"평수",-1),rt={class:"td"},lt=t("th",{class:"th required"},"애완동물가능여부",-1),it={class:"td"},ut=t("tr",null,[t("td",{colspan:"2",class:"td"},[t("div",{id:"productEditor"})])],-1),pt=t("th",{class:"th required"},"우선순위",-1),mt={class:"td"},ct=t("th",{class:"th"},"파일번호",-1),ht={class:"td"},ft=t("th",{class:"th"},"사용여부",-1),bt={class:"td"},_t=t("th",{class:"th"},"전시여부",-1),gt={class:"td"},Dt=t("th",{class:"th"},"비고",-1),yt={class:"td"},It=t("th",{class:"th"},"연동참조2",-1),wt={class:"td"},Yt={class:"btnWrap"},Ct=k({__name:"ProductDetail",props:{data:{type:Object,required:!0}},emits:["set-close"],setup(y,{emit:s}){const e=y,r=x();e.data.strtDt||(e.data.strtDt=b.format(new Date,b.DATE_FORMAT)),e.data.endDt||(e.data.endDt=b.format(new Date,b.DATE_FORMAT)),e.data.useYn||(e.data.useYn="Y");const c=g({addFileList:[]}),f=g({editor:{},editorOption:{}}),i=()=>{e.data.prodNo?_.getProduct({prodNo:e.data.prodNo}).then(a=>{e.data.prodNo=a.data.prodNo,e.data.cnts=a.data.cnts,e.data.fileList=a.data.fileList,n()},a=>{console.log(a)}):n()},n=()=>{f.editor=P.createEditor({name:"#productEditor",cnts:e.data.cnts})},l=()=>{let a=P.makeFileData({name:"product",props:e,data:c});a.addCount>0||a.delCount>0?G.uploadList(a.form).then(d=>{if(d.success)e.data.fileNo=d.data.fileNo,v();else return!1},d=>(console.log(d),!1)):v()},v=()=>{let a=new FormData;a.append("prodNo",e.data.prodNo),a.append("cmpId",e.data.cmpId+""),a.append("prodNm",e.data.prodNm+""),a.append("psnelCnt",e.data.psnelCnt),a.append("maxPsnelCnt",e.data.maxPsnelCnt),a.append("m2",e.data.m2),a.append("petPsbYn",e.data.petPsbYn+""),a.append("cnts",f.editor.getMarkdown()),a.append("prir",e.data.prir),a.append("fileNo",e.data.fileNo),a.append("useYn",e.data.useYn+""),a.append("dispYn",e.data.dispYn+""),a.append("note",e.data.note+""),a.append("linkRef2",e.data.linkRef2+""),a.append("linkRef",e.data.linkRef+""),a.append("modId",e.data.modId+""),a.append("modDt",e.data.modDt+""),a.append("regId",e.data.regId+""),a.append("regDt",e.data.regDt+""),(e.data.mode==="insert"?_.insertProduct:_.updateProduct)(a).then(d=>{d.success?location.reload():console.log(d)},d=>{console.log(d)})};return S(()=>{i()}),(a,d)=>(h(),D("div",H,[t("div",O,[W,t("div",{class:"close",onClick:d[0]||(d[0]=o=>s("set-close"))},z),t("form",{onSubmit:d[15]||(d[15]=$(()=>{},["prevent"]))},[t("table",X,[C(r).userInfo.cmpId=="kaisa"?(h(),D("tr",J,[Q,t("td",Z,[m(L,{cmpId:e.data.cmpId,required:!0,onSetCompany:d[1]||(d[1]=o=>{e.data.cmpId=o.cmpId})},null,8,["cmpId"])])])):N("",!0),t("tr",null,[tt,t("td",et,[u(t("input",{type:"text","onUpdate:modelValue":d[2]||(d[2]=o=>e.data.prodNm=o),maxlength:"100",required:""},null,512),[[p,e.data.prodNm]])])]),t("tr",null,[dt,t("td",at,[u(t("input",{type:"number","onUpdate:modelValue":d[3]||(d[3]=o=>e.data.psnelCnt=o)},null,512),[[p,e.data.psnelCnt]])])]),t("tr",null,[ot,t("td",st,[u(t("input",{type:"number","onUpdate:modelValue":d[4]||(d[4]=o=>e.data.maxPsnelCnt=o)},null,512),[[p,e.data.maxPsnelCnt]])])]),t("tr",null,[nt,t("td",rt,[u(t("input",{type:"number","onUpdate:modelValue":d[5]||(d[5]=o=>e.data.m2=o)},null,512),[[p,e.data.m2]])])]),t("tr",null,[lt,t("td",it,[m(Y,{cd:"YN_CD",model:e.data.petPsbYn,onSetData:d[6]||(d[6]=o=>{e.data.petPsbYn=o})},null,8,["model"])])]),ut,t("tr",null,[pt,t("td",mt,[u(t("input",{type:"number","onUpdate:modelValue":d[7]||(d[7]=o=>e.data.prir=o),required:""},null,512),[[p,e.data.prir]])])]),t("tr",null,[ct,t("td",ht,[m(B,{name:"Product",fileList:e.data.fileList,addFileList:c.addFileList,onSetFileList:d[8]||(d[8]=o=>{e.data.fileList=o}),onSetAddFileList:d[9]||(d[9]=o=>{c.addFileList=o})},null,8,["fileList","addFileList"])])]),t("tr",null,[ft,t("td",bt,[m(Y,{cd:"YN_CD",model:e.data.useYn,onSetData:d[10]||(d[10]=o=>{e.data.useYn=o})},null,8,["model"])])]),t("tr",null,[_t,t("td",gt,[m(Y,{cd:"YN_CD",model:e.data.dispYn,onSetData:d[11]||(d[11]=o=>{e.data.dispYn=o})},null,8,["model"])])]),t("tr",null,[Dt,t("td",yt,[u(t("input",{type:"text","onUpdate:modelValue":d[12]||(d[12]=o=>e.data.note=o),maxlength:"200"},null,512),[[p,e.data.note]])])]),t("tr",null,[It,t("td",wt,[u(t("input",{type:"text","onUpdate:modelValue":d[13]||(d[13]=o=>e.data.linkRef2=o),maxlength:"10"},null,512),[[p,e.data.linkRef2]])])])]),t("div",Yt,[t("button",{type:"submit",onClick:l},"저장"),t("button",{type:"button",class:"gray",onClick:d[14]||(d[14]=o=>s("set-close"))},"취소")])],32)])]))}}),Nt=["onSubmit","onKeyup"],Pt=t("legend",null,"검색",-1),vt=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),kt=t("th",null,"검색조건",-1),xt={colspan:"3"},St={key:0},$t=t("th",null,"업체ID",-1),Lt={colspan:"3"},Tt={class:"audit"},qt=t("th",null,"수정기간",-1),Mt={colspan:"3"},Vt=t("th",null,"등록일",-1),Ft={colspan:"3"},Rt=t("th",null,"수정ID",-1),Ut=t("th",null,"등록ID",-1),At={class:"btnWrap"},Et=t("span",{class:"icon"},"",-1),Gt=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),Bt=t("span",{class:"icon"},'"',-1),Kt=[Bt],Ht={class:"totalCount"},Ot=t("div",{id:"productGrid"},null,-1),ae=k({__name:"Product",setup(y){const s=x(),e=g({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),r=g({productGrid:{},required:["prodNm","petPsbYn","prir"],totalCount:0,list:[],audit:!1,detailShow:!1,detail:{prodNo:0,cmpId:"",prodNm:"",psnelCnt:0,maxPsnelCnt:0,m2:0,petPsbYn:"Y",cnts:"",prir:0,fileNo:0,useYn:"Y",dispYn:"Y",note:"",linkRef2:"",linkRef:"",modId:"",modDt:"",regId:"",regDt:"",mode:""}}),c=()=>{_.getProductList(e).then(i=>{r.totalCount=i.count?i.count:0,r.list=i.data,r.productGrid.resetData(i.data,{})},i=>{console.log(i)})},f=()=>{r.detail={prodNo:0,cmpId:"",prodNm:"",psnelCnt:0,maxPsnelCnt:0,m2:0,petPsbYn:"",cnts:"",prir:0,fileNo:0,useYn:"",dispYn:"",note:"",linkRef2:"",linkRef:"",modId:"",modDt:"",regId:"",regDt:"",mode:"insert"},r.detailShow=!0};return S(()=>{r.productGrid=new U({el:document.getElementById("productGrid"),columns:[{header:"상품번호",name:"prodNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"업체ID",name:"cmpId",sortable:!0,width:100,align:"left",disabled:!0,hidden:s.userInfo.cmpId!="kaisa",editor:"text"},{header:"상품명",name:"prodNm",sortable:!0,width:100,align:"left",disabled:!0,validation:{dataType:"string",required:!1},editor:"text"},{header:"인원수",name:"psnelCnt",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!0},editor:"text"},{header:"최대인원수",name:"maxPsnelCnt",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!0},editor:"text"},{header:"평수",name:"m2",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!0},editor:"text"},{header:"애완동물가능여부",name:"petPsbYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!0,validation:{dataType:"string",required:!1},formatter:"listItemText",editor:{type:"select",options:{listItems:s.codeList.YN_CD}}},{header:"우선순위",name:"prir",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"파일번호",name:"fileNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!0},editor:"text"},{header:"사용여부",name:"useYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!0,validation:{dataType:"string",required:!0},formatter:"listItemText",editor:{type:"select",options:{listItems:s.codeList.YN_CD}}},{header:"전시여부",name:"dispYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!0,validation:{dataType:"string",required:!0},formatter:"listItemText",editor:{type:"select",options:{listItems:s.codeList.YN_CD}}},{header:"비고",name:"note",sortable:!0,width:100,align:"left",disabled:!0,validation:{dataType:"string",required:!0},editor:"text"},{header:"연동참조2",name:"linkRef2",sortable:!0,width:100,align:"left",disabled:!0,validation:{dataType:"string",required:!0},editor:"text"},{header:"연동참조",name:"linkRef",align:"left",sortable:!0,width:110,disabled:!0,hidden:s.userInfo.cmpId!="kaisa"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),r.productGrid.on("dblclick",i=>{i.columnName&&r.list[i.rowKey]&&(r.detail=r.list[i.rowKey],r.detailShow=!0)}),c()}),(i,n)=>(h(),D(R,null,[t("form",{class:"search",onSubmit:$(c,["prevent"]),onKeyup:V(c,["enter"])},[t("fieldset",null,[Pt,t("table",null,[vt,t("tbody",null,[t("tr",null,[kt,t("td",xt,[u(t("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=l=>e.keyword=l)},null,512),[[p,e.keyword]])])]),C(s).userInfo.cmpId=="kaisa"?(h(),D("tr",St,[$t,t("td",Lt,[m(L,{cmpId:e.cmpId,onSetCompany:n[1]||(n[1]=l=>{e.cmpId=l.cmpId})},null,8,["cmpId"])])])):N("",!0)]),u(t("tbody",Tt,[t("tr",null,[qt,t("td",Mt,[m(A,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[e.startModDt,e.endModDt],onSetStartDate:n[2]||(n[2]=l=>{e.startModDt=l.date}),onSetEndDate:n[3]||(n[3]=l=>{e.endModDt=l.date})},null,8,["date"])])]),t("tr",null,[Vt,t("td",Ft,[m(E,{name:["regDt"],format:"YYYY-MM-DD",date:[e.regDt],onSetStartDate:n[4]||(n[4]=l=>{e.regDt=l.date})},null,8,["date"])])]),t("tr",null,[Rt,t("td",null,[u(t("input",{type:"text","onUpdate:modelValue":n[5]||(n[5]=l=>e.modId=l)},null,512),[[p,e.modId]])]),Ut,t("td",null,[u(t("input",{type:"text","onUpdate:modelValue":n[6]||(n[6]=l=>e.regId=l)},null,512),[[p,e.regId]])])])],512),[[T,r.audit]])])]),t("div",At,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:f},[Et,q("등록")])]),t("button",{type:"button",class:"audit",onClick:n[7]||(n[7]=l=>r.audit=!r.audit)},"상세조회"),Gt,t("button",{type:"reset",onClick:n[8]||(n[8]=l=>C(P).reload())},Kt),t("div",Ht,"총 "+M(r.totalCount)+"건",1)])],40,Nt),Ot,r.detailShow?(h(),F(Ct,{key:0,data:r.detail,onSetClose:n[9]||(n[9]=l=>{r.detailShow=!1})},null,8,["data"])):N("",!0)],64))}});export{ae as default};
