export interface BrandsModel{
    brand_img:string,//
    brand:string,//
    seo_heading:string,//
    seo_title:string,//
    content:string,//
    seo_keywords:string,
    seo_slug:string,//
    seo_description:string,//
    parentcategory:string,//
   // business_partner:[ ],
    states:[string],//
    districts:[{_state:string,_district:string}], // storing respective state with district//
    slug:string,//
    investment:string,
    business_exp:string,
    sizes:string,
}