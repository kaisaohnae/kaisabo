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
				<button type="button" class="button add" @click="gridUtil.add(data.peakseasonGrid, 0)"><span class="icon">&#xe813;</span>추가</button>
				<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
				<button type="button" class="button del" @click="gridUtil.del(data.peakseasonGrid)"><span class="icon">&#xe815;</span>삭제</button>
			</span>
			<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
			<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
			<button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
			<div class="totalCount">총 {{ data.totalCount }}건</div>
		</div>
	</form>
	<div id="peakseasonGrid"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import PeakseasonService from '../../service/mb/PeakseasonService';
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
// 성수기
const data = reactive({
	peakseasonGrid: {} as Grid,
	required: ['sdsnStrtDay', 'sdsnEndDay', 'pksnStrtDay', 'pksnEndDay', 'tksnStrtDay', 'tksnEndDay', 'weekPrice', 'friPrice', 'wkedPrice', 'sdsnWeekPrice', 'sdsnFriPrice', 'sdsnWkedPrice', 'pksnWeekPrice', 'pksnFriPrice', 'pksnWkedPrice', 'tksnWeekPrice', 'tksnFriPrice', 'tksnWkedPrice', 'psnelOverPrice', 'wwtPrice', 'bbqPrice', 'etcPrice'],
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = () => {
	PeakseasonService.getPeakseasonList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.peakseasonGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const save = () => {
	let saveList = gridUtil.save(data.peakseasonGrid, data.required);
	if(saveList) {
		PeakseasonService.setPeakseasonList(saveList).then(
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
	data.peakseasonGrid = new Grid({
		el: document.getElementById('peakseasonGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: '성수기번호', name: 'pksnNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 성수기번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: (auth.userInfo.cmpId != 'kaisa'), editor: 'text'}, // 업체ID
			{header: '준성수기시작일', name: 'sdsnStrtDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 준성수기시작일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '준성수기종료일', name: 'sdsnEndDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 준성수기종료일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '성수기시작일', name: 'pksnStrtDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 성수기시작일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '성수기종료일', name: 'pksnEndDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 성수기종료일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '극성수기시작일', name: 'tksnStrtDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 극성수기시작일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '극성수기종료일', name: 'tksnEndDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 극성수기종료일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '주중요금', name: 'weekPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 주중요금
			{header: '금요일요금', name: 'friPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 금요일요금
			{header: '주말요금', name: 'wkedPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 주말요금
			{header: '준성수기주중요금', name: 'sdsnWeekPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 준성수기주중요금
			{header: '준성수기금요일요금', name: 'sdsnFriPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 준성수기금요일요금
			{header: '준성수기주말요금', name: 'sdsnWkedPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 준성수기주말요금
			{header: '성수기주중요금', name: 'pksnWeekPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 성수기주중요금
			{header: '성수기금요일요금', name: 'pksnFriPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 성수기금요일요금
			{header: '성수기주말요금', name: 'pksnWkedPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 성수기주말요금
			{header: '극성수기주중요금', name: 'tksnWeekPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 극성수기주중요금
			{header: '극성수기금요일요금', name: 'tksnFriPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 극성수기금요일요금
			{header: '극성수기주말요금', name: 'tksnWkedPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 극성수기주말요금
			{header: '인원초과요금', name: 'psnelOverPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 인원초과요금
			{header: '온수요금', name: 'wwtPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 온수요금
			{header: '바베큐요금', name: 'bbqPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 바베큐요금
			{header: '기타요금', name: 'etcPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 기타요금
			{header: '비고', name: 'note', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 비고
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
	data.peakseasonGrid.on('click', (e:any) => {
		if( e.columnName === 'cd') {
			console.log('click')
		}
	});
	getList();
});
</script>
<style scoped>
</style>
