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
	<div id="memberGrid"></div>
	<MemberDetail v-if="data.detailShow" :data="data.detail"
		@set-close="(o) => {
			data.detailShow = false;
		}"
	/>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Grid from 'tui-grid';
import MemberService from '../../service/mb/MemberService';
import SelectDate from '../../components/SelectDate.vue';
import SelectCompany from '../../components/SelectCompany.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import { useAuthStore } from '../../store/store.auth';
import gridUtil from '../../utils/util.grid';
import MemberDetail from './MemberDetail.vue';

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
// 회원
const data = reactive({
	memberGrid: {} as Grid,
	required: ['mbrId', 'lv', 'pwd', 'nic', 'nm', 'hpNo', 'postNo', 'addr', 'dtlAddr', 'bisitCnt', 'loginDt', 'pwdRfsDt', 'mbrStatCd', 'email', 'lckYn', 'flCnt', 'lttd', 'lotd'],
	totalCount: 0,
	list: [],
	audit: false,
	detailShow: false,
	detail: {
		mbrId: '',
		cmpId: '',
		lv: 0,
		pwd: '',
		nic: '',
		fileNo: 0,
		nm: '',
		hpNo: '',
		postNo: '',
		addr: '',
		dtlAddr: '',
		bisitCnt: 0,
		loginDt: '',
		wtdwDt: '',
		pwdRfsDt: '',
		mbrStatCd: '',
		email: '',
		payCertKey: '',
		simAdmsCd: '',
		lckYn: 'Y',
		flCnt: 0,
		lttd: '',
		lotd: '',
		note: '',
		linkRef: '',
		modId: '',
		modDt: '',
		regId: '',
		regDt: '',
		mode: '',
	},
});
const getList = () => {
	MemberService.getMemberList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.memberGrid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const add = () => {
	data.detail = {
		mbrId: '',
		cmpId: '',
		lv: 0,
		pwd: '',
		nic: '',
		fileNo: 0,
		nm: '',
		hpNo: '',
		postNo: '',
		addr: '',
		dtlAddr: '',
		bisitCnt: 0,
		loginDt: '',
		wtdwDt: '',
		pwdRfsDt: '',
		mbrStatCd: '',
		email: '',
		payCertKey: '',
		simAdmsCd: '',
		lckYn: '',
		flCnt: 0,
		lttd: '',
		lotd: '',
		note: '',
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
	data.memberGrid = new Grid({
		el: document.getElementById('memberGrid') as HTMLElement,
		// rowHeaders: ['checkbox'],
		columns: [
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 회원ID
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: true, hidden: (auth.userInfo.cmpId != 'kaisa'), editor: 'text'}, // 업체ID
			{header: '레벨', name: 'lv', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 레벨
			{header: '비밀번호', name: 'pwd', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 비밀번호
			{header: '닉네임', name: 'nic', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 닉네임
			{header: '파일번호', name: 'fileNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 파일번호
			{header: '이름', name: 'nm', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 이름
			{header: '휴대전화번호', name: 'hpNo', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 휴대전화번호
			{header: '우편번호', name: 'postNo', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 우편번호
			{header: '주소', name: 'addr', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 주소
			{header: '상세주소', name: 'dtlAddr', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 상세주소
			{header: '방문횟수', name: 'bisitCnt', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 방문횟수
			{header: '로그인일시', name: 'loginDt', sortable: true, width: 120, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, // 로그인일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '탈퇴일시', name: 'wtdwDt', sortable: true, width: 120, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, // 탈퇴일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '비밀번호갱신일시', name: 'pwdRfsDt', sortable: true, width: 120, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, // 비밀번호갱신일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '회원상태코드', name: 'mbrStatCd', width: 120, align: 'left', sortable: true, disabled: true, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['MBR_STAT_CD'] // 회원상태코드=NOM:정상,STOP:정지,WTDW:탈퇴,CERT:인증
					},
				},
			},
			{header: '이메일', name: 'email', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 이메일
			{header: '결제인증키', name: 'payCertKey', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 결제인증키
			{header: '간편가입코드', name: 'simAdmsCd', width: 120, align: 'left', sortable: true, disabled: true, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['SIM_ADMS_CD'] // 간편가입코드=NAVER:네이버,GOOGLE:구글,FACEBOOK:페이스북
					},
				},
			},
			{header: '잠금여부', name: 'lckYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: true, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 잠금여부
					},
				},
			},
			{header: '실패횟수', name: 'flCnt', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 실패횟수
			{header: '위도', name: 'lttd', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 위도
			{header: '경도', name: 'lotd', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 경도
			{header: '비고', name: 'note', sortable: true, width: 100, align: 'left', disabled: true, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 비고
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
	data.memberGrid.on('dblclick', (e:any) => {
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
