import {defineStore} from "pinia";
import {ref} from "vue";

export const useMyQuillStore = defineStore('useMyQuillStore', () => {
    const imageDialog = ref(false)
    const eventBus = ref(null)
    const quillRef = ref('')
    const quillInstance = ref({})
    const rangeIndex = ref(0)
    const imageObject = ref({
        path: '',
        width: null,
    })
    const quill = ref({})
    function openImageDialog(event,nameRef,index,instance){
        eventBus.value = event
        quillRef.value = nameRef
        rangeIndex.value = index
        quillInstance.value = instance
        imageObject.value = {
            path: '',
            width: null,
            height: null,
        }
        imageDialog.value = true
    }
    function closeImageDialog(){
        imageDialog.value = false
    }
    function readyImage(){
        closeImageDialog()
        eventBus.value.emit('readyImage'+quillRef.value,imageObject.value,rangeIndex.value,quillInstance.value)
    }
    return {
        imageDialog,openImageDialog,closeImageDialog,readyImage,imageObject
    }
})