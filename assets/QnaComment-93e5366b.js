import{d as v,b as k,r as C,A as Q,o as c,f as _,g as t,j as L,w as u,v as p,L as y,m as h,E as N,M,i as F,K as x,N as A,D as Y,H as T}from"./index-6f6749ac.js";import{G as E,S as G,a as V}from"./SelectGroupDate-04c3b3da.js";import{j as I}from"./jsonApi-71500902.js";import{f as w}from"./formApi-e583adde.js";import{S as $,g as q}from"./util.grid-e8996db9.js";import{F as R}from"./FtpService-c7f28024.js";import{F as U}from"./FileListUploader-afa9b1dc.js";import{d as b}from"./util.date-5697c534.js";import"./index-8d9b3034.js";class B{async getQnaCommentList(d){return(await I("/bo/cs/getQnaCommentList",d||{})).data}async getQnaComment(d){return(await I("/bo/cs/getQnaComment",d||{})).data}async setQnaCommentList(d){return(await I("/bo/cs/setQnaCommentList",d||{})).data}async insertQnaComment(d){return(await w("/bo/cs/insertQnaComment",d)).data}async updateQnaComment(d){return(await w("/bo/cs/updateQnaComment",d)).data}async deleteQnaComment(d){return(await w("/bo/cs/getQnaCommentList",d)).data}}const g=new B,K={id:"QnaCommentDetail",class:"popup"},H={class:"popupWrap"},O=t("h3",null,"QNA 댓글 등록/수정",-1),W=t("span",{class:"icon"},"",-1),j=[W],z={class:"popT"},X=t("th",{class:"th required"},"QNA 번호",-1),J={class:"td"},P={key:0},Z=t("th",{class:"th required"},"업체",-1),tt={class:"td"},et=t("th",{class:"th"},"파일번호",-1),at={class:"td"},ot=t("th",{class:"th"},"회원 명",-1),nt={class:"td"},dt=t("tr",null,[t("td",{colspan:"2",class:"td"},[t("div",{id:"qnaCommentEditor"})])],-1),st={class:"btnWrap"},it=v({__name:"QnaCommentDetail",props:{data:{type:Object,required:!0}},emits:["set-close"],setup(D,{emit:d}){const e=D,s=k();e.data.strtDt||(e.data.strtDt=b.format(new Date,b.DATE_FORMAT)),e.data.endDt||(e.data.endDt=b.format(new Date,b.DATE_FORMAT)),e.data.useYn||(e.data.useYn="Y");const m=C({addFileList:[]}),f=C({editor:{},editorOption:{}}),l=()=>{e.data.qnaCmmtNo?g.getQnaComment({qnaCmmtNo:e.data.qnaCmmtNo}).then(n=>{e.data.qnaCmmtNo=n.data.qnaCmmtNo,e.data.cnts=n.data.cnts,e.data.fileList=n.data.fileList,o()},n=>{console.log(n)}):o()},o=()=>{f.editor=q.createEditor({name:"#qnaCommentEditor",cnts:e.data.cnts})},i=()=>{let n=q.makeFileData({name:"qnaComment",props:e,data:m});n.addCount>0||n.delCount>0?R.uploadList(n.form).then(a=>{if(a.success)e.data.fileNo=a.data.fileNo,S();else return!1},a=>(console.log(a),!1)):S()},S=()=>{let n=new FormData;n.append("qnaCmmtNo",e.data.qnaCmmtNo),n.append("qnaNo",e.data.qnaNo),n.append("cmpId",e.data.cmpId+""),n.append("fileNo",e.data.fileNo),n.append("mbrNm",e.data.mbrNm+""),n.append("cnts",f.editor.getMarkdown()),n.append("linkRef",e.data.linkRef+""),n.append("modId",e.data.modId+""),n.append("modDt",e.data.modDt+""),n.append("regId",e.data.regId+""),n.append("regDt",e.data.regDt+""),(e.data.mode==="insert"?g.insertQnaComment:g.updateQnaComment)(n).then(a=>{a.success?location.reload():console.log(a)},a=>{console.log(a)})};return Q(()=>{l()}),(n,a)=>(c(),_("div",K,[t("div",H,[O,t("div",{class:"close",onClick:a[0]||(a[0]=r=>d("set-close"))},j),t("form",{onSubmit:a[7]||(a[7]=L(()=>{},["prevent"]))},[t("table",z,[t("tr",null,[X,t("td",J,[u(t("input",{type:"number","onUpdate:modelValue":a[1]||(a[1]=r=>e.data.qnaNo=r),required:""},null,512),[[p,e.data.qnaNo]])])]),y(s).userInfo.cmpId=="kaisa"?(c(),_("tr",P,[Z,t("td",tt,[h($,{cmpId:e.data.cmpId,required:!0,onSetCompany:a[2]||(a[2]=r=>{e.data.cmpId=r.cmpId})},null,8,["cmpId"])])])):N("",!0),t("tr",null,[et,t("td",at,[h(U,{name:"QnaComment",fileList:e.data.fileList,addFileList:m.addFileList,onSetFileList:a[3]||(a[3]=r=>{e.data.fileList=r}),onSetAddFileList:a[4]||(a[4]=r=>{m.addFileList=r})},null,8,["fileList","addFileList"])])]),t("tr",null,[ot,t("td",nt,[u(t("input",{type:"text","onUpdate:modelValue":a[5]||(a[5]=r=>e.data.mbrNm=r),maxlength:"100"},null,512),[[p,e.data.mbrNm]])])]),dt]),t("div",st,[t("button",{type:"submit",onClick:i},"저장"),t("button",{type:"button",class:"gray",onClick:a[6]||(a[6]=r=>d("set-close"))},"취소")])],32)])]))}}),lt=["onSubmit","onKeyup"],rt=t("legend",null,"검색",-1),mt=t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1),ut=t("th",null,"검색조건",-1),ct={colspan:"3"},pt={key:0},ht=t("th",null,"업체ID",-1),ft={colspan:"3"},bt={class:"audit"},gt=t("th",null,"수정기간",-1),Ct={colspan:"3"},_t=t("th",null,"등록일",-1),Dt={colspan:"3"},It=t("th",null,"수정ID",-1),wt=t("th",null,"등록ID",-1),yt={class:"btnWrap"},Nt=t("span",{class:"icon"},"",-1),qt=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1),St=t("span",{class:"icon"},'"',-1),vt=[St],kt={class:"totalCount"},Qt=t("div",{id:"qnaCommentGrid"},null,-1),Gt=v({__name:"QnaComment",setup(D){const d=k(),e=C({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),s=C({qnaCommentGrid:{},required:["qnaNo"],totalCount:0,list:[],audit:!1,detailShow:!1,detail:{qnaCmmtNo:0,qnaNo:0,cmpId:"",fileNo:0,mbrNm:"",cnts:"",linkRef:"",modId:"",modDt:"",regId:"",regDt:"",mode:""}}),m=()=>{g.getQnaCommentList(e).then(l=>{s.totalCount=l.count?l.count:0,s.list=l.data,s.qnaCommentGrid.resetData(l.data,{})},l=>{console.log(l)})},f=()=>{s.detail={qnaCmmtNo:0,qnaNo:0,cmpId:"",fileNo:0,mbrNm:"",cnts:"",linkRef:"",modId:"",modDt:"",regId:"",regDt:"",mode:"insert"},s.detailShow=!0};return Q(()=>{s.qnaCommentGrid=new E({el:document.getElementById("qnaCommentGrid"),columns:[{header:"QNA 댓글 번호",name:"qnaCmmtNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"QNA 번호",name:"qnaNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"업체ID",name:"cmpId",sortable:!0,width:100,align:"left",disabled:!0,hidden:d.userInfo.cmpId!="kaisa",editor:"text"},{header:"파일번호",name:"fileNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!0},editor:"text"},{header:"회원 명",name:"mbrNm",sortable:!0,width:100,align:"left",disabled:!0,validation:{dataType:"string",required:!0},editor:"text"},{header:"연동참조",name:"linkRef",align:"left",sortable:!0,width:110,disabled:!0,hidden:d.userInfo.cmpId!="kaisa"},{header:"수정 ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정 일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록 ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록 일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),s.qnaCommentGrid.on("dblclick",l=>{l.columnName&&s.list[l.rowKey]&&(s.detail=s.list[l.rowKey],s.detailShow=!0)}),m()}),(l,o)=>(c(),_(T,null,[t("form",{class:"search",onSubmit:L(m,["prevent"]),onKeyup:A(m,["enter"])},[t("fieldset",null,[rt,t("table",null,[mt,t("tbody",null,[t("tr",null,[ut,t("td",ct,[u(t("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=i=>e.keyword=i)},null,512),[[p,e.keyword]])])]),y(d).userInfo.cmpId=="kaisa"?(c(),_("tr",pt,[ht,t("td",ft,[h($,{cmpId:e.cmpId,onSetCompany:o[1]||(o[1]=i=>{e.cmpId=i.cmpId})},null,8,["cmpId"])])])):N("",!0)]),u(t("tbody",bt,[t("tr",null,[gt,t("td",Ct,[h(G,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[e.startModDt,e.endModDt],onSetStartDate:o[2]||(o[2]=i=>{e.startModDt=i.date}),onSetEndDate:o[3]||(o[3]=i=>{e.endModDt=i.date})},null,8,["date"])])]),t("tr",null,[_t,t("td",Dt,[h(V,{name:["regDt"],format:"YYYY-MM-DD",date:[e.regDt],onSetStartDate:o[4]||(o[4]=i=>{e.regDt=i.date})},null,8,["date"])])]),t("tr",null,[It,t("td",null,[u(t("input",{type:"text","onUpdate:modelValue":o[5]||(o[5]=i=>e.modId=i)},null,512),[[p,e.modId]])]),wt,t("td",null,[u(t("input",{type:"text","onUpdate:modelValue":o[6]||(o[6]=i=>e.regId=i)},null,512),[[p,e.regId]])])])],512),[[M,s.audit]])])]),t("div",yt,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:f},[Nt,F("등록")])]),t("button",{type:"button",class:"audit",onClick:o[7]||(o[7]=i=>s.audit=!s.audit)},"상세조회"),qt,t("button",{type:"reset",onClick:o[8]||(o[8]=i=>y(q).reload())},vt),t("div",kt,"총 "+x(s.totalCount)+"건",1)])],40,lt),Qt,s.detailShow?(c(),Y(it,{key:0,data:s.detail,onSetClose:o[9]||(o[9]=i=>{s.detailShow=!1})},null,8,["data"])):N("",!0)],64))}});export{Gt as default};
