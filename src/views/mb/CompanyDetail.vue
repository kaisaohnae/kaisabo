<template>
	<div id="CompanyDetail" class="popup">
		<div class="popupWrap">
			<h3>업체 등록/수정</h3>
			<div class="close" @click="emit('set-close')"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="">
				<table class="popT">
					<tr v-if="auth.userInfo.cmpId == 'kaisa'"><th class="th required">업체</th><td class="td"><SelectCompany :cmpId="props.data.cmpId" :required="true" @set-company="(o: any) => { props.data.cmpId = o.cmpId; }" /></td></tr>
					<tr><th class="th  required">업체구분코드</th><td class="td">
						<CommonCode :cd="'CMP_DIV_CD'" :model="props.data.cmpDivCd" @set-data="(val) => { props.data.cmpDivCd = val; }" />
					</td></tr>
					<tr><th class="th required">업체명</th><td class="td"><input type="text" v-model="props.data.cmpNm" maxlength="100" required /></td></tr>
					<tr><th class="th required">사업자등록번호</th><td class="td"><input type="text" v-model="props.data.bizno" maxlength="50" required /></td></tr>
					<tr><th class="th">파일번호</th><td class="td">
						<FileListUploader
							:name="'Company'"
							:fileList="props.data.fileList"
							:addFileList="data.addFileList"
							@set-file-list="(o:any) => {
								props.data.fileList = o;
							}"
							@set-add-file-list="(o:any) => {
								data.addFileList = o;
							}"
						/>
					</td></tr>
					<tr>
						<th class="th required">주소</th>
						<td class="td">
							<SelectJuso
								:addr="props.data.addr"
								:required="true"
								:maxlength="200"
								@set-addr="(o:any) => {
									if(o.roadAddr) {
										props.data.addr = o.roadAddr;
									} else {
										props.data.addr = o.addr;
									}
									props.data.lttd = o.lttd;
									props.data.lotd = o.lotd;
								}"
							/>
						</td>
					</tr>
					<tr><th class="th required">상세주소</th><td class="td"><input type="text" v-model="props.data.dtlAddr" maxlength="200" required /></td></tr>
					<tr><th class="th required">위도</th><td class="td"><input type="text" v-model="props.data.lttd" maxlength="null" required /></td></tr>
					<tr><th class="th required">경도</th><td class="td"><input type="text" v-model="props.data.lotd" maxlength="null" required /></td></tr>
					<tr><th class="th">사이트URL</th><td class="td"><input type="text" v-model="props.data.steUrl" maxlength="100" /></td></tr>
					<tr><th class="th required">전화번호</th><td class="td"><input type="text" v-model="props.data.telNo" maxlength="60" required /></td></tr>
					<tr><th class="th">비고</th><td class="td"><input type="text" v-model="props.data.note" maxlength="200" /></td></tr>
				</table>
				<div class="btnWrap">
					<button type="submit" @click="save">저장</button>
					<button type="button" class="gray" @click="emit('set-close')">취소</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import CompanyService from '../../service/mb/CompanyService';
import FtpService from '../../service/common/FtpService';
import SelectDate from '../../components/SelectDate.vue';
import CommonCode from '../../components/CommonCode.vue';
import FileListUploader from '../../components/FileListUploader.vue';
import dateUtil from '../../utils/util.date';
import gridUtil from '../../utils/util.grid';
import SelectCompany from '../../components/SelectCompany.vue';
import SelectJuso from '../../components/SelectJuso.vue';

import { useAuthStore } from '../../store/store.auth';
const auth = useAuthStore();
const emit = defineEmits(['set-close']);
const props = defineProps({ // data: { type: Object as PropType<CompanyDetail>, required: true },
	data: { type: Object as any, required: true },
});
if(!props.data.strtDt) {
	props.data.strtDt = dateUtil.format(new Date(), dateUtil.DATE_FORMAT);
}
if(!props.data.endDt) {
	props.data.endDt = dateUtil.format(new Date(), dateUtil.DATE_FORMAT);
}
if(!props.data.useYn) {
	props.data.useYn = 'Y';
}
const data = reactive({
	addFileList: [] as any,
});
const getDetail = () => {
	if(props.data.cmpId) {
		CompanyService.getCompany({ cmpId: props.data.cmpId}).then(
			(res) => {
				props.data.cmpId = res.data.cmpId;
				props.data.cnts = res.data.cnts;
				props.data.fileList = res.data.fileList;
				drawDetail();
			},
			(err) => {
				console.log(err);
			},
		);
	} else {
		drawDetail();
	}
}
const drawDetail = () => {
}
const save = () => { // 파일업로드 후 정보저장
	let fileData = gridUtil.makeFileData({name:'company', props: props, data: data});
	if (fileData.addCount > 0 || fileData.delCount > 0) {
		FtpService.uploadList(fileData.form).then(
			(res) => {
				if (res.success) {
					props.data.fileNo = res.data.fileNo;
					saveInfo();
				} else {
					return false;
				}
			},
			(err) => {
				console.log(err);
				return false;
			},
		);
	} else {
		saveInfo();
	}
}
const saveInfo = () => { // 정보저장
	let formData = new FormData();
	formData.append('cmpId', props.data.cmpId + '');
	formData.append('cmpDivCd', props.data.cmpDivCd + '');
	formData.append('cmpNm', props.data.cmpNm + '');
	formData.append('bizno', props.data.bizno + '');
	formData.append('fileNo', props.data.fileNo);
	formData.append('addr', props.data.addr + '');
	formData.append('dtlAddr', props.data.dtlAddr + '');
	formData.append('lttd', props.data.lttd + '');
	formData.append('lotd', props.data.lotd + '');
	formData.append('steUrl', props.data.steUrl + '');
	formData.append('telNo', props.data.telNo + '');
	formData.append('note', props.data.note + '');
	formData.append('linkRef', props.data.linkRef + '');
	formData.append('modId', props.data.modId + '');
	formData.append('modDt', props.data.modDt + '');
	formData.append('regId', props.data.regId + '');
	formData.append('regDt', props.data.regDt + '');
	((props.data.mode === 'insert') ? CompanyService.insertCompany : CompanyService.updateCompany)(formData).then(
		(res) => {
			if(res.success) {
				location.reload();
			} else {
				console.log(res);
			}
		},
		(err) => {
			console.log(err);
		},
	);
}
onMounted(() => {
	getDetail();
});
</script>
<style scoped>
</style>
