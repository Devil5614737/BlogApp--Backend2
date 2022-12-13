const Slugify=(str)=>{
    const slug=str.split(" ").join("-").toLowerCase();
    return slug;
}

module.exports=Slugify