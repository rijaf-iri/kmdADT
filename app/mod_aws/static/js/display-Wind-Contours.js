$(document).ready(() => {
    setAWSWindDataTime(180);
    setAWSWindDataCoords('10');

    ////////
    var today = new Date();
    var daty2 = dateFormat(today, "yyyy-mm-dd-hh");
    today.setDate(today.getDate() - 180);
    var daty1 = dateFormat(today, "yyyy-mm-dd-hh");

    var data0 = {
        net_aws: "3_SUTRON14-NAIROBI",
        height: "10",
        tstep: "hourly",
        start: daty1,
        end: daty2,
        centre: 'S'
    };

    var url0 = '/graphWindContours' + '?' + encodeQueryData(data0);
    $("#windcontours").attr("src", url0);

    //
    $("#plotWindDataBut").on("click", () => {
        $("#plotWindDataBut .glyphicon-refresh").show();
        //
        var obj = checkDateTimeRange();
        if (!obj) {
            return false;
        }
        //
        var timestep = $("#timestepDispTS option:selected").val();
        var vrange = startEndDateTime(timestep, obj);
        var data = {
            net_aws: $("#stationDispAWS option:selected").val(),
            height: $("#windHeight option:selected").val(),
            tstep: timestep,
            start: vrange.start,
            end: vrange.end,
            centre: $("#mapcentre option:selected").val()
        };
        var url = '/graphWindContours' + '?' + encodeQueryData(data);
        $("#windcontours")
            .on('load', () => {
                $("#plotWindDataBut .glyphicon-refresh").hide();
            })
            .on('error', () => {
                $('#errorMSG').css("background-color", "red")
                    .html("Unable to load image");
                $("#plotWindDataBut .glyphicon-refresh").hide();
            }).attr("src", url);
    });
});