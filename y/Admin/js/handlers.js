
$(".menu-toggle").on("click", function () {
    $("header ul").toggleClass("showing");
});
db.collection("Topics")
    .onSnapshot(function (querySnapshot) {
        var topic_data = "";
        querySnapshot.forEach(function (doc) {
            topic_data+="<option value='"+doc.id+"'>"+doc.id+"</option>";
        });
        $(".topic").append(topic_data);
    });


var IsFirst = true;
var SaveId = "NULL";

$(".save-btn").on("click", function () {
    var title = $(".title input").val();
    var topic = $("select.topic").children("option:selected").val();

    if (title == "") {
        $(".title-err").show();
        return;
    } else {
        $(".title-err").hide();
        document.getElementById("loader").style.display = "block";
    }
    if (IsFirst) {
        //save to firestore
        db.collection("saved").add({
            Title: title,
            Topics: topic,
            delta: quill.root.innerHTML
        })
            .then(function (Ref) {
                console.log("Saved ID: ", Ref.id);
                document.getElementById("loader").style.display = "none";
                SaveId = Ref.id;
                IsFirst = false;
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                alert("Error :"+error);
                document.getElementById("loader").style.display = "block";
            });
    } else {
        // update to firestore
        db.collection("saved").doc(SaveId).set({
            Title: title,
            Topics: topic,
            delta: quill.root.innerHTML
        })
            .then(function () {
                console.log("Updated Saved");
                document.getElementById("loader").style.display = "none";
            });
    }

});
$(".done-btn").on("click", function () {
    var topic = $("select.topic").children("option:selected").val();
    if (isvalid()) {
        console.log("publishing : ");
        console.log("Title : " + $(".title input").val());
        console.log("Topics : " + topic);
        console.log("Tags : " + tags);
        console.log("delta : " + quill.root.innerHTML);
        post_data();
    }
});

function post_data() {
    document.getElementById("loader").style.display = "block";

    var thumbname = new Date().getTime().toString();
    var topic = $("select.topic").children("option:selected").val();
    var image_url = "";

    var storageRef = storage.ref();
    var imagesRef = storageRef.child('images/' + thumbname + ".jpg");
    var uploadTask = imagesRef.put($("#thumb").prop("files")[0]);
    uploadTask.on('state_changed', function (snapshot) { }, function (error) { },
        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                image_url = downloadURL;
                db.collection("Posts").add({
                    Title: $(".title input").val(),
                    Topics: topic,
                    Image: image_url,
                    Tags: tags,
                    delta: quill.root.innerHTML,
                    Timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        db.collection("saved").doc(SaveId).delete().then(function () {
                            console.log("Saved Cleared");
                        }).catch(function (error) {
                            console.error("Error removing Saved document: ", error);
                        });

                        db.collection("light").add({
                            Title: $(".title input").val(),
                            Topics: topic,
                            Image: image_url,
                            Tags: tags,
                            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            post: docRef.id
                        })
                            .then(function (Ref) {
                                console.log("light ID: ", Ref.id);
                                document.getElementById("loader").style.display = "none";
                                alert("Published Successfully");
                                $(".title input").val("");
                                $("#thumb").val("");
                                $("#thumbnail").fadeOut();
                                tags=['','','','',''];
                                document.getElementById("tag-area").innerHTML="";
                                quill.root.innerHTML="<p><br></p>";
                            })
                            .catch(function (error) {
                                console.error("Error adding document: ", error);
                                alert("Error :"+error);
                                document.getElementById("loader").style.display = "none";
                            });
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                        alert("Error :"+error);
                        document.getElementById("loader").style.display = "none";
                    });
            });
        });
}