import * as Yup from "yup"

export const personalHistorySchema=[
    Yup.object({age:Yup.number().typeError('Age must be a number').required('Age is required')}),
    Yup.object({height:Yup.string().required('Height is required')}),
    Yup.object({weight:Yup.string().required('Weight is required')}),
    Yup.object({isMenstruating:Yup.string().required('Select an Option')}),
    Yup.object({hasChildren:Yup.string().required('Select an Option')})
]