/**
 * Experience.js
 *
 * @description :: Represents a single experience by one or more guests
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');
const flaverr = require('flaverr');

module.exports = withUUID({

    attributes: {

        // Usually this is pulled from the experienceConfig, but it can be set manually
        name: {
          type: 'string'
        },

        configKey: {
            type: 'string'
        },

        config: {
          type: 'json'
        },

        // UUID
        event: {
            type: 'string',
            defaultsTo: ''
        },

        // Array of denormalized guest objects.
        guests: {
            type: 'json',
            defaultsTo: []
        },

        // Array of denormalized media objects
        media: {
            type: 'json',
            defaultsTo: []
        },

        //indicates this experience is done, and can be completed (i.e. email, sms sent to guest)
        completed: {
            type: 'boolean',
            defaultsTo: false
        },

        //Whatever you want: scores, etc.
        metadata: {
            type: 'json'
        },

        // Log of whether the completions called for the in the ExperienceConfig have actually happened or errored
        completionsLog: {
            type: 'json',
            defaultsTo: []
        },

        // UTC time string
        experiencedAt: {
            type: 'string'
        }

    },

    populationSchema: {
        event: { type: 'obj', model: 'event' },
        guests: { type: 'array', model: 'guest' },
        media: { type: 'array', model: 'media'}
    },

    beforeCreate: async function (values, next) {
        if (!values.experiencedAt) values.experiencedAt = new Date().toUTCString();

        if (!values.name && values.configKey) {
            const config = await ExperienceConfig.findOne({ key: values.configKey });
            if (config) {
                values.name = config.name;
                values.config = {...config};
            }
        }

        next();
    },

    attachGuest: async function (experienceUUID, guestUUID){
        const e = await Experience.findOne({uuid: experienceUUID});
        if (!e) throw flaverr({ message: `Experience not found ${experienceUUID}`, code: 'E_UNKNOWN_EXP'});

        const g = await Guest.findOne({uuid: guestUUID});
        if (!e) throw flaverr({ message: `Guest not found ${guestUUID}`, code: 'E_UNKNOWN_GUEST'});

        const newExp = await Experience
            .update({uuid: experienceUUID})
            .set({ guests: _.uniq([...e.guests, guestUUID ])})
            .fetch();

        const newGs = await Guest
            .update({uuid: guestUUID})
            .set({ experiences: _.uniq([...g.experiences, experienceUUID ])})
            .fetch();

        return { guest: newGs, experience: newExp }

    },



});

