
var keys = {};

var allLevels = [5, 10, 100];
var wii= new Audio('audio/wii.mp3');
var tanan= new Audio('audio/tanan.mp3');
var fondo= new Audio('audio/Fundo.mp3');

$(document).ready(function() {

    var actualLevel = 1;
    var fruitsSpeed = 200;
    var fruitInterval;
    var gameOver = false;



    $(".start").on("click", function() {
        setInterval(function(){
              fondo.currentTime=0;
              fondo.play();
            },3000)

        setInterval(function() {
            var checkStatusC1 = $("#score1").text();
            var checkStatusC2 = $("#score2").text();
            if ((parseInt(checkStatusC1) >= allLevels[actualLevel - 1]) ||
                (parseInt(checkStatusC2) >= allLevels[actualLevel - 1])) {
                goToNextLevel();
                moveSpeed = 50;
            } else {
                gameOver = true;
                $('.gameOver').css('visibility', 'visible')
                $("#catcher1").remove();
                $("#catcher2").remove();
                $(".fruits").remove();
                tanan.currentTime=0;
                tanan.play();
                clearInterval(wii);
                clearInterval(fondo);
            }
        }, 30000)



        function goToNextLevel() {
            clearInterval(fruitInterval)
            fruitsSpeed /= 3;
            fruitsMovement();
            actualLevel += 1;
            wii.currentTime=0;
            wii.play();

        }

        function getLevelImage() {
            return actualLevel;
        }

        function fruitsMovement() {
            fruitInterval = setInterval(function() {
                var allFruits = $(".fruits");
                allFruitsArray = allFruits.toArray();
                allFruitsArray.forEach(function(e) {
                    var actualPosition = (parseInt($("#" + e.id).css("top").replace("px", "")));
                    if (actualPosition < 400) {
                        $("#" + e.id).css("top", actualPosition + 10 + "px");
                    }
                })
            }, fruitsSpeed);
        }

        var moveSpeed = 30;

        $(document).keydown(function(e) {

            if (e.keyCode == 39)
                move("#catcher1", moveSpeed);
            else if (e.keyCode == 37)
                move("#catcher1", -moveSpeed)
            else if (e.keyCode == 68)
                move("#catcher2", moveSpeed)
            else if (e.keyCode == 65)
                move("#catcher2", -moveSpeed)
        });

        function move(element, value) { //a un elemento le asigno un valor
            var actualPosition = (parseInt($(element).css("left").replace("px", "")));
            // Check boundaires
            if (value > 0) {
                if (actualPosition < 531)
                    $(element).css("left", actualPosition + value + "px")
            } else {
                if (actualPosition > 9)
                    $(element).css("left", actualPosition + value + "px")
            }
        }

        fruitsMovement();



        var i = 0;
        var intervalFruits = setInterval(function() {
            i++;
            var randomPosition = Math.floor(Math.random() * 560)
            $("#wrapper-tablero").append('<div class="image' + getLevelImage() + ' fruits" id="fruits-animate' + i + '"></div>')
            var currentFruit = "#fruits-animate" + i;
            $(currentFruit).css("left", randomPosition + "px");
            if (gameOver === true) clearInterval(intervalFruits);
        }, 2000);


        var score1 = 0;
        var score2 = 0;

        setInterval(function() {
            var actualPositionC1 = (parseInt($("#catcher1").css("left").replace("px", "")));
            var actualPositionC2 = (parseInt($("#catcher2").css("left").replace("px", "")));

            var allFruits = $(".fruits");
            allFruitsArray = allFruits.toArray();
            allFruitsArray.forEach(function(e) {
                var actualPositionFruitsX = (parseInt($("#" + e.id).css("top").replace("px", "")));
                var actualPositionFruitsY = (parseInt($("#" + e.id).css("left").replace("px", "")));
                var currentFruit = e;



                if (actualPositionC1 <= actualPositionFruitsY &&
                    actualPositionFruitsY <= actualPositionC1 + 60 &&
                    390 <= actualPositionFruitsX + 30 &&
                    actualPositionFruitsX <= 400) {
                    $("#" + e.id).remove();
                    score1++;
                    $("#score1").text(score1)
                }

                if (actualPositionC2 <= actualPositionFruitsY &&
                    actualPositionFruitsY <= actualPositionC2 + 60 &&
                    390 <= actualPositionFruitsX + 30 &&
                    actualPositionFruitsX <= 400) {
                    $("#" + e.id).remove();
                    score2++;
                    $("#score2").text(score2)
                }
            })
        }, 100);



        var catcher = $(".catcher");
        var x = clear("left", "#catcher1");
        var y = clear("top", "#catcher2");


        function clear(attribute, catcher) {
            return parseInt($(catcher).css(attribute).replace("px", ""));
        }

    });
});
