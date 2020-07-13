var $ = jQuery;
$(document).ready(function () {

  // fix height
  let windowHeight = window.innerHeight;
  let bodyHeight = $('body').outerHeight();
  if (bodyHeight < windowHeight){
    $('body, html').css('height', windowHeight + 'px');
  }

  var availableDates = []
    let prevDay = '';
    let nextDay = ''
    $.ajax({
    type: "POST",
    url: '/getDates.php',
  }).done(function (data) {
    var obj = $.parseJSON( data );
    var filteredObj = obj.filter((a, b) => obj.indexOf(a) === b);
    $.each( obj, function( key, value ) {
      availableDates.push(value);
    });

    let datesLen = availableDates.length;
    let defaultDateRaw = availableDates[datesLen - 1].split('-');
    let defaultYear = parseInt(defaultDateRaw[0]);
    let defaultMonth = parseInt(defaultDateRaw[1]);
    let defaultday = parseInt(defaultDateRaw[2]);
    let defaultDate = new Date(defaultYear, defaultMonth, defaultday);
    $('#datepicker').datepicker({
      inline: true,
      //nextText: '&rarr;',
      //prevText: '&larr;',
      showOtherMonths: true,
      //dateFormat: 'dd MM yy',
      //showOn: "button",
      //buttonImage: "img/calendar-blue.png",
      //buttonImageOnly: true,
      changeMonth: true,
      changeYear: true,
      yearRange: '2017:2020',
      defaultDate: new Date(defaultYear, defaultMonth - 1, defaultday - 1),
      onSelect: function(dateText) {
        $.ajax({
          type: "POST",
          url: '/getVid.php',
          data: {selectedDate: dateText},
        }).done(function (vidata) {

          //remove unnceccessary iframes
          if ($('#videoModal iframe').length > 1){
            $('.videoWrapper').slick('unslick');
            $('#videoModal iframe:not(:first)').remove();
            $('.modal-title:not(:first)').remove();
          }

          var vidobj = $.parseJSON( vidata );
          let id = vidobj[0][0];
          let title = vidobj[0][1];

          //activate next and previous days buttons


          var d = Date.parse(dateText);
          var d2 = new Date(d);
          var MyDateString = d2.getFullYear() + '-' + ('0' + (d2.getMonth()+1)).slice(-2) + '-' + ('0' + d2.getDate()).slice(-2);
          var index = filteredObj.map(function(e) { return e; }).indexOf(MyDateString);
          let objLen = obj.length - 1;
          prevDay = filteredObj[index - 1];
          nextDay = filteredObj[index+1];
          if (typeof nextDay === 'undefined'){
            $('#next-day').attr('disabled', 'disabled');
          } else {
            $('#next-day').removeAttr('disabled');
          }
          //**//

          $.each(vidobj,function (index, item) {
            if (index > 0){
              //clone if more than 1
              $('#videoModal iframe').clone().appendTo( ".videoWrapper" );
              $('.modal-title').clone().appendTo( ".modal-header" );

              //populate data if more than 1
              $('#videoModal iframe').eq(index).attr('src', 'https://www.youtube.com/embed/' + vidobj[index][0]);
              $('.modal-title').eq(index).text(vidobj[index][1]);
            } else {
              $('#videoModal iframe').attr('src', 'https://www.youtube.com/embed/' + id);
              $('.modal-title').text(title);
            }
          });
          let slidesLength = $('#videoModal iframe').length;
          if (slidesLength > 1){
            $('.videoWrapper').slick({
              dots: true,
              infinite: true,
              arrows: true,
              speed: 500,
              fade: true,
              cssEase: 'linear',
              initialSlide : slidesLength,
            });
            $('.slick-dots li button').eq(0).click();
          }

          $('#videoModal').modal('show')

        });
      },
      beforeShowDay: function(date) {
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ availableDates.indexOf(string) > -1 ]
      }
    });

    $('body').on('click', '#next-day', function () {
      let nextDayParts = nextDay.split('-');
      let nextDayYear = parseInt(nextDayParts[0]);
      let nextDayMonth = parseInt(nextDayParts[1]);
      let nextDayD = parseInt(nextDayParts[2]);
      let nextDayDate = new Date(nextDayYear, nextDayMonth - 1, nextDayD);
      $('#datepicker').datepicker("setDate", nextDayDate);
      $('.ui-datepicker-current-day').trigger('click');

    });

      $("#videoModal").on('hide.bs.modal', function(){
        $('.iframeYoutube').attr('src', '#');
      });

      $('body').on('click', '#prev-day', function () {
        let prevDayParts = prevDay.split('-');
        let prevDayYear = parseInt(prevDayParts[0]);
        let prevDayMonth = parseInt(prevDayParts[1]);
        let prevDayD = parseInt(prevDayParts[2]);
        let prevDayDate = new Date(prevDayYear, prevDayMonth - 1, prevDayD);
        $('#datepicker').datepicker("setDate", prevDayDate);
        $('.ui-datepicker-current-day').trigger('click');

      });

    $('.videoWrapper').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.modal-header .modal-title').eq(currentSlide).hide();
      $('.modal-header .modal-title').eq(nextSlide).fadeIn();
    });
    $(".videoWrapper").on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.modal-header .modal-title').hide();
      $('.modal-header .modal-title').eq(currentSlide).show();
    });

  });

  //populate database
  $('body').on('click', '#populate_db', function () {
    let ids = [
      // 'oa7Hx4TnaMI',
      // '-VBGJxR2YPE',
      // 'wl0Dju4B-JU',
      // 'iLAw4g5fZyg',
      // 'p6WxNhDO6Uk',
      // 'JDqI1DD_k0I',
      // 'De1xrskgf1A',
      // 'BbBqj-mk2N4',
      // 'n2Xjbgz3wGE',
      // 'PsqVvCjMVcA',
      // 'THrnlMSz0XY',
      // 'QTjQ1vjEqcg',
      // '5LgG0dFVlYA',
      // 'qFsRLsStGHk',
      // 'AYGefNY1QNA',
      // 'XeRzRydy_hA',
      // 'yYL-Nbx-uRA',
      // 'v0iibklA798',
      // 's5tM-X_rRAQ',
      // '7xUGT7JXVkc',
      // '2XOGeX1dk5M',
      // 'aP8nO5d_38Y',
      // 'zzed5pW3WqI',
      // 'unFCIsPCoXQ',
      // 'Q1hGublyy_w',
      // 'FuQ2Nbjza8s',
      // 'zTccLqxksHM',
      // 'C082QV1l--s',
      // 'BMPUzTrpUO4',
      // 'DNBxb8UlEu0',
      // 'xpi5uIXbKUw',
      // 'ev1Pwf5asik',
      // 'RpTpSC_B7XY',
      // '04r5Uv-y_3U',
      // 'ZVVK1G_DNrE',
      // 'm-KPc5QqceI',
      // 'JMDX9kC1W8w',
      // 'PKNo73t5S4I',
      // 'qc6mb0ob8Ko',
      // 'fFgHz-f_BlI',
      // 'DxXlzEkRYls',
      // 'HL8PjH-jYUE',
      // '63H6wm_0VdQ',
      // 'c2NR96BbtTA',
      // 'Lm5Js_g4A78',
      // 'T5AtLfzk-88',
      // '6CfIL9k9YNQ',
      // 'z2hCvIvmL2o',
      // 'WWWSf6GY500',
      // '3gsdOBF4ivM',
      // '1YGTnyLqh3Q',
      // '3U5Si5cdeis',
      // 'IjNy1e0diig',
      // 'Z0uflL6-qss',
      // '7HQ4RhoBvwg',
      // '_4G9s8LmsmA',
      // 'O3T7VWkP7wg',
      // 'eQ2AVG5z6B0',
      // '8bI8YU1Y_E4',
      // 'sESjkGggk_E',
      // 'dfW32CfQa8U',
      // '--LD5hvJpTE',
      // 'fvT0QOLIwwU',
      // 'y5nQS4Sn0Qw',
      // '9Mv7YMf1FtA',
      // 'BTIMj806sfk',
      // '4c-rmRC0gxU',
      // 'n0QsUF-SH8U',
      // '7rPQ-_N2Wxw',
      // '8GQqAWQ2yns',
      // 'XmxC8MChYZE',
      // 'bxaxUx9c7KI',
      // 'eall1y-oUis',
      // 'y2W7_ILWmVw',
      // 'ABCjgKssSrw',
      // 'RmXLUgxGhEg',
      // 'ffweeJ70gEI',
      // '3-TV7nnO2ps',
      // 'WRStRdnaEu8',
      // 'nEANMfS9Ez4',
      // '9lZIx9ryS5w',
      // 'mHhG44JnQO4',
      // 'Fbo8v2Cnfr0',
      // 'zqhLacMs5Bo',
      // 'YouwsTOUdGI',
      // 'sjt6_gLLoyE',
      // 'I8HFXrx833Q',
      // 'PRK-1z0xyv8',
      // '53SG0xtW2q0',
      // 'nZLc-QgSrXM',
      // 'EckD9p9qls8',
      // 'CWphj7J3EgA',
      // 'FWSqUu5gPfI',
      // 'v7HixrLO-z4',
      // 'qGmbW5mxmCQ',
      // 'TtrRgamgs-o',
      // 'KGouElz2vzQ',
      // 'hGq8FGchajY',
      // '6vPOYgPn6jE',
      // 'IBJ6yxSGODo',
      // 'bhf1l6JygRw',
      // 'luUvG-pqPsQ',
      // 'SyTAyIw3knk',
      // 'D_K5p0Ik4Uc',
      // 'Ba2ebQ3ZxUw',
      // 'nEDRQHZjg30',
      // '8csMuAEPQqY',
      // 'appk8_LLQvc',
      // 'GAGPwYVG_Sg',
      // 'daiPG9nF1WU',
      // 'Rb0n5aGaFl8',
      // 'rnbdNDzksuQ',
      // '39_XAxm29Js',
      // 'CbelleXTR-o',
      // 'kLeu1fTXjuo',
      // 'D0kZDATcq8c',
      // 'qCMelO2G0mE',
      // '17QDNDdRri4',
      // 'aedj9VjmuUs',
      // 'PzKKIEyMzLU',
      // 'xXaZa_yxtDk',
      // 'fsEd7ExIpek',
      // 'nL6rb7Tncog',
      // 'MLddjQ9fn2s',
      // 'qX1rE4xGXh4',
      // 'm1e7mBaTxyY',
      // '9WyN3160c_E',
      // 'Wy2QA3wt86c',
      // 'q6MRGJ2z_UI',
      // 'ToFlxL_DnQA',
      // 'Dwr--kAbjrw',
      // '2K1Q2faYt5A',
      // 'Wmf3rK-AHeE',
      // 'avvpjUZDsXw',
      // 'MUpY-lT6CH8',
      // 'tWFXdgygJBk',
      // 'nw0yhq4bCBc',
      // 'rpqHvkEbCo4',
      // '9YLHLTniZok',
      // 'au2vGimLEA4',
      // 'xo_MRNVypag',
      // 'e6yPU9UQ3VI',
      // 'CasDDbJeACw',
      // 'Arq2mM0nIn0',
      // '_Zm1PzYaTnw',
      // 'XUIZawMlkzs',
      // 'frcZFEDHyiI',
      // 'VGIWHy-N3ic',
      // 'csh2J6YobSs',
      // 'ur8ar3XtIIs',
      // 'SX_hkcYRdYE',
      // '8rVoSf1FF3U',
      // '-n_uI0PWjBo',
      'Cq4tjbx2FAE',
      // '-5zFUAxvWn8',
      // 'CFoD_hIehXY',
      // '7cB4gFbOQYE',
      // 'YEFEnhoTVO8',
      // '2uWlLYwj6LY',
      // '38ULLrpv-CQ',
      // '4mytYb3JpOI',
      // '1GdiZtvFiYU',
      // 'ZCfYSLSIWcc',
      'eVThmxLrOcQ',
      // 'ltZ7CrzWbaI',
      'fuewj3Tkvno',
      // 'yQb31KqG6cU',
      // 'ONVu-kG7rg4',
      // '4uWxeWoqQ_I',
      // '3iGZyql44dU',
      // 'e5dV3fF3PQA',
      // '18Q7ZsoThfE',
      // 'EJwjnnSLGO0',
      // 'DM29oqqiomw',
      // 'UjnrKpt5_H0',
      // 'k5CcPHnAhZE',
      // 'Dzc1pLLzQUY',
      // 'KzWvQ5BfY8k',
      // 'OPlqZO6G_fE',
      // '1GNT_ykkEZE',
      // '6IrmU8HR3Xs',
      // 'EmYd8rb7uls',
      // 'kkQj4g_pzus',
      // 'a0qqJX6rXVA',
      // 'sH6QU2lHk3k',
      // 'le9MCL0w9jI',
      // 'v6Keehehja4',
      // 'UqUXI-ZKkd4',
      // 'dGuFRvQV3Hg',
      // '8bgqD363BK4',
      // '4jCKcF2x4So',
      // 'R8OGIn47Ppw',
      // 'FyDdqSUVCYE',
      // '3Un5IRM583w',
      // 'pkRyVZT98Ck',
      // 'HDmPWq-kpUo',
      // 'qjzPUMFjZzk',
      // '0MWdc6IXgNQ',
      // 'IYfLMKZNLHw',
      // 'pJxmIuDD0us',
      // '-7fbhWjw_VQ',
      // 'RGj4wnlMr6A',
      // '-xksU7xzCwE',
      // 'GdXKuHq1ps8',
      // 'P1gA8YMbJpM',
      'qovYbghERB4',
      // '98na1HniH4E',
      'NWnPp8O_cEM',
      // '1T25p7gVaTo',
      // 'X9p361iOgIs',
      // 'FK8sqb1_rbo',
      // 'NHyqPurxDLY',
      // 'g1fy2mS5BWw',
      // 'm4-GGN7MvRE',
      // 'XfktcPwf0rg',
      // 'll-fnXDbZyg',
      // 'rreundx-d8o',
      // 'FRwHtEW720k',
      // 'MRdUE7GbIHQ',
      // '5dxQN5NpYqY',
      // '3FnN3gfjiTY',
      // 'hVQZsajSctY',
      // 'iVzwWgtYMto',
      // 'aIY0e3ZurlA',
      // 'EUL4Jhpq2fc',
      // 'piWsq5r-Ul4',
      // 'nJDOPtg7BAc',
      // 'RJySyecOuV8',
      // 'woC94gwlTG0',
      // 'mt1b0Uc_fkw',
      // 'Nn9_5nIYtw8',
      // '0Yn4mUoQFU8',
      // '7v2jkyqIw_w',
      // '_rw3enkcyxc',
      // 'n2GL5MIRq0w',
      // '5DRipUIqznw',
      // '83ch4XESQhE',
      // 'GD40kTBXnug',
      // 'CT9qz2L5t_4',
      // 'X_TYJRw8fek',
      // 'jbwQdNCpQ0U',
      // 'E4lNP7tdlW8',
      // 'adMptKwyCzg',
      // 'bYK75ozuRaM',
      // 'zYZ6ead6vZY',
      // 'xzVcd44pNRI',
      // 'kHpx-fWMF74',
      // 'vzBRpLUMnQc',
      // 'c-f4sXgcTNM',
      // 'gZzbuaVwQlE',
      '1akYW7V11J8',
      // '9QCiJEVUyLY',
      // 'XetIeNF4EaI',
      // 'A7NrB0CokAI',
      // 'K-8Uu9mB6kg',
      // '6RUb7-37KkI',
      // 'cX2yYCsyFBw',
      'z8w6YDbnCb0',
      // 'oW1BwmXJ0Nw',
      // '39dF5hu3poI',
      // 'HnFi1l5WtYo',
      // '6d3fEIOX6LA',
      // 'LFF48--lYzs',
      // 'UJnnr6c1EKA',
      // 'OaCkhAOXjwQ',
      // 'IHgZI1gLSFQ',
      // '0r-0QwdcP2o',
      // 'P-7_HR41zD8',
      // '6QULBqPBvg0',
      // 'gIESa5_Sdcw',
      // '-BDhQPvO-nE',
      // 't2nvVT0SQIo',
      // '7OpGMUtrIcw',
      // 'MqlqduxY6Fw',
      // 'mod0QsRoGWM',
      // 'hT2DMYLg6Ac',
      // 'yrcFHTDkqMA',
      // 'adTo1_-Vwdk',
      // 'fSEn4rdHNGY',
      // 'G8z2lzXY2Y4',
      // 'bZGVkRl7QrQ',
      // 'U12cNQ4eLfA',
      // 'HVOM6YnLCY0',
      // 'utceQvZuERE',
      // 'rosaNk6rtLA',
      // 'UFR7G-IRTlE',
      // '2bA9Wekkszo',
      // 'El66y_wVpYE',
      // 'keTpzTnfbA0',
      // 'OK9PdLzAYlo',
      // '1Ngy4TLYjc4',
      // 'VO133QFZrVU',
      // 'pUO0tecblL0',
      // 'wweYyn5B_pM',
      // 'RsIKzc5GUAg',
      // 'IW_uODolRl0',
      // 'zQUUGHFCpfY',
      // 'F9JHW2zrOOE',
      // 'J0HY5CqoN6w',
      // 'M7f4xyHXzrg',
      // 'Wpyko7UpcO4',
      // 'hkmwxMNhuao',
      // '_c73JFe9liU',
      // 'TNPKY4r5wTE',
      // 'Ibjs2sJf98I',
      // 'D5jKQiKByxw',
      // '8qfFqYevfJ4',
      // 'dMMndfcvVOc',
      // 'HZUxsIrDO5M',
      // 'pW20liZ5uBw',
      // 'YAIp3mfiCsw',
      // 'mo5k2APc_OQ',
      // 'tnT6XsQEGaI',
      'zcqhX_Bw1p4',
      // 'lB_Uq3Zyth8',
      // 'e5nnEhriyEI',
      // 'vXX1C6-6IZE',
      // 'VMrNHtn8Kww',
      // 'UKb_O6ZbOAc',
      // 'tskjq1ieSFk',
      // '1ML7tThxw1o',
      // 'DzwL3bUI-MY',
      // 'QFbWfX0sRm0',
      // 'tzdDGmm7aAY',
      // 'A1uO1sscVRE',
      // 'OfXO0Fz4GDs',
      // 'B6OiP3wAMTo',
      // 'FtCQx3u2cYM',
      // 'M6WEvrz3Hw8',
      // 'fKdhtWZY3kA',
      // 'Rh9zPpoAowM',
      // 'VjUsWEWzSk8',
      // 'n8TETPzIKpw',
      'GUL0vhTQFiY',
      // 'v8_5R0v7a2c',
      // '1ahlxm-nB48',
      // 'h9_Z5ik8yg8',
      // 'qJbI0Y5vVKg',
      // 'ybBp2aVIREU',
      // 'HDxHnZEM4HI',
      // 'CvFHFzY3vjY',
      // 'JJPHCVi6MOQ',
      // 'O4CTvCDfJpM',
      // '1VfoGBnMZl8',
      // 'rQXUwWMJhos',
      // 'dWozS1OSdqk',
      // 'nelgBCpGWuQ',
      // 'l6OL5ioNoSQ',
      // '6nEb5AfSqLY',
      // 'vYEt5Foc1CM',
      // 'CfYgKw4gp10',
      // 'o8L8NxnGxIo',
      // 'OqJzoC2Gth4',
      // 'QVri-d8fIws',
      // 'aYrSTU_1KeU',
      // '8hsysGiXEdA',
      // 'LuAADAazua0',
      // 'FY22h288LIM',
      // 'HxAfqxiMTwM',
      // '7fXqZIwhiaA',
      // 'HlEDjueAJSI',
      // '6J5oyf36Yyk',
      // 'q5g6INpYTqM',
      // 'wGFk1C0E_00',
      // '_israO3uvwA',
      // '_h6hw38D0NE',
      // 'hZnLpvyPQXc',
      // '1yTZ3Z7iH60',
      // '5X6_wrCUUdE',
      // '__RYhvpekkE',
      // 'UuKuTFq-36M',
      // 'trsK9SsAZco',
      // 'FalUKcjYr0w',
      // 'otsfFb47af8',
      // '1DMMbQEWTN8',
      // 'eV5mrEVJ8f4',
      // '3te2qlJAqm4',
      // 'm758Ox5s9Qk',
      // 'CSICkv1R6BI',
      // '-VmG8xE1uSQ',
      // 'cM-h4fY5djY',
      // '2Q0LkJuCO-A',
      // 'KpMIc5ymS24',
      // 'eiyWgDCUlaQ',
      // 'oG3ZrYHYqX8',
      // 'WOeooY_vrdE',
      // 'RLQ66T_AURc',
      // 'mF_ut-5WwU8',
      // 'sNL3QLyMFS0',
      // 'e3v4MV_h-gE',
      // 'uJC-7cWc6Vo',
      // 'KPXXFYtIIh8',
      // 'd_r2gsHVuLA',
      // 'UWBWLB8CiCw',
      // '53r7QaIRbBk',
      // 'PRF5DMkWi2k',
      'pjPLHoIzIeA',
      // 'vTCVEHx0O50',
      // 'cua_go79eV0',
      // 'tZB_fB8WCcw',
      // 'PTGM_d7BPjs',
      // 'bvILg761euU',
      // 'KRhSuCEY2bw',
      // 'RHtvlqKsz68',
      // 'MFxNOTSp8EM',
      // 'UoqGPm2P0NQ',
      // 'r5bUxc9Ehlc',
      // 'pc1vHnsnh9Q',
      // 'VVwMKEju4cI',
      // '6QIui-G4oYA',
      // 'S-1jxr_9XWA',
      // 'MapgdAf1xSU',
      // 'LEA61yOuYoM',
      // 'yuztbrlWHp0',
      // '5aYbNNC7hyo',
      // '4nZU4IoKzXQ',
      // 'U8exgIUpvls',
      // 'iUpXz-_Ub8E',
      // '4hraIWu1fSI',
      // 'J53xs090k20',
      // 'iBO8sa76Cw8',
      // 'jBPsBliXrB4',
      // 'ZyPhX6XoC08',
      // 'aEdiIECJhM8',
      // 'yyT5kN2I-9c',
      // 'euCMSMA4QAw',
      // 'Nh-W65is2Y4',
      // 'UHy06FJ1DDE',
      // 'Q7neSvzrW6Q',
      // '4BZeoyJTD4c',
      // 'be1Qc9xMsKY',
      // 'V4960Dfy288',
      // 'ooc1cpzzbpU',
      // 'kiVwGrPrHGI',
      // 'Y1yK5BQ039E',
      // 'iUAjaMO43hw',
      // 'XBBZLocajRk',
      // 'xv-0cCt71rQ',
      // 'RcABS8ptymQ',
      // 'nmC08SDM1iw',
      // 'KRdiWiSYMEs',
      // 'zYkW4CMY8CU',
      // '7E3G_pbfkdQ',
      // '_yqUN91scwA',
      // '8XF44-uLSmM',
      // 'X0LAW8jIXEc',
      // 'TXTv0lcwqf8',
      // 'ZVxzlFb0ETQ',
      // 'O-dxK3y7EMw',
      // '68yK_M1t2RY',
      // 'kUREyPJqhCA',
      // 'oEpQ2z_nwRI',
      // 'mcj-ml_fpPk',
      // 'CuXhGCXZ15o',
      // 'WtARVxohUPA',
      // 'ZMOSDED4HmQ',
      // '-p4q6X2Kdsk',
      // '2VYFK4A0B4s',
      // 'DK_RGHo_zUo',
      // 'dsGyfRGvQoo',
      // 'pPHDDfOeWsw',
      // 'xDi6Ny6_lC0',
      // 'swkP0PLe4x4',
      // 'yUxC8iVE2JM',
      // 'YC6FiBfkxQY',
      // 'NPAgDYcr5Ps',
      // 'UnfzCjH54gc',
      // 'ivHITiedOPM',
      // 'f0d6SnR9uJs',
      // 'uu6c368R3iI',
      // 'rdIDAO4uCNo',
      // 'aAtyLRd7Zfc',
      // 'bXOpgNl_3dc',
      // 't6wyfuAfkcg',
      // 'esI7y5vGcjo',
      // 'nOwe_7fW8BU',
      // 'j4ex2XAflf4',
      // 'EutkmSbyTi8',
      // 'nzm6RpSIdaA',
      // 'Yf2kZhUzK6M',
      // 'tdtUz4WkxJs',
      // 'e_9nvd1osQw',
      // '43mEk4Enwmk',
      // 'cLwyYKuNvcw',
      'AHEhObOELrY',
      // 'jXSxGUFMBog',
      'uoSC8Ojllks',
      '_lG6F-ZkqZM',
      // '1U-9LeTtks8',
      // 'dyHgHwS_oz0',
      // 'hy2XZHifOHg',
      // 'RXNkyZrICdo',
      // 'fxAWMn5v-48',
      // 'rE3eTw0_VyI',
      // 'i4Pp82zkFK8',
      // 'vGitfzGN9xQ',
      // 'pVHcbJC7iqI',
      // '9Nursn5Q_uU',
      // 'ISUTEqOU40c',
      // 'U8GYDc5r8Bc',
      // 'C_xwwE9H-tI',
      // 'nf7QV9Zay9g',
      // 'jBZDFBf7dtE',
      // 'zpTf41IahkA',
      // 'HYxR_LxImuo',
      // 'h_p6lLCmrSI',
      // 'xKXrOdP96zs',
      // 'qh31f4Q3BJo',
      // 'Fiamwe6aveA',
      // 'JfGI8eBLhRA',
      // 'aFvSB-rKeC8',
      // 'nux-_z-By4Q',
      // 'ou0hMhG6Jaw',
      // 'aY_PRpmRNiU',
      // 'U7PSXiAYiZs',
      // 'LL_SxlDENVM',
      // 'LRCZUq575UE',
      // '2TlRTdBkcUw',
      // 'Fkau_gY0Pzw',
      // 'ZVaGh4SRn90',
      // '3EbhNt8r864',
      // 'cItuSl0zODg',
      // 'WRpOFw19oJU',
      // 'Upg69pNYg7k',
      // '2vgJp3XCevg',
      // 'wy4rHMVSmaA',
      // '14IWhryqWZY',
      // 'KEqI-6s4U_E',
      // '3xlh97-an9M',
      // 'Cu6sVA5oznU',
      // '2Dz9LaW8_F8',
      // 'c809zfwU3KI',
      // '4lt3fOOmc_M',
      // 'FMoK44uIsPI',
      // 'WFiVVONZM_M',
      // 'RiTHbMCfFpU',
      // 'QkyplfjpZnE',
      // 'trm3Nu_VK7c',
      // 'p3EZF-Rjvyc',
      // 'oNt1OIR3EN8',
      // 'LwRJX21y1xU',
      // 'k7tUlPRniaA',
      // 'gBge-chLqto',
      // 'Dw-jkx5D7lM',
      // 'Cw8V9cxvz3E',
      // 'Km8Hn6fV1fw',
      // 'cMehfERg9SA',
      // 'hX0nTcYVM-8',
      // 'toYp24J_OWU',
      // 'TSTGV0bF3Yo',
      // 'k4OPrpFG7P0',
      // 'dddhY5yYXBk',
      // 'neVhZreAXac',
      // 'lf33V_xi6J8',
      // 'seRZhxD2yrw',
      '2h1ozYWSkB4',
      'Yht4_KfYlD8',
      'K6vzlcnT14w',
      '2RG2C-kUULc',
      // 'vxtFfdy7YdU',
      // 'uK_0U-3MhwM',
      // 'X7Zs7m3MZwA',
      // 'I03OqWOe2IY',
      // 'x3-O0E80314',
      // 'W5C2cX3GCFU',
      // 'aovBYKM98VE',
      // '9uHavQZ6uUI',
      // 'NsnVVwKGlKo',
      // 'ygPdQcesRlo',
      // '6ArJ8XkNmLQ',
      // 'tZZ2SSgju4I',
      // 'TpG-OM-APMM',
      // 'Bs8JSm3L9ZI',
      // 'P_HETzYqLrk',
      // 'LHun7ti5jdk',
      // 'zOqm9v6Vibo',
      // 'oD2wrij679o',
      // 'nZAfCnw54T8',
      // 'cfBivdSCatw',
      // 'tevsFdIS8Z8',
      // 'YqIohZyKQV8',
      // 'ykzZDkU9ocM',
      // 'PUuPgAnNgMA',
      // '7Iy781r8Kfc',
      '0dS6GpHohfM',
      // 'iSgoKqEoe5w',
      // 'n5UchZWvmds',
      // 'RbwoMokbvn8',
      // 'BV-3y5qlfSY',
      // 'UAGT-u7UFjU',
      // 'qaMwy45AXc0',
      // 'pm8iU4V1c2g',
      // '6XjwxWAOWDM',
      // 'eelBLLkTrds',
      // 'XhmVWclI83M',
      // 'g4rhJUyIZrQ',
      // 'KYVPaXCca4w',
      // 'RyiwXhkunKE',
      // 'KyC9A80z5HE',
      // 'hseLp1JtULQ',
      // 'dwb3i38eC7s',
      // 'esPqbMR1bts',
      // '8eONKLipvOA',
      // '2PEu9tLDo2g',
      // '_3fDYioXVcQ',
      // 'nwF7xnp4VKg',
      // 'avdpUV78TfE',
      // 'I9e2aL11cNI',
      // 'yYU7sAdlck8',
      'ehwujCwKoc8',
      '17f_dimVetw',
      'mTGL4NojlSA',
      'me1RWFzEUos',
      // '97wusG-sZf0',
      // 'ZEKbsC-fFeY',
    ]

    let nObjStr = '';

    ids.forEach(function (id) {
      let jsonObj = {};
      setTimeout(function () {
        $.get( "https://www.googleapis.com/youtube/v3/videos?id="+id+"&key=AIzaSyC0_DkvrjkSnpIzqt0JTPQlZbYtMROgeUM&part=snippet", function( data ) {
          let videoDetails = data.items[0].snippet;
          let title = videoDetails.localized.title;
          let date = videoDetails.publishedAt;
          let nObj = {
            "id" : id,
            "link" : 'https://www.youtube.com/watch?v='+id,
            "title" : title,
          };
          nObjStr = JSON.stringify(nObj);
          let newDateRaw = date.split('T')[0];
          let d = new Date(newDateRaw);
          let newDate = formattedDate(d);
          jsonObj[newDate] = nObj;

          $.ajax({
            type: "POST",
            url: '/convertJson.php',
            data: {data: jsonObj},
          }).done(function (data) {
            $('body').append('<pre>' + data + '</pre>');
          });
        });

      }, 100)
    });
  });


  function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

});

