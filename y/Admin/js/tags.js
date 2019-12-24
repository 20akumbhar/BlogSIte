var count = 0;
var tags=['','','','',''];
$('#chip-text').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        if($("#chip-text").val()==""){return;}
        count++;
        var tag = "<div class='chip'>" + $("#chip-text").val();
        tag += "<span class='closebtn' onclick=deletechip('"+$("#chip-text").val()+"',this)>&times;</span></div>";
        $("#tag-area").append(tag);
        for(var i=0; i<5 ; i++){
            if(tags[i]==''){
                tags[i]=$("#chip-text").val();
                break;
            }
        }
        console.log(tags);
        $("#chip-text").val("");
        if (count >= 5) {
            $("#chip-text").prop("disabled", true);
        }
    }

});

function deletechip(text,view){
    count--;
view.parentElement.style.display='none';
for(var i=0;i<5;i++){
if(tags[i]==text){
    tags[i]='';
    console.log(tags);
}
}
$("#chip-text").prop("disabled", false);
}