$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `
        <div class="message">
          <div class="message__header">
            <p class="message__header--name">${message.user_name}</p>
            <p class="message__header--date">${message.created_at}</p>
          </div>
          <div class="message__main">${message.content}</div>
          <img src=${message.image}>
        </div>        
      `
    } else {
      var html = `
        <div class="message">
          <div class="message__header">
            <p class="message__header--name">${message.user_name}</p>
            <p class="message__header--date">${message.created_at}</p>
          </div>
          <div class="message__main">${message.content}</div>
        </div>
      `
    }
    return html
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
});
