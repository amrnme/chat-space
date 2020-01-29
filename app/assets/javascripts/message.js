$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
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
          <img src=${message.image} >
        </div>
       </div>`
     return html;
   } else {
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
     return html;
   };
 }
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
});