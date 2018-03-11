$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBbz8hVF_czUjOPCdILZ9PtivEm-dwtRTY",
        authDomain: "trainscheduler-bf7ad.firebaseapp.com",
        databaseURL: "https://trainscheduler-bf7ad.firebaseio.com",
        projectId: "trainscheduler-bf7ad",
        storageBucket: "",
        messagingSenderId: "35492814730"
    };
    firebase.initializeApp(config);


    var db = firebase.database();

    //gain focus on first input onload
    $("#trainName").focus();
    var dbIndex;

    //get input values
    var tName = $("#trainName").val().trim(),
        tDestination = $("#trainDestination").val().trim(),
        tTime = $("#trainTime").val().trim(),
        tFrequency = $("#trainFrequency").val().trim();

    $("#submit").on("click", function (e) {
        e.preventDefault();
        var train = {
            tName: $("#trainName").val().trim(),
            tDestination: $("#trainDestination").val().trim(),
            tTime: $("#trainTime").val().trim(),
            tFrequency: $("#trainFrequency").val().trim()
        };

        db.ref("train/" + dbIndex).set(train)
        $("input").val("");
        $("#trainName").focus();
    })

    db.ref("train").on("value", function(res){
        console.log(res.val());
        if (res.val() === null){
            dbIndex = 0
        } else {
            dbIndex = res.val().length; //response length
            console.log(dbIndex);
            
        }
    })
})