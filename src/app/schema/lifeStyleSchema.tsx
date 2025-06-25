import * as Yup from "yup"

export const LifeStyleSchema = Yup.object({
    hasFoodAllergies:Yup.string().required('Select an Option'),
    
   foodAllergyDetails:Yup.string().nullable().typeError("This field is required")
    .when("hasFoodAllergies",{
        is:(val:string)=> val ==="Yes",
        then:(schema)=>schema.required("This field is required").min(1),
        otherwise:(schema)=>schema.strip()
    }),


    isUnderTreatmentOrRemission:Yup.string().required('Select an Option'),


    // The first Condition
    doesConsumeDairy:Yup.string().required("Select an Option"),
    dairyConsumptionDetails:Yup.string().nullable().typeError("This field is required")
    .when("doesConsumeDairy",{
        is:(val:string)=> val ==="Yes",
        then:(schema)=>schema.required("This field is required").min(1),
        otherwise:(schema)=>schema.strip()
    }),


    doesConsumeAlcohol:Yup.string().required('Select an Option'),
    alcoholConsumptionDetails:Yup.string().nullable().typeError("This field is required")
    .when("doesConsumeAlcohol",{
        is:(val:string)=> val ==="Yes",
        then:(schema)=>schema.required("This field is required").min(1),
        otherwise:(schema)=>schema.strip()
    }),


    physicalActivitiesLevels:Yup.string().required('Select an Option'),


     doesTakeSupplement:Yup.string().required('Select an Option'),
    supplementConsumptionDetails:Yup.string().nullable().typeError("This field is required")
    .when("doesTakeSupplement",{
        is:(val:string)=> val ==="Yes",
        then:(schema)=>schema.required("This field is required").min(1),
        otherwise:(schema)=>schema.strip()
    }),
    

    dailyServingsOfFruitAndVeg: Yup.string().required('Select an Option'),


    weeklyIntakeOfProcessedMeat: Yup.string().required('Select an Option'),

    consumptionOfWholeGrainAndLegumes: Yup.string().required('Select an Option'),

    chronicConditions: Yup.string().required('This field is required'),

    doesFollowSpecificDiet:Yup.string().required('Select an Option'),
    specificDietDetails:Yup.string().nullable().typeError("This field is required")
    .when("doesFollowSpecificDiet",{
        is:(val:string)=> val ==="Yes",
        then:(schema)=>schema.required("This field is required").min(1),
        otherwise:(schema)=>schema.strip()
    }),
    nutritionGoals: Yup.string().required('This field is required'),
    averageMonthlyFoodBudget:Yup.string().required('Select an Option'),
    amountYouCanInvestInSupplement:Yup.string().required('Select an Option'),

})