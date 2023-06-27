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
				<button type="button" class="button add" @click="gridUtil.add(data.messageHistoryGrid, 0)"><span class="icon">&#xe813;</span>추가</button>
				<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
				<button type="button" class="button del" @click="gridUtil.del(data.messageHistoryGrid)"><span class="icon">&#xe815;</span>삭제</button>
			</span>
			<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
			<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
			<button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
			<div class="totalCount">총 {{ data.totalCount }}건</div>
		</div>
	</form>
	<div id="messageHistoryGrid"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import MessageHistoryService from '../../service/bs/MessageHistoryService';
import SelectDate from '../../components/SelectDate.vue';
import SelectCompany from '../../components/SelectCompany.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import { useAuthStore } from '../../store/store.auth';
import gridUtil from '../../utils/util.grid';

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
// 문자메시지이력
const data = reactive({
	messageHistoryGrid: {} as Grid,
	required: ['cnts'],
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = () => {
	MessageHistoryService.getMessageHistoryList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.messageHistoryGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const save = () => {
	let saveList = gridUtil.save(data.messageHistoryGrid, data.required);
	if(saveList) {
		MessageHistoryService.setMessageHistoryList(saveList).then(
			(res) => {
				location.reload();
			},
			(err) => {
				console.log(err);
			},
		);
	}
}
onMounted(() => {
	data.messageHistoryGrid = new Grid({
		el: document.getElementById('messageHistoryGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: '메시지번호', name: 'msgNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 메시지번호
			{header: '사용자ID', name: 'usrId', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 사용자ID
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원ID
			{header: '내용', name: 'cnts', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 내용
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 연동참조
			{header: '수정ID', name: 'modId', align: 'left', sortable: true, width: 110, disabled: true }, // 수정ID
			{header: '수정일시', name: 'modDt', align: 'left', sortable: true, width: 120, disabled: true }, // 수정일시
			{header: '등록ID', name: 'regId', align: 'left', sortable: true, width: 110, disabled: true }, // 등록ID
			{header: '등록일시', name: 'regDt', align: 'left', sortable: true, width: 120, disabled: true }, // 등록일시
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
	data.messageHistoryGrid.on('click', (e:any) => {
		if( e.columnName === 'cd') {
			console.log('click')
		}
	});
	getList();
});
</script>
<style scoped>
</style>
