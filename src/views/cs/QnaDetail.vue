<template>
	<div id="QnaDetail" class="popup">
		<div class="popupWrap">
			<h3>QNA 등록/수정</h3>
			<div class="close" @click="emit('set-close')"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="">
				<table class="popT">
					<tr v-if="auth.userInfo.cmpId == 'kaisa'"><th class="th required">업체</th><td class="td"><SelectCompany :cmpId="props.data.cmpId" :required="true" @set-company="(o: any) => { props.data.cmpId = o.cmpId; }" /></td></tr>
					<tr><th class="th">회원ID</th><td class="td"><input type="text" v-model="props.data.mbrId" maxlength="100" /></td></tr>
					<tr><th class="th">회원 명</th><td class="td"><input type="text" v-model="props.data.mbrNm" maxlength="100" /></td></tr>
					<tr><th class="th">회원 전화번호</th><td class="td"><input type="text" v-model="props.data.mbrTelNo" maxlength="60" /></td></tr>
					<tr><th class="th">회원 이메일</th><td class="td"><input type="text" v-model="props.data.mbrEmail" maxlength="100" /></td></tr>
					<tr><th class="th">비밀번호</th><td class="td"><input type="text" v-model="props.data.pwd" maxlength="200" /></td></tr>
					<tr><th class="th">제목</th><td class="td"><input type="text" v-model="props.data.tit" maxlength="200" /></td></tr>
					<tr><td colspan="2" class="td">
						<div id="qnaEditor"></div>
					</td></tr>
					<tr><th class="th  required">문자여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.chrYn" @set-data="(val) => { props.data.chrYn = val; }" />
					</td></tr>
					<tr><th class="th">파일번호</th><td class="td">
						<FileListUploader
							:name="'Qna'"
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
import QnaService from '../../service/cs/QnaService';
import FtpService from '../../service/common/FtpService';
import SelectDate from '../../components/SelectDate.vue';
import CommonCode from '../../components/CommonCode.vue';
import FileListUploader from '../../components/FileListUploader.vue';
import dateUtil from '../../utils/util.date';
import gridUtil from '../../utils/util.grid';
import Editor from '@toast-ui/editor';
import SelectCompany from '../../components/SelectCompany.vue';

import { useAuthStore } from '../../store/store.auth';
const auth = useAuthStore();
const emit = defineEmits(['set-close']);
const props = defineProps({ // data: { type: Object as PropType<QnaDetail>, required: true },
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
const edit = reactive({
	editor: {} as Editor,
	editorOption: {}
});
const getDetail = () => {
	if(props.data.qnaNo) {
		QnaService.getQna({ qnaNo: props.data.qnaNo}).then(
			(res) => {
				props.data.qnaNo = res.data.qnaNo;
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
	edit.editor = gridUtil.createEditor({name: '#qnaEditor', cnts: props.data.cnts});
}
const save = () => { // 파일업로드 후 정보저장
	let fileData = gridUtil.makeFileData({name:'qna', props: props, data: data});
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
	formData.append('qnaNo', props.data.qnaNo);
	formData.append('cmpId', props.data.cmpId + '');
	formData.append('mbrId', props.data.mbrId + '');
	formData.append('mbrNm', props.data.mbrNm + '');
	formData.append('mbrTelNo', props.data.mbrTelNo + '');
	formData.append('mbrEmail', props.data.mbrEmail + '');
	formData.append('pwd', props.data.pwd + '');
	formData.append('tit', props.data.tit + '');
	formData.append('cnts', edit.editor.getMarkdown());
	formData.append('chrYn', props.data.chrYn + '');
	formData.append('fileNo', props.data.fileNo);
	formData.append('linkRef', props.data.linkRef + '');
	formData.append('modId', props.data.modId + '');
	formData.append('modDt', props.data.modDt + '');
	formData.append('regId', props.data.regId + '');
	formData.append('regDt', props.data.regDt + '');
	((props.data.mode === 'insert') ? QnaService.insertQna : QnaService.updateQna)(formData).then(
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
