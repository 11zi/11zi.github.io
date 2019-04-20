function htmlEncodeJQ(str) { return $('<span/>').text(str).html(); }
(function () { var yz = 15; var x = 0.5 * yz; var y = 0.5 * yz; var canvas = document.getElementsByClassName("yaoz"); var painter = canvas[0].getContext('2d'); painter.fillStyle = "#607d8b"; painter.fillRect(0, 0, yz * (25 + x), yz * (31 + y)); painter.translate(-127, 120); painter.rotate(-Math.PI / 4); painter.lineWidth = yz; painter.strokeStyle = "#1e1e1e"; painter.moveTo(yz * 12.5 + x, y); painter.lineTo(yz * 12.5 + x, yz * 7.5 + y); painter.stroke(); painter.moveTo(x, yz * 7.5 + y); painter.lineTo(yz * 25 + x, yz * 7.5 + y); painter.stroke(); painter.moveTo(yz * 8.5 + x, yz * 19.5 + y); painter.lineTo(yz * 8.5 + x, yz * 31 + y); painter.stroke(); painter.moveTo(yz * 24.5 + x, yz * 11 + y); painter.lineTo(yz * 24.5 + x, yz * 23.5 + y); painter.stroke(); painter.moveTo(yz * 25 + x, yz * 23.5 + y); painter.lineTo(yz * 12 + x, yz * 23.5 + y); painter.stroke(); painter.moveTo(yz * 12.5 + x, yz * 23.5 + y); painter.lineTo(yz * 12.5 + x, yz * 34 + y); painter.stroke(); painter.strokeRect(yz * 0.5 + x, yz * 11.5 + y, yz * 8, yz * 8); painter.strokeRect(yz * 12.5 + x, yz * 11.5 + y, yz * 8, yz * 8); })();
(function () { $.getJSON("https://api.github.com/repos/11zi/11zi.github.io/issues/1/comments", function (json) { var comment = $('#comments'); var hyper_text_markup_language = ''; for (var i = json.length - 1; i >= 0; i--) { hyper_text_markup_language += '<div class="mdui-row mdui-invisible">1</div> <div class="mdui-card"> <div class="mdui-card-header"> <i class="mdui-icon material-icons mdui-card-header-avatar">&#xe853;</i> <div class="mdui-card-header-subtitle">' + htmlEncodeJQ(json[i].user.login) + '</div></div><div class="mdui-card-content">' + htmlEncodeJQ(json[i].body) + '</div></div><div class="mdui-row mdui-invisible">1</div>'; }; comment.html(hyper_text_markup_language); }); })();
function resize_ifr(div_id) {
  var ifr_id = "ifr" + div_id
  var ifr = document.getElementById(ifr_id)
  ifr.style.height = "65536px"
}