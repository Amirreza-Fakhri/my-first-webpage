$(document).ready(function () {
  $("#ham_icon").click(function toggleBarClass() {
    $("#ham_icon").toggleClass("changed_bar");
    $("#ham_menu").toggleClass("changed_menu");
  });

  $(".faq_title_outer").click(function toggleSignClass() {
    if ($(this).children(".faq_sign").hasClass("changed_sign")) {
      $(this).children(".faq_sign").toggleClass("changed_sign");
      $(this)
        .children(".faq_sign")
        .closest(".faq_row")
        .toggleClass("changed_faq_row");
      $(this)
        .children(".faq_sign")
        .closest(".faq_row")
        .next(".faq_description")
        .toggleClass("changed_faq_description");
      $(this)
        .children(".faq_sign")
        .closest(".faq_row")
        .next(".faq_description")
        .toggle("slow");
    } else {
      $(".changed_sign").toggleClass("changed_sign");
      $(".changed_faq_row").toggleClass("changed_faq_row");
      $(".changed_faq_description").toggle("slow");
      $(".changed_faq_description").toggleClass("changed_faq_description");

      $(this).children(".faq_sign").toggleClass("changed_sign");
      $(this)
        .children(".faq_sign")
        .closest(".faq_row")
        .toggleClass("changed_faq_row");
      $(this)
        .children(".faq_sign")
        .closest(".faq_row")
        .next(".faq_description")
        .toggleClass("changed_faq_description");
      $(this)
        .children(".faq_sign")
        .closest(".faq_row")
        .next(".faq_description")
        .toggle("slow");
    }
  });

  $(".about_link").click(function () {
    $("#about_div")
      .get(0)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  });

  $(".roadmap_link").click(function () {
    $("#roadmap_div")
      .get(0)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  });

  $(".faq_link").click(function () {
    $("#faq_div")
      .get(0)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  });

  $(".mint_link").click(function () {
    $("#mint_div")
      .get(0)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  });

  $("#math_a").click(function () {
    $("#first_faq_title_outer")
      .get(0)
      .scrollIntoView({ block: "center", behavior: "smooth" });
    if (!$("#first_faq_title_outer .faq_sign").hasClass("changed_sign")) {
      $("#first_faq_title_outer").trigger("click");
    }
  });

  $(window).scroll(function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      $("#nav_bar_inner").addClass("scrolled");
    } else {
      $("#nav_bar_inner").removeClass("scrolled");
    }
  });

  let inter;

  function create_mes(mode, text) {
    if (mode === "succes") {
      clearTimeout(inter);
      $("#mes_div .succes_fail_mes").fadeOut(200, function () {
        $(this).remove();
      });
      let new_el =
        '<div class="succes_fail_mes"><div class="mes_container"><div class="succes_sign"></div><div class="succes_fail_description">' +
        text +
        '</div></div><div class="succes_bar"><div class="succes_bar_inner mes_bar"></div></div></div>';
      new_el = $(new_el);
      $("#mes_div").append(new_el);
      $("#mes_div .succes_fail_mes").animate({ right: "0%" }, 600, function () {
        $("#mes_div .succes_bar_inner").animate(
          { width: "0%" },
          3400,
          "linear"
        );
      });
      inter = setTimeout(function () {
        $("#mes_div .succes_fail_mes").fadeOut(600, function () {
          $(this).remove();
        });
      }, 4000);

      $("#mes_div .succes_fail_mes").mouseenter(function () {
        $("#mes_div .succes_fail_mes").stop(true);
        $("#mes_div .succes_bar_inner").stop(true);
        $("#mes_div .succes_bar_inner").animate(
          { width: "100%" },
          50,
          "linear"
        );

        $("#mes_div .succes_fail_mes").fadeIn(50);
        clearTimeout(inter);
      });
      $("#mes_div .succes_fail_mes").mouseleave(function () {
        $("#mes_div .succes_bar_inner").animate(
          { width: "0%" },
          4000,
          "linear"
        );
        inter = setTimeout(function () {
          $("#mes_div .succes_fail_mes").fadeOut(600, function () {
            $(this).remove();
          });
        }, 4000);
      });
    } else {
      clearTimeout(inter);
      $("#mes_div .succes_fail_mes").fadeOut(200, function () {
        $(this).remove();
      });
      let new_el =
        '<div class="succes_fail_mes"><div class="mes_container"><div class="fail_sign"><div class="fail_sign_first"></div><div class="fail_sign_second"></div></div><div class="succes_fail_description">' +
        text +
        '</div></div><div class="fail_bar"><div class="fail_bar_inner mes_bar"></div></div></div>';
      new_el = $(new_el);
      $("#mes_div").append(new_el);
      $("#mes_div .succes_fail_mes").animate({ right: "0%" }, 600, function () {
        $("#mes_div .fail_bar_inner").animate({ width: "0%" }, 3400, "linear");
      });
      inter = setTimeout(function () {
        $("#mes_div .succes_fail_mes").fadeOut(600, function () {
          $(this).remove();
        });
      }, 4000);

      $("#mes_div .succes_fail_mes").mouseenter(function () {
        $("#mes_div .succes_fail_mes").stop(true);
        $("#mes_div .fail_bar_inner").stop(true);
        $("#mes_div .fail_bar_inner").animate({ width: "100%" }, 50, "linear");

        $("#mes_div .succes_fail_mes").fadeIn(50);
        clearTimeout(inter);
      });
      $("#mes_div .succes_fail_mes").mouseleave(function () {
        $("#mes_div .fail_bar_inner").animate({ width: "0%" }, 4000, "linear");
        inter = setTimeout(function () {
          $("#mes_div .succes_fail_mes").fadeOut(600, function () {
            $(this).remove();
          });
        }, 4000);
      });
    }
  }

  function goToConnectPhase() {
    $(".mint_div_inner").hide();
    $(".connect").show();
    $("#address_div").html("");
    ethereum.on("accountsChanged", function () {});
  }

  function goToMintPhase() {
    $(".connect").hide();
    $(".mint_div_inner").show();
    const con_add = ethereum.selectedAddress;
    $("#address_div").html(
      'Connected Address: <span class="bold">' +
        [con_add.slice(0, 5), "******", con_add.slice(-3)].join("") +
        "</span>"
    );
    ethereum.on("accountsChanged", function (newAccount) {
      if (newAccount[0]) {
        $("#address_div").html(
          'Connected Address: <span class="bold">' +
            [newAccount[0].slice(0, 5), "******", newAccount[0].slice(-3)].join(
              ""
            ) +
            "</span>"
        );
      } else {
        goToConnectPhase();
      }
    });
  }

  $(".connect").click(function connectToMetamask() {
    if (typeof window.ethereum !== "undefined") {
      if (ethereum.selectedAddress == null) {
        async function getAccount() {
          return await ethereum.request({ method: "eth_requestAccounts" });
        }
        function ifAccountAchieved(accounts) {
          create_mes("succes", "Connected Succesfully!");
          goToMintPhase();
        }
        function ifAccountNotAchieved() {
          create_mes("fail", "Something Went Wrong!");
        }
        getAccount().then(
          function (accounts) {
            ifAccountAchieved(accounts);
          },
          function () {
            ifAccountNotAchieved();
          }
        );
      } else {
        create_mes("succes", "Already Connected!");
        goToMintPhase();
      }
    } else {
      create_mes("fail", "Please Install Metemask!");
    }
  });

  $(".mint_div_inner").click(function mint() {
    create_mes("fail", "Mint Is Not Active Yet!");
  });
});
