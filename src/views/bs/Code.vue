<template>
	<div id="code">
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
							<th>그룹코드</th>
							<td colspan="3"><input type="text" v-model="search.grpCd" /></td>
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
					<button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>추가</button>
					<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
					<!--<button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>-->
					</span>
				<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
				<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
				<button type="reset" @click="refresh"><span class="icon">&#x22;</span></button>
				<div class="totalCount">총 {{ data.totalCount }}건</div>
			</div>
		</form>
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import CodeService from '../../service/bs/CodeService';
import SelectDate from '../../components/SelectDate.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	grpCd: '',
	startModDt: '',
	endModDt: '',
	regDt: '', // dateUtil.format(new Date(),'YYYY-MM-DD') 
	regId: '',
	modId: '',
});
// 코드
const data = reactive({
	required: ['grpCd', 'cd', 'cdNm'],
	grid: {} as Grid,
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = () => {
	CodeService.getCodeList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			let arr = [];
			for(let o of res.data) {
				if(o.cd === 'XXX') {
					arr.push(o);
				}
			}
			for(let o of arr) {
				o.attributes = {
					expanded: true // default: false
				};
				o._children = [];
				for(let c of res.data) {
					if(c.cd != 'XXX' && o.grpCd === c.grpCd) {
						o._children.push(c);
					} 
				}
			}
			data.grid.resetData(arr, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const add = () => {
	data.grid.appendRow({}, {at: 0});
}
const del = () => {
	let selectRow = data.grid.getFocusedCell();
	if(selectRow.rowKey == null || selectRow.rowKey == undefined) {
		alert('행을 먼저 선택해주세요.');
		return;
	}
	if (confirm('선택한 행을 정말 삭제하시겠습니까?')) {
		data.grid.removeRow(selectRow.rowKey);
	}
}
const refresh = () => {
	location.reload();
}
const valid = (o:any) => {
	for(let c in o) {
		for(let r of data.required) {
			if(c == r && !o[c]) {
				alert('필수값이 없습니다.');
				return false;
			}
		}
	}
	return true;
}
const save = () => {
	data.grid.blur();
	let saveList = [];
	let count = [0, 0, 0];
	for(let o of data.grid.getModifiedRows().createdRows as any) {
		o.crud = 'C';
		saveList.push(o);
		if(!valid(o)) {
			return;
		}
		count[0]++;
	}
	for(let o of data.grid.getModifiedRows().updatedRows as any) {
		o.crud = 'U';
		saveList.push(o);
		if(!valid(o)) {
			return;
		}
		count[1]++;
	}
	for(let o of data.grid.getModifiedRows().deletedRows as any) {
		o.crud = 'D';
		saveList.push(o);
		count[2]++;
	}
	if(count[0] == 0 && count[1] == 0 && count[2] == 0) {
		alert('변경사항이 없습니다.');
		return;
	}
	if(confirm('등록 ' + count[0] + '건, 수정 ' + count[1] + '건, 삭제 ' + count[2] + '건을 정말 저장하시겠습니까?')) {
		CodeService.setCodeList(saveList).then(
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
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		//rowHeaders: ['checkbox'],
		treeColumnOptions: {
			name: 'grpCd',
			useCascadingCheckbox: true
		},
		columns: [
			{header: '그룹코드', name: 'grpCd', sortable: true, width: 200, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 그룹코드
			{header: '코드명', name: 'cdNm', sortable: true, width: 150, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 코드명
			{header: '코드', name: 'cd', sortable: true, width: 150, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 코드
			{header: '우선순위', name: 'prir', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 우선순위
			{header: '참조1', name: 'ref1', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 참조1
			{header: '참조2', name: 'ref2', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 참조2
			{header: '참조3', name: 'ref3', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 참조3
			{header: '비고', name: 'note', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 비고
			{header: '설명', name: 'dsc', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 설명
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 연동참조
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
	data.grid.on('click', (e:any) => {
		if( e.columnName === 'cd') {
			console.log('click')
		}
	});
	getList();
});
</script>
<style scoped>
#code {width: 100%;}
</style>
