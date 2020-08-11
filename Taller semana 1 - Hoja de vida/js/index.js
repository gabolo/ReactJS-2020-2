$(document).ready(() => {
    $("#edad").html((new Date()).getFullYear() - 1999 + " years")
    $(".vertical-list li").click(({ currentTarget }) => {
        $(".vertical-list li").removeClass("active");
        $(currentTarget).addClass("active");
        const id = $(currentTarget).data("id");
        if (!$("#" + id).hasClass("active")) {
            hideTabs()
            setTimeout(() => { showTab(id) }, 550);
        }
    });
    $(".main-container").removeClass("outside");
    $("#leftMenu").removeClass("w-0");
    $("#leftMenu").addClass("w-20");
    showTab("info");
    $(".bar").removeClass("por0");

});
const showTab = (id) => {
    if ($(".panel.active").length > 0) hideTabs();
    $("#" + id).addClass("active");
};
const hideTabs = () => { $(".panel.active").removeClass("active"); };