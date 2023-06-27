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
				<button type="button" class="button add" @click="gridUtil.add(data.paymentCancelGrid, 0)"><span class="icon">&#xe813;</span>추가</button>
				<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
				<button type="button" class="button del" @click="gridUtil.del(data.paymentCancelGrid)"><span class="icon">&#xe815;</span>삭제</button>
			</span>
			<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
			<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
			<button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
			<div class="totalCount">총 {{ data.totalCount }}건</div>
		</div>
	</form>
	<div id="paymentCancelGrid"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import PaymentCancelService from '../../service/or/PaymentCancelService';
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
// 결제취소내역
const data = reactive({
	paymentCancelGrid: {} as Grid,
	required: ['prodNo', 'payNo', 'ordNo', 'cnclPrice', 'rfdPrice', 'rfdWayCd', 'cnclDt'],
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = () => {
	PaymentCancelService.getPaymentCancelList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.paymentCancelGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const save = () => {
	let saveList = gridUtil.save(data.paymentCancelGrid, data.required);
	if(saveList) {
		PaymentCancelService.setPaymentCancelList(saveList).then(
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
	data.paymentCancelGrid = new Grid({
		el: document.getElementById('paymentCancelGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: '결제취소번호', name: 'payCnclNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 결제취소번호
			{header: '상품번호', name: 'prodNo', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 상품번호
			{header: '결제번호', name: 'payNo', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 결제번호
			{header: '주문번호', name: 'ordNo', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 주문번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: (auth.userInfo.cmpId != 'kaisa'), editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원ID
			{header: '취소요금', name: 'cnclPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 취소요금
			{header: '환불요금', name: 'rfdPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 환불요금
			{header: '환불수단코드', name: 'rfdWayCd', width: 120, align: 'left', sortable: true, disabled: false, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['RFD_WAY_CD'] // 환불수단코드=NOBANK:무통장입금
					},
				},
			},
			{header: '계좌번호', name: 'acctNo', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 계좌번호
			{header: '카드번호', name: 'crdNo', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 카드번호
			{header: '결과코드', name: 'rsltCd', width: 120, align: 'left', sortable: true, disabled: false, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['RSLT_CD'] // 결과코드=SCS:성공,ERR:오류,ETC:기타
					},
				},
			},
			{header: '승인번호', name: 'apprNo', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 승인번호
			{header: '비고', name: 'note', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 비고
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 연동참조
			{header: '취소일시', name: 'cnclDt', sortable: true, width: 120, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 취소일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
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
	data.paymentCancelGrid.on('click', (e:any) => {
		if( e.columnName === 'cd') {
			console.log('click')
		}
	});
	getList();
});
</script>
<style scoped>
</style>
