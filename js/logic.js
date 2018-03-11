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
    //time caculation
    var currentTime = new Date(),
        currentHours = currentTime.getHours(),
        currentMinutes = currentTime.getMinutes(),
        currentTimeInMin = currentHours * 60 + currentMinutes;
        console.log("current time in minutes: " + currentTimeInMin);

    //gain focus on first input onload
    $("#trainName").focus();
    var dbIndex;


        // on submit button click
    $("#submit").on("click", function (e) {
        e.preventDefault(); //prevent page refresh

        //get the initial time from input and split it to hours and minutes
        // in array and calculate total time in minutes before pass it to
        //database
        var initTime = $("#trainTime").val().trim(),
            initTimeArr = initTime.split(":"), //split to hours and minutes
            initHours = parseInt(initTimeArr[0],) 
            initMinutes = parseInt(initTimeArr[1]),
            initTimeInMinutes = initHours * 60 + initMinutes;
            //console.log("init time in minutes: " + initTimeInMinutes);

        //create new object
        var train = {
            tName: $("#trainName").val().trim(),
            tDestination: $("#trainDestination").val().trim(),
            tTime: initTimeInMinutes, //initial time in minutes
            tFrequency: $("#trainFrequency").val().trim()
        };

        db.ref("train/" + dbIndex).set(train)
        $("input").val("");
        $("#trainName").focus();
    })

    db.ref("train").on("value", function(res){
        console.log(res.val());
        if (res.val() === null){ //if database is empty reset index
            dbIndex = 0
        } else {
            $("tbody").empty(); //empty out the table
            dbIndex = res.val().length; //response length
            
            var tableRow = $("<tr>"); // create new table row
            for (var i = 0; i < res.val().length; i++){
                var myDataObject = res.val()[i]; //getting objects out of array

                //console.log(myDataObject.tTime);
                
                var trainTimeInMinutes = parseInt(myDataObject.tTime);

                if (currentTimeInMin-trainTimeInMinutes < 0){ //if initial time is higher than current time
                    var remainingMin = (currentTimeInMin-trainTimeInMinutes)*(-1),
                        //this will create td element with remaining time
                        tableRemaining = $("<td class = 'text-center'>").text(remainingMin),

                        x = trainFromMinuteToHours(trainTimeInMinutes),
                        tableNextTime = $("<td class = 'text-center'>").text(x);
                       

                } else { //if initial time has expired
                    var frequencyNumber = parseInt(myDataObject.tFrequency);
                    //console.log(frequencyNumber);

                    //increment represent number of times that frequency should be increased to get the next available train
                    var increment = Math.floor((currentTimeInMin-trainTimeInMinutes)/frequencyNumber)+1;
                    //newTrainTime will exceed the current time to get the next train
                    var newTrainTimeInMin = trainTimeInMinutes+(frequencyNumber*increment)

                    var remainingMin = (currentTimeInMin-newTrainTimeInMin)*(-1)%frequencyNumber,
                        tableRemaining = $("<td class = 'text-center'>").text(remainingMin),

                        
                        x = trainFromMinuteToHours(newTrainTimeInMin),
                        tableNextTime = $("<td class = 'text-center'>").text(x);
                    
                }

                var tableRow = $("<tr>"); // create new table row
                var tableName = $("<th>").text(myDataObject.tName),
                    tableDestination = $("<td>").text(myDataObject.tDestination),
                    tableFrequency = $("<td class = 'text-center'>").text(myDataObject.tFrequency);
                tableRow.append(tableName, tableDestination, tableFrequency,tableNextTime,tableRemaining);
                $("tbody").append(tableRow);



                //console.log(myDataObject);

            }
        }
    })

    function trainFromMinuteToHours(tInMin){ //converts time from minutes to hours
        var arrivalHours = Math.floor(tInMin/60),
            arrivalMinutes = tInMin%60,
            day; // store AM or PM
            if (arrivalHours<12){
                day = "AM";
            } else if (arrivalHours === 12){
                day = "PM";
            } else {
                arrivalHours -=12;
                day = "PM"
            };
            if (arrivalMinutes <10){
                arrivalMinutes = "0" + arrivalMinutes;
            }
            var finalTime = arrivalHours + ":" + arrivalMinutes + " " + day;
            
            return finalTime

    };
    
})