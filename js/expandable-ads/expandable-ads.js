/*!
 * Expandable Ads
 *
 * Version: v0.1.2
 * Author: Brent O'Connor (www.epicserve.com)
 * Requirements: jQuery v1.7.2 or greater
 *
 * Example Usage::
 *     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
 *     <script type="text/javascript" src="http://media.example.com/js/expandable-ad/expandable-ad.min.js"></script>
 *     <script>
 *     var slide_down_ad_1 = expandable_ad(jQuery);
 *     slide_down_ad.init({
 *         ad_id_slug: 'slide-down-ad-1',
 *         small_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x66.swf',
 *         large_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x500.swf',
 *         click_thru_url: 'http://www.example.com/'
 *     });
 *     </script>
 *
 * DFP Example Usage::
 *     // Ad the following code in DFP as a third party javascript
 *     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
 *     <script type="text/javascript" src="http://media.example.com/js/expandable-ad/expandable-ad.min.js"></script>
 *     <script>
 *     var slide_down_ad_1 = expandable_ad(jQuery);
 *     slide_down_ad.init({
 *         ad_id_slug: 'slide-down-ad-1',
 *         small_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x66.swf',
 *         large_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x500.swf',
 *         click_thru_url: '%%CLICK_URL_UNESC%%http://www.example.com/'
 *     });
 *     </script>
 *
 */

// The following makes it possible to make array values unique
Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
};

var expandable_ad = function($) {

    var flash_object_code = '' +
        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="{{ width }}" height="{{ height }}" id="{{ id }}">' +
        '    <param name="allowScriptAccess" value="always"/>' +
        '    <param name="allowFullScreen" value="false" />' +
        '    <param name="wmode" value="transparent"/>' +
        '    <param name="movie" value="{{ swf_url }}"/>' +
        '    <param name="quality" value="high" />' +
        '    <param name="FlashVars" value="{{ flash_vars }}"/>' +
        '    <embed src="{{ swf_url }}" flashvars="{{ flash_vars }}" width="{{ width }}" height="{{ height }}" name="{{ id }}"' +
        '    quality="high" allowscriptaccess="always" wmode="transparent" allowFullScreen="false" swliveconnect="true" type="application/x-shockwave-flash"' +
        '    pluginspage="http://www.macromedia.com/go/getflashplayer" />' +
        '</object>';

    var default_options = {
        ad_id_slug: 'expandable-ad-1',
        small_ad_id: '',
        small_ad_wrap_id: '',
        small_ad_size: '960x66',
        small_ad_swf_url: '',
        large_ad_id: '',
        large_ad_wrap_id: '',
        large_ad_size: '960x500',
        large_ad_swf_url: '',
        expand_effect: 'slideDown', // slideDown, slideLeft
        click_thru_url: '',
        open_delay_time: 0.5
    };

    function get_template(tpl, data) {
        matches = tpl.match(/\{\{\s[a-z0-9_]+\s\}\}/g).getUnique();
        $.each(matches, function(i, v) {
            var key = v.replace(/(\{\{\s|\s\}\})/g, '');
            var replace_value = (data[key] === undefined) ? '': data[key];
            var re = new RegExp(v,"g");
            tpl = tpl.replace(re, replace_value);
        });
        return tpl;
    }

    return {

        version: 'v0.1.2',
        public_property: null,
        mouse_is_over_sm_ad: false,
        mouse_is_over_lg_ad: false,

        init: function(options) {

            var self = this;

            // extend and override any of the default options
            self.options = $.extend(default_options, options);

            var o = self.options;

            // set ad ids for objects based on the ad_id_slug
            if (o['ad_id_slug'] !== '' && o['small_ad_id'] === '') {
                o['small_ad_id'] = 'small-' + o['ad_id_slug'];
            }
            if (o['ad_id_slug'] !== '' && o['small_ad_wrap_id'] === '') {
                o['small_ad_wrap_id'] = 'small-' + o['ad_id_slug'] + '-wrap';
            }
            if (o['ad_id_slug'] !== '' && o['large_ad_id'] === '') {
                o['large_ad_id'] = 'large-' + o['ad_id_slug'];
            }
            if (o['ad_id_slug'] !== '' && o['large_ad_wrap_id'] === '') {
                o['large_ad_wrap_id'] = 'large-' + o['ad_id_slug'] + '-wrap';
            }

            self.render_ads();

        },

        open_large_ad: function() {
            var self = this;
            var o = self.options;
            var elem = $('#' + o['large_ad_wrap_id']);
            if (self.mouse_is_over_sm_ad === true) {
                if (o['expand_effect'] === 'slideDown') {
                    elem.slideDown('slow');
                } else if (o['expand_effect'] === 'slideLeft') {
                    elem.stop(true, true).css('width', '0px').show().animate({ width: o['large_ad_size'].split('x')[0] + 'px' }, 'slow');
                }

            }
        },

        close_large_ad: function() {
            var self = this;
            var o = self.options;
            var elem = $('#' + o['large_ad_wrap_id']);
            if (o['expand_effect'] === 'slideDown') {
                elem.stop(true, true).slideUp('fast');
            } else if (o['expand_effect'] === 'slideLeft') {
                elem.stop(true, true).animate({ width: "0px" }, 'fast', function() { $(this).hide(); });
            }
        },

        render_ads: function() {
            var self = this;
            var o = self.options;
            var sm_size = o['small_ad_size'].split('x');
            var lg_size = o['large_ad_size'].split('x');
            var lg_pos = 'top: 0px;';

            if (o['large_ad_swf_url'].indexOf('?') == -1) {
                o['large_ad_swf_url'] = o['large_ad_swf_url'] + '?clickTAG=' + escape(o['click_thru_url']);
            } else {
                o['large_ad_swf_url'] = o['large_ad_swf_url'] + '&clickTAG=' + escape(o['click_thru_url']);
            }

            // output the small ad
            document.write('<div id="' + o['small_ad_wrap_id'] + '" style="width: ' + sm_size[0] + 'px, height: ' + sm_size[1] + 'px;">');
            document.write(get_template(flash_object_code, {
                width: sm_size[0],
                height: sm_size[1],
                id: o['small_ad_id'],
                swf_url: o['small_ad_swf_url']
            }));
            document.write('</div>');

            // output the large ad
            if (o['expand_effect'] === 'slideLeft')  {
                lg_pos = 'top: 0px; right: 0px;';
            }
            document.write('<div id="' + o['large_ad_wrap_id'] + '" style="position: absolute; ' + lg_pos + ' display: none; width: ' + lg_size[0] + 'px, height: ' + lg_size[1] + 'px; z-index: 100001">');
            document.write(get_template(flash_object_code, {
                width: lg_size[0],
                height: lg_size[1],
                id: o['large_ad_id'],
                swf_url: o['large_ad_swf_url']
            }));
            document.write('</div>');

            // add ad hover effects / behaviors
            $('#' + o['small_ad_wrap_id']).hover(
                function() {
                    self.mouse_is_over_sm_ad = true;
                    self.open_ad_timeout = setTimeout(function() { self.open_large_ad(); }, (o.open_delay_time * 1000));
                },
                function() {
                    self.mouse_is_over_sm_ad = false;
                    clearTimeout(self.open_ad_timeout);
                }
            );
            $('#' + o['large_ad_wrap_id']).hover(
                function() {
                    self.mouse_is_over_lg_ad = true;
                },
                function() {
                    self.mouse_is_over_lg_ad = false;
                    self.close_large_ad();
                }
            );

        }

    };

};
