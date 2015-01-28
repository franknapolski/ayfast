jQuery(function($){
	$(document).ready(function(){

        $(window).scroll(function() {
            if ($(".navbar").offset().top > 50) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
            }
        });

        var //templateSource = document.getElementById('results-template').innerHTML,
            // template = Handlebars.compile(templateSource),
            // resultsPlaceholder = document.getElementById('results'),
            playingCssClass = 'playing',
            audioObject = null;

        // Handlebars.registerHelper("calcDur", function(dur) {
        //     dur = dur / 1000;
        //     var mn = Math.floor( dur / 60);
        //     var sc = Math.round( (dur - mn*60) );
        //     if (sc < 10) {
        //         var calcDur = mn + ":0" + sc;
        //     }
        //     else {
        //         var calcDur = mn + ":" + sc;
        //     }
        //     return calcDur;
        // });

        // Handlebars.registerHelper('dateFormat', function(context, block) {
        //   if (window.moment) {
        //     var f = block.hash.format || "MMM Do, YYYY";
        //     return moment(context).format(f);
        //   }else{
        //     return context;   //  moment plugin not available. return data as is.
        //   };
        // });

        var fetchTrackSample = function (trackId, callback) {
            $.ajax({
                url: 'https://api.spotify.com/v1/tracks/' + trackId,
                success: function (response) {
                    callback(response.preview_url);
                }
            });
        };

        // var getTrackList = function (albumId) {
        //     $.ajax({
        //         url: 'https://api.spotify.com/v1/albums/' + albumId,
        //         success: function (response) {
        //             // console.dir(response);
        //             $("div."+albumId).html(template(response));
        //             // resultsPlaceholder.innerHTML = template(response);

        //         }
        //     });
        // };

        // var getAlbums = function (query) {
        //     $.ajax({
        //         url: 'https://api.spotify.com/v1/artists/'+query+'/albums',
        //         data: {
        //             album_type: 'album,single'
        //         },
        //         success: function (response) {

        //             $.each(response.items, function(){
        //                 $("#results").append("<div class='row album "+this.id+"'></div>");
        //                 console.log(this);
        //                 getTrackList(this.id);
        //             });
        //         }
        //     });
        // };

        results.addEventListener('click', function(e) {
            var target = e.target;

            if (target !== null && ( target.classList.contains('track') || target.parentNode.classList.contains('track') ) ){
                if (target.classList.contains(playingCssClass) || target.parentNode.classList.contains(playingCssClass)) {
                    audioObject.pause();
                }
                else {
                    if (audioObject) {
                        audioObject.pause();
                    }
                    if (target.parentNode.classList.contains('track')) {
                        target = target.parentNode;
                    }
                    fetchTrackSample(target.getAttribute('id'), function(data) {
                       audioObject = new Audio(data);
                       audioObject.play();
                       target.classList.add(playingCssClass);
                       target.firstElementChild.classList.add('fa-volume-up');
                       audioObject.addEventListener('ended', function() {
                            target.classList.remove(playingCssClass);
                            target.firstElementChild.classList.remove('fa-volume-up');
                        });
                        audioObject.addEventListener('pause', function() {
                            target.classList.remove(playingCssClass);
                            target.firstElementChild.classList.remove('fa-volume-up');
                       });
                    });
                }
            }
        });
        // getAlbums('3FWRpB2S3mTCnKBhlTF9hW');
	});
});
