$(".menu-toggle").on("click", function () {
    $("header ul").toggleClass("showing");
});

db.collection("Topics")
    .onSnapshot(function (querySnapshot) {
        var topic_data = "";
        querySnapshot.forEach(function (doc) {
            topic_data+="<tr><td><h4>"+doc.id+"</h4></td></tr>";
        });
        document.getElementById("topics-area").innerHTML = topic_data;
    });

function isvalid() {
    var topic = $("#topic").val();
    if (topic == "") {
        alert("Provide topic name");
        return false;
    }

    return true;
}

$(".topic-btn").on("click", function () {
    if (isvalid()) {
        var topic = $("#topic").val();
        $("#topic").val("");
        db.collection("Topics").doc(topic).set({
            Title: topic
        })
            .then(function () {
                console.log("Topic Saved");
            });
    }
});