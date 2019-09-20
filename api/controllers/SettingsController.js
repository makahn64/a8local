/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

  forkey: function (req, res) {

    const params = req.allParams();

    if (!params.key)
      return res.badRequest({
        error: 'no key, no love'
      });

    if ((req.method === 'POST' || req.method === "PUT") && !params.value)
      return res.badRequest({
        error: 'no value'
      });

    switch (req.method) {

      case 'GET':
        Settings.findOne({
            key: params.key
          })
          .then(setting => {
            if (!setting)
              return res.notFound();

            return res.ok(setting.value);
          })
          .catch(res.serverError);
        break;

      case 'POST':
        Settings.create({
            key: params.key,
            value: params.value
          })
          .fetch()
          .then(res.ok)
          .catch(err => {
            if (err.code === 'E_VALIDATION') {
              return res.badRequest({
                error: 'duplicate key'
              });
            } else {
              return res.serverError(err);
            }
          });
        break;

      case 'PUT':
        Settings.update({
            key: params.key
          }, {
            value: params.value
          })
          .fetch()
          .then(update => {
            if (update.length === 1) {
              return res.ok(update[0]);
            } else if (!update.length) {
              return res.notFound();
            }
            // should bever be here
            return res.serverError(update);
          })
          .catch(res.serverError);
        break;

      case 'DELETE':
        Settings.destroy({
            key: params.key
          })
          .then(res.ok)
          .catch(res.serverError);
        break;

      default:
        return res.badRequest({
          error: 'bad verb'
        });

    }
  }
};
