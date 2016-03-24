/**
 * Toolkit JavaScript
 */

'use strict';

// Toggle modifiers

(function(){

    // Bit of an experiment here

    function $$(selector, scope) {
        if(scope){
            return scope.querySelectorAll(selector);
        }else{
            return document.querySelectorAll(selector);
        }

    }

    var groups = Array.prototype.slice.call($$('.f-item-group'), 0);

    groups.forEach(function(group){

        var modifiers = Array.prototype.slice.call($$('.f-item-notes code', group), 0);

        var object = group.querySelector('.f-item-preview > *:first-child');

            modifiers.forEach(function(modifier){

                modifier.addEventListener('click', function() {

                    var cssClassName = modifier.innerText.replace('.','');

                    //remove old modifier
                    modifiers.forEach(function(modifier){
                        var modifierCssClassName = modifier.innerText.replace('.','');

                        if(cssClassName !== modifierCssClassName && object.classList.contains(modifierCssClassName)){
                            object.classList.remove(modifierCssClassName);
                        }
                    });

                    // add new modifier
                    object.classList.toggle(cssClassName);
                });

            });
    });

})();
