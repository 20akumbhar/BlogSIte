
$(".menu-toggle").on("click",function(){
    $("header ul").toggleClass("showing");
});

$(".save-btn").on("click",function(){
        
});
$(".done-btn").on("click",function(){
    var topic= $("select.topic").children("option:selected").val();
    if(isvalid()){
        console.log("publishing : ");
        console.log("Title : "+$(".title input").val());
        console.log("Topics : "+ topic);
        console.log("Tags : "+tags);
        console.log("delta : "+quill.root.innerHTML);
    }
});