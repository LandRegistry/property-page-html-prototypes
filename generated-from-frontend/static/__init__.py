from flask.ext.assets import Environment  # type: ignore

from . import pipeline

assets = Environment()
assets.register('styleguide_js', pipeline.js)
assets.register('styleguide', pipeline.sass)
assets.register('styleguide_ie8', pipeline.sass_ie8)
assets.register('styleguide_ie7', pipeline.sass_ie7)
assets.register('styleguide_ie6', pipeline.sass_ie6)
assets.register('print', pipeline.print)
assets.register('beta', pipeline.beta)


def register_assets(app):
    assets.init_app(app)
    return assets
