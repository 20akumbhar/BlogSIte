$(".menu-toggle").on("click", function () {
    $("header ul").toggleClass("showing");
});

db.collection("Trending")
    .onSnapshot(function (querySnapshot) {
        var avail_data = "";
        querySnapshot.forEach(function (doc) {
            avail_data += "<tr><td><div class='post'><img src='" + doc.data().Image + "' alt='post img' class='post-img' width='100' height='100'>";
            avail_data += "<div class='post-preview'><h4>" + doc.data().Title + "</h4>";
            avail_data += "<i class='far fa-folder'>&nbsp;" + doc.data().Topics + "</i> &nbsp;&nbsp;</i>";
            var ts = doc.data().Timestamp.toDate();
            avail_data += "<i class='far fa-calendar'>&nbsp;" + ts.getDate() + "/" + ts.getMonth() + "/" + ts.getFullYear() + "</i><br>";
            avail_data += "<button type='submit' class='btn' onclick=remove_trend('" + doc.id + "')>Remove</button></div></div></td></tr>";
        });
        document.getElementById("trending-posts-area").innerHTML = avail_data;
    });

db.collection("light").orderBy("Timestamp", "desc")
    .onSnapshot(function (querySnapshot) {
        var avail_data = "";
        querySnapshot.forEach(function (doc) {
            avail_data += "<tr><td><div class='post'><img src='" + doc.data().Image + "' alt='post img' class='post-img' width='100' height='100'>";
            avail_data += "<div class='post-preview'><h4>" + doc.data().Title + "</h4>";
            avail_data += "<i class='far fa-folder'>&nbsp;" + doc.data().Topics + "</i> &nbsp;&nbsp;</i>";
            var ts = doc.data().Timestamp.toDate();
            avail_data += "<i class='far fa-calendar'>&nbsp;" + ts.getDate() + "/" + ts.getMonth() + "/" + ts.getFullYear() + "</i><br>";
            avail_data += "<button type='submit' class='btn' onclick=save_trend('" + doc.id + "')>Add</button></div></div></td></tr>";
        });
        document.getElementById("avail-posts-data").innerHTML = avail_data;
    });


function save_trend(id) {
    var postRef;
    var docRef = db.collection("light").doc(id);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            postRef = doc.data();
            db.collection("Trending").add(postRef)
                .then(function (Ref) {
                    console.log("Saved ID: ", Ref.id);
                })
                .catch(function (error) {
                    alert("Error :" + error);
                });
        } else {
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

}

function remove_trend(id){
    db.collection("Trending").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}