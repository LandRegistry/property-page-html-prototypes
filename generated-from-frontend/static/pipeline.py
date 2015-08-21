from flask.ext.assets import Bundle  # type: ignore
from os import path                  # type: ignore
import sass as libsass               # type: ignore


__dot = path.dirname(path.realpath(__file__))

__toolkit_scss_dir = path.join(__dot, 'govuk_frontend_toolkit/stylesheets/')
__styleguide_scss_dir = path.join(__dot, 'lr-styleguide/sass/')


def compile_sass(_in, out, **kw):
    out.write(
        libsass.compile(
            string=_in.read(),
            include_paths=[__toolkit_scss_dir, __styleguide_scss_dir]
        )
    )

sass = Bundle('lr-styleguide/sass/styleguide.scss',
              filters=(compile_sass,), output='lr-styleguide/css/styleguide.css')


sass_ie8 = Bundle('lr-styleguide/sass/styleguide-ie8.scss',
                  filters=(compile_sass,), output='lr-styleguide/css/styleguide-ie8.css')


sass_ie7 = Bundle('lr-styleguide/sass/styleguide-ie7.scss',
                  filters=(compile_sass,), output='lr-styleguide/css/styleguide-ie7.css')


sass_ie6 = Bundle('lr-styleguide/sass/styleguide-ie6.scss',
                  filters=(compile_sass,), output='lr-styleguide/css/styleguide-ie6.css')

print = Bundle('stylesheets/sass/print.scss',
               filters=(compile_sass,), output='stylesheets/css/print.css')

beta = Bundle('stylesheets/sass/beta.scss',
              filters=(compile_sass,), output='stylesheets/css/beta.css')


js = Bundle('lr-styleguide/js/vendor/jquery/jquery-1.11.3.js',
            'govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js',
            'govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
            'govuk_frontend_toolkit/javascripts/govuk/stick-at-top-when-scrolling.js',
            'govuk_frontend_toolkit/javascripts/govuk/stop-scrolling-at-footer.js',
            'lr-styleguide/js/vendor/polyfills/details.polyfill.js',
            'lr-styleguide/js/components/buttons-actions.js',
            'lr-styleguide/js/components/case-list.js',
            'lr-styleguide/js/components/inits.js',
            filters='rjsmin', output='lr-styleguide/js/styleguide-components.js')
