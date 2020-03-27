$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
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
      `//メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `
        <div class="message">
          <div class="message__header">
            <p class="message__header--name">${message.user_name}</p>
            <p class="message__header--date">${message.created_at}</p>
          </div>
          <div class="message__main">${message.content}</div>
        </div>
      `//メッセージに画像が含まれない場合のHTMLを作る``
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
        url: url,  //同期通信でいう『パス』
        type: 'POST',  //同期通信でいう『HTTPメソッド』
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
        $(".send_btn").prop("disabled",false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $(".send_btn").prop("disabled",false);
      });
    } else {
      alert("メッセージを入力してください");
      // 処理が終わった後に、disabled true になってしまう為、
      // return false で強制的に返す
      //$(".send_btn").prop("disabled",false);
      return false;
    }
  })
});
