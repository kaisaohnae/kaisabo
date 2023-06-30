<template>
	<div id="MemberDetail" class="popup">
		<div class="popupWrap">
			<h3>회원 등록/수정</h3>
			<div class="close" @click="emit('set-close')"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr><th class="th required">회원ID</th><td class="td"><input type="text" v-model="props.data.mbrId" maxlength="100" required /></td></tr>
					<tr v-if="auth.userInfo.cmpId == 'kaisa'"><th class="th required">업체</th><td class="td"><SelectCompany :cmpId="props.data.cmpId" :required="true" @set-company="(o: any) => { props.data.cmpId = o.cmpId; }" /></td></tr>
					<tr><th class="th required">레벨</th><td class="td"><input type="number" v-model="props.data.lv" required /></td></tr>
					<tr><th class="th required">비밀번호</th><td class="td"><input type="text" v-model="props.data.pwd" maxlength="200" required /></td></tr>
					<tr><th class="th required">닉네임</th><td class="td"><input type="text" v-model="props.data.nic" maxlength="100" required /></td></tr>
					<tr><th class="th">파일번호</th><td class="td">
						<FileListUploader
							:name="'Member'"
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
					<tr><th class="th required">이름</th><td class="td"><input type="text" v-model="props.data.nm" maxlength="100" required /></td></tr>
					<tr><th class="th required">휴대전화번호</th><td class="td"><input type="text" v-model="props.data.hpNo" maxlength="60" required /></td></tr>
					<tr><th class="th required">우편번호</th><td class="td"><input type="text" v-model="props.data.postNo" maxlength="30" required /></td></tr>
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
								}"
							/>
						</td>
					</tr>
					<tr><th class="th required">상세주소</th><td class="td"><input type="text" v-model="props.data.dtlAddr" maxlength="200" required /></td></tr>
					<tr><th class="th required">방문횟수</th><td class="td"><input type="number" v-model="props.data.bisitCnt" required /></td></tr>
					<tr><th class="th required">로그인일시</th><td class="td">
						<SelectDate 
							:name="['loginDt']"
							:format="dateUtil.DATE_FORMAT"
							:date="[props.data.loginDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.loginDt = o.date;
							}"
						/>
					</td></tr>
					<tr><th class="th">탈퇴일시</th><td class="td">
						<SelectDate 
							:name="['wtdwDt']"
							:format="dateUtil.DATE_FORMAT"
							:date="[props.data.wtdwDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.wtdwDt = o.date;
							}"
						/>
					</td></tr>
					<tr><th class="th required">비밀번호갱신일시</th><td class="td">
						<SelectDate 
							:name="['pwdRfsDt']"
							:format="dateUtil.DATE_FORMAT"
							:date="[props.data.pwdRfsDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.pwdRfsDt = o.date;
							}"
						/>
					</td></tr>
					<tr><th class="th  required">회원상태코드</th><td class="td">
						<CommonCode :cd="'MBR_STAT_CD'" :model="props.data.mbrStatCd" @set-data="(val) => { props.data.mbrStatCd = val; }" />
					</td></tr>
					<tr><th class="th required">이메일</th><td class="td"><input type="text" v-model="props.data.email" maxlength="100" required /></td></tr>
					<tr><th class="th">결제인증키</th><td class="td"><input type="text" v-model="props.data.payCertKey" maxlength="100" /></td></tr>
					<tr><th class="th ">간편가입코드</th><td class="td">
						<CommonCode :cd="'SIM_ADMS_CD'" :model="props.data.simAdmsCd" @set-data="(val) => { props.data.simAdmsCd = val; }" />
					</td></tr>
					<tr><th class="th  required">잠금여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.lckYn" @set-data="(val) => { props.data.lckYn = val; }" />
					</td></tr>
					<tr><th class="th required">실패횟수</th><td class="td"><input type="number" v-model="props.data.flCnt" required /></td></tr>
					<tr><th class="th">비고</th><td class="td"><input type="text" v-model="props.data.note" maxlength="200" /></td></tr>
				</table>
				<div class="btnWrap">
					<button type="submit">저장</button>
					<button type="button" class="gray" @click="emit('set-close')">취소</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import MemberService from '../../service/mb/MemberService';
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
const props = defineProps({ // data: { type: Object as PropType<MemberDetail>, required: true },
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
	if(props.data.mbrId && props.data.cmpId) {
		MemberService.getMember({ mbrId: props.data.mbrId, cmpId: props.data.cmpId}).then(
			(res) => {
				props.data.mbrId = res.data.mbrId;
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
	let fileData = gridUtil.makeFileData({name:'member', props: props, data: data});
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
	formData.append('mbrId', props.data.mbrId + '');
	formData.append('cmpId', props.data.cmpId + '');
	formData.append('lv', props.data.lv);
	formData.append('pwd', props.data.pwd + '');
	formData.append('nic', props.data.nic + '');
	formData.append('fileNo', props.data.fileNo);
	formData.append('nm', props.data.nm + '');
	formData.append('hpNo', props.data.hpNo + '');
	formData.append('postNo', props.data.postNo + '');
	formData.append('addr', props.data.addr + '');
	formData.append('dtlAddr', props.data.dtlAddr + '');
	formData.append('bisitCnt', props.data.bisitCnt);
	formData.append('loginDt', props.data.loginDt + '');
	formData.append('wtdwDt', props.data.wtdwDt + '');
	formData.append('pwdRfsDt', props.data.pwdRfsDt + '');
	formData.append('mbrStatCd', props.data.mbrStatCd + '');
	formData.append('email', props.data.email + '');
	formData.append('payCertKey', props.data.payCertKey + '');
	formData.append('simAdmsCd', props.data.simAdmsCd + '');
	formData.append('lckYn', props.data.lckYn + '');
	formData.append('flCnt', props.data.flCnt);
	formData.append('note', props.data.note + '');
	formData.append('linkRef', props.data.linkRef + '');
	formData.append('modId', props.data.modId + '');
	formData.append('modDt', props.data.modDt + '');
	formData.append('regId', props.data.regId + '');
	formData.append('regDt', props.data.regDt + '');
	((props.data.mode === 'insert') ? MemberService.insertMember : MemberService.updateMember)(formData).then(
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
