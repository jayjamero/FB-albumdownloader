var album_id = '10151781957529619', // Facebook album ID
    //album_name = 'Name of Album', // Sets title of Album - Unused
    image_tag = 'temp-image'; // This is appended to the image thats downloaded ie. name-of-img[1].jpg

$(function() {
  displayFBImages();

  $("#download-btn").click(function() {
    console.log('here1');
    $.ajax({
      url: 'http://graph.facebook.com/' + album_id + '/photos?fields=images&limit=300',
      dataType: 'jsonp',
      success: function(data) {
        var fb_images = data.data;
        if (fb_images.length > 0) {
          $.each(fb_images, function(i, o) {
            var img_obj = o.images[o.images.length - 3];
            saveToDisk(o.images[0].source,image_tag+'-['+i+']'); // Save image!
          });
        }
      }
    });
    console.log('here2');
  });
});


function saveToDisk(fileURL, fileName) {
    var save = document.createElement('a');
    save.href = fileURL;
    save.target = '_blank';
    save.download = fileName || 'unknown';

    var event = document.createEvent('Event');
    event.initEvent('click', true, true);
    save.dispatchEvent(event);
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
}

function displayFBImages(){
  $.ajax({
    url: 'http://graph.facebook.com/' + album_id + '/photos?fields=images&limit=300',
    dataType: 'jsonp',
    success: function(data) {
      var fb_images = data.data;
      if (fb_images.length > 0) { 
        $.each(fb_images, function(i, o) {
          var img_obj = o.images[o.images.length - 3];
   
          var img = $('<img>', {
            src: img_obj.source
          });
          
          var a = $('<a class"lightbox" href="'+o.images[0].source+'">', {
            href: o.images[0].source
          });
          
          //saveToDisk(o.images[0].source,albumName+'-['+i+']'); // Save image!

          var span = $('<span>').append(img);
          
          $(a).append(span);
          $('#photo-container').append(a);
        });
      }
    }
  }).done(function() {
      $("#photo-container").addClass("done");
      $("#photo-container a").fancybox({
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic',
        'speedIn'   : 600, 
        'speedOut'    : 200, 
        'overlayShow' : false,
      });
  });
}
