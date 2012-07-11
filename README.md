Expandable Ads
==============

Expandable ads is an example of how to create ads that expand by either sliding down or sliding from right to left. You can display the ads for using any ad network (i.e. [Google DFP][DFP]) that allows third party Javascript.

[DFP]: http://www.google.com/dfp/

Example Usage
-------------
-------------



### Javascript Example for Testing

The following is code you can use for testing your ad locally. You can also look at the included example in the `./examples/` directory.

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Javascript Example for Testing</title>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
            <script type="text/javascript" src="http://media.example.com/js/expandable-ad/expandable-ad.min.js"></script>
        </head>
        <body>
            <div id="my-ad-container" style="position: relative; width: 960px; height: 66px;">
                <script>
                var slide_down_ad_1 = expandable_ad(jQuery);
                slide_down_ad.init({
                    ad_id_slug: 'slide-down-ad-1',
                    small_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x66.swf',
                    large_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x500.swf',
                    click_thru_url: 'http://www.example.com/'
                });
                </script>
            </div>
        </body>
    </html>

### DFP Example

Add the following code into DFP as a third party creative. Make sure you change the URL to match where you're hosting the code.

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://media.example.com/js/expandable-ad/expandable-ad.min.js"></script>
    <script>
    var slide_down_ad_1 = expandable_ad(jQuery);
    slide_down_ad.init({
        ad_id_slug: 'slide-down-ad-1',
        small_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x66.swf',
        large_ad_swf_url: 'http://media.example.com/ads/slide-down-ad-1/ad_960x500.swf',
        click_thru_url: '%%CLICK_URL_UNESC%%http://www.example.com/'
     });
     </script>

Add the DFP code for generating the ads like you normally would.

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Expandable Ads</title>

            <!-- DFP Head Scripts -->
            <script type='text/javascript' src='http://partner.googleadservices.com/gampad/google_service.js'>
            </script>
            <script type='text/javascript'>
            GS_googleAddAdSenseService("ca-pub-################");
            GS_googleEnableAllServices();
            </script>
            <script type='text/javascript'>
            GA_googleAddSlot("ca-pub-################", "My_Ad_Unit_or_Placement");
            </script>
            <script type='text/javascript'>
            GA_googleFetchAds();
            </script>
            <!-- /scripts -->

        </head>

        <body>

            <div id="my-ad-container" style="position: relative; width: 960px; height: 66px;">
            <!-- DFP Ad Render Code -->
            <script type='text/javascript'>
            GA_googleFillSlot("My_Ad_Unit_or_Placement");
            </script>
            </div>

        </body>
    </html>

