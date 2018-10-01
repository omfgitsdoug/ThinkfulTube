const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/search';

function searchParam(searchTerm, callback) {
    const query = {
        part: 'snippet',
        key: 'AIzaSyAHrofdI7wqp3cqiMNxRmpK50iDrtoCfgo',
        q: searchTerm,
    };
    $.getJSON(YOUTUBE_API, query, callback);
}

function displayResults(data) {
    const results = data.items.map((item, index) => {
        return `
        <div class="results">
        <h3 class="resultHeader">${item.snippet.title}</h3>
        <p class="resultHeader">More from <a href="http://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">${item.snippet.channelTitle}</a>
        </p>
        <a href="#" class="video" id="${item.id.videoId}"><img src="${item.snippet.thumbnails.high.url}"></a>
        </div>
        </div><br>
        `
    })
    $('.results-section').html(results)
}

function watchSubmit() {
    $('.search-form').on('submit', function(event) {
      event.preventDefault();
      const queryTarget = $(event.currentTarget).find('.user-input');
      const queryTerm = (queryTarget.val());
      
      searchParam(queryTerm, displayResults);
      
      queryTarget.val("");
    })
  }
  
  $(watchSubmit);
  
  function watchImageClick() {
    $('section').on('click', 'a.video', function() {
      let number = $(this).attr('id');
      let link = 'https://www.youtube.com/embed/' + number;
      if (!$('#light-box').length > 0) {
        $('.light-box-area').append(`
          <div id='light-box'>
            <span class='material-icons'>close</span>
            <iframe width="1425" height="641" src='' frameborder="0" gesture="media" allowfullscreen></iframe>
          </div>`);
        $('#light-box').show();
        $('#light-box iframe').attr('src', link);
      }
      else {
        $('#light-box').show();
        $('#light-box iframe').attr('src', link);
      }
    })
  }
  
  function watchCloseClick() {
    $('.light-box-area').on('click', '#light-box span', function() {
      $('#light-box').hide();
      $('#light-box iframe').attr('src', '');
    })
  }
  
$(watchImageClick);
$(watchCloseClick);