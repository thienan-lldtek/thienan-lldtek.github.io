$(function() {
    $("#header").load('components/header.html');
    $("#footer").load('components/footer.html');
    if( $("[data='gallery']").length > 0 && $("[data='gallery']").length != undefined){
        let gallery_layout = "/components/layouts/gallery.html"
        $.get(gallery_layout, function (data){
            var gallery_image;
            var num_image = $("[data='gallery']").attr('num');
            for(var i = 1; i <= 21; i++){
                if( i < 10){gallery_image = data.replace("{number_image}","0" + i)}else{gallery_image = data.replace("{number_image}",i)}
                $("[data='gallery']").append(gallery_image)
            }
        });
    }
    $.getJSON('config.json', function(cfg) {
        var key;
        $.each(cfg, function (index, val) { 
            if( typeof cfg[index] === 'object' && cfg[index] !== null && index === "data"){
                key = Object.keys(val);
                for(let i = 0; i < key.length; i++){
                    $("*").contents().each(function() {
                        if(this.nodeType == 3)
                            this.nodeValue = this.nodeValue
                            .replace("{"+key[i]+"}", val[key[i]])
                    });
                }
            }
        });
        origin = window.location.href.replace(cfg.domain,'');
        var parts = origin.replace('/','').split('.');
        var dir_image = parts.shift() || parts.shift();
        var abc;
        if(dir_image !== undefined && dir_image !== ''){var parts = dir_image.split('#');var dir_image = parts.shift();}
        if(dir_image == '' || dir_image == 'index' || dir_image == undefined){dir_image = "home";}
        $( "[pic_src]" ).each(function( index ) {
            let name_pic = cfg.data.slug+'-'+$(this).attr('pic_src');
            let path_image;
            let path_cfg = $(this).attr('path');
            if (typeof path_cfg !== 'undefined' && path_cfg !== false) {    path_image = cfg.path_image + '/' + path_cfg + '/' + name_pic+'.jpg';
            }else{ path_image = cfg.path_image + '/' + dir_image + '/' + name_pic+'.jpg';}
            if(cfg.debug == 'on'){console.log(path_image)}
            if($(this).is('[pic_bg]')){$(this).css("background-image", "url('"+path_image+"')");
            }else{$(this).attr({'src':path_image,'alt':name_pic});}
        });
        let menu_active = dir_image;
        if( menu_active == '' || menu_active == 'home'){$("#main_menu a[href='index.html']").addClass('active');}else{$("#main_menu a[href='" + menu_active + ".html']").addClass('active');}
        $("[data-booking]").attr('href',cfg.url.booking)
        $("[data-facebook]").attr('href',cfg.url.facebook)
        $("[data-instagram]").attr('href',cfg.url.instagram)
        $("[data-google]").attr('href',cfg.url.google)
        $("[data-phone]").attr('href',"tel:+1"+cfg.data.phone.trim())
        $("[data-maps]").attr('src',cfg.url.maps)
        $(":root").css({
            '--primary'         :cfg.color.primary,
            '--primary-light'   :cfg.color.primary_light,
            '--primary-hover'   :cfg.color.primary_hover,
            '--secondary'       :cfg.color.secondary,
            '--secondary-hover' :cfg.color.secondary_hover,
            '--text-primary' :cfg.color.text_primary,
            '--text-primary-hover' :cfg.color.text_primary_hover,
            '--text-secondary' :cfg.color.text_secondary,
            '--text-secondary-hover' :cfg.color.text_secondary_hover,
            '--text-title' :cfg.color.text_title,
            '--text-title-hover' :cfg.color.text_title_hover,
        });
     })
     .fail(function() {$('body').empty().append("Error 403: Can't Load Data Website");}) 
});