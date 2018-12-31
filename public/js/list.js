var socket = io({ transports: ["websocket"], upgrade: false });

function setContent() {
    $(".contents").height(14 * $("table tr").height());
}
setContent()


$("#sendOrder").click(function () {
    var o = $("#order").val();
    if (o === "" || o < 0) {
        o = 0;
    }
    var obj = {
        userName: $("#userName").html(),
        teamName: $("#resTeam").text(),
        position: $("#resPos").text(),
        order: o
    };
    socket.emit("sendOrder", obj);
    $("#order").val("");
    $("#order").prop("disabled", true);
    $("#sendOrder").prop("disabled", true);
});



$("#joinTeam").click(function () {
    socket.emit(
        "joinTeam",
        {
            userName: $("#userName").html(),
            teamName: $("#allTeams2").val(),
            position: $("#position2").val()
        },
        function (obj) {
            $("#resTeam").text(obj.teamName);
            $("#resPos").text(obj.position);
        }
    );
});

socket.on("updateTeams", allTeams => {
    // var str = "";
    // var str2 = "";
    // for (var i in allTeams.allTeams) {
    //     str += "<tr>";
    //     str += "<td>" + allTeams.allTeams[i].teamName + "</td>";
    //     str2 += "<option>" + allTeams.allTeams[i].teamName + "</option>";
    //     for (var j in allTeams.allTeams[i].users) {
    //         str += "<td>" + allTeams.allTeams[i].users[j].userName + "</td>";
    //         str += "<td>" + allTeams.allTeams[i].users[j].position + "</td>";
    //     }
    //     str += "</tr>";
    // }
    // $("#allTeams").html(str);
    // $("#allTeams2").html(str2);
    // var str = "<tr><th>Teams</th><th>Factory</th><th>Distribution</th><th>Wholesaler</th><th>Retailer</th></tr>";

    // allTeams 存所有的隊伍，用 for 調出所有隊伍的資料
    for (var i in allTeams.allTeams) {
        $("#teamList").append("<th>" + allTeams.allTeams[i].teamName + "</th>");
        // for (let j = 0; j < 4; j++)
        //     $("#teamList").rows[1].append(j);

    }
    $("#teamList").rows[0].cells[0].val("123");

});

socket.on("continue", function (obj) {
    console.log(obj);
    obj.allTeams.allTeams.forEach(team => {
        if (team.teamName === $("#resTeam").text()) {
            team.users.forEach(user => {
                if (user.userName === $("#userName").html()) {
                    $("#store").text(user.store);
                }
            });
        }
    });
    $("#turn").text(obj.turn);
    $("#order").prop("disabled", false);
    $("#sendOrder").prop("disabled", false);
});

socket.on("end", () => {
    alert("end");
});

// socket.on("start_game", () => {
//     $("#order").prop("disabled", false);
//     $("#sendOrder").prop("disabled", false);
// });
