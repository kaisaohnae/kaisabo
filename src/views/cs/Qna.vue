<template>
	<form class="search" @submit.prevent="getList" @keyup.enter="getList">
		<fieldset>
			<legend>검색</legend>
			<table>
				<colgroup>
					<col width="80" />
					<col width="30%" />
					<col width="80" />
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th>검색조건</th>
						<td colspan="3"><input type="text" v-model="search.keyword" /></td>
					</tr>
					<tr v-if="auth.userInfo.cmpId == 'kaisa'">
						<th>업체ID</th>
						<td colspan="3"><SelectCompany :cmpId="search.cmpId" @set-company="(o: any) => { search.cmpId = o.cmpId; }" /></td>
					</tr>
				</tbody>
				<tbody class="audit" v-show="data.audit">
					<tr>
						<th>수정기간</th>
						<td colspan="3">
							<SelectGroupDate 
								:name="['startModDt', 'endModDt']"
								:format="'YYYY-MM-DD'"
								:date="[search.startModDt, search.endModDt]"
								@set-start-date="(o) => {
									search.startModDt = o.date;
								}"
								@set-end-date="(o) => {
									search.endModDt = o.date;
								}"
							/>
						</td>
					</tr>
					<tr>
						<th>등록일</th>
						<td colspan="3">
							<SelectDate 
								:name="['regDt']"
								:format="'YYYY-MM-DD'"
								:date="[search.regDt]"
								@set-start-date="(o) => {
									search.regDt = o.date;
								}"
							/>
						</td>
					</tr>
					<tr>
						<th>수정ID</th>
						<td><input type="text" v-model="search.modId" /></td>
						<th>등록ID</th>
						<td><input type="text" v-model="search.regId" /></td>
					</tr>
				</tbody>
			</table>
		</fieldset>
		<div class="btnWrap">
			<span class="crud">
				<button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>등록</button>
				<!--<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
				<button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>-->
			</span>
			<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
			<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
			<button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
			<div class="totalCount">총 {{ data.totalCount }}건</div>
		</div>
	</form>
	<div id="qnaGrid"></div>
	<QnaDetail v-if="data.detailShow" :data="data.detail"
		@set-close="(o) => {
			data.detailShow = false;
		}"
	/>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import QnaService from '../../service/cs/QnaService';
import SelectDate from '../../components/SelectDate.vue';
import SelectCompany from '../../components/SelectCompany.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import { useAuthStore } from '../../store/store.auth';
import gridUtil from '../../utils/util.grid';
import QnaDetail from './QnaDetail.vue';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startModDt: '',
	endModDt: '',
	regDt: '', // dateUtil.format(new Date(),'YYYY-MM-DD') 
	regId: '',
	modId: '',
	cmpId: '',
});
// QNA
const data = reactive({
	qnaGrid: {} as Grid,
	required: ['cnts', 'chrYn'],
	totalCount: 0,
	list: [],
	audit: false,
	detailShow: false,
	detail: {
		qnaNo: 0,
		cmpId: '',
		mbrId: '',
		mbrNm: '',
		mbrTelNo: '',
		mbrEmail: '',
		pwd: '',
		tit: '',
		cnts: '',
		chrYn: 'Y',
		fileNo: 0,
		linkRef: '',
		modId: '',
		modDt: '',
		regId: '',
		regDt: '',
		mode: '',
	},
});
const getList = () => {
	QnaService.getQnaList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.qnaGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const add = () => {
	data.detail = {
		qnaNo: 0,
		cmpId: '',
		mbrId: '',
		mbrNm: '',
		mbrTelNo: '',
		mbrEmail: '',
		pwd: '',
		tit: '',
		cnts: '',
		chrYn: '',
		fileNo: 0,
		linkRef: '',
		modId: '',
		modDt: '',
		regId: '',
		regDt: '',
		mode: 'insert',
	}
	data.detailShow = true;
}
onMounted(() => {
	data.qnaGrid = new Grid({
		el: document.getElementById('qnaGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: 'QNA 번호', name: 'qnaNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // QNA 번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: true, hidden: (auth.userInfo.cmpId != 'kaisa'), editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원ID
			{header: '회원명', name: 'mbrNm', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원명
			{header: '회원전화번호', name: 'mbrTelNo', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원전화번호
			{header: '회원이메일', name: 'mbrEmail', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원이메일
			{header: '비밀번호', name: 'pwd', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 비밀번호
			{header: '제목', name: 'tit', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 제목
			{header: '문자여부', name: 'chrYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: true, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 문자여부
					},
				},
			},
			{header: '파일번호', name: 'fileNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 파일번호
			{header: '연동참조', name: 'linkRef', align: 'left', sortable: true, width: 110, disabled: true, hidden: (auth.userInfo.cmpId != 'kaisa') }, // 연동참조
			{header: '수정 ID', name: 'modId', align: 'left', sortable: true, width: 110, disabled: true }, // 수정 ID
			{header: '수정 일시', name: 'modDt', align: 'left', sortable: true, width: 120, disabled: true }, // 수정 일시
			{header: '등록 ID', name: 'regId', align: 'left', sortable: true, width: 110, disabled: true }, // 등록 ID
			{header: '등록 일시', name: 'regDt', align: 'left', sortable: true, width: 120, disabled: true }, // 등록 일시
		],
		scrollX: true,
		scrollY: true,
		minBodyHeight: 200,
		bodyHeight: 468,
		columnOptions: {
			resizable: true,
		},
		minRowHeight : 40,
		rowHeight : 40,
		header : {
			height: 40,
		},
	});
	data.qnaGrid.on('dblclick', (e:any) => {
		if( e.columnName && data.list[e.rowKey]) {
			data.detail = data.list[e.rowKey];
			data.detailShow = true;
		}
	});
	getList();
});
</script>
<style scoped>
</style>
