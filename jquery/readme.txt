Example usage:

jQuery.funnelbackize("myFunnelback", Funnelback);
        jQuery("#inlineSearch").myFunnelback(
            {
                collection: 'demo-bradford-uni',
                profile: '_default_preview',
                url: '/s/search.json',
                targets: [
                    {
                        'path': jQuery('#inlineSearch'),
                        'formatter': 'searchResultsList',
                    },
                    {
                        'path': jQuery('#contextNav'),
                        'formatter': 'contextualNavigationList',
                    }
                ],
                fbloader: jQuery("#fbloader"),
            });
        var inlineSearchFB = jQuery("#inlineSearch").data('myFunnelback');
        jQuery.funnelbackize("myFunnelbackContext", Funnelback);
        inlineSearchFB.jsonpsearch('bradford');