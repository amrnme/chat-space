$(function(){ 

  function buildHTML(message) {
    if (message.content && message.image) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__upper-info">
            <p class="upper-message__user-name">
              ${message.user_name}
            </p>
            <p class="upper-message__date">
              ${message.created_at}
            </p>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img class="lower-message__image" src=${message.image}>
          </div>
        </div>
      </div>`
    } else if (message.content) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__upper-info">
            <p class="upper-message__user-name">
              ${message.user_name}
            </p>
            <p class="upper-message__date">
              ${message.created_at}
            </p>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
    } else if (message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__upper-info">
              <p class="upper-message__user-name">
                ${message.user_name}
              </p>
              <p class="upper-message__date">
                ${message.created_at}
              </p>
            </div>
            <div class="lower-message">
              <img src=${message.image} class="lower-message__image">
            </div>
          </div>
        </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
    })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});