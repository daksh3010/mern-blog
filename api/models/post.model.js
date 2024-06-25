import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
        userId: {
            type : String ,
            required : true,
        } ,
        content : {
            type : String ,
            required : true ,
        } ,
        title : {
            type : String , 
            required: true , 
            unique : true ,
        } ,
        image : {
            type : String , 
            default : 'https://imgs.search.brave.com/ONHeKREejDxlEfFohfH4C1uucCzoLS95iXdQY3o3Jco/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z253aXphcmQuY29t/L2Jsb2cvYmxvZy1w/b3N0LWltYWdlcy9y/ZXNpemUvZWZmZWN0/aXZlLWJsb2ctaW1h/Z2UtZmVhdHVyZWRf/MTY1NzExNDQxMDk2/M19yZXNpemUuanBn' ,

        } , 
        category : {
            type : String ,
            default : 'uncategorized' ,
        } ,
        slug : {
            type : String ,
            required : true ,
            unique : true ,
        } ,
    } ,{timestamps : true}
) ;
const Post = mongoose.model('Post' , postSchema) ;
export default Post ;