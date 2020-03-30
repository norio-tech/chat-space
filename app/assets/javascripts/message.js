$(function(){
  function buildHTML(message){
    var html = `
      <div class="message" data-message-id= ${ message.id } > 
        <div class="message__header"> 
          <div class="message__header--name"> 
            ${message.user_name}
          </div> 
          <div class="message__header--date"> 
            ${message.created_at }
          </div> 
        </div> `
    var htmlEnd = "</div>"
    if (message.content && message.image) {
      html += `
        <div class="message__main"> 
          ${message.content}
        </div> 
        <img src="${message.image}" class="message__main__image" > 
      `
    } else if (message.content) {
      html += `
        <div class="message__main"> 
          ${message.content }
        </div> 
      `
    } else if (message.image) {
      html += `
        <div class="message__main"> 
          <img src="${message.image}" class="message__main__image" > 
        </div> 
      `
    };
    return html + htmlEnd;
  }
  $("#input-form").on("submit",function(e){
    e.preventDefault()
    var input_message = $("#message_content").val();
    var input_image = $("#message_image").val();
    if (input_message != "" || input_image != "" ){
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,  
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message) {
        var html = buildHTML(message);
        $(".message_list").append(html);
        $("#input-form")[0].reset();
        $('.message_list').animate({ scrollTop: $('.message_list')[0].scrollHeight});
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
      .always(function(){
        $(".send_btn").prop("disabled",false);
      });
    } else {
      alert("メッセージを入力してください");
      return false;
    }
  })
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
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
        $('.message_list').append(insertHTML);
        $('.message_list').animate({ scrollTop: $('.message_list')[0].scrollHeight});
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
