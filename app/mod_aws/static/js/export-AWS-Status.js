$("#downTableStatus").on("click", () => {
    var url = "/downAWSStatusTable";
    $("#downTableStatus").attr("href", url).attr('target', '_blank');
});