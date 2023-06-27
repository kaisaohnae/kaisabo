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
				<button type="button" class="button add" @click="gridUtil.add(data.boardCategoryGrid, 0)"><span class="icon">&#xe813;</span>추가</button>
				<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
				<button type="button" class="button del" @click="gridUtil.del(data.boardCategoryGrid)"><span class="icon">&#xe815;</span>삭제</button>
			</span>
			<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
			<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
			<button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
			<div class="totalCount">총 {{ data.totalCount }}건</div>
		</div>
	</form>
	<div id="boardCategoryGrid"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import BoardCategoryService from '../../service/dp/BoardCategoryService';
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
// 게시판분류
const data = reactive({
	boardCategoryGrid: {} as Grid,
	required: ['lwrkCatYn', 'catNm', 'useYn', 'dpth', 'prir'],
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = () => {
	BoardCategoryService.getBoardCategoryList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.boardCategoryGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const save = () => {
	let saveList = gridUtil.save(data.boardCategoryGrid, data.required);
	if(saveList) {
		BoardCategoryService.setBoardCategoryList(saveList).then(
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
	data.boardCategoryGrid = new Grid({
		el: document.getElementById('boardCategoryGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: '게시판분류번호', name: 'brdCatNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 게시판분류번호
			{header: '상위분류번호', name: 'hgrkCatNo', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 상위분류번호
			{header: '하위분류여부', name: 'lwrkCatYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: false, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 하위분류여부
					},
				},
			},
			{header: '분류명', name: 'catNm', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 분류명
			{header: '사용여부', name: 'useYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: false, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 사용여부
					},
				},
			},
			{header: '깊이', name: 'dpth', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 깊이
			{header: '우선순위', name: 'prir', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 우선순위
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
	data.boardCategoryGrid.on('click', (e:any) => {
		if( e.columnName === 'cd') {
			console.log('click')
		}
	});
	getList();
});
</script>
<style scoped>
</style>
