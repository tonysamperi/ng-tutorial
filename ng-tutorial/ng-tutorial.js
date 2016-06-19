angular.module("ngTutorial", [])
    .directive('tutorial', ["$compile", function ($compile) {
        return {
            restrict: "A",
            scope: false,
            link: function (scope, el, attrs) {
                var j = angular.element;
                var div = "<div></div>", blackOverlay, clickOverlay, activeClass = "active",
                    transparent = "rgba(0, 0, 0, 0)", bgColor = "background-color",
                    closeTpl = '<span ng-click="close()" class="tutorial-close"></span>';
                var generate = function (element, cssClass) {
                    return j(element).addClass(cssClass).clone();
                };
                var hasTransparentBg = function(element){
                    return element.css(bgColor) === transparent;
                };
                var insertCloseButton = function (container) {
                    if (attrs["tutorialShowClose"] !== "true") {
                        container.attr("ng-click", "close()");
                        return;
                    }
                    var closeButton = generate(closeTpl); //$compile(generate(closeTpl))(scope);
                    closeButton.appendTo(container);
                };
                var init = function () {
                    blackOverlay = generate(div, "tutorial-black-overlay");
                    if (attrs["tutorialPreventClick"] === "true") {
                        clickOverlay = generate(div, "tutorial-click-overlay");
                        insertCloseButton(clickOverlay);
                        clickOverlay = $compile(clickOverlay)(scope);
                        clickOverlay.appendTo("body");
                    }
                    else {
                        insertCloseButton(blackOverlay);
                        blackOverlay = $compile(blackOverlay)(scope);
                    }
                    blackOverlay.appendTo("body");
                };
                var targets = el.find("[tutorial-highlight]");
                var begin = function () {
                    j([blackOverlay, clickOverlay, el]).each(function () {
                        j(this).addClass(activeClass);
                    });
                    j(targets).each(function () {
                        var current = j(this);
                        var container = current.parent();
                        var color = "rgba(255, 255, 255, 1)"
                        if (hasTransparentBg(current)) {
                            if(!hasTransparentBg(container)){
                                color = container.css(bgColor);
                            }
                            current.attr("tutorial-transparent", "$");
                            current.css(bgColor, color);
                        }
                    });
                };
                var end = function () {
                    j([blackOverlay, clickOverlay, el]).each(function () {
                        j(this).removeClass(activeClass);
                    });
                    j(targets).filter("[tutorial-transparent]").css(bgColor, transparent).removeAttr("tutorial-transparent");
                };

                scope.$watch(attrs.tutorial, function (n,o) {
                    if(n===o) return;
                    n ? begin() : end();
                });

                scope.close = function () {
                    scope[attrs.tutorial] = false;
                };

                init();

            }
        }
    }]);
