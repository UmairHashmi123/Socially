import './core.module.js';


(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config)
        .config(function (flowFactoryProvider) {
          flowFactoryProvider.factory = function (opts) {
            var Flow = require('ng-flow/dist/ng-flow-standalone.js');
            return new Flow(opts)
         }
       });



    /** @ngInject */
    function config($ariaProvider, $logProvider, msScrollConfigProvider, $translateProvider, fuseConfigProvider)
    {
        // Enable debug logging
        $logProvider.debugEnabled(true);
        console.log()
        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'

        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        /*eslint-disable */

        // ng-aria configuration
        $ariaProvider.config({
            tabindex: false
        });

        // Fuse theme configurations
        fuseConfigProvider.config({
            'disableCustomScrollbars'        : false,
            'disableCustomScrollbarsOnMobile': true,
            'disableMdInkRippleOnMobile'     : true
        });

        // msScroll configuration
        msScrollConfigProvider.config({
            wheelPropagation: true
        });

        /*eslint-enable */
        // Flow configuration


    }
})();
