import {defineStore} from "pinia";
const DEFAULT_FUNCTION = () => {}
export const useDialogConfirmStore = defineStore('dialogConfirmStore',{
    state: () => {
        return {
            isShowDialog: false,
            title: '',
            text: '',
            func: DEFAULT_FUNCTION,
            funcParams: {},
            callbackFunc: DEFAULT_FUNCTION,
        }
    },
    actions: {
        openDialogConfirm({title,text, func, funcParams, callbackFunc = () => {}}){
            this.title = title
            this.text = text
            this.func = func
            this.isShowDialog = true
            this.funcParams = funcParams
            this.callbackFunc = callbackFunc
        },
        closeDialogConfirm(){
            this.title = ''
            this.text = ''
            this.func = DEFAULT_FUNCTION
            this.isShowDialog = false
            this.funcParams = {}
        },
        callFunctionYes(){
            this.func(this.funcParams).then((result) => { this.callbackFunc(result)});
            this.closeDialogConfirm();
        }
    }
})