var data = [ // x35
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },
    { image: "img/img1.png", group: 1 },


];

var marcas = [
    { name: 'SUZUKI', value: 'SUZUKI' },
    { name: 'DONGFENG', value: 'DONGFENG' },
    { name: 'BRILLIANCE', value: 'BRILLIANCE' },
    { name: 'BAIC', value: 'BAIC' },
    { name: 'CHEVROLET', value: 'CHEVROLET' },
    { name: 'NISSAN', value: 'NISSAN' },
    { name: 'VOLVO', value: 'VOLVO' },
    { name: 'TOYOTA', value: 'TOYOTA' },
    { name: 'LEXUS', value: 'LEXUS' },
    { name: 'MAZDA', value: 'MAZDA' },
    { name: 'KIA', value: 'KIA' },
    { name: 'FORD', value: 'FORD' },
    { name: 'HYUNDAI', value: 'HYUNDAI' },
    { name: 'HONDA', value: 'HONDA' },
    { name: 'FIAT', value: 'FIAT' },
    { name: 'VOLKSWAGEN', value: 'VOLKSWAGEN' },
    { name: 'MITSUBISHI', value: 'MITSUBISHI' },
    { name: 'ISUZU', value: 'ISUZU' },
];


var filtro_marca = '';
var filtro_tipo = '';
var default_filtro_marca = 'Todas las marcas';
var default_filtro_tipo = 'Todos';




// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 10, //required min distance traveled to be considered swipe
        restraint = 499, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 800, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        // e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        // e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        // e.preventDefault()
    }, false)
}

//USAGE:

var el = document.getElementById('caoursel-body');
swipedetect(el, function (swipedir) {
    // swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir == 'left') {
        $(".carousel-control-next").click()
    }
    if (swipedir == 'right') {
        $(".carousel-control-prev").click()
    }
    // if (swipedir == 'up') {

    //     $('body,html').animate({
    //         scrollTop: $('html').offset().top + 400
    //     }, 400);
    //     console.log('top')
    // }
    // if (swipedir == 'down') {
    //     $('body,html').animate({
    //         scrollTop: 0
    //     }, 200);
    //     console.log('down')
    // }
    // el.innerHTML = 'Swiped <span style="color:yellow">' + swipedir + '</span>';
});




$(function () {
    bindEvents()
    $('.precalificate_btn').click(function () {
        scrollToForm()
    })

    setTimeout(function () {
        if ('q' in getQueryParams(document.location.search)) {
            var k = getQueryParams(document.location.search);
            if (k.q.trim() != '') {
                var jj = k.q.trim() == 'comercial' ? 'Comercial' : 'Personal';
                filterTipo(jj)
            }
        }
    }, 400)

    $("#formk").submit(function (event) {
        // $.ajax({
        //     type: 'POST',
        //     url: base_url + 'webservice/bono_signup',
        //     data: {
        //         nombre: $('#nombre_f').val(),
        //         correo_f: $('#correo_f').val(),
        //         telefono_f: $('#telefono_f').val(),
        //         cedula_f: $('#cedula_f').val(),
        //         detalle_vehiculo: $('#detalle_vehiculo').val(),
        //     },
        //     dataType: 'json'
        // }).done(function (response) {
        //     console.log(response)
        //     $("#formk").hide();
        //     $("#form_d").fadeIn();
        //     $('#formk').trigger("reset");
        // });
        sendEmail()
        event.preventDefault();
    });

    $("#cont_bu").click(function () {
        window.location.href = base_url
    })
})

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
function bindEvents() {

    $.each(marcas, function (k, v) {
        $("#marcas").append(`<option value='` + v.name + `'>` + v.name + `</option>`)
    })

    $(".control-single").click(function () {
        $("#header1").hide();
        // $("#header1").animate({
        //     opacity: 'hide',      // animate slideUp
        //     margin: 'hide',
        //     padding: 'hide',
        //     height: 'hide'        // animate fadeOut
        // }, 200, 'linear', function () {
        //     // $(this).remove();
        // });
        $("#header2").fadeIn(100);
    })




    $("#closeblue").click(function () {
        $("#header2").hide()
        // $("#header2").animate({
        //     opacity: 'hide',      // animate slideUp
        //     margin: 'hide',
        //     padding: 'hide',
        //     height: 'hide'        // animate fadeOut
        // }, 200, 'linear', function () {
        // $(this).remove();
        // });
        $("#header1").fadeIn(100);
        $("#detalle_vehiculo").val('')
    })
    $("#precalwith").click(function () {
        $("#detalle_vehiculo").val($("#kk-marca").text());
        scrollToForm()
    })



    $(".control-all").click(function () {
        $.each($('.normalcar'), function (k, v) {
            if ($(v).hasClass('normalcar')) {
                $(v).removeClass('normalcar')
                $(v).addClass('hidecar')
                $(v).find('.image_check').hide()
            }
        })

        $.each($('.showcar'), function (k, v) {
            $(v).removeClass('showcar')
            $(v).addClass('hidecar')

        })
        $.each($('.image_check'), function (k, v) {
            $(v).attr("style", "display: none !important");

        })
        $('img', this).attr("style", "display: block !important");
        $(this).addClass('showcar')
        // ga('send', 'CAR_SELECTED:' + $(this).find('.text-tofill').val());
        // console.log('show boy', $(this).find('.text-tofill').val())




        // $('#correo_f')
        // $('#telefono_f')
        // $('#cedula_f')
        // $('#detalle_vehiculo')
        scrollToForm()


    })

    $(".image_check").click(function (e) {
        e.stopPropagation();
        console.log('clear boy')
        e.preventDefault()
        $.each($('.showcar'), function (k, v) {
            $(v).removeClass('showcar')
            $(v).addClass('normalcar')

        })
        $.each($('.hidecar'), function (k, v) {
            $(v).removeClass('hidecar')
            $(v).addClass('normalcar')
        })
        remove()
    });
}
function remove() {
    $.each($('.image_check'), function (k, v) {
        $(this).attr("style", "display: none !important");
        $(this).hide()
        console.log($(this).attr("style"))

        // $(v).addClass('normalcar')
    })
    $("#detalle_vehiculo").val('');
}

function filterTipo(val) {
    filtro_tipo = val;
    // ga('send', 'FILTER_BRAND_SELECTION:' + val);
    var iscomercial = val == 'Comercial' ? true : false;
    resetValues(data)
    var newData = data.filter(function (v) {
        if (filtro_tipo == default_filtro_tipo) {
            if (filtro_marca != '' && filtro_marca != default_filtro_marca) {
                return v.marca == filtro_marca
            }

            return true
        }
        if (filtro_marca != '' && filtro_marca != default_filtro_marca) {
            return v.is_comercial == iscomercial && v.marca == filtro_marca
        }

        return v.is_comercial == iscomercial;
    })
    resetValues(newData)

}
function filterTipo(val) {
    filtro_tipo = val;
    // ga('send', 'FILTER_BRAND_SELECTION:' + val);
    var iscomercial = val == 'Comercial' ? true : false;
    resetValues(data)
    var newData = data.filter(function (v) {
        if (filtro_tipo == default_filtro_tipo) {
            if (filtro_marca != '' && filtro_marca != default_filtro_marca) {
                return v.marca == filtro_marca
            }
            return true
        }
        if (filtro_marca != '' && filtro_marca != default_filtro_marca) {
            return v.is_comercial == iscomercial && v.marca == filtro_marca
        }

        return v.is_comercial == iscomercial;
    })
    resetValues(newData)
}
function filterMarca(val) {
    filtro_marca = val;
    console.log(val)
    ga('send', 'FILTER_BRAND_SELECTION:' + val);
    resetValues(data)
    var newData = data.filter(function (v) {
        if (filtro_marca == default_filtro_marca) {
            return true
        }
        if (filtro_tipo != '' && filtro_tipo != default_filtro_tipo) {
            var iscomercial = filtro_tipo == 'Comercial' ? true : false;
            return v.marca == val && v.is_comercial == iscomercial
        }

        return v.marca == val
    })
    resetValues(newData)

}


function filterSlides(val) {
    // console.log(val)
    if (val == 1) {
        $("#kk-marca").text('JEEPETA BRILLIANCE V3')
        $("#kk-cuotas").text('CUOTAS RD$13,200')
        $("#kk-inicial").text('INICIAL RD$95,000')
    }
    if (val == 2) {
        $("#kk-marca").text('JEEPETA BRILLIANCE V3')
        $("#kk-cuotas").text('CUOTAS RD$13,200')
        $("#kk-inicial").text('INICIAL RD$95,000')
    }
    if (val == 3) {
        $("#kk-marca").text('JEEPETA DONGFENG AX7')
        $("#kk-cuotas").text('CUOTAS RD$16,513')
        // $("#kk-inicial").text('INICIAL RD$115,000')
    }
    if (val == 4) {
        $("#kk-marca").text('JEEPETA BRILLIANCE V3')
        $("#kk-cuotas").text('CUOTAS RD$14,735')
        // $("#kk-inicial").text('INICIAL RD$95,000')

    }



    resetValues(data)
    var newData = data.filter(function (v) {
        return v.group == val
    })

    resetValues(newData)
}




function scrollTop() {
    setTimeout(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300);
    }, 300)
}
function scrollDown() {
    setTimeout(function () {
        $('body,html').animate({
            scrollTop: 500
        }, 300);
    }, 300)
}
function scrollToForm() {
    var el = ($('.formk').offset().top - 55)
    if (is_mobile()) {
        el = ($('#formk').offset().top - 150)
    }
    setTimeout(function () {
        $('body,html').animate({
            scrollTop: el
        }, 300);
        $('#nombre_f').focus()
    }, 300)

}


function is_mobile() {
    // var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry'];
    // for (i in agents) {
    //     if (navigator.userAgent.match('/' + agents[i] + '/i')) {
    //         return true;
    //     }
    // }
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    if (isMobile.matches) {
        return true
    }
    return false;
}
function resetValues(data) {
    $("#caoursel-body").empty()
    $.each(data, function (k, v) {
        var i = 'active';
        if (k != 1) {
            i = ''
        }
        $("#caoursel-body").append(`
        <div class="carousel-item inactive col-md-12  `+ i + `">
            <div class="panel panel-default">
            <div class="panel-thumbnail">
                <a  href="#" title="image 1" class="thumb control---all normalcar">
                <div class="bh" style=" background-image: url(`+ v.image + `);"> </div>
               
          
                </a>
            </div>
            </div>
        </div>`)
        // <img class="img-fluid mx-auto d-block imgzoom" src="`+ v.image + `" alt="slide 1">

    })

    $('#carouselExample').carousel({
        interval: 0
    });
    bindEvents()
    scrollTop()
}

function sendEmail() {
    // sendEmailAction($('#correo_f').val(), "ventas@transauto.com.do");
    // sendEmailAction($('#correo_f').val(), "jrondon@transauto.com.do");
    // sendEmailAction($('#correo_f').val(), "yoennycruz@gmail.com");
    sendEmailAction($('#correo_f').val(), "josuegrullon@gmail.com");
    // sendEmailAction($('#correo_f').val(), "josuegrullon@gmail.com");

    $("#formk").fadeOut()
    $("#success_f").show()
}

function sendEmailAction(from, to) {

    var message = `Saludos, \n\n`
        + `Nombre: ` + $('#nombre_f').val() + ` \n`
        + `Correo: ` + $('#correo_f').val() + ` \n`
        + `Telefono: ` + $('#telefono_f').val() + ` \n`
        + `Cedula: ` + $('#cedula_f').val() + ` \n`
        + `Detalle: ` + $('#detalle_vehiculo').val() + ` \n`;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://transauto.com.do/autoferia/mailer.php",
        // "url": "http://transauto.com.do/mailer.php",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "from": from,
            "message": message
        }
    }

    $.ajax(settings).done(function (response) {
        ga('send', 'FORM_SENT');
    });
}