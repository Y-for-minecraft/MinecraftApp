/*navを固定*/
/*https://nyanblog2222.com/programming/javascript/1630/*/
$(function () {
  let win_w = jQuery(window).width();
  var pos = $("#contents").offset().top;
  var posTable = $("#answer").offset().top;
  $(window).scroll(function () {
    if ($(this).scrollTop() > pos) {
      $("#contents").addClass("fix");
    } else {
      $("#contents").removeClass("fix");
    }
    if ($(this).scrollTop() > posTable) {
      $("#answer").addClass("fix");
    } else {
      $("#answer").removeClass("fix");
    }
  });
});
/*asideにウィンドウheightを入れる*/
$(function () {
  let win_h = jQuery(window).height();
  $("aside").css("height", win_h);
});
/*地図演算*/
$('input[name="submit"]').on("click", function (e) {
  e.preventDefault();

  $("#answer").removeClass("hide");

  if ($('input[name="x"]').val() === "") {
    $('input[name="x"]').val(123);
  }
  if ($('input[name="z"]').val() === "") {
    $('input[name="z"]').val(123);
  }

  var x = $('input[name="x"]').val();
  var z = $('input[name="z"]').val();
  var chunkCount = $('select[name="count"]').val();
  var view = $('input[name="view"]:checked').val();
  let area = chunkCount * 2 + 1;
  var ansx = Math.floor(x / 16) * 16 - 16 * chunkCount;
  var ansz = Math.floor(z / 16) * 16 - 16 * chunkCount;

  /*↓簡易表示*/
  if (view == 1) {
    var i = 0;
    var col = "";
    var colEnpty = "";
    var countX = 0;

    while (i <= 16 * area) {
      if (ansx % 16 === 0) {
        col =
          col +
          '<td style="padding: 0.5em;" class="x16 tableTop positionX' +
          ansx +
          '">' +
          ansx +
          "</td>";
        colEnpty =
          colEnpty +
          '<td style="padding: 0.5em;" class="x16 positionX' +
          ansx +
          '"><span class="hide countX' +
          countX +
          '">x' +
          ansx +
          "<br></span></td>";
        countX = countX + 1;
      } else if (((ansx % 16) + 1) % 16 === 0) {
        col =
          col +
          '<td style="padding: 0.5em;" class="x15 tableTop positionX' +
          ansx +
          '">' +
          ansx +
          "</td>";
        colEnpty =
          colEnpty +
          '<td style="padding: 0.5em;" class="x15 positionX' +
          ansx +
          '"><span class="hide countXbef' +
          countX +
          '">x' +
          ansx +
          "<br></span></td>";
      } else if (((ansx % 16) - 1) % 16 === 0) {
        col = col + '<td class="tableTopNone positionX' + ansx + '">X</td>';
        colEnpty = colEnpty + '<td class="positionX' + ansx + '"></td>';
      }
      ansx = ansx + 1;
      i = i + 1;
    }

    var j = 0;
    var positionZ = "";
    var table = '<tr><td class = "fixed"></td>' + col + "</tr>";
    var countZ = 0;

    while (j <= 16 * area) {
      if (ansz % 16 === 0) {
        table =
          table +
          '<tr class="z16 positionZ' +
          ansz +
          " countZ" +
          countZ +
          '"><td style="padding: 0.5em;" class="tableLeft"><span class="hide cZ">z' +
          ansz +
          "</span>" +
          ansz +
          "</td>" +
          colEnpty +
          "</tr>";
        countZ = countZ + 1;
      } else if (((ansz % 16) + 1) % 16 === 0) {
        table =
          table +
          '<tr class="z15 positionZ' +
          ansz +
          " countZbef" +
          countZ +
          '"><td style="padding: 0.5em;" class="tableLeft"><span class="hide cZ">z' +
          ansz +
          "</span>" +
          ansz +
          "</td>" +
          colEnpty +
          "</tr>";
      } else if (((ansz % 16) - 1) % 16 === 0) {
        table =
          table +
          '<tr class="positionZ' +
          ansz +
          '"><td class="tableLeftNone">X</td>' +
          colEnpty +
          "</tr>";
      }
      ansz = ansz + 1;
      j = j + 1;
    }

    $("#answer").children().remove();
    $("#answer").append(table);

    var myX = "";
    var myZ = "";
    if (x % 16 === 0 || ((x % 16) + 1) % 16 === 0) {
      myX = x;
    } else {
      myX = Math.floor(x / 16) * 16 + 1;
    }
    if (z % 16 === 0 || ((z % 16) + 1) % 16 === 0) {
      myZ = z;
    } else {
      myZ = Math.floor(z / 16) * 16 + 1;
    }

    $("#answer td").append('<p class="space"></p>');
    $("#answer tr.positionZ" + myZ + " td.positionX" + myX + " p.space").attr(
      "id",
      "here"
    );
  }
  /*↑簡易表示*/

  /*↓詳細表示*/
  if (view == 2) {
    let i = 0;
    let col = "";
    let colEnpty = "";
    let countX = 0;

    while (i <= 16 * area) {
      if (ansx % 16 === 0) {
        col =
          col +
          '<td style="padding: 0.5em;" class="x16 tableTop positionX' +
          ansx +
          '">' +
          ansx +
          "</td>";
        colEnpty =
          colEnpty +
          '<td style="padding: 0.5em;" class="x16 positionX' +
          ansx +
          '"><span class="hide countX' +
          countX +
          '">x' +
          ansx +
          "<br></span></td>";
        countX = countX + 1;
      } else if (((ansx % 16) + 1) % 16 === 0) {
        col =
          col +
          '<td style="padding: 0.5em;" class="x15 tableTop positionX' +
          ansx +
          '">' +
          ansx +
          "</td>";
        colEnpty =
          colEnpty +
          '<td style="padding: 0.5em;" class="x15 positionX' +
          ansx +
          '"><span class="hide countXbef' +
          countX +
          '">x' +
          ansx +
          "<br></span></td>";
      } else {
        col =
          col +
          '<td style="padding: 0.5em;" class="tableTop positionX' +
          ansx +
          '">' +
          ansx +
          "</td>";
        colEnpty = colEnpty + '<td class="positionX' + ansx + '"></td>';
      }
      ansx = ansx + 1;
      i = i + 1;
    }

    let j = 0;
    let table = '<tr><td class = "fixed"></td>' + col + "</tr>";
    let countZ = 0;
    while (j <= 16 * area) {
      if (ansz % 16 === 0) {
        table =
          table +
          '<tr class="z16 positionZ' +
          ansz +
          " countZ" +
          countZ +
          '"><td style="padding: 0.5em;" class="tableLeft"><span class="hide cZ">z' +
          ansz +
          "</span>" +
          ansz +
          "</td>" +
          colEnpty +
          "</tr>";
        countZ = countZ + 1;
      } else if (((ansz % 16) + 1) % 16 === 0) {
        table =
          table +
          '<tr class="z15 positionZ' +
          ansz +
          " countZbef" +
          countZ +
          '"><td style="padding: 0.5em;" class="tableLeft"><span class="hide cZ">z' +
          ansz +
          "</span>" +
          ansz +
          "</td>" +
          colEnpty +
          "</tr>";
      } else {
        table =
          table +
          '<tr class="positionZ' +
          ansz +
          '"><td style="padding: 0.5em;" class="tableLeft">' +
          ansz +
          "</td>" +
          colEnpty +
          "</tr>";
      }
      ansz = ansz + 1;
      j = j + 1;
    }

    $("#answer").children().remove();
    $("#answer").append(table);

    $("#answer td").append('<p class="space"></p>');
    $("#answer tr.positionZ" + z + " td.positionX" + x + " p.space").attr(
      "id",
      "here"
    );
  }
  /*↑詳細表示*/

  /*座標表示*/
  var Coordinate = $('input[name="coordinate"]:checked').val();
  if (Coordinate == 1) {
    $("tr.z16 td.x16 span").removeClass("hide");
    $("tr.z15 td.x15 span").removeClass("hide");
  } else {
    $("tr.z16 td.x16 span").addClass("hide");
    $("tr.z15 td.x15 span").addClass("hide");
  }

  let n = 0;
  while (n <= area) {
    for (let m = 0; m <= area; m = m + 1) {
      var cZ = $("tr.countZ" + n + " span.cZ").text() + "<br>";
      var cZbef = $("tr.countZbef" + n + " span.cZ").text() + "<br>";
      $("tr.countZ" + n + " span.countX" + m + "").append(cZ);
      $("tr.countZbef" + n + " span.countXbef" + m + "").append(cZbef);
    }
    n = n + 1;
  }
  /*スクロール移動
  https://code-pocket.info/20191109272/
https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView*/
  let target = document.getElementById("here");
  target.scrollIntoView({ block: "center", inline: "center" });
});
/*myPlaceクリック時#hereをセンター*/
$("main p.myPoint, .myPointBotton").click(function () {
  let target = document.getElementById("here");
  target.scrollIntoView({ block: "center", inline: "center" });
});
/*表示切り替え観察*/
$('input[name="view"]').blur(function () {
  if ($('input[name="view"]:checked').val() == 2) {
    $('select[name="count"] option[value="10"]').addClass("hide");
    $('select[name="count"] option[value="6"]').addClass("hide");
    if (
      $('select[name="count"]').val() == 10 ||
      $('select[name="count"]').val() == 6
    ) {
      $('select[name="count"] option[value="1"]').prop("selected", true);
    }
  } else {
    $('select[name="count"] option[value="10"]').removeClass("hide");
    $('select[name="count"] option[value="6"]').removeClass("hide");
  }
});
/*スマホOk時ハンバーガー閉じる*/
$('input[name="submit"]').click(function () {
  let win_w = jQuery(window).width();
  if (win_w <= 840) {
    $("#hanb").prop("checked", false);
  }
});
/*inputからフォーカスが離れたとき全角を半角に変換する関数
https://www.searchlight8.com/jquery-javaascript-replace-charcode/*/
$(function () {
  $("input").blur(function () {
    charChange($(this));
  });
  charChange = function (e) {
    var val = e.val();
    var str = val.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });

    if (val.match(/[Ａ-Ｚａ-ｚ０-９]/g)) {
      $(e).val(str);
    }
  };
});
/*スクロールがあると一定時間後にfooter隠し*/
$(window).scroll(function () {
  $("footer p").css("display", "block");
  setTimeout(function () {
    $("footer p").css("transform", "translateY(0%)");
  }, 1);
  setTimeout(function () {
    $("footer p").css("transform", "translateY(105%)");
  }, 3.0 * 1000);
  setTimeout(function () {
    $("footer p").css("display", "none");
  }, 4.0 * 1000);
});
