<template>
	<div id="noticeDetail" class="popup">
		<div class="popupWrap">
			<h3>공지사항 등록/수정</h3>
			<div class="close" @click="emit('set-close')"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr v-if="auth.userInfo.cmpId == 'kaisa'">
						<th class="th">업체ID</th>
						<td class="td">
							<SelectCompany :cmpId="props.data.cmpId" @set-company="(o: any) => { props.data.cmpId = o.cmpId; }" />
						</td>
					</tr>
					<tr><th class="th required">제목</th><td class="td"><input type="text" v-model="props.data.tit" minlength="5" maxlength="100" /></td></tr>
					<tr><th class="th">사용여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.useYn" @set-data="(val) => { props.data.useYn = val; }" />
					</td></tr>
					<tr><th class="th">시작/종료일</th><td class="td">
						<SelectDate 
							:name="['strtDt']"
							:format="dateUtil.DATE_FORMAT"
							:date="[props.data.strtDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.strtDt = o.date;
							}"
						/>
						~
						<SelectDate 
							:name="['endDt']"
							:format="dateUtil.DATE_FORMAT"
							:date="[props.data.endDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.endDt = o.date;
							}"
						/>
					</td></tr>
					<tr><th class="th">파일</th><td class="td">
						<!-- 보이는 이미지와 저장이미지 (저장이미지만 리턴받음) -->
						<FileListUploader
							:name="'notice'"
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
					<tr><td colspan="2" class="td">
						<div id="noticeEditor"></div>
					</td></tr>
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
import NoticeService from '../../service/cs/NoticeService';
import FtpService from '../../service/common/FtpService';
import SelectDate from '../../components/SelectDate.vue';
import CommonCode from '../../components/CommonCode.vue';
import FileListUploader from '../../components/FileListUploader.vue';
import dateUtil from '../../utils/util.date';
import gridUtil from '../../utils/util.grid';
import Editor from '@toast-ui/editor';
import { useAuthStore } from '../../store/store.auth';
import SelectCompany from '../../components/SelectCompany.vue';

const auth = useAuthStore();

const emit = defineEmits(['set-close']);
const props = defineProps({ // data: { type: Object as PropType<NoticeDetail>, required: true },
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
	if(props.data.notiNo) {
		NoticeService.getNotice({ notiNo: props.data.notiNo}).then(
			(res) => {
				props.data.fileNo = res.data.fileNo;
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
	edit.editor = gridUtil.createEditor({name: '#noticeEditor', cnts: props.data.cnts});
}
const save = () => { // 파일업로드 후 정보저장
	let fileData = gridUtil.makeFileData({name:'notice', props: props, data: data});
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
	formData.append('notiNo', props.data.notiNo + '');
	formData.append('cmpId', props.data.cmpId);
	formData.append('tit', props.data.tit);
	formData.append('fileNo', props.data.fileNo + '');
	formData.append('useYn', props.data.useYn);
	formData.append('strtDt', props.data.strtDt);
	formData.append('endDt', props.data.endDt);
	formData.append('cnts', edit.editor.getMarkdown());
	((props.data.mode === 'insert') ? NoticeService.insertNotice : NoticeService.updateNotice)(formData).then(
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
