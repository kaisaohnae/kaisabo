<template>
	<div id="EventDetail" class="popup">
		<div class="popupWrap">
			<h3>이벤트 등록/수정</h3>
			<div class="close" @click="emit('set-close')"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr><th class="th required">제목</th><td class="td"><input type="text" v-model="props.data.tit" maxlength="200" required /></td></tr>
					<tr><td colspan="2" class="td">
						<div id="eventEditor"></div>
					</td></tr>
					<tr><th class="th">파일번호</th><td class="td">
						<FileListUploader
							:name="'Event'"
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
					<tr><th class="th required">시작/종료일</th><td class="td">
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
import EventService from '../../service/dp/EventService';
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
const props = defineProps({ // data: { type: Object as PropType<EventDetail>, required: true },
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
	if(props.data.evtNo) {
		EventService.getEvent({ evtNo: props.data.evtNo}).then(
			(res) => {
				props.data.evtNo = res.data.evtNo;
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
	edit.editor = gridUtil.createEditor({name: '#eventEditor', cnts: props.data.cnts});
}
const save = () => { // 파일업로드 후 정보저장
	let fileData = gridUtil.makeFileData({name:'event', props: props, data: data});
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
	formData.append('evtNo', props.data.evtNo);
	formData.append('tit', props.data.tit + '');
	formData.append('cnts', edit.editor.getMarkdown());
	formData.append('fileNo', props.data.fileNo);
	formData.append('strtDt', props.data.strtDt + '');
	formData.append('endDt', props.data.endDt + '');
	formData.append('linkRef', props.data.linkRef + '');
	formData.append('modId', props.data.modId + '');
	formData.append('modDt', props.data.modDt + '');
	formData.append('regId', props.data.regId + '');
	formData.append('regDt', props.data.regDt + '');
	((props.data.mode === 'insert') ? EventService.insertEvent : EventService.updateEvent)(formData).then(
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
