<template>
	<div id="ProductDetail" class="popup">
		<div class="popupWrap">
			<h3>상품 등록/수정</h3>
			<div class="close" @click="emit('set-close')"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr v-if="auth.userInfo.cmpId == 'kaisa'"><th class="th required">업체</th><td class="td"><SelectCompany :cmpId="props.data.cmpId" :required="true" @set-company="(o: any) => { props.data.cmpId = o.cmpId; }" /></td></tr>
					<tr><th class="th required">상품명</th><td class="td"><input type="text" v-model="props.data.prodNm" maxlength="100" required /></td></tr>
					<tr><th class="th">인원수</th><td class="td"><input type="number" v-model="props.data.psnelCnt" /></td></tr>
					<tr><th class="th">최대인원수</th><td class="td"><input type="number" v-model="props.data.maxPsnelCnt" /></td></tr>
					<tr><th class="th">평수</th><td class="td"><input type="number" v-model="props.data.m2" /></td></tr>
					<tr><th class="th  required">애완동물가능여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.petPsbYn" @set-data="(val) => { props.data.petPsbYn = val; }" />
					</td></tr>
					<tr><td colspan="2" class="td">
						<div id="productEditor"></div>
					</td></tr>
					<tr><th class="th required">우선순위</th><td class="td"><input type="number" v-model="props.data.prir" required /></td></tr>
					<tr><th class="th">파일번호</th><td class="td">
						<FileListUploader
							:name="'Product'"
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
					<tr><th class="th ">사용여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.useYn" @set-data="(val) => { props.data.useYn = val; }" />
					</td></tr>
					<tr><th class="th ">전시여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.dispYn" @set-data="(val) => { props.data.dispYn = val; }" />
					</td></tr>
					<tr><th class="th">비고</th><td class="td"><input type="text" v-model="props.data.note" maxlength="200" /></td></tr>
					<tr><th class="th">연동참조2</th><td class="td"><input type="text" v-model="props.data.linkRef2" maxlength="10" /></td></tr>
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
import ProductService from '../../service/pr/ProductService';
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
const props = defineProps({ // data: { type: Object as PropType<ProductDetail>, required: true },
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
	if(props.data.prodNo) {
		ProductService.getProduct({ prodNo: props.data.prodNo}).then(
			(res) => {
				props.data.prodNo = res.data.prodNo;
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
	edit.editor = gridUtil.createEditor({name: '#productEditor', cnts: props.data.cnts});
}
const save = () => { // 파일업로드 후 정보저장
	let fileData = gridUtil.makeFileData({name:'product', props: props, data: data});
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
	formData.append('prodNo', props.data.prodNo);
	formData.append('cmpId', props.data.cmpId + '');
	formData.append('prodNm', props.data.prodNm + '');
	formData.append('psnelCnt', props.data.psnelCnt);
	formData.append('maxPsnelCnt', props.data.maxPsnelCnt);
	formData.append('m2', props.data.m2);
	formData.append('petPsbYn', props.data.petPsbYn + '');
	formData.append('cnts', edit.editor.getMarkdown());
	formData.append('prir', props.data.prir);
	formData.append('fileNo', props.data.fileNo);
	formData.append('useYn', props.data.useYn + '');
	formData.append('dispYn', props.data.dispYn + '');
	formData.append('note', props.data.note + '');
	formData.append('linkRef2', props.data.linkRef2 + '');
	formData.append('linkRef', props.data.linkRef + '');
	formData.append('modId', props.data.modId + '');
	formData.append('modDt', props.data.modDt + '');
	formData.append('regId', props.data.regId + '');
	formData.append('regDt', props.data.regDt + '');
	((props.data.mode === 'insert') ? ProductService.insertProduct : ProductService.updateProduct)(formData).then(
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
