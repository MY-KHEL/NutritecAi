import * as Yup from "yup"

export const familyHistorySchema =[
Yup.object({
    hasBrcaTest: Yup.string().required('Select an Option')
}),
Yup.object().shape({
  hasReplacementTest: Yup.string().required("Select an Option"),
  replacementDuration: Yup.number()
    .nullable()
    .typeError("Enter a valid number")
    .when("hasReplacementTest", {
      is: "Yes",
      then: (schema) => schema.required("Duration is required").min(1),
      otherwise: (schema) => schema.strip(),
    }),
}),
Yup.object().shape({
    hasBreastBiopsyTest: Yup.string().required('Select an Option'),
    breastBiopsyDuration: Yup.number().nullable()
  .typeError("Enter a valid number")
  .when("hasBreastBiopsyTest", {
    is:"Yes",
    then: (schema) => schema.required("Duration is required").min(1),
    otherwise: (schema) => schema.strip(),
  }),
    hasHyperplasia: Yup.string().nullable()
  .typeError('This field id required')
  .when("hasBreastBiopsyTest", {
    is: (val: string) => val === "Yes",
    then: (schema) => schema.required("This Field is required").min(1),
    otherwise: (schema) => schema.strip(),
  })
}),
Yup.object().shape({
    hasCloseCancerTest:Yup.string().required('Select an Option'),
    closeCancerCount: Yup.number().nullable()
  .typeError("Enter a valid number")
  .when("hasCloseCancerTest", {
    is: (val: string) => val === "Yes",
    then: (schema) => schema.required("Duration is required").min(1),
    otherwise: (schema) => schema.strip(),
  }),
    closeCancerDetails: Yup.string().nullable()
  .typeError('This field is required')
  .when("hasCloseCancerTest", {
    is: (val: string) => val === "Yes",
    then: (schema) => schema.required("This Field is required").min(1),
    otherwise: (schema) => schema.strip(),
  })

}),
Yup.object().shape({
    hasDistantCancerTest:Yup.string().required('Select an Option'),
      distantCancerCount: Yup.number().nullable()
  .typeError("Enter a valid number")
  .when("hasDistantCancerTest", {
    is:"Yes",
    then: (schema) => schema.required("Duration is required").min(1),
    otherwise: (schema) => schema.strip(),
  }),
    distantCancerDetails: Yup.string().nullable()
  .typeError('This field id required')
  .when("hasDistantCancerTest", {
    is: (val: string) => val === "Yes",
    then: (schema) => schema.required("This Field is required").min(1),
    otherwise: (schema) => schema.strip(),
  })

}),
Yup.object({
    hasCancerRelatedSyndrome:Yup.string().required('Select an Option'),
      cancerRelatedCount: Yup.number().nullable()
  .typeError("Enter a valid number")
  .when("CancerRelatedSyndrome", {
    is: (val: string) => val === "Yes",
    then: (schema) => schema.required("Duration is required").min(1),
    otherwise: (schema) => schema.strip(),
  }),
    cancerRelatedDetails: Yup.string().nullable()
  .typeError('This field id required')
  .when("CancerRelatedSyndrome", {
    is: (val: string) => val === "Yes",
    then: (schema) => schema.required("This Field is required").min(1),
    otherwise: (schema) => schema.strip(),
  })
})
]