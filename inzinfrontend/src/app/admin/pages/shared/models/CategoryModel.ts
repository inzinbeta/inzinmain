export interface CategoryModel{

    imagelogo:string, // percategory one icon
    imagesidebar:string,
    name:string,
    brands:[string],
    metaitle:string, // to be inserted in meta_tag
    heading:string,
    parentcategory:string,
    description:string, // to be shown on particular page of category
    content:string,
    keywords:string,
    isParent:Boolean,
}