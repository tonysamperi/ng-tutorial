angular.module("ngTutorial", [])
    .run(["$templateCache", function ($templateCache) {
        $templateCache.put("buttons.html",
            '<span ng-click="close()" ng-if="tutorialActive && showClose" class="tutorial-close"></span>\
            <span ng-click="nextStep()" ng-if="tutorialActive && hasSteps" class="tutorial-arrow tutorial-arrow-right"></span>\
                    <span ng-click="prevStep()" ng-if="tutorialActive && hasSteps" class="tutorial-arrow tutorial-arrow-left"></span>'
        );
    }])
    .directive('tutorial', ["$compile", "$templateCache", function ($compile, $templateCache) {
        return {
            restrict: "A",
            scope: false,
            link: function (scope, el, attrs) {
                var j = angular.element;
                var div = "<div></div>", blackOverlay, clickOverlay, activeClass = "active", targets = [],
                    noBgList = ["p", "label", "span"],
                    white = "rgba(255, 255, 255, 1)", highlightAttr = "tutorial-highlight",
                    currentStep = 0, totalSteps = 0,
                    transparent = "rgba(0, 0, 0, 0)", bgColor = "background-color";
                var buttons = $templateCache.get("buttons.html");
                buttons = $compile(buttons)(scope);
                buttons.prependTo(el);
                var generate = function (element, cssClass) {
                    return j(element).addClass(cssClass).clone();
                };
                var hasTransparentBg = function (element) {
                    return element.css(bgColor) === transparent;
                };

                var init = function () {
                    blackOverlay = generate(div, "tutorial-black-overlay");
                    if (attrs["tutorialPreventClick"] === "true") {
                        clickOverlay = generate(div, "tutorial-click-overlay");
                        if (!scope.showClose) {
                            clickOverlay.attr("ng-click", "close()");
                        }
                        clickOverlay = $compile(clickOverlay)(scope);
                        clickOverlay.appendTo("body");
                    }
                    else {
                        if (!scope.showClose) {
                            blackOverlay.attr("ng-click", "close()");
                        }
                        blackOverlay = $compile(blackOverlay)(scope);
                    }
                    blackOverlay.appendTo("body");
                };

                var highlight = function (target) {
                    var container = target.parent();
                    var color = white;
                    if (hasTransparentBg(target)) {
                        if (!hasTransparentBg(container)) {
                            color = container.css(bgColor);
                        }
                        target.attr("tutorial-transparent", "$");
                        target.css(bgColor, color);
                    }
                    target.addClass(activeClass);
                };

                var showOverlays = function () {
                    j([blackOverlay, clickOverlay]).each(function () {
                        j(this).addClass(activeClass);
                    });
                };
                var disableStep = function (step) {
                    var toDisable = j(targets).filter("[" + highlightAttr + "='" + step + "']");

                    toDisable.each(function () {
                        j(this).removeClass(activeClass);
                    });

                    toDisable.filter("[tutorial-transparent]").css(bgColor, transparent).removeAttr("tutorial-transparent");
                };
                var enableStep = function (step) {
                    var filter = "[" + highlightAttr + "]";
                    if (step) filter = "[" + highlightAttr + "='" + step + "']";
                    var toEnable = j(targets).filter(filter);
                    toEnable.each(function () {
                        var currentHighlight = j(this);
                        if(noBgList.indexOf(currentHighlight[0].localName) === -1){
                            highlight(currentHighlight);
                        }
                        else{
                            currentHighlight.addClass(activeClass);
                        }
                    });
                };

                var begin = function () {
                    scope.tutorialActive = true;
                    targets = el.find("[" + highlightAttr + "]");
                    showOverlays();
                    if (scope.hasSteps) {
                        totalSteps = parseInt(attrs["tutorialSteps"]);
                        nextStep();
                    }
                    else {
                        enableStep();
                    }
                };
                var nextStep = function () {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        if (currentStep > 1) {
                            disableStep(currentStep - 1);
                        }
                        enableStep(currentStep);
                    }
                    else {
                        disableStep(currentStep);
                        scope[attrs.tutorial] = false;
                    }
                };

                var prevStep = function () {
                    if (currentStep > 1) {
                        currentStep--;
                        if (currentStep < totalSteps) {
                            disableStep(currentStep + 1);
                        }
                        enableStep(currentStep);
                    }
                    else {
                        disableStep(currentStep);
                        scope[attrs.tutorial] = false;
                    }
                };

                var end = function () {
                    scope.tutorialActive = false;
                    currentStep = 0;
                    j([blackOverlay, clickOverlay]).each(function () {
                        j(this).removeClass(activeClass);
                    });
                    j(targets).filter("[tutorial-transparent]").css(bgColor, transparent).removeAttr("tutorial-transparent");
                };

                scope.$watch(attrs.tutorial, function (n, o) {
                    if (n === o) return;
                    n ? begin() : end();
                });


                scope.showClose = attrs["tutorialShowClose"] === "true";

                scope.hasSteps = !!attrs["tutorialSteps"] || false;

                scope.close = function () {
                    scope[attrs.tutorial] = false;
                };

                scope.nextStep = function () {
                    nextStep();
                };

                scope.prevStep = function () {
                    prevStep();
                };

                init();

            }
        }
    }])
;
