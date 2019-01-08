$(function () {
    $(".icustom-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name");
        var template = '<div class="' + classes + '">';
        template += '<span class="icustom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function () {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="icustom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".icustom-select-trigger").on("click", function () {
        $('html').one('click', function () {
            $(".icustom-select").removeClass("opened");
        });
        scrollDown()
        $(this).parents(".icustom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function () {
        $(this).parents(".icustom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".icustom-select").removeClass("opened");
        $(this).parents(".icustom-select").find(".icustom-select-trigger").text($(this).text());
        if ($(this).text() == 'Comercial' || $(this).text() == 'Personal' || $(this).text() == 'Todos') {
            console.log('tipo filter', $(this).text())
            ga('send', 'FILTER:BY_TYPE');
            filterTipo($(this).text())
        } else {
            filterMarca($(this).text())
            ga('send', 'FILTER:BY_BRAND');
            console.log('marca filter', $(this).text())
        }

    });



})