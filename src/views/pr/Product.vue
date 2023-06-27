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
	<div id="productGrid"></div>
	<ProductDetail v-if="data.detailShow" :data="data.detail"
		@set-close="(o) => {
			data.detailShow = false;
		}"
	/>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import ProductService from '../../service/pr/ProductService';
import SelectDate from '../../components/SelectDate.vue';
import SelectCompany from '../../components/SelectCompany.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import { useAuthStore } from '../../store/store.auth';
import gridUtil from '../../utils/util.grid';
import ProductDetail from './ProductDetail.vue';

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
// 상품
const data = reactive({
	productGrid: {} as Grid,
	required: ['prodNm', 'petPsbYn', 'prir'],
	totalCount: 0,
	list: [],
	audit: false,
	detailShow: false,
	detail: {
		prodNo: 0,
		cmpId: '',
		prodNm: '',
		psnelCnt: 0,
		maxPsnelCnt: 0,
		m2: 0,
		petPsbYn: 'Y',
		cnts: '',
		prir: 0,
		fileNo: 0,
		useYn: 'Y',
		dispYn: 'Y',
		note: '',
		linkRef2: '',
		linkRef: '',
		modId: '',
		modDt: '',
		regId: '',
		regDt: '',
		mode: '',
	},
});
const getList = () => {
	ProductService.getProductList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.productGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const add = () => {
	data.detail = {
		prodNo: 0,
		cmpId: '',
		prodNm: '',
		psnelCnt: 0,
		maxPsnelCnt: 0,
		m2: 0,
		petPsbYn: '',
		cnts: '',
		prir: 0,
		fileNo: 0,
		useYn: '',
		dispYn: '',
		note: '',
		linkRef2: '',
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
	data.productGrid = new Grid({
		el: document.getElementById('productGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: '상품번호', name: 'prodNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 상품번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: true, hidden: (auth.userInfo.cmpId != 'kaisa'), editor: 'text'}, // 업체ID
			{header: '상품명', name: 'prodNm', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 상품명
			{header: '인원수', name: 'psnelCnt', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 인원수
			{header: '최대인원수', name: 'maxPsnelCnt', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 최대인원수
			{header: '평수', name: 'm2', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 평수
			{header: '애완동물가능여부', name: 'petPsbYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: true, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 애완동물가능여부
					},
				},
			},
			{header: '우선순위', name: 'prir', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 우선순위
			{header: '파일번호', name: 'fileNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 파일번호
			{header: '사용여부', name: 'useYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: true, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 사용여부
					},
				},
			},
			{header: '전시여부', name: 'dispYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: true, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 전시여부
					},
				},
			},
			{header: '비고', name: 'note', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 비고
			{header: '연동참조2', name: 'linkRef2', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 연동참조2
			{header: '연동참조', name: 'linkRef', align: 'left', sortable: true, width: 110, disabled: true, hidden: (auth.userInfo.cmpId != 'kaisa') }, // 연동참조
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
	data.productGrid.on('dblclick', (e:any) => {
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
