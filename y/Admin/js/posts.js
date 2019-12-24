$(".menu-toggle").on("click", function () {
    $("header ul").toggleClass("showing");
});

db.collection("light").orderBy("Timestamp", "desc")
    .onSnapshot(function (querySnapshot) {
        var avail_data = "";
        querySnapshot.forEach(function (doc) {
            avail_data += "<div class='post'><img src='" + doc.data().Image + "' alt='post img' class='post-img'>";
            avail_data += "<h2 class='title'>" + doc.data().Title + "</h2>";
            avail_data += "<button class='delete-btn' onclick=delete_post('" + doc.id + "','" + doc.data().post + "')>Delete</button></div>";
        });
        document.getElementById("post-area").innerHTML = avail_data;
    });


function delete_post(id, post) {
    db.collection("light").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
    db.collection("Posts").doc(post).delete().then(function () {
        console.log("Main Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
    db.collection("Trending").where("post", "==", post)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ");
                db.collection("Trending").doc(doc.id).delete().then(function () {
                    console.log("trending Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

}