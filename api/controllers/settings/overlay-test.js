module.exports = async (req, res) => res.ok(sails.config.overlay || { oopsie: 'daisy' })
